import { getNextDate, searchCustom, searchHomework, upDateQuiz, getAllQuizes } from "./db.js";
import { navigate } from "./navigation.js";
import { allMyProblemSets, EnglishUnit, EnglishWhere, japaneseUnit, japaneseWhere, mathUnit, mathWhere, otherUnit, otherWhere, renderQuizContentState, scienceUnit, scienceWhere, socialStudiesUnit, socialStudiesWhere, state, allQuizes } from "./state.js";


export function initQuiz() {

    document.getElementById("quizContentNext").addEventListener("click", e => {
        document.getElementById("answer").classList.add("active");
        document.getElementById("quizContentNext").classList.remove("active");
        document.getElementById("quizContentInCorrect").classList.add("active");
        document.getElementById("quizContentCorrect").classList.add("active");
    });


    document.getElementById("quizContentInCorrect").addEventListener("click", e => {/*結構あかんことしててすみません*/
        let updateQuiz = structuredClone(state.quizesList[state.currentQuizNumber - 1]);
        inCorrectQuiz(updateQuiz);

        if (state.quizesList.length === state.currentQuizNumber) {
            navigate({ panel: "result" });
        } else {
            state.currentQuizNumber = state.currentQuizNumber + 1;
            state.quiz.isAnswered = false;
            renderQuiz();
        }

    });

    document.getElementById("quizContentCorrect").addEventListener("click", e => {/*結構あかんことしててすみません*/
        let updateQuiz = structuredClone(state.quizesList[state.currentQuizNumber - 1]);
        correctQuiz(updateQuiz);

        if (state.quizesList.length === state.currentQuizNumber) {
            navigate({ panel: "result" });
        } else {
            state.currentQuizNumber = state.currentQuizNumber + 1;
            state.quiz.isAnswered = false;
            renderQuiz();
        }

    });

    document.getElementById("quizResultFinish").addEventListener("click", e => {/*結構あかんことしててすみません*/
        navigate({ page: "home", panel: "homeQuiz" });
    });

    document.getElementById("quizContentBottombarToggle").addEventListener("click", e => {
        document.getElementById("quizContentBottombarToggle").classList.remove("active");
    });

}







export function getCustomQuizesList() {/*state.Customからquizの配列を作る */
    return searchCustom(state.searchCustomState.book,
        state.searchCustomState.unit,
        state.searchCustomState.myProblemSets,
        state.searchCustomState.subject,
        state.searchCustomState.number)

}

export function getHomeworkQuizesList() {/*state.Customからquizの配列を作る */
    return searchHomework(state.searchHomeworkState.isDelinquent,
        state.searchHomeworkState.isToday)

}

export function startQuiz() {
    state.currentQuizNumber = 0;
    state.isAnswered = false;
    if (state.customOrHomework === "custom") {
        if (getCustomQuizesList()) {
            state.quizesList = shuffle(getCustomQuizesList());
            showQuiz();
            navigate({ page: "quiz", panel: "quizContent" });

        } else {
            alert("該当するクイズがありません")
        }
    } else {
        if (getHomeworkQuizesList()) {
            state.quizesList = shuffle(getHomeworkQuizesList());
            showQuiz();
            navigate({ page: "quiz", panel: "quizContent" });
        }
        else {
            alert("該当するクイズがありません")
        }

    }

}

function shuffle(array) {
    const result = [...array]; // 元の配列をコピー

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}



export function showQuiz() {
    state.currentQuizNumber = state.currentQuizNumber + 1;
    console.log(state.quizesList);
    console.log(state.currentQuizNumber);
    setQuizState(state.quizesList[state.currentQuizNumber - 1]);
    document.getElementById("quizContentBottombarToggle").classList.add("active");
    state.quizStartTime = Date.now();
}

export function setQuizState(question) {
    console.log(question);

    state.quiz.currentQuestionId = question.id;
    state.quiz.mode = question.mode;
    state.quiz.subject = question.subject;
    state.quiz.unit = question.unit;
    state.quiz.where = question.where;
    state.quiz.importance = question.importance;
    state.quiz.question = question.question;
    state.quiz.answer = question.answer;
    state.quiz.myAnswer = question.myAnswer;
    state.quiz.missKind = question.missKind;
    state.quiz.lesson = question.lesson;
    state.quiz.myProblemSets = question.myProblemSets;
    state.quiz.nextDate = question.nextDate;
    state.quiz.times = question.times;
    state.quiz.correctTimes = question.correctTimes;
    state.quiz.seconds = 0;
    state.quiz.secondsRecord = question.seconds;
    state.quiz.isCompleted = question.isCompleted;
    state.quiz.progress = question.progress;
    state.quiz.formerDate = question.formerDate;
    state.quiz.isChecked = question.isChecked;
    state.quiz.makeDate = question.makeDate;
    state.quiz.quizMode = question.mode;
}

export function showAnswer() {
    state.timeMs = Date.now() - state.quizStartTime;
    state.quiz.isAnswered = true;

}


// ---- Render functions ----
export function renderQuiz() {
    document.getElementById("quizContentWhere").textContent = state.quiz.where;
    if (state.quiz.importance >= 1) { document.getElementById("quizContentImportance1").classList.add("active"); }
    if (state.quiz.importance < 2) { document.getElementById("quizContentImportance2").classList.remove("active"); }
    if (state.quiz.importance >= 2) { document.getElementById("quizContentImportance2").classList.add("active"); }
    if (state.quiz.importance < 3) { document.getElementById("quizContentImportance3").classList.remove("active"); }
    if (state.quiz.importance >= 3) { document.getElementById("quizContentImportance3").classList.add("active"); }
    if (state.quiz.importance < 4) { document.getElementById("quizContentImportance4").classList.remove("active"); }
    if (state.quiz.importance >= 4) { document.getElementById("quizContentImportance4").classList.add("active"); }
    document.getElementById("quizContentQuestion").textContent = state.quiz.question;
    document.getElementById("quizContentAnswer").textContent = state.quiz.answer;
    if (state.quiz.quizMode === "miss") {
        document.getElementById("quizContentMyAnswer").textContent = state.quiz.myAnswer;
    } else {
        document.getElementById("quizContentMyAnswer").textContent = "";
    }
    if (state.missKindVisibility === false) {//trueのときだけ表示しない
        document.getElementById("quizContentMissKind").textContent = state.quiz.missKind;
    } else {
        document.getElementById("quizContentMissKind").textContent = "";
    }
    console.log(state.quiz.times);
    document.getElementById("quizContentCurrentPercent").textContent = Math.round(state.quiz.correctTimes / state.quiz.times * 100) + "%";
    document.getElementById("quizContentSeconds").textContent = state.quiz.secondsRecord + "秒";
    document.getElementById("quizContentLesson1").textContent = state.quiz.lesson;
    document.getElementById("quizContentLesson2").textContent = state.quiz.lesson;
    if (state.quiz.isAnswered) {
        document.getElementById("answer").classList.add("active");
        document.getElementById("quizContentNext").classList.remove("active");
        document.getElementById("quizContentInCorrect").classList.add("active");
        document.getElementById("quizContentCorrect").classList.add("active");

    } else {
        document.getElementById("answer").classList.remove("active");
        document.getElementById("quizContentNext").classList.add("active");
        document.getElementById("quizContentInCorrect").classList.remove("active");
        document.getElementById("quizContentCorrect").classList.remove("active");
    }
}




async function inCorrectQuiz(quiz) {
    quiz.formerDate = Date.now();
    quiz.times = quiz.times + 1;
    quiz.progress = quiz.progress + 1;
    quiz.nextDate = getNextDate(quiz.importance, quiz.progress, quiz.formerDate);
    console.log(quiz);
    await upDateQuiz(quiz);


}

async function correctQuiz(quiz) {
    quiz.seconds = Math.floor(state.timeMs / 1000);
    console.log(quiz.seconds);
    quiz.formerDate = Date.now();
    quiz.times = quiz.times + 1;
    quiz.correctTimes = quiz.correctTimes + 1;
    quiz.progress = quiz.progress + 1;
    quiz.nextDate = getNextDate(quiz.importance, quiz.progress, quiz.formerDate);
    console.log(quiz);

    if (quiz.secondsRecord == null || quiz.seconds < quiz.secondsRecord) {
        quiz.secondsRecord = quiz.seconds;
    }
    await upDateQuiz(quiz);
    allQuizes = await getAllQuizes();


}


