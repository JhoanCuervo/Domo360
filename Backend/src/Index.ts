// Exponer el punto de entrada en el ámbito global
import doGet from "./model/doGet";
global.doGet = doGet;

import { Auth } from "./controller/Auth";
global.Auth = Auth;

import { Home } from "./controller/Home";
global.Home = Home;
