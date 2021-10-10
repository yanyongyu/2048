/* global Vue */
import Game from "@/components/Game";
import Home from "@/components/Home";
import Router from "vue-router";

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
  ],
});
