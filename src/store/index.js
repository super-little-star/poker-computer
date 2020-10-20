import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import gameData from "./modules/GameData";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { gameData }
});
