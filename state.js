import { showVisibility } from "./navigation.js";
import { getAllQuizes, getAllUnit, addUnit, addWhere, save, searchCustom, addMyProblemSets, getAllMyProblemSets, getAllWhere, upDateQuiz, Question, getNextDate } from "./db.js";

export let allQuizes = [];
Object.defineProperty(window, "count", {
  get() {
    return allQuizes;
  },
  set(value) {
    console.log(`count: ${_count} → ${value}`);
    allQuizes = value;
  }
});
export let allUnit = [];
export let japaneseUnit = [];
export let mathUnit = [];
export let socialStudiesUnit = [];
export let scienceUnit = [];
export let EnglishUnit = [];
export let otherUnit = [];

export let allWhere = [];
export let japaneseWhere = [];
export let mathWhere = [];
export let socialStudiesWhere = [];
export let scienceWhere = [];
export let EnglishWhere = [];
export let otherWhere = [];

export let allMyProblemSets = [];

export let myProblemSetsDialogMode = null;

export const state = {
  navigation: {
    currentPage: "home",
    currentPanel: "homeEdit"
  },

  edit: {
    editingQuestionId: null,
    mode: "while",
    subject: "",
    unit: "",
    book: "",
    page: "",
    number: "",
    numberA: "",
    numberB: "",
    where: "",
    importance: "",
    question: "",
    answer: "",
    myAnswer: "",
    missKind: "",
    lesson: "",
    myProblemSets: []

  },

  quizesList: [],
  currentQuizNumber: null,
  quizStartTime: null,
  quizSecond: null,

  quiz: {
    currentQuestionId: null,
    mode: "homework",
    subject: "",
    unit: "",
    where: "",
    importance: "",
    question: "",
    answer: "",
    myAnswer: "",
    missKind: "",
    lesson: "",
    myProblemSets: "",
    nextDate: "",
    times: null,
    correctTimes: null,
    seconds: null,
    secondsRecord: null,
    isCompleted: null,
    progress: null,
    formerDate: null,
    isChecked: null,
    makeDate: null,
    isAnswered: false,
    quizMode: null
  },

  searchHomeworkState: {
    isDelinquent: null,
    isToday: null,
  },

  searchCustomState: {
    unit: null,
    subject: null,
    book: null,
    myProblemSets: null,
    number: 0

  },
  missKindVisibility: null,
  isCheckedOnly: false,

  homeMode: "edit",

  customOrHomework: "homework",

  timeMs: null,

  today: null,

  isUpdate: false,

  loadNumber: 0,

  updateQuizes: [],
  currentUpdateQuiz:null
};

window.state=state;

window.allQuizes=allQuizes;


export function renderQuizContentState() {

}

export async function saveState(state) {
  await save(state);
  allQuizes = await getAllQuizes();
  alert(allQuizes.length);
}

export async function roadQuizes() {
  allQuizes = await getAllQuizes();
  console.log(allQuizes);
}

export async function saveUnit(subject, unit) {
  await addUnit(subject, unit);
  allUnit = await getAllUnit();
  console.log(allUnit);
  classifyUnit();
}

export async function saveWhere(subject, where) {
  await addWhere(subject, where);
  allWhere = await getAllWhere();
  classifyWhere();
}

export async function saveMyProblemSets(myProblemSets) {
  await addMyProblemSets(myProblemSets);
  allMyProblemSets = await getAllMyProblemSets();
  console.log(allMyProblemSets);
}

export async function setAll() {
  allQuizes = await getAllQuizes();
  allUnit = await getAllUnit();
  allWhere = await getAllWhere();
  allMyProblemSets = await getAllMyProblemSets();
}

export function classifyUnit() {
  japaneseUnit = allUnit.filter(u => u.subject === "japanese");
  mathUnit = allUnit.filter(u => u.subject === "math");
  scienceUnit = allUnit.filter(u => u.subject === "science");
  EnglishUnit = allUnit.filter(u => u.subject === "English");
  socialStudiesUnit = allUnit.filter(u => u.subject === "socialStudies");
  otherUnit = allUnit.filter(u => u.subject === "other");
}

export function classifyWhere() {
  japaneseWhere = allWhere.filter(u => u.subject === "japanese");
  mathWhere = allWhere.filter(u => u.subject === "math");
  scienceWhere = allWhere.filter(u => u.subject === "science");
  EnglishWhere = allWhere.filter(u => u.subject === "English");
  socialStudiesWhere = allWhere.filter(u => u.subject === "socialStudies");
  otherWhere = allWhere.filter(u => u.subject === "other");
}

export function classifyAll() {
  classifyUnit();
  classifyWhere();
}


export function addEditInit() {
  state.edit.mode = "while",
    state.edit.subject = "",
    state.edit.unit = "",
    state.edit.book = "",
    state.edit.page = "",
    state.edit.numberA = "",
    state.edit.numberB = "",
    state.edit.where = "",
    state.edit.importance = "",
    state.edit.question = "",
    state.edit.answer = "",
    state.edit.myAnswer = "",
    state.edit.missKind = "",
    state.edit.lesson = "",
    state.edit.myProblemSets = []

}

export function continueEditInit() {//つづけるを選んだ時に、stateをいじる
  state.edit.answer = "";
  state.edit.book = state.edit.book;
  state.edit.importance = state.edit.importance;
  state.edit.lesson = "";
  state.edit.missKind = "";
  state.edit.mode = state.edit.mode;
  state.edit.myAnswer = "";
  state.edit.myProblemSets = state.edit.myProblemSets;
  state.edit.numberA = "";
  state.edit.numberB = "";
  state.edit.page = state.edit.page;
  state.edit.question = "";
  state.edit.subject = state.edit.subject;
  state.edit.unit = state.edit.unit;
  state.edit.where = state.edit.where;
}

export function updateEditInit(quiz) {//上書きの時に、stateを代入する7
  setStateFromQuiz(quiz);

}



export function setQuizFromState(editState,question = new Question()) {
  if (editState.editingQuestionId === null) {
    question.question = editState.question;
    question.answer = editState.answer;
    question.correctTimes = 0;
    question.formerDate = Date.now();
    question.importance = editState.importance;
    question.isChecked = false;
    question.isCompleted = false;
    question.lesson = editState.lesson;
    question.makeDate = Date.now();
    question.missKind = editState.missKind;
    question.mode = editState.mode;
    question.myAnswer = editState.myAnswer;
    question.myProblemSets = editState.myProblemSets;
    question.progress = 0;
    question.nextDate = getNextDate(question.importance, question.progress, question.formerDate);
    question.seconds = null;
    question.subject = editState.subject;
    question.times = 0;
    question.unit = editState.unit;
    question.where = editState.book + String(editState.page) + "P" + " " + String(editState.numberA) + "-" + String(editState.numberB);
    question.page = editState.page;
    question.book = editState.book;
    question.number = editState.number;
    question.numberA = editState.numberA;
    question.numberB = editState.numberB;
  }
  return question;
}

export function setStateFromQuiz(quiz) {

  state.edit.answer = quiz.answer;
  state.edit.book = quiz.book;
  state.edit.importance = quiz.importance;
  state.edit.lesson = quiz.lesson;
  state.edit.missKind = quiz.missKind;
  state.edit.mode = quiz.mode;
  state.edit.myAnswer = quiz.myAnswer;
  state.edit.myProblemSets = quiz.myProblemSets;
  state.edit.numberA = quiz.numberA;
  state.edit.numberB = quiz.numberB;
  state.edit.page = quiz.page;
  state.edit.question = quiz.question;
  state.edit.subject = quiz.subject;
  state.edit.unit = quiz.unit;
  state.edit.where = quiz.where;

}