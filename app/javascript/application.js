// Entry point for the build script in your package.json
import "./controllers"
import * as bootstrap from "bootstrap"
import { MovieApp } from "./movie_app"

const start = () => new MovieApp(document.querySelector("#app"))

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", start)
  : start()