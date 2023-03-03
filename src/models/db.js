// import { userMemStore } from "./mem/user-mem-store.js";
// import { categoryMemStore } from "./mem/category-mem-store.js";
// import { trackMemStore } from "./mem/track-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { categoryJsonStore } from "./json/category-json-store.js";
import { trackJsonStore } from "./json/track-json-store.js";
import {categoryController} from "../controllers/category-controller.js";

export const db = {
  userStore: null,
  categoryStore: null,
  trackStore: null,

  init() {
    this.userStore = userJsonStore;
    this.categoryStore = categoryJsonStore;
    this.trackStore = trackJsonStore;
  },
};
