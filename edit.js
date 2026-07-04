import { addMyProblemSets } from "./db.js";
import { state, saveState, saveUnit, saveWhere, japaneseUnit, socialStudiesUnit, scienceUnit, EnglishUnit, mathUnit, otherUnit, myProblemSetsDialogMode, socialStudiesWhere, japaneseWhere, mathWhere, scienceWhere, EnglishWhere, otherWhere, allMyProblemSets, saveMyProblemSets } from "./state.js"
import { renderMyproblemSetsButton } from "./navigation.js"

export function initEdit() {
    document.getElementById("editSetting").addEventListener("click", e => {
        renderEditSetting();
    });

    document
        .querySelector(".starButton1")
        .addEventListener("click", e => {
            state.edit.importance = 1;
            renderEditImportance();
        });
    document
        .querySelector(".starButton2")
        .addEventListener("click", e => {
            state.edit.importance = 2;
            renderEditImportance();
        });
    document
        .querySelector(".starButton3")
        .addEventListener("click", e => {
            state.edit.importance = 3;
            renderEditImportance();
        });
    document
        .querySelector(".starButton4")
        .addEventListener("click", e => {
            state.edit.importance = 4;
            renderEditImportance();
        });

    document
        .getElementById("editFinish").addEventListener("click", async e => {
            saveState(state.edit);
            saveUnit(state.edit.subject, state.edit.unit);
            saveWhere(state.edit.subject, state.edit.book);
            saveMyProblemSets(state.edit.myProblemSets);
        })

    document.getElementById("otherSettingSubjectSelect").addEventListener("change", e => {
        setEditUnit();
        setEditWhere();
    })

    document.getElementById("myProblemSetsDecideButton").addEventListener("click", async e => {
        await saveMyProblemSets(document.getElementById("myProblemSetsInput").value);
        renderMyProblemSetsDialog();

    })


    document.getElementById("editMyProblemSets").addEventListener("click", e => {
    })
}

function renderEditImportance() {
    document
        .querySelectorAll(".starButton")
        .forEach(btn => {
            btn.classList.remove("star-fill");

        });

    if (state.edit.importance >= 1) {
        document
            .querySelector(".starButton1")
            .classList.add("star-fill");
    }
    if (state.edit.importance >= 2) {
        document
            .querySelector(".starButton2")
            .classList.add("star-fill");
    }
    if (state.edit.importance >= 3) {
        document
            .querySelector(".starButton3")
            .classList.add("star-fill");
    }
    if (state.edit.importance >= 4) {
        document
            .querySelector(".starButton4")
            .classList.add("star-fill");
    }



};

function renderMyProblemSetsDialog() {
    document.getElementById("myProblemSetsInput").value = "";
    const buttonlist = document.getElementById("myProblemSetsButtons");


    const myProblemSets = allMyProblemSets.map(m => m.myProblemSets);
    console.log(myProblemSets);
    buttonlist.innerHTML = myProblemSets
        .map(word => {

            return `<button class="myProblemSetsButton button u-text-lg center-y transition active-scale w-80per" value="${word}" id="${word}">` + word
            console.log(`<button class="myProblemSetsButton button u-text-lg center-y transition active-scale w-80per" value="${word}" id="${word}">` + word);
        })
        .join("");

    console.log(buttonlist.innerHTML);
    renderMyproblemSetsButton("myProblemSetsButton");

}


export function initEditSetting() {
    setEditUnit();
    setEditWhere();

}

export function setEditState1() {
    state.edit.mode = document.querySelector("#modeSettingChips .chipButton.is-selected").dataset.value;
    state.edit.subject = document.getElementById("otherSettingSubjectSelect").value;
    state.edit.unit = document.getElementById("otherSettingUnitSelect").value;
    state.edit.book = document.getElementById("otherSettingWhereSelect").value;
}
export function setEditState2() {
    state.edit.page = document.getElementById("quizNumberSettingPageText").value;
    state.edit.number = document.getElementById("quizNumberSettingQuizNumberAText").value + document.getElementById("quizNumberSettingQuizNumberBText").value;
}

export function setEditState3() {
    state.edit.question = document.getElementById("quizContentSettingQuizText").value;
    state.edit.answer = document.getElementById("quizContentSettingAnswerText").value;
    state.edit.myAnswer = document.getElementById("quizContentSettingMyAnswerText").value;
}

export function setEditState4() {
    state.edit.missKind = document.getElementById("quizMissSettingMissKindSelect").value;
    state.edit.lesson = document.getElementById("quizMissSettingLessonSelect").value;

}

export function setEditState5() {
}

export function editValidation1() {
}

// ---- Render functions ----
export function renderEditSetting() {

}

export function renderEditSetting1() {
    initEditSetting();
}

export function renderEditSetting2() {
    setEditState1();
}

export function renderEditSetting3() {
    setEditState2();
}

export function renderEditSetting4() {
    setEditState3();
}

export function renderEditSetting5() {
    setEditState4();
}

export function saveQuiz() {

}

export function setEditUnit() {
    const subject = document.getElementById("otherSettingSubjectSelect").value;
    let units = null;
    console.log(subject);
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

        case "nglish":
            units = EnglishUnit.map(u => u.unit);
            break;


        case "other":
            units = otherUnit.map(u => u.unit);
            break;
    }

    const datalist = document.getElementById("unitList");

    datalist.innerHTML = units
        .map(word => `<option value="${word}">`)
        .join("");
}

export function setEditWhere() {
    const subject = document.getElementById("otherSettingSubjectSelect").value;
    let wheres = null;
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

        case "nglish":
            wheres = EnglishWhere.map(u => u.where);
            break;


        case "other":
            wheres = otherWhere.map(u => u.where);
            break;
    }

    const datalist = document.getElementById("whereList");

    datalist.innerHTML = wheres
        .map(word => `<option value="${word}">`)
        .join("");
}

