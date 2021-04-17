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
    addZrr(state, zrr) {
        state.zrr.push(zrr);
    },
    addImpact(state, impact) {
        state.impacts.push(impact);
    }
};

export default mutations;