import axios from "axios";

export function apiLogin(login, password) {
  return axios.post("https://192.168.75.118/api/v1/login", null, {
    params: {
      login: login,
      password: password,
    },
  });
}

export function apiLogout(token) {
  return axios.delete("https://192.168.75.118/api/v1/logout", {
    headers: {
      Authorization: token,
    },
  });
}

export function apiGetUser(login, token) {
  return axios.get(`https://192.168.75.118/game/api/user/${login}`, {
    headers: {
      Authorization: token,
    },
  });
}

export function apiUpdateImage(login, image, token) {
  return axios.put(
    `https://192.168.75.118/game/api/resources/${login}/image`,
    {
      url: image,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
}

export function apiUpdatePlayerPositions(login, position, token) {
  return axios.put(
    `https://192.168.75.118/game/api/resources/${login}/position`,
    {
      position: position,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
}

export function apiGetZrr(token) {
  return axios.get(`https://192.168.75.118/game/api/zrr`, {
    headers: {
      Authorization: token,
    },
  });
}

export function apiGetImpacts(token) {
  return axios.get(`https://192.168.75.118/game/api/resources`, {
    headers: {
      Authorization: token,
    },
  });
}

export function apiImpactCapturedByPlayer(token, login, idImpact) {
  return axios.put(
    `https://192.168.75.118/game/api/capture/${idImpact}`,
    {
      login: login,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
}
