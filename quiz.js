import { getNextDate, searchCustom, upDateQuiz } from "./db.js";
import { navigate } from "./navigation.js";
import { allMyProblemSets, EnglishUnit, EnglishWhere, japaneseUnit, japaneseWhere, mathUnit, mathWhere, otherUnit, otherWhere, renderQuizContentState, scienceUnit, scienceWhere, setQuizState, socialStudiesUnit, socialStudiesWhere, state } from "./state.js";


export function initQuiz() {

    document.getElementById("quizContentNext").addEventListener("click", e => {
        document.getElementById("answer").classList.add("active");
        document.getElementById("quizContentNext").classList.remove("active");
        document.getElementById("quizContentInCorrent").classList.add("active");
        document.getElementById("quizContentCorrent").classList.add("active");
    });


    document.getElementById("quizContentInCorrent").addEventListener("click", e => {/*結構あかんことしててすみません*/
        let updateQuiz = structuredClone(state.quizesList[state.currentQuizNumber]);
        inCorrectQuiz(updateQuiz);
        state.currentQuizNumber = state.currentQuizNumber + 1;

        if (state.quizesList.length === state.currentQuizNumber) {
            navigate({ panel: "result" });
        } else {
            document.getElementById("answer").classList.remove("active");
            document.getElementById("quizContentNext").classList.add("active");
            document.getElementById("quizContentInCorrent").classList.remove("active");
            document.getElementById("quizContentCorrent").classList.remove("active");
            startQuiz();
        }

    });

    document.getElementById("quizResultFinish").addEventListener("click", e => {/*結構あかんことしててすみません*/
        navigate({ page: "home", panel: "homeQuiz" })
    });

}

export function setQuiz() {
    const mode = document.querySelector("#homeworkCustomChips .chipButton.is-selected").dataset.value;
    if (mode === "custom") {
        state.quiz.mode = "custom";
        setQuizCustom();
        console.log(getCustomQuizesList());
        state.quizesList = shuffle(getCustomQuizesList());
        console.log(state.quizesList);
    } else {
        state.quiz.mode = "homework";
        setQuizHomework();
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

function setQuizCustom() {
    state.searchCustomState.book = document.getElementById("customQuizesWhereSelect").value;
    state.searchCustomState.myProblemSets = document.getElementById("customQuizesMyProblemSetsSelect").value;
    state.searchCustomState.number = document.getElementById("customQuizesNumberSelect").value;
    state.searchCustomState.subject = document.getElementById("customQuizesSubjectSelect").value;
    state.searchCustomState.unit = document.getElementById("customQuizesUnitSelect").value;
    state.searchCustomState.isCheckedOnly = document.getElementById("onlyCheckCheckbox").checked;
    state.searchCustomState.missKindVisibility = document.getElementById("missKindCheckbox").checked;
}
function setQuizHomework() {
    state.searchHomeworkState.number = document.getElementById("customQuizesNumberSelect").value;
    state.searchHomeworkState.isCheckedOnly = document.getElementById("onlyCheckCheckbox").checked;
    state.searchHomeworkState.missKindVisibility = document.getElementById("missKindCheckbox").checked;
    state.searchHomeworkState.isToday = document.getElementById("todayCheckbox").checked;
    state.searchHomeworkState.isDelinquent = document.getElementById("deliquentCheckbox").checked;
}

export function setQuizUnit() {
    const subject = document.getElementById("customQuizesSubjectSelect").value;
    let units = null;
    console.log(subject);
    switch (subject) {
        case "japanese":
            units = japaneseUnit.map(u => u.unit);
            console.log(units);
            break;

        case "socialStudies":
            units = socialStudiesUnit.map(u => u.unit);
            break;

        case "math":
            units = mathUnit.map(u => u.unit);
            break;

        case "science":
            units = scienceUnit.map(u => u.unit);
            break;

        case "English":
            units = EnglishUnit.map(u => u.unit);
            break;


        case "other":
            units = otherUnit.map(u => u.unit);
            break;
    }
    document.getElementById("customQuizesUnitSelect").innerHTML = units
        .map(word => `<option value="${word}">` + word)
        .join("");
}

export function setQuizWhere() {
    const subject = document.getElementById("customQuizesSubjectSelect").value;
    let wheres = null;
    console.log(subject);
    switch (subject) {
        case "japanese":
            wheres = japaneseWhere.map(u => u.where);
            console.log(wheres);
            break;

        case "socialStudies":
            wheres = socialStudiesWhere.map(u => u.where);
            break;

        case "math":
            wheres = mathWhere.map(u => u.where);
            break;

        case "science":
            wheres = scienceWhere.map(u => u.where);
            break;

        case "English":
            wheres = EnglishWhere.map(u => u.where);
            break;


        case "other":
            wheres = otherWhere.map(u => u.where);
            break;
    }

    console.log(wheres);
    document.getElementById("customQuizesWhereSelect").innerHTML = wheres
        .map(word => `<option value="${word}">` + word)
        .join("");
}

export function setQuizMyProblemSets() {
    let myProblemSetses = null;
    myProblemSetses = allMyProblemSets.map(u => u.myProblemSets);
    document.getElementById("customQuizesMyProblemSetsSelect").innerHTML = myProblemSetses
        .map(word => `<option value="${word}">` + word)
        .join("");
}



export function getCustomQuizesList() {/*state.Customからquizの配列を作る */
    return searchCustom(state.searchCustomState.book,
        state.searchCustomState.unit,
        state.searchCustomState.myProblemSets,
        state.searchCustomState.subject,
        state.searchCustomState.number)

}

export function startQuiz() {
    setQuizState(state.quizesList[state.currentQuizNumber]);
    renderQuizContentState();
    state.quizStartTime = Date.now();
}

// ---- Render functions ----
export function renderQuiz() {
    setQuiz();
    console.log("quiz");
    state.currentQuizNumber = 0;
    startQuiz();
}

export function renderHomeQuiz() {
    setQuizUnit();
    setQuizWhere();
    setQuizMyProblemSets();
}

export function renderQuizContent() {
}

export function renderResult() {

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
    const timeMs = Date.now() - state.quizStartTime;
    quiz.seconds = Math.floor(timeMs / 1000);
    quiz.formerDate = Date.now();
    quiz.times = quiz.times + 1;
    quiz.correctTimes = quiz.correctTimes + 1;
    quiz.progress = quiz.progress + 1;
    quiz.nextDate = getNextDate(quiz.importance, quiz.progress, quiz.formerDate);
    console.log(quiz);
    await upDateQuiz(quiz);


}


