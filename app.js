import { initDB } from "./db.js";
import { initNavigation } from "./navigation.js";
import { initEdit } from "./edit.js";
import { initQuiz } from "./quiz.js";
import { initHome } from "./home.js";

function init() {
  initDB();
  initNavigation();
  initEdit();
  initQuiz();
  initHome();
}

init();
