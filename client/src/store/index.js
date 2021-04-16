import { createStore } from "vuex";
import mutations from "./mutations.js";
import actions from "./actions.js";

export default createStore({
  state: {
    zrr: [],
    playerPosition: [],
    imageUrl: null,
    ttl: 0,
    login: null,
    impactsPositions: [],
    token: null,
  },
  mutations,
  actions,
});
