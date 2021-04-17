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
        },
    );
}

export function apiLogout(token) {
    return axios.delete(
        "/spring/logout",
        {
            headers: {
                Authorization: token,
            },
        },
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

export function apiUpdateImage(login, image, token) {
    return axios.put(
        `/express/resources/${login}/image`,
        {
            url: image,
        },
        {
            headers: {
                Authorization: token,
            },
        },
    );
}

export function apiUpdatePlayerPositions(login, position, token) {
    return axios.put(
        `/express/resources/${login}/position`,
        {
            position: position,
        },
        {
            headers: {
                Authorization: token,
            },
        },
    );
}

export function apiGetZrr(token) {
    return axios.get(
        `/express/zrr`,
        {
            headers: {
                Authorization: token,
            },
        },
    );
}

export function apiGetImpacts(token) {
    return axios.get(
        `/express/resources`,
        {
            headers: {
                Authorization: token,
            },
        },
    );
}