import { apiLogin } from "../api-client/game";
import { apiGetUser } from "../api-client/game";
import router from '../router';

const actions = {
    login({commit, dispatch}, datas) {
        // datas contains login and password values
        apiLogin(datas.login, datas.password)
            .then((response) => {
                //console.log(response);
                commit('setToken', response.headers.authorization);
                dispatch('getUser', datas.login);
                router.push('user');
            }).catch((error) => {
                console.log(error);
            })
    },
    getUser({commit, state}, login) {
        // get datas about the user and commit it
        apiGetUser(login, state.token.slice(7))
            .then((resp) => {
                console.log(resp.data);
                commit('updateUser', resp.data);
            }).catch((error) => {
                console.log(error);
            });
    }
};

export default actions;