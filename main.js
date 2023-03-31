import { get, post } from "./modules/wines.js";

document.querySelector("#post").addEventListener("click", post);

get();
