// Exponer el punto de entrada en el ámbito global
import doGet from "./model/doGet";
global.doGet = doGet;

import { Auth } from "./controller/Auth";
global.Auth = Auth;

import { Home } from "./controller/Admin/Home";
global.Home = Home;

import { Apartment } from "./controller/Admin/Apartment";
global.Apartment = Apartment;

import { fileBase64 } from "./utils/Drive";
global.fileBase64 = fileBase64;
