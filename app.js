import { initDB } from "./db.js";
import { initNavigation } from "./navigation.js";
import { initEdit } from "./edit.js";
import { initQuiz } from "./quiz.js";
import { initHome } from "./home.js";

async function init() {
  await initDB();
  initNavigation();
  initEdit();
  initQuiz();
  initHome();
}

init();
