import Router from "koa-router";
import * as Controller from "./text.controller";

const chatRotuer = new Router();

chatRotuer.post("/:roomId", Controller.addChat);

export default chatRotuer;
