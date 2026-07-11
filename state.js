import { showVisibility } from "./navigation.js";
import { getAllQuizes, getAllUnit, addUnit, addWhere, save, searchCustom, addMyProblemSets, getAllMyProblemSets, getAllWhere } from "./db.js";

export let allQuizes = [];
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

  today: null
};




export function renderQuizContentState() {

}

export async function saveState(state) {
  await save(state);
  allQuizes = await getAllQuizes();
  alert(allQuizes.length);
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

