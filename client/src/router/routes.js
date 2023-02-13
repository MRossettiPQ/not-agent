import AuthenticationUtils from "src/commons/utils/AuthenticationUtils";

export const routes = [
  {
    path: "/",
    component: () => import("pages/MainApp.vue"),
    children: [
      {
        path: "/",
        component: () => import("pages/public/PublicApp.vue"),
        redirect: "/home",
        children: [
          {
            name: "access.home",
            path: "home",
            component: () => import("pages/public/Home/Home.vue"),
          },
          {
            name: "access.login",
            path: "login",
            component: () => import("pages/public/Login/Login.vue"),
          },
          {
            name: "access.register",
            path: "register",
            component: () => import("pages/public/Register/Register.vue"),
          },
        ],
      },
      {
        path: "/",
        component: () => import("pages/private/PrivateApp.vue"),
        redirect: "/profile",
        children: [
          {
            name: "private.profile",
            path: "profile",
            component: () => import("pages/private/Account/Account.vue"),
          },
          {
            name: "private.notifications",
            path: "notifications",
            component: () => import("pages/private/Notifications/Notifications.vue"),
          },
        ],
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/public/Error/Error404.vue"),
  },
];

export const RouteBeforeGuard = async (to, from, next) => {
  // TODO Access granted without authentication
  let accessReleased = [
    "access.login",
    "access.register",
    "access.home",
    "private.notifications"
  ];
  // TODO Hide when logged
  let hideWhenLogged = ["access.login", "access.register"];
  let token = AuthenticationUtils.getToken();
  let isLoggedIn = !!token;

  if (to.name === from.name) {
    return;
  }

  if (isLoggedIn) {
    if (hideWhenLogged.includes(to.name)) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  } else {
    if (accessReleased.includes(to.name)) {
      next();
    } else {
      next({
        path: "/login",
      });
    }
  }
};
