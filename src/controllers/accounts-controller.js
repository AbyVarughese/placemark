/* eslint-disable func-names */
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import bcrypt from "bcrypt";          // ADDED
const saltRounds = 10;                // ADDED

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Category" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for Category" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h
            .view("signup-view", {
              title: "Sign up error",
              errors: error.details,
            })
            .takeover()
            .code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      user.password = await bcrypt.hash(user.password, saltRounds);    // ADDED
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to Category" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      const passwordsMatch = await bcrypt.compare(password, user.password);    // ADDED
      if (!user || !passwordsMatch) {                                          // ADDED
     // if (!user || user.password !== password) {   // orginal
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  credentials: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const account = await db.userStore.getUserById(loggedInUser._id);
      const viewData = {
        title: "Account",
        account: account
      };
      return h.view("credentials-view", viewData) ;
    },
  },

  update: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const account = await db.userStore.getUserById(loggedInUser._id);
      // console.log("good id");
      // console.log(placemark);
      const newUser = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        //email: request.payload.email,
        password: request.payload.password,
      };
      await db.userStore.updateUser(loggedInUser, newUser);
      return h.redirect(`/credentials`);
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },

};
