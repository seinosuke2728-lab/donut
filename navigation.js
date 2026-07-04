import { setQuizState, state, renderQuizContentState, myProblemSetsDialogMode, allQuizes } from "./state.js";
import { initEditSetting, setEditState1, setEditState2, setEditState3, setEditState4, setEditState5, renderEditSetting, renderEditSetting1, renderEditSetting2, renderEditSetting3, renderEditSetting4, renderEditSetting5 } from "./edit.js";
import { setQuiz, setQuizMyProblemSets, setQuizUnit, setQuizWhere, startQuiz, renderQuiz, renderHomeQuiz, renderQuizContent, renderResult } from "./quiz.js";


export function navigate({ page, panel } = {}) {

    // ---- PAGE切替 ----
    if (page) {
        document.querySelectorAll(".page").forEach(p => {
            p.classList.remove("active");
        });

        const targetPage = document.getElementById(page);
        if (targetPage) {
            targetPage.classList.add("active");
        }
        pages[page]?.onShow?.();
    }

    // ---- PANEL切替 ----
    if (panel) {
        if (panels[panel]?.editValidation?.()) {
            alert("不適切な値があります");
            return;
        }
        document.querySelectorAll(".panel").forEach(p => {
            p.classList.remove("active");
        });

        const targetPanel = document.getElementById(panel);
        if (targetPanel) {
            targetPanel.classList.add("active");
        }
        panels[panel]?.onShow?.();
    }
}

const pages = {
    home: {
        onShow: renderHome
    },
    editSetting: {
        onShow: renderEditSetting
    },
    quiz: {
        onShow: renderQuiz
    }
};


const panels = {
    homeEdit: {
        onShow: renderHomeEdit
    },
    homeQuiz: {
        onShow: renderHomeQuiz
    },
    homeLog: {
        onShow: renderHomeLog
    },
    homeSetting: {
        onShow: renderHomeSetting
    },
    editSetting1: {
        onShow: renderEditSetting1
    },
    editSetting2: {
        onShow: renderEditSetting2
    },
    editSetting3: {
        onShow: renderEditSetting3
    },
    editSetting4: {
        onShow: renderEditSetting4
    },
    editSetting5: {
        onShow: renderEditSetting5
    },
    quizContent: {
        onShow: renderQuizContent
    },
    result: {
        onShow: renderResult
    }
};



function renderModeSettingChips() {

    document
        .querySelectorAll("#modeSettingChips .chipButton")
        .forEach(chip => {

            chip.classList.toggle(
                "is-selected",
                chip.dataset.value === state.edit.mode
            );

        });

}
function renderHomeworkCustomChips() {

    document
        .querySelectorAll("#homeworkCustomChips .chipButton")
        .forEach(chip => {

            chip.classList.toggle(
                "is-selected",
                chip.dataset.value === state.quiz.mode
            );

        });

}

export function renderAllMyproblemSetsButton() {

    document
        .querySelectorAll(".myProblemSetsButton")
        .forEach(btn => {

            btn.classList.toggle(
                "is-selected"
            );

        });

}




export function initNavigation() {
    navigate({ page: "home", panel: "homeEdit" });

    document.addEventListener("click", e => {

        const el = e.target.closest("[data-page],[data-panel]");
        if (!el) return;

        navigate({
            page: el.dataset.page,
            panel: el.dataset.panel
        });


    });


    document.addEventListener("click", e => {
        if (e.target.id === "quizContentInCorrent" || e.target.id === "quizContentCorrent") {

        } else {


            const button = e.target.closest("[data-visibility]");
            if (!button) return;


            changeVisibility(button.dataset.visibility);

        }

    });

    document.addEventListener("click", e => {


        const button = e.target.closest("[data-dialog]");
        if (!button) return;


        showDialog(button.dataset.dialog);

    });

    document.addEventListener("click", e => {


        const button = e.target.closest("[data-close]");
        if (!button) return;


        closeSidebar(button.dataset.close);

    });


    document
        .querySelectorAll("#modeSettingChips .chipButton")
        .forEach(chip => {

            chip.addEventListener("click", () => {

                state.edit.mode = chip.dataset.value;

                renderModeSettingChips();

            });

        });
    document
        .querySelectorAll("#homeworkCustomChips .chipButton")
        .forEach(chip => {

            chip.addEventListener("click", () => {

                state.quiz.mode = chip.dataset.value;

                renderHomeworkCustomChips();

            });

        });
    renderModeSettingChips();
    renderHomeworkCustomChips();

    document
        .querySelectorAll(".myProblemSetsButton")
        .forEach(chip => {

            chip.addEventListener("click", () => {


                renderAllMyproblemSetsButton();

            });

        });


}

export function changeVisibility(visibilityClass) {



    document.querySelectorAll("." + visibilityClass).forEach(el => {
        el.classList.toggle("active");
        if (el.classList.contains("active")) {
            visibilities[visibilityClass]?.onShow?.();

        } else {

            visibilities[visibilityClass]?.onHide?.();
        }
    });
}

const visibilities = {
    quizContentNextVisibility: {
        onShow: showAnswer,
        onHide: hideAnswer
    }
}

function showAnswer() {


}

function hideAnswer() {


}

export function showVisibility(visibilityClass) {
    document.querySelectorAll("." + visibilityClass).forEach(el => {
        if (!el.classList.contains("active")) {
            el.classList.add("active");
        }
    });
}








function closeSidebar(closeId) {
    const sidebar = document.getElementById(closeId);
    sidebar.classList.toggle("close");
}
