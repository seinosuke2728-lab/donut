import { renderEditSetting1, renderEditSetting2, renderEditSetting3, renderEditSetting4, renderEditSetting5 } from "./edit.js";
import { renderHomeQuiz, renderQuiz, renderQuizContent, renderResult } from "./quiz.js";
import { state } from "./state.js";


export function navigate({ page, panel } = {}) {

    console.trace("navigate", page, panel);

    // ---- PAGE切替 ----
    if (page) {

        state.navigation.currentPage = page;

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
        state.navigation.currentPanel = panel;
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
    },
    editSetting: {
    },
    quiz: {
        onShow: renderQuiz
    }
};


const panels = {
    homeEdit: {
        //onShow: renderHomeEdit
    },
    homeQuiz: {
        onShow: renderHomeQuiz
    },
    homeLog: {
        //onShow: renderHomeLog
    },
    homeSetting: {
        //onShow: renderHomeSetting
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
