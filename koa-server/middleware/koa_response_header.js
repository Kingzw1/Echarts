// 响应头中间件
module.exports = async (ctx, next) => {
  const contentType = "application/json; charset=utf-8";
  ctx.set("Content-Type", contentType);
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
  await next();
};
