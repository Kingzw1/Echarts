import { getSellerDataApi } from "@/utils/getDataApi";
const seller = {
  namespaced: true,
  state: {
    sellerData: [],
  },
  mutations: {
    setSellerData(state, data) {
      state.sellerData = data;
    },
  },
  actions: {
    async getSellerData({ commit }) {
      await getSellerDataApi().then((res) => {
        // console.log(res.data.data);
        commit("setSellerData", res.data);
      });
    },
  },
  getters: {},
};
export default seller;
