import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { categoryController } from "./controllers/category-controller.js";
import { placemarkController } from "./controllers/placemark-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },
  { method: "GET", path: "/credentials", config: accountsController.credentials },
  { method: "POST", path: "/update", config: accountsController.update },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addcategory", config: dashboardController.addCategory },
  { method: "GET", path: "/dashboard/deletecategory/{id}", config: dashboardController.deleteCategory },

  { method: "GET", path: "/category/{id}", config: categoryController.index },
  { method: "POST", path: "/category/{id}/addplacemark", config: categoryController.addPlacemark },
  { method: "GET", path: "/category/{id}/deleteplacemark/{placemarkid}", config: categoryController.deletePlacemark },

  { method: "GET", path: "/placemark/{id}/editplacemark/{placemarkid}", config: placemarkController.index },
  { method: "POST", path: "/placemark/{id}/updateplacemark/{placemarkid}", config: placemarkController.update },

  { method: "GET", path: "/public", config: placemarkController.public },
  { method: "GET", path: "/public/review/{placemarkid}", config: placemarkController.review },
  { method: "POST", path: "/public/review/{placemarkid}", config: placemarkController.addReview },

  { method: "POST", path: "/category/{id}/uploadimage", config: categoryController.uploadImage },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },


];
