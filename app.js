import { initDB } from "./db.js";
import { initNavigation } from "./navigation.js";
import { initEdit } from "./edit.js";
import { initQuiz } from "./quiz.js";

function init() {
  initDB();
  initNavigation();
  initEdit();
  initQuiz();
}

init();
