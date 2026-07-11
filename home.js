import { navigate } from "./navigation.js";
import { startQuiz } from "./quiz.js";
import { allMyProblemSets, EnglishUnit, EnglishWhere, japaneseUnit, japaneseWhere, mathUnit, mathWhere, otherUnit, otherWhere, scienceUnit, scienceWhere, socialStudiesUnit, socialStudiesWhere, state } from "./state.js";

export function initHome() {
    document.getElementById("homeSidebarEdit").addEventListener("click", e => {
        state.homeMode = "edit";
        navigate({ page: "home", panel: "homeEdit" });
    });
    document.getElementById("homeSidebarQuiz").addEventListener("click", e => {
        state.homeMode = "quiz";
        navigate({ page: "home", panel: "homeQuiz" });
    });
    document.getElementById("homeSidebarLog").addEventListener("click", e => {
        state.homeMode = "log";
        navigate({ page: "home", panel: "homeLog" });
    });
    document.getElementById("homeSidebarSetting").addEventListener("click", e => {
        state.homeMode = "setting";
        navigate({ page: "home", panel: "homeSetting" });
    });

    document.getElementById("addButton").addEventListener("click", e => {
        navigate({ page: "editSetting", panel: "editSetting1" });
    });

    document.getElementById("homework").addEventListener("click", e => {
        state.customOrHomework = "homework";
        renderHomeQuiz();
    });
    document.getElementById("custom").addEventListener("click", e => {
        state.customOrHomework = "custom";
        renderHomeQuiz();
    });

    document.getElementById("delinquent").addEventListener("click", e => {
        if (state.customOrHomework === "homework") {
            state.searchHomeworkState.isDelinquent = document.getElementById("delinquent").checked;
            renderHomeQuiz();
        }
    });
    document.getElementById("todayCheckbox").addEventListener("click", e => {
        if (state.customOrHomework === "homework") {
            state.searchHomeworkState.isToday = document.getElementById("todayCheckbox").checked;
            renderHomeQuiz();
        }
    });

    document.getElementById("customQuizesMyProblemSetsSelect").addEventListener("change", e => {
        if (state.customOrHomework === "custom") {
            state.searchCustomState.myProblemSets = e.target.value;
            renderHomeQuiz();
        }
    });

    document.getElementById("customQuizesSubjectSelect").addEventListener("change", e => {
        if (state.customOrHomework === "custom") {
            state.searchCustomState.subject = e.target.value;
            setQuizUnit();
            setQuizWhere();
            setQuizMyProblemSets();
            renderHomeQuiz();
        }
    });

    document.getElementById("customQuizesUnitSelect").addEventListener("change", e => {
        if (state.customOrHomework === "custom") {
            state.searchCustomState.unit = e.target.value;
            renderHomeQuiz();
        }
    });

    document.getElementById("customQuizesWhereSelect").addEventListener("change", e => {
        if (state.customOrHomework === "custom") {
            state.searchCustomState.book = e.target.value;
            renderHomeQuiz();
        }
    });

    document.getElementById("customQuizesNumberSelect").addEventListener("change", e => {
        if (state.customOrHomework === "custom") {
            state.searchCustomState.number = e.target.value;
            renderHomeQuiz();
        }
    });

    document.getElementById("missKindCheckbox").addEventListener("change", e => {
        state.missKindVisibility = e.target.checked;
        renderHomeQuiz();
    });

    document.getElementById("onlyCheckCheckbox").addEventListener("change", e => {
        state.searchCustomState.isCheckedOnly = e.target.checked;
        renderHomeQuiz();
    });

    document.getElementById("nextButton").addEventListener("click", e => {
        console.log("nextButton clicked");
        const today=new Date();
        state.today=today.setHours(0,0,0,0);
        if (state.customOrHomework === "homework") {
            setQuizSettingHomeworkState();
        } else if (state.customOrHomework === "custom") {
            setQuizSettingCustomState();
        }
        startQuiz();
    });

    navigate({ page: "home", panel: "homeEdit" });
}

function setQuizSettingCustomState() {
    state.searchCustomState.book = document.getElementById("customQuizesWhereSelect").value;
    state.searchCustomState.unit = document.getElementById("customQuizesUnitSelect").value;
    state.searchCustomState.myProblemSets = document.getElementById("customQuizesMyProblemSetsSelect").value;
    state.searchCustomState.subject = document.getElementById("customQuizesSubjectSelect").value;
    state.searchCustomState.number = document.getElementById("customQuizesNumberSelect").value;
    state.missKindVisibility = document.getElementById("missKindCheckbox").checked;
    state.isCheckedOnly = document.getElementById("onlyCheckCheckbox").checked;
}

function setQuizSettingHomeworkState() {
    state.searchHomeworkState.isDelinquent = document.getElementById("delinquent").checked;
    state.searchHomeworkState.isToday = document.getElementById("todayCheckbox").checked;
    state.missKindVisibility = document.getElementById("missKindCheckbox").checked;
    state.isCheckedOnly = document.getElementById("onlyCheckCheckbox").checked;
}

export function renderHome() {
    if (state.homeMode === "edit") {
        document.getElementById("homeSidebarEdit").classList.add("is-selected");
        document.getElementById("homeSidebarQuiz").classList.remove("is-selected");
        document.getElementById("homeSidebarLog").classList.remove("is-selected");
        document.getElementById("homeSidebarSetting").classList.remove("is-selected");
    }
    if (state.homeMode === "quiz") {
        document.getElementById("homeSidebarEdit").classList.remove("is-selected");
        document.getElementById("homeSidebarQuiz").classList.add("is-selected");
        document.getElementById("homeSidebarLog").classList.remove("is-selected");
        document.getElementById("homeSidebarSetting").classList.remove("is-selected");
        renderHomeQuiz();
    }
    if (state.homeMode === "log") {
        document.getElementById("homeSidebarEdit").classList.remove("is-selected");
        document.getElementById("homeSidebarQuiz").classList.remove("is-selected");
        document.getElementById("homeSidebarLog").classList.add("is-selected");
        document.getElementById("homeSidebarSetting").classList.remove("is-selected");
    }
    if (state.homeMode === "setting") {
        document.getElementById("homeSidebarEdit").classList.remove("is-selected");
        document.getElementById("homeSidebarQuiz").classList.remove("is-selected");
        document.getElementById("homeSidebarLog").classList.remove("is-selected");
        document.getElementById("homeSidebarSetting").classList.add("is-selected");
    }
}

function renderHomeEdit() {
}

function renderHomeQuiz() {
    if (state.customOrHomework === "homework") {
        document.getElementById("homework").classList.add("is-selected");
        document.getElementById("custom").classList.remove("is-selected");

        document.getElementById("delinquentToday").classList.add("active");

        document.getElementById("customQuizes").classList.remove("active");
    } else {
        document.getElementById("homework").classList.remove("is-selected");
        document.getElementById("custom").classList.add("is-selected");
        document.getElementById("delinquentToday").classList.remove("active");
        document.getElementById("customQuizes").classList.add("active");
    }
    setQuizUnit();
    setQuizWhere();
    setQuizMyProblemSets();


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
