import { createStore } from "vuex";
import mutations from "./mutations.js";
import actions from "./actions.js";

export default createStore({
  state: {
    ttl: null,
    zrr: [],
    playerPosition: null,
    impacts: [],
    gameStarted: false,
  },
  mutations,
  actions,
});
