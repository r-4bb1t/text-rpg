import * as Controller from "./text.controller";
import Router from "koa-router";

const textRotuer = new Router();

textRotuer.post("/log", Controller.getText);
textRotuer.post("/action", Controller.getActionType);

export default textRotuer;
