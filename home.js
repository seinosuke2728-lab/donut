import { upDateQuiz } from "./db.js";
import { navigate } from "./navigation.js";
import { startQuiz } from "./quiz.js";
import { addEditInit, allMyProblemSets, allQuizes, allUnit, EnglishUnit, EnglishWhere, japaneseUnit, japaneseWhere, mathUnit, mathWhere, otherUnit, otherWhere, roadQuizes, scienceUnit, scienceWhere, socialStudiesUnit, socialStudiesWhere, state, updateEditInit } from "./state.js";

export function initHome() {
    document.getElementById("homeSidebarEdit").addEventListener("click", e => {
        state.homeMode = "edit";
        navigate({ page: "home", panel: "homeEdit" });
        onShowHomeEdit();
    });
    document.getElementById("homeSidebarQuiz").addEventListener("click", e => {
        state.homeMode = "quiz";
        navigate({ page: "home", panel: "homeQuiz" });
        onShowHomeQuiz();
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
        state.isUpdate = false;
        addEditInit();
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
        state.isCheckedOnly = e.target.checked;
        renderHomeQuiz();
    });

    document.getElementById("nextButton").addEventListener("click", e => {
        const today = new Date();
        state.today = today.setHours(0, 0, 0, 0);
        if (state.customOrHomework === "homework") {
            setQuizSettingHomeworkState();
        } else if (state.customOrHomework === "custom") {
            setQuizSettingCustomState();
        }
        startQuiz();
    });
    navigate({ page: "home", panel: "homeEdit" });
    onShowHomeEdit();
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


}


export function setQuizUnit() {
    const subject = document.getElementById("customQuizesSubjectSelect").value;
    let units = null;
    switch (subject) {
        case "japanese":
            units = japaneseUnit.map(u => u.unit);
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
    console.log(japaneseUnit);
    console.log(allUnit);
    document.getElementById("customQuizesUnitSelect").innerHTML = '<option value="指定なし">指定なし' + units
        .map(word => `<option value="${word}">` + word)
        .join("");
}

export function setQuizWhere() {
    const subject = document.getElementById("customQuizesSubjectSelect").value;
    let wheres = null;
    switch (subject) {
        case "japanese":
            wheres = japaneseWhere.map(u => u.where);
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

    document.getElementById("customQuizesWhereSelect").innerHTML = '<option value="指定なし">指定なし' + wheres
        .map(word => `<option value="${word}">` + word)
        .join("");
}

export function setQuizMyProblemSets() {
    let myProblemSetses = null;
    myProblemSetses = allMyProblemSets.map(u => u.myProblemSets);
    document.getElementById("customQuizesMyProblemSetsSelect").innerHTML = '<option value="指定なし">指定なし' + myProblemSetses
        .map(word => `<option value="${word}">` + word)
        .join("");
}

function onShowHomeQuiz() {
    setQuizUnit();
    setQuizWhere();
    setQuizMyProblemSets();
}

export function onShowHomeEdit() {
    state.updateQuizes = [];
    const observer = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
            console.log(state.updateQuizes?.length);
            console.log(allQuizes?.length);
            if (state.updateQuizes?.length === allQuizes?.length) {
                alert("少ない");
            } else {
                await loadQuizesToUpdate();

            }
        }
    });

    observer.observe(document.getElementById("sentinel"));


    const buttonlist = document.getElementById("updateButtonList");
    buttonlist.innerHTML = "";
    state.loadNumber = 0;
    console.log(state.loadNumber);
}

function loadQuizesToUpdate() {
    state.updateQuizes = allQuizes.slice(state.loadNumber, state.loadNumber + 20);
    console.log(allQuizes);
    const buttonlist = document.getElementById("updateButtonList");
    console.log(state.updateQuizes);
    let buttonCounter = 0;
    state.updateQuizes.forEach(quiz => {
        let buttonHtml = "";
        buttonHtml = `<div class="button updateButton flex col p-20 gap-10" data-quiz-id="${buttonCounter}">
        <div class="flex row gap-10 center">
        <p class="chip p-15 flex center lightText">${quiz.subject}</p>
              <p class="lightText">${quiz.unit}</p>
                  ${getIsCheckedHtml(quiz,buttonCounter)}

              <div class="flex row gap-10">
                  ${getImportanceHtml(quiz)}
                  </div>
            </div>
            <div class="flex row p-20">
              <p class="text u-text-md text-bold">${quiz.question}</p>
            </div>
            <div class="flex row">
              <p class="lightText u-text-xs">${Math.round(quiz.correctTimes / quiz.times * 100) + "%"}</p>
            </div>
            <div class="flex row gap-10 center">
              <div class="currentPerProgressBar">
                <div class="currentPerProgressFill"></div>
              </div>
              <p class="lightText u-text-sm ml-au">80%</p>
            </div>
            <div class="line"></div>
            <div class="flex row">
              <p class="lightText u-text-sm ml-au">${new Date(quiz.makeDate).toLocaleDateString()}</p>
            </div>

            <div class="flex row">
              <p class="lightText u-text-sm">${quiz.where}</p>
              <p class="text u-text-sm ml-au">${new Date(quiz.nextDate).toLocaleDateString()}</p>
            </div>

          </div>`






        buttonlist.innerHTML = buttonlist.innerHTML + buttonHtml;
        buttonCounter++;

    });

    state.loadNumber = state.loadNumber + 20;

    document.querySelectorAll(".updateButton").forEach(updateButton => {
        updateButton.addEventListener("click", e => {
            const button = e.target.closest(".updateButton");
            if (!button) return;

            const index = Number(button.dataset.quizId);
            console.log("Quiz Index:", index, "Quiz:", state.updateQuizes[index]);

            state.currentUpdateQuiz = structuredClone(state.updateQuizes[index]);
            console.log(state.currentUpdateQuiz);

            state.isUpdate = true;
            updateEditInit(state.updateQuizes[index]);
            navigate({ page: "editSetting", panel: "editSetting1" });
        });
    })

    document.querySelectorAll(".updateCheckedButton").forEach(updateCheckedButton => {
        updateCheckedButton.addEventListener("click", async (e) => {
            e.stopPropagation(); // 親へイベントが伝わるのを止める
            console.log("stop");
            const button = e.target.closest(".updateCheckedButton");
            if (!button) return;
            e.target.classList.toggle("isChecked");

            const index = Number(button.dataset.checkId);
            console.log("Quiz Index:", index, "Quiz:", state.updateQuizes[index]);

            state.currentUpdateQuiz = structuredClone(state.updateQuizes[index]);
            state.currentUpdateQuiz.isChecked = e.target.classList.contains("isChecked");


            await upDateQuiz(state.currentUpdateQuiz);
            await roadQuizes();
        });
    })
}

function getImportanceHtml(quiz) {
    let buttonHtml = `<p id="quizContentImportance1"
                  class="material-symbols-outlined visibility-block active star1 text u-text-lg">
                  kid_star</p>`
    if (quiz.importance >= 2) {
        buttonHtml = buttonHtml + `<p id="quizContentImportance2" class="material-symbols-outlined visibility-block star2 text u-text-lg">
                  kid_star</p>`
    }
    if (quiz.importance >= 3) {
        buttonHtml = buttonHtml + `<p id="quizContentImportance3" class="material-symbols-outlined visibility-block star3 text u-text-lg">
                  kid_star</p>`
    }
    if (quiz.importance >= 4) {
        buttonHtml = buttonHtml + `<p id="quizContentImportance4" class="material-symbols-outlined visibility-block star4 text u-text-lg">
                  kid_star</p>`
    }
    return buttonHtml;
}

function getIsCheckedHtml(quiz,buttonCounter) {
    let buttonHtml;
    if (quiz.isChecked) {
        buttonHtml = `<button class="button updateCheckedButton text material-symbols-outlined transition hover-scale active-scale ml-au isChecked" data-check-id="${buttonCounter}">check</button>`

    }else{
        buttonHtml = `<button class="button updateCheckedButton text material-symbols-outlined transition hover-scale active-scale ml-au" data-check-id="${buttonCounter}">check</button>`
    
    }
    return buttonHtml;
}