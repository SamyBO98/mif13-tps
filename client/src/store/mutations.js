const mutations = {
  updateUser(state, data) {
    state.ttl = data.ttl;
    state.playerPosition = data.position;
  },
  updatePlayerPosition(state, position) {
    state.playerPosition = position;
  },
  decreaseTtl(state) {
    state.ttl--;
  },
  setZrr(state, res) {
    state.zrr = res;
  },
  setImpacts(state, impacts) {
    state.impacts = impacts;
  },
  clear(state) {
    state.ttl = null;
    state.playerPosition = null;
    state.impacts = [];
    state.zrr = [];
    state.gameStarted = false;
  },
  setStartGame(state, value) {
    state.gameStarted = value;
  },
  setTtl(state, value) {
    state.ttl = value;
  },
  deleteImpact(state, index) {
    state.impacts.splice(index, 1);
  },
};

export default mutations;
