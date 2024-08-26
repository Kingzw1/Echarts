import { createStore } from "vuex";
import seller from "./seller";
import trendStore from "./trendStore";

const store = createStore({
  // 实现vuex仓库模块化开发存储数据
  modules: {
    seller,
    trendStore,
  },
});
export default store;
