import { apiLogin } from "../api-client/game";
import { apiGetUser } from "../api-client/game";
import { apiUpdatePlayerPositions } from "../api-client/game";
import { apiGetZrr } from "../api-client/game";
import { apiGetImpacts } from "../api-client/game";
import { apiLogout } from "../api-client/game";
import { apiImpactCapturedByPlayer } from "../api-client/game";
import router from "../router";

const actions = {
  login({ dispatch }, datas) {
    // datas contains login and password values
    apiLogin(datas.login, datas.password)
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("token", resp.headers.authorization);
        dispatch("getUser", datas.login);
        dispatch("getAllZrrAndImpacts");
        dispatch("startGame");
      })
      .catch((error) => {
        console.log(error);
      });
  },
  logout({ commit }) {
    apiLogout(localStorage["token"].slice(7))
      .then((resp) => {
        console.log(resp);
        localStorage.clear();
        commit("clear");
        router.push("login");
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getUser({ commit }, login) {
    // get datas about the user and commit it
    apiGetUser(login, localStorage["token"].slice(7))
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("login", resp.data.login);
        localStorage.setItem(
          "image",
          resp.data.image === null ? "" : resp.data.image
        );
        commit("updateUser", resp.data);
        router.push("user");
      })
      .catch((error) => {
        console.log(error);
      });
  },
  updatePlayerPositions({ commit }, position) {
    apiUpdatePlayerPositions(
      localStorage.getItem("login"),
      position,
      localStorage["token"].slice(7)
    )
      .then((resp) => {
        console.log(resp);
        commit("updatePlayerPosition", position);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  decreaseTtlAction({ commit }) {
    commit("decreaseTtl");
  },
  getAllZrrAndImpacts({ commit }) {
    // ZRR
    apiGetZrr(localStorage["token"].slice(7))
      .then((resp) => {
        var res = new Array();
        for (let zrr of resp.data) {
          res.push([zrr.corner1, zrr.corner2]);
        }
        console.log(res);
        commit("setZrr", res);
      })
      .catch((error) => {
        console.log(error);
      });

    // Impacts
    apiGetImpacts(localStorage["token"].slice(7))
      .then((resp) => {
        let res = new Array();
        for (const id of Object.keys(resp.data)) {
          if (
            resp.data[id].role === "impact" &&
            resp.data[id].capturedBy === null
          ) {
            console.log(resp.data[id]);
            res.push(resp.data[id]);
          }
        }
        commit("setImpacts", res);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  startGame({ commit }) {
    commit("setStartGame", true);
  },
  stopGame({ commit }) {
    commit("setStartGame", false);
  },
  resetTtl({ commit }) {
    commit("setTtl", null);
  },
  playerMeetImpact({ commit, state }, datas) {
    // On lance une requête pour vérifier si l'impact était encore disponible
    // Si oui: on supprime l'impact et augmente le TTL
    // Pour l'instant: on va juste augmenter le TTL et supprimer l'impact
    var impact = datas.impact;
    var index = datas.index;
    var meteorites = datas.meteorites;
    var mymap = datas.mymap;

    apiImpactCapturedByPlayer(
      localStorage["token"].slice(7),
      localStorage["login"],
      impact.id
    )
      .then(() => {
        commit("setTtl", state.ttl + impact.ttl);
        commit("deleteImpact", index);
        meteorites[index].remove(mymap);
        meteorites.splice(index, 1);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  authenticate({ commit, dispatch }, datas) {
    var token = datas.token;
    var login = datas.login;

    // get datas about the user and commit it
    apiGetUser(login, token.slice(7))
      .then((resp) => {
        commit("updateUser", resp.data);
        dispatch("getAllZrrAndImpacts");
        dispatch("startGame");
        router.push("user");
        console.log(resp);
      })
      .catch((error) => {
        localStorage.clear();
        router.push("login");
        console.log(error);
      });
  },
  redirectUser() {
    router.push("login");
  },
};

export default actions;
