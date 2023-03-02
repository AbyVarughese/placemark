import { userMemStore } from "./mem/user-mem-store.js";
import { categoryMemStore } from "./mem/category-mem-store.js";
import { trackMemStore } from "./mem/track-mem-store.js";
import {categoryController} from "../controllers/category-controller.js";

export const db = {
  userStore: null,
  categoryStore: null,
  trackStore: null,

  init() {
    this.userStore = userMemStore;
    this.categoryStore = categoryMemStore;
    this.trackStore = trackMemStore;
  },
};
