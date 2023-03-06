import { userMemStore } from "./mem/user-mem-store.js";
import { categoryMemStore } from "./mem/category-mem-store.js";
import { trackMemStore } from "./mem/track-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { categoryJsonStore } from "./json/category-json-store.js";
import { trackJsonStore } from "./json/track-json-store.js";
//import {categoryController} from "../controllers/category-controller.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { categoryMongoStore } from "./mongo/category-mongo-store.js";
import { trackMongoStore } from "./mongo/track-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";


export const db = {
  userStore: null,
  categoryStore: null,
  trackStore: null,

  init(storeType) {
    switch (storeType) {
      case "json" :
        this.userStore = userJsonStore;
        this.categoryStore = categoryJsonStore;
        this.trackStore = trackJsonStore;
        break;
      case "mongo" :
        this.userStore = userMongoStore;
        this.categoryStore = categoryMongoStore;
        this.trackStore = trackMongoStore;
        connectMongo();
        break;
      default :
        this.userStore = userMemStore;
        this.categoryStore = categoryMemStore;
        this.trackStore = trackMemStore;
    }
  }
};
