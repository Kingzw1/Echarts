import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/sellerpage",
    name: "sellerpage",
    component: () => import("../views/SellerPage.vue"),
  },
  {
    path: "/trendpage",
    name: "trendpage",
    component: () => import("@/views/TrendPage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
