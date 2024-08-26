import { getTrendDataApi } from "@/utils/getDataApi";
const trendStore = {
  namespaced: true,
  state: {
    trendDta: {},
  },
  mutations: {
    SETTRENDDATA(state, data) {
      state.trendDta = data;
    },
  },
  actions: {
    async getTrendData({ commit }) {
      try {
        const res = await getTrendDataApi();
        commit("SETTRENDDATA", res.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
  getters: {
    getType: (state) => {
      return state.trendDta.type;
    },
  },
};
export default trendStore;
