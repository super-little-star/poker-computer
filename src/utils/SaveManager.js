import Cookies from "js-cookie";

export var dataKey = {
  gameList: {
    key: "admin_gameList",
    type: "local",
    default: []
  },
  curGame: {
    key: "admin_curGame",
    type: "session",
    default: null
  }
};

export function GetData(dk) {
  let value = null;
  if (dk.type == "session") {
    value = sessionStorage.getItem(dk.key);
  } else if (dk.type == "local") {
    value = localStorage.getItem(dk.key);
  }
  if (!value) value = dk.default;
  else value = JSON.parse(value);
  return value;
}

export function SetData(dk, value) {
  let v = JSON.stringify(value);
  if (dk.type == "session") {
    sessionStorage.setItem(dk.key, v);
  } else if (dk.type == "local") {
    localStorage.setItem(dk.key, v);
  }
}
