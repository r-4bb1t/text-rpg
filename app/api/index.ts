import map from "./map";
import text from "./text";
import Router from "koa-router";

const api = new Router();

api.use("/text", text.routes());
api.use("/map", map.routes());

export default api;
