import "./_env";
import api from "./api";
import Koa from "koa";
import Router from "koa-router";

import bodyParser from "@koa/bodyparser";

const app = new Koa();
const router = new Router();

app.use(bodyParser());
router.use("/api", api.routes());
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log("server is listening to port 4000");
});
