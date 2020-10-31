import { dataKey, GetData, SetData } from "@u/SaveManager";

const state = {
  gameList: null,
  curGame: null,
  lengthen: null
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
  },
  Lengthen: state => {
    if (state.lengthen == null) {
      state.lengthen = GetData(dataKey.lengthen);
    }
    return state.lengthen;
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
  },
  SetLengthen(state, value) {
    state.lengthen = value;
    SetData(dataKey.lengthen, state.lengthen);
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
