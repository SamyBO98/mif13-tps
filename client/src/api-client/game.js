import axios from 'axios';

export function apiLogin(login, password) {
    return axios.post(
        "/spring/login",
        null,
        {
            params: {
                login: login,
                password: password,
            }
        }
    );
}

export function apiGetUser(login, token) {
    return axios.get(
        `/express/user/${login}`,
        {
            headers: {
                Authorization: token,
            },
        },
    );
}