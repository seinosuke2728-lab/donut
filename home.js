import { state } from "./state.js";
import { navigate } from "./navigation.js";

export function initHome() {
    document.getElementById("homeSidebarEdit").addEventListener("click", e => {
        state.homeMode = "edit";
        renderHome();
    });
    document.getElementById("homeSidebarQuiz").addEventListener("click", e => {
        state.homeMode = "quiz";
        renderHome();
    });
    document.getElementById("homeSidebarLog").addEventListener("click", e => {
        state.homeMode = "log";
        renderHome();
    });
    document.getElementById("homeSidebarSetting").addEventListener("click", e => {
        state.homeMode = "setting";
        renderHome();
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
        if (state.customOrHomework === "homework") {
            state.searchHomeworkState.missKindVisibility = e.target.checked;
            renderHomeQuiz();
        } else if (state.customOrHomework === "custom") {
            state.searchCustomState.missKindVisibility = e.target.checked;
            renderHomeQuiz();
        }
    });

    document.getElementById("onlyCheckCheckbox").addEventListener("change", e => {
        if (state.customOrHomework === "homework") {
            state.searchHomeworkState.isCheckedOnly = e.target.checked;
            renderHomeQuiz();
        } else if (state.customOrHomework === "custom") {
            state.searchCustomState.isCheckedOnly = e.target.checked;
            renderHomeQuiz();
        }
    });

    document.getElementById("nextButton").addEventListener("click", e => {
        console.log("nextButton clicked");
        navigate({ page: "quiz", panel: "quizContent" });
        renderQuiz();
    });

    renderHome();
}

function renderHome() {
    if (state.homeMode === "edit") {
        document.getElementById("homeSidebarEdit").classList.add("is-selected");
        document.getElementById("homeSidebarQuiz").classList.remove("is-selected");
        document.getElementById("homeSidebarLog").classList.remove("is-selected");
        document.getElementById("homeSidebarSetting").classList.remove("is-selected");
        renderHomeEdit();
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
    navigate({ page: "home", panel: "homeEdit" });
}

function renderHomeQuiz() {
    navigate({ page: "home", panel: "homeQuiz" });
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


}