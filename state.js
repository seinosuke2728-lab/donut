import { showVisibility } from "./navigation.js";
import { getAllQuizes,getAllUnit,addUnit,addWhere, save, searchCustom, addMyProblemSets, getAllMyProblemSets, getAllWhere } from "./db.js";

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

export let myProblemSetsDialogMode=null;

export const state={
    navigation: {
    currentPage: "home",
    currentPanel: "homeEdit"
  },
  
  edit: {
    editingQuestionId: null,
    mode:"while",
    subject:"",
    unit:"",
    book:"",
    page:"",
    number:"",
    where:"",
    importance:"",
    question:"",
    answer:"",
    myAnswer:"",
    missKind:"",
    lesson:"",
    myProblemSets:[]

  },

  quizesList:[],
  currentQuizNumber:null,
  quizStartTime:null,
  quizSecond:null,

  quiz: {
    currentQuestionId: null,
    mode:"homework",
    subject:"",
    unit:"",
    where:"",
    importance:"",
    question:"",
    answer:"",
    myAnswer:"",
    missKind:"",
    lesson:"",
    myProblemSets:"",
    nextDate:"",
    times:null,
    correntTimes:null,
    seconds:null,
    secondsRecord:null,
    isCompleted:null,
    progress:null,
    formerDate:null,
    isChecked:null,
    makeDate:null
  },

  searchHomeworkState:{
    isDelinquent:null,
    isToday:null,
    missKindVisibility:null,
    isCheckedOnly:false,
    number:0
  },

  searchCustomState:{
    unit:null,
    subject:null,
    book:null,
    missKindVisibility:null,
    myProblemSets:null,
    isCheckedOnly:false,
    number:0

  }
};

export function setQuizState(question){
    state.quiz.currentQuestionId=question.id;
    state.quiz.mode=question.mode;
    state.quiz.subject=question.subject;
    state.quiz.unit=question.unit;
    state.quiz.where=question.where;
    state.quiz.importance=question.importance;
    state.quiz.question=question.question;
    state.quiz.answer=question.answer;
    state.quiz.myAnswer=question.myAnswer;
    state.quiz.missKind=question.missKind;
    state.quiz.lesson=question.lesson;
    state.quiz.myProblemSets=question.myProblemSets;
    state.quiz.nextDate=question.nextDate;
    state.quiz.times=question.times;
    state.quiz.correntTimes=question.correntTimes;
    state.quiz.seconds=0;
    state.quiz.secondsRecord=question.seconds;
    state.quiz.isCompleted=question.isCompleted;
    state.quiz.progress=question.progress;
    state.quiz.formerDate=question.formerDate;
    state.quiz.isChecked=question.isChecked;
    state.quiz.makeDate=question.makeDate;
}


export function renderQuizContentState(){
    document.getElementById("quizContentWhere").textContent = state.quiz.where;
    if(state.quiz.importance>=1){ showVisibility("star1"); }
    if(state.quiz.importance>=2){ showVisibility("star2"); }
    if(state.quiz.importance>=3){ showVisibility("star3"); }
    if(state.quiz.importance>=4){ showVisibility("star4"); }
    document.getElementById("quizContentQuestion").textContent = state.quiz.question;
    document.getElementById("quizContentAnswer").textContent = state.quiz.answer;
    document.getElementById("quizContentMyAnswer").textContent = state.quiz.myAnswer;
    document.getElementById("quizContentMissKind").textContent = state.quiz.missKind;
    document.getElementById("quizContentLesson1").textContent = state.quiz.lesson;
    document.getElementById("quizContentLesson2").textContent = state.quiz.lesson;

}

export async function saveState(state){
  await save(state);
  allQuizes=await getAllQuizes();
  alert(allQuizes.length);
}

export async function saveUnit(subject,unit){
  await addUnit(subject,unit);
  allUnit=await getAllUnit();
  console.log(allUnit);
  classifyUnit();
}

export async function saveWhere(subject,where){
  await addWhere(subject,where);
  allWhere=await getAllWhere();
  classifyWhere();
}

export async function saveMyProblemSets(myProblemSets){
  await addMyProblemSets(myProblemSets);
  allMyProblemSets=await getAllMyProblemSets();
  console.log(allMyProblemSets);
}

export async function setAll() {
    allQuizes=await getAllQuizes();
    allUnit=await getAllUnit();
    allWhere=await getAllWhere();
    allMyProblemSets=await getAllMyProblemSets();
}

export function classifyUnit(){
  japaneseUnit=allUnit.filter(u => u.subject === "japanese");
  mathUnit=allUnit.filter(u => u.subject === "math");
  scienceUnit=allUnit.filter(u => u.subject === "science");
  EnglishUnit=allUnit.filter(u => u.subject === "English");
  socialStudiesUnit=allUnit.filter(u => u.subject === "socialStudies");
  otherUnit=allUnit.filter(u => u.subject === "other");
}

export function classifyWhere(){
  japaneseWhere=allWhere.filter(u => u.subject === "japanese");
  mathWhere=allWhere.filter(u => u.subject === "math");
  scienceWhere=allWhere.filter(u => u.subject === "science");
  EnglishWhere=allWhere.filter(u => u.subject === "English");
  socialStudiesWhere=allWhere.filter(u => u.subject === "socialStudies");
  otherWhere=allWhere.filter(u => u.subject === "other");
}

export function classifyAll(){
  classifyUnit();
  classifyWhere();
}

