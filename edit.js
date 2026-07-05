import { addMyProblemSets } from "./db.js";
import { state, saveState, saveUnit, saveWhere, japaneseUnit, socialStudiesUnit, scienceUnit, EnglishUnit, mathUnit, otherUnit, myProblemSetsDialogMode, socialStudiesWhere, japaneseWhere, mathWhere, scienceWhere, EnglishWhere, otherWhere, allMyProblemSets, saveMyProblemSets } from "./state.js"
import { navigate } from "./navigation.js"

export function initEdit() {
    document.getElementById("whileMode").addEventListener("click", e => {
        state.edit.mode = "while";
        renderEditSetting1();
    });

    document.getElementById("quizMode").addEventListener("click", e => {
        state.edit.mode = "quiz";
        renderEditSetting1();
    });

    document.getElementById("missMode").addEventListener("click", e => {
        state.edit.mode = "miss";
        renderEditSetting1();
    });

    document.getElementById("otherSettingSubjectSelect").addEventListener("change", e => {
        state.edit.subject = e.target.value;
        setEditUnit();
        setEditWhere();
        renderEditSetting1();
    });

    document.getElementById("otherSettingUnitSelect").addEventListener("change", e => {
        state.edit.unit = e.target.value;
        renderEditSetting1();
    });

    document.getElementById("otherSettingWhereSelect").addEventListener("change", e => {
        state.edit.book = e.target.value;
        renderEditSetting1();
    });

    document.getElementById("nextButton1").addEventListener("click", e => {
        navigateToNextEditPanel();
        renderEditSetting2();
    });

    document.getElementById("quizNumberSettingPageText").addEventListener("input", e => {
        state.edit.page = e.target.value;
        renderEditSetting2();
    });

    document.getElementById("quizNumberSettingQuizNumberAText").addEventListener("input", e => {
        state.edit.numberA = e.target.value;
        renderEditSetting2();
    });

    document.getElementById("quizNumberSettingQuizNumberBText").addEventListener("input", e => {
        state.edit.numberB = e.target.value;
        renderEditSetting2();
    });

    document
        .querySelector(".starButton1")
        .addEventListener("click", e => {
            state.edit.importance = 1;
            renderEditSetting2();
        });
    document
        .querySelector(".starButton2")
        .addEventListener("click", e => {
            state.edit.importance = 2;
            renderEditSetting2();
        });
    document
        .querySelector(".starButton3")
        .addEventListener("click", e => {
            state.edit.importance = 3;
            renderEditSetting2();
        });
    document
        .querySelector(".starButton4")
        .addEventListener("click", e => {
            state.edit.importance = 4;
            renderEditSetting2();
        });

    document.getElementById("nextButton2").addEventListener("click", e => {
        navigateToNextEditPanel();
        renderEditSetting3();
    });

    document.getElementById("quizContentSettingQuizText").addEventListener("input", e => {
        state.edit.question = e.target.value;
        renderEditSetting3();
    });

    document.getElementById("quizContentSettingAnswerText").addEventListener("input", e => {
        state.edit.answer = e.target.value;
        renderEditSetting3();
    });

    document.getElementById("quizContentSettingMyAnswerText").addEventListener("input", e => {
        state.edit.myAnswer = e.target.value;
        renderEditSetting3();
    });

    document.getElementById("nextButton3").addEventListener("click", e => {
        navigateToNextEditPanel();
        renderEditSetting4();
    });

    document.getElementById("quizMissSettingMissKindSelect").addEventListener("change", e => {
        state.edit.missKind = e.target.value;
        renderEditSetting4();
    });

    document.getElementById("quizMissSettingLessonSelect").addEventListener("change", e => {
        state.edit.lesson = e.target.value;
        renderEditSetting4();
    });

    document.getElementById("nextButton4").addEventListener("click", e => {
        navigateToNextEditPanel();
        renderEditSetting5();
    });



    document.getElementById("editFinish").addEventListener("click", async e => {
        navigateToNextEditPanel();
        saveState(state.edit);
        saveUnit(state.edit.subject, state.edit.unit);
        saveWhere(state.edit.subject, state.edit.book);
    });

    document.getElementById("editMyProblemSets").addEventListener("click", e => {
        const dialog = document.getElementById("myProblemSetsDialog");
        dialog.showModal();
    });

    document.getElementById("myProblemSetsDecideButton").addEventListener("click", async e => {
        await saveMyProblemSets(document.getElementById("myProblemSetsInput").value);
        renderMyProblemSetsDialog();
    });

    document.getElementById("editContinue").addEventListener("click", e => {
        const dialog = document.getElementById("continueDialog");
        dialog.showModal();
    });






}

export function renderEditSetting1() {
    document
        .querySelectorAll("#modeSettingChips .chipButton")
        .forEach(chip => {

            chip.classList.toggle(
                "is-selected",
                chip.dataset.value === state.edit.mode
            );

        });

    
    document.getElementById("otherSettingSubjectSelect").value = state.edit.subject;
    document.getElementById("otherSettingUnitSelect").value = state.edit.unit;
    document.getElementById("otherSettingWhereSelect").value = state.edit.book;

}

export function renderEditSetting2() {
    document.getElementById("quizNumberSettingPageText").value = state.edit.page;
    document.getElementById("quizNumberSettingQuizNumberAText").value = state.edit.numberA;
    document.getElementById("quizNumberSettingQuizNumberBText").value = state.edit.numberB;

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
}

export function renderEditSetting3() {
    document.getElementById("quizContentSettingQuizText").value = state.edit.question;
    document.getElementById("quizContentSettingAnswerText").value = state.edit.answer;
    document.getElementById("quizContentSettingMyAnswerText").value = state.edit.myAnswer;
}

export function renderEditSetting4() {
    document.getElementById("quizMissSettingMissKindSelect").value = state.edit.missKind;
    document.getElementById("quizMissSettingLessonSelect").value = state.edit.lesson;
}

export function renderEditSetting5() {
}

export function renderMyProblemSetsDialog() {
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
    document
        .querySelectorAll(".myProblemSetsButton")
        .forEach(btn => {
            btn.addEventListener("click", (e) => {

                document
                    .getElementById(e.target.id)
                    .classList.toggle(
                        "is-selected"
                    );

                if (document
                    .getElementById(e.target.id)
                    .classList.contains("is-selected")) {
                    state.edit.myProblemSets.push(e.target.id);
                } else {
                    state.edit.myProblemSets.splice(e.target.id);
                }
            })

            if (state.edit.myProblemSets.includes(btn.id)) {
                btn.classList.add(
                    "is-selected"
                );
            }

        }



        );

}


export function initEditSetting() {
    setEditUnit();
    setEditWhere();
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

        case "English":
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


function navigateToNextEditPanel() {

    const currentPanel = state.navigation.currentPanel;
    console.log("currentPanel", currentPanel);
    if (currentPanel === "editSetting1") {
        state.edit.currentPanel = "editSetting2";
        navigate({ panel: "editSetting2" });
    } else if (currentPanel === "editSetting2") {
        state.edit.currentPanel = "editSetting3";
        navigate({ panel: "editSetting3" });
    } else if (currentPanel === "editSetting3") {
        state.edit.currentPanel = "editSetting4";
        navigate({ panel: "editSetting4" });
    } else if (currentPanel === "editSetting4") {
        state.edit.currentPanel = "editSetting5";
        navigate({ panel: "editSetting5" });
    } else if (currentPanel === "editSetting5") {
        state.edit.currentPanel = null;
        navigate({ page: "home", panel: "homeEdit" });
    }
}