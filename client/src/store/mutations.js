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
    },
};

export default mutations;