import { dataKey, GetData, SetData } from "@u/SaveManager";

const state = {
  gameList: null,
  curGame: null
};
const getters = {
  GameList: state => {
    if (state.gameList == null) {
      state.gameList = GetData(dataKey.gameList);
    }
    return state.gameList;
  },
  CurGame: state => {
    if (state.curGame == null) {
      state.curGame = GetData(dataKey.curGame);
    }
    return state.curGame;
  }
};
const mutations = {
  SetGameList(state, value) {
    state.gameList = value;
    SetData(dataKey.gameList, state.gameList);
  },
  SetCurGame(state, value) {
    state.curGame = value;
    SetData(dataKey.curGame, state.curGame);
  },
  AddGameList(state, value) {
    state.gameList.splice(0, 0, value);
    SetData(dataKey.gameList, state.gameList);
  },
  UpdateData(state) {
    let t = state.gameList.find(i => i.date == state.curGame.date);
    t = state.curGame;
    SetData(dataKey.gameList, state.gameList);
    SetData(dataKey.curGame, state.curGame);
  }
};
const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
