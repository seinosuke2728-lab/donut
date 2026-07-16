import { addMyProblemSets, upDateQuiz } from "./db.js";
import { state, saveState, saveUnit, saveWhere, japaneseUnit, socialStudiesUnit, scienceUnit, EnglishUnit, mathUnit, otherUnit, myProblemSetsDialogMode, socialStudiesWhere, japaneseWhere, mathWhere, scienceWhere, EnglishWhere, otherWhere, allMyProblemSets, saveMyProblemSets, continueEditInit, roadQuizes, setQuizFromState } from "./state.js"
import { navigate } from "./navigation.js"
import { onShowHomeEdit } from "./home.js";

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
        editNormalize1();
        if (editValidate1()) {
            navigateToNextEditPanel();
        }
    });

    document.getElementById("quizNumberSettingPageText").addEventListener("input", e => {
        state.edit.page = Number(e.target.value);
        renderEditSetting2();
    });

    document.getElementById("quizNumberSettingQuizNumberAText").addEventListener("input", e => {
        state.edit.numberA = Number(e.target.value);
        renderEditSetting2();
    });

    document.getElementById("quizNumberSettingQuizNumberBText").addEventListener("input", e => {
        state.edit.numberB = Number(e.target.value);
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
        editNormalize2();
        if (editValidate2()) {
            navigateToNextEditPanel();
        }
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
        editNormalize3();
        if (editValidate3()) {
            navigateToNextEditPanel();
        }
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
        editNormalize4();
        if (editValidate4()) {
            navigateToNextEditPanel();
        }
    });



    document.getElementById("editFinish").addEventListener("click", async e => {
        if (state.isUpdate) {
            console.log(state.edit);
            await upDateQuiz(setQuizFromState(state.edit,state.currentUpdateQuiz));
            console.log(setQuizFromState(state.edit,state.currentUpdateQuiz));
            await roadQuizes();
            if (state.edit.unit !== "指定なし") {
                console.log(state.edit.unit);
                saveUnit(state.edit.subject, state.edit.unit);
            }
            if (state.edit.book !== "指定なし") {
                saveWhere(state.edit.subject, state.edit.book);
            }

        } else {
            await saveState(state.edit);
            await roadQuizes();
            alert(state.edit.unit);
            if (state.edit.unit !== "指定なし") {
                console.log(state.edit.unit);
                saveUnit(state.edit.subject, state.edit.unit);
            }
            if (state.edit.book !== "指定なし") {
                saveWhere(state.edit.subject, state.edit.book);
            }
        }
        navigateToNextEditPanel();
    });

    document.getElementById("editMyProblemSets").addEventListener("click", e => {
        const dialog = document.getElementById("myProblemSetsDialog");
        dialog.showModal();
    });

    document.getElementById("myProblemSetsDecideButton").addEventListener("click", async e => {
        if (editMyProblemSetsValidate()) {
            await saveMyProblemSets(document.getElementById("myProblemSetsInput").value);
            renderMyProblemSetsDialog();

        }
    });

    document.getElementById("editContinue").addEventListener("click", e => {
        state.isUpdate = false;
        saveState(state.edit);
        alert(state.edit.unit);
        if (state.edit.unit !== "指定なし") {
            console.log(state.edit.unit);
            saveUnit(state.edit.subject, state.edit.unit);
        }
        if (state.edit.book !== "指定なし") {
            saveWhere(state.edit.subject, state.edit.book);

        }
        continueEditInit();
        navigate({ page: "editSetting", panel: "editSetting1" });
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
    if (state.edit.mode === "miss") {
        document.getElementById("quizContentSettingMyAnswerText").classList.add("active");
        document.getElementById("quizContentSettingMyAnswerLabel").classList.add("active");
        document.getElementById("quizContentSettingMyAnswerText").value = state.edit.myAnswer
    } else {
        document.getElementById("quizContentSettingMyAnswerText").classList.remove("active");
        document.getElementById("quizContentSettingMyAnswerLabel").classList.remove("active");
    }
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
    buttonlist.innerHTML = myProblemSets
        .map(word => {

            return `<button class="myProblemSetsButton button u-text-lg center-y transition active-scale w-80per" value="${word}" id="${word}">` + word
        })
        .join("");

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

    const datalist = document.getElementById("unitList");

    datalist.innerHTML = '<option value="指定なし">指定なし' + units
        .map(word => `<option value="${word}">`)
        .join("");
}

export function setEditWhere() {
    const subject = document.getElementById("otherSettingSubjectSelect").value;
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

    const datalist = document.getElementById("whereList");

    datalist.innerHTML = '<option value="指定なし">指定なし' + wheres
        .map(word => `<option value="${word}">`)
        .join("");
}


function navigateToNextEditPanel() {

    const currentPanel = state.navigation.currentPanel;
    if (currentPanel === "editSetting1") {
        state.edit.currentPanel = "editSetting2";
        navigate({ panel: "editSetting2" });
    } else if (currentPanel === "editSetting2") {
        state.edit.currentPanel = "editSetting3";
        navigate({ panel: "editSetting3" });
    } else if (currentPanel === "editSetting3") {
        if (state.edit.mode === "miss") {
            state.edit.currentPanel = "editSetting4";
            navigate({ panel: "editSetting4" });
        } else {
            state.edit.currentPanel = "editSetting5";
            navigate({ panel: "editSetting5" });
        }
    } else if (currentPanel === "editSetting4") {
        state.edit.currentPanel = "editSetting5";
        navigate({ panel: "editSetting5" });
    } else if (currentPanel === "editSetting5") {
        state.edit.currentPanel = null;
        navigate({ page: "home", panel: "homeEdit" });
        onShowHomeEdit();
    }
}
function editNormalize1() {
    state.edit.subject = state.edit.subject.trim();
    state.edit.unit = state.edit.unit.trim();
    if (!state.edit.unit) {
        state.edit.unit = "指定なし";
    }
    state.edit.book = state.edit.book.trim();
    if (!state.edit.book) {
        state.edit.book = "指定なし";
    }
}

function editNormalize2() {
    if (!state.edit.page) {
        state.edit.page = 0;
    }
    if (!state.edit.numberA) {
        state.edit.numberA = 0;
    }
    if (!state.edit.numberB) {
        state.edit.numberB = 0;
    }
}

function editNormalize3() {
    state.edit.question = state.edit.question.trim();
    state.edit.answer = state.edit.answer.trim();
    state.edit.myAnswer = state.edit.myAnswer.trim();
    if (state.mode !== "miss") {
        state.edit.myAnswer = "no answer";
    }
}

function editNormalize4() {
    state.edit.missKind = state.edit.missKind.trim();
    if (!state.edit.missKind) {
        state.edit.missKind = "指定なし";
    }
    state.edit.lesson = state.edit.lesson.trim();
    if (!state.edit.lesson) {
        state.edit.lesson = "指定なし";
    }
}

function editValidate1() {
    if (state.edit.subject === "") {
        alert("教科を選択してください");
        return false;
    }
    return true;
}

function editValidate2() {
    if (state.edit.page < 0 || !Number.isInteger(state.edit.page)) {
        alert("ページ数は正の整数で入力してください");
        return false;
    }
    if (state.edit.numberA < 0 || !Number.isInteger(state.edit.numberA)) {
        alert("数値Aは正の整数で入力してください");
        return false;
    }
    if (state.edit.numberB < 0 || !Number.isInteger(state.edit.numberB)) {
        alert("数値Bは正の整数で入力してください");
        return false;
    }
    if (state.edit.importance < 1) {
        alert("重要度は1以上で入力してください");
        return false;
    }
    return true;
}

function editValidate3() {
    if (!state.edit.question) {
        alert("問題文を入力してください");
        return false;
    }
    if (!state.edit.answer) {
        alert("答えを入力してください");
        return false;
    }
    if (state.edit.mode === "miss" && !state.edit.myAnswer) {
        alert("自分の答えを入力してください");
        return false;
    }
    return true;
}

function editValidate4() {
    return true;
}

function editMyProblemSetsValidate() {
    if (document.getElementById("myProblemSetsInput").value) {
        return true;
    } else {
        alert("値を入力してください");
        return false;
    }
}

