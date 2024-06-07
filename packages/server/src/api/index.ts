import Router from "koa-router";
import text from "./text";

const api = new Router();

api.use("/chat", text.routes());

export default api;
