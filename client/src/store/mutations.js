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
    }
};

export default mutations;