import Router from "koa-router";
import text from "./text";

const api = new Router();

api.use("/text", text.routes());

export default api;
