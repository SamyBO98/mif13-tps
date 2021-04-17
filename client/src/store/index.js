import { createStore } from "vuex";
import mutations from "./mutations.js";
import actions from "./actions.js";

export default createStore({
  state: {
    ttl: 0,
    zrr: new Array(),
    playerPosition: null,
    impacts: new Array(),
  },
  mutations,
  actions,
});
