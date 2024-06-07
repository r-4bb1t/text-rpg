import * as Controller from "./map.controller";
import Router from "koa-router";

const mapRouter = new Router();

mapRouter.post("/move", Controller.getMap);

export default mapRouter;
