import server from "./api";
// 获取商家销量统计的横向柱状图数据
export const getSellerDataApi = () => {
  return server({
    url: "/seller",
    method: "get",
  });
};
// 获取折线图数据
export const getTrendDataApi = () => {
  return server({
    url: "/trend",
    method: "get",
  });
};
