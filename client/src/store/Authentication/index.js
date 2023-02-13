import Authentication from "src/commons/services/AuthenticationService";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export default {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, user) {
      if (user?.accessToken) {
        localStorage.setItem("user", JSON.stringify(user));
        commit("loginSuccess", user);
      } else {
        commit("loginFailure");
      }
      return user;
    },
    async context({ commit }) {
      let context = null;
      try {
        if (initialState.user != null) {
          context = await Authentication.context();
          commit("loginSuccess", context);
        }
      } catch (e) {
        console.log(e);
        commit("logout");
      }
      return context;
    },
    logout({ commit }) {
      localStorage.removeItem("user");
      commit("logout");
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    async logout(state) {
      state.status.loggedIn = false;
      state.user = null;
      await this.$router.push("/");
    },
  },
};
