import "reflect-metadata";
import Vue from "vue";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";
import moment from "moment";
import { RouteBeforeGuard, routes } from "./routes";
import dayjs from "dayjs";
import LottieVuePlayer from "@lottiefiles/vue-lottie-player";


Vue.use(LottieVuePlayer)
Vue.use(VueRouter);
Vue.use(VueI18n);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
moment.locale("pt-br");
dayjs.locale("pt-br");

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({x: 0, y: 0}),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  Router.beforeEach(RouteBeforeGuard);
  return Router
}
