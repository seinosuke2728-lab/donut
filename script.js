
const quizes = [];
const today = new Date();
let db;
const dialog = document.getElementById("continueDialog");
const missKindDetail = document.getElementById("quizContentMissKindDetail");
const missKindDetailToggle = document.getElementById("quizContentBottombarToggle");

dialog.addEventListener("click", (e) => {
    const rect = dialog.getBoundingClientRect();

    const inside =
        rect.left <= e.clientX &&
        e.clientX <= rect.right &&
        rect.top <= e.clientY &&
        e.clientY <= rect.bottom;

    if (!inside) {
        dialog.close();
    }
});

missKindDetailToggle.addEventListener("click", () => {
    missKindDetail.classList.add("is-revealed");
});

class Question{
  question;
  answer;
  myAnswer;
  id;
  where;
  myProblemSets;
  isChecked;
  makeDate;
  formerDate;
  nextDate;
  mode;
  times;
  currentTimes;
  subject;
  unit;
  missKind;
  lesson;
  importance;
  progress;
  isCompleted;
  seconds;
}
quizes.push({
  question:"1+1:?",
  answer:"2",
  myAnswer:"3",
  id:1,
  where:"フォーカスゴールド",
  myProblemSets:"中間テスト",
  isChecked:false,
  makeDate:today,
  formerDate:today,
  nextDate:today+1,
  mode:"question",
  times:0,
  currentTimes:0,
  subject:"数学",
  unit:"数式",
  missKind:"計算ミス",
  lesson:"丁寧に！",
  importance:"3",
  progress:0,
  isCompleted:false,
  seconds:0,

});
