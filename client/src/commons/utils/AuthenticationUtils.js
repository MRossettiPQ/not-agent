import dayjs from "dayjs";

class AuthenticationUtils {
  store(key, value, timeout) {
    if (key && value) {
      value = JSON.stringify(value);
      window.localStorage[key] = value;
      if (timeout) {
        window.localStorage[key + "Timeout"] = JSON.stringify({
          timeout: timeout,
          date: dayjs().toISOString(),
        });
      }
    }
  }

  get(key) {
    let timeout = window.localStorage[key + "Timeout"];
    if (timeout && timeout !== "undefined") {
      timeout = JSON.parse(timeout);
      if (dayjs().diff(timeout.date, "minutes") > timeout.timeout) {
        return;
      }
    }

    let result = window.localStorage[key];
    if (result && result !== "undefined") {
      return JSON.parse(result);
    }
  }

  remove(key) {
    window.localStorage[key] = undefined;
    window.localStorage[key + "Timeout"] = undefined;
    window.localStorage.removeItem[key];
    window.localStorage.removeItem[key + "Timeout"];
  }

  eraseLocalStorage() {
    window.localStorage.clear();
  }

  //
  getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  getToken = () => {
    const user = this.getUser();

    if (user) {
      return user.accessToken;
    } else {
      return null;
    }
  };

  saveUser(user) {
    this.store("user", user);
  }

  saveToken(token) {
    this.store("token", token);
  }

  removeToken() {
    this.remove("token");
  }
}

export default new AuthenticationUtils();
