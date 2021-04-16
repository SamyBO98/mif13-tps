const mutations = {
    setToken(state, token) {
        state.token = token;
    },
    updateUser(state, data) {
        state.ttl = data.ttl;
        state.playerPosition = data.position;
        state.login = data.login;
        state.image = data.image;
    }
};

export default mutations;