import { allQuizes, allUnit, setAll, allWhere, allMyProblemSets, classifyAll,setQuizFromState } from "./state.js";

const today = new Date();
let db;
let request;
const cDialog = document.getElementById("continueDialog");
const mDialog = document.getElementById("myProblemSetsDialog");

cDialog.addEventListener("click", (e) => {
    const rect = cDialog.getBoundingClientRect();

    const inside =
        rect.left <= e.clientX &&
        e.clientX <= rect.right &&
        rect.top <= e.clientY &&
        e.clientY <= rect.bottom;

    if (!inside) {
        cDialog.close();
    }
});

mDialog.addEventListener("click", (e) => {
    const rect = mDialog.getBoundingClientRect();

    const inside =
        rect.left <= e.clientX &&
        e.clientX <= rect.right &&
        rect.top <= e.clientY &&
        e.clientY <= rect.bottom;

    if (!inside) {
        mDialog.close();
    }
});


export class Question {
    question;
    answer;
    myAnswer;
    where;
    book;
    myProblemSets;
    isChecked;
    makeDate;
    formerDate;
    nextDate;
    mode;
    times;
    correctTimes;
    subject;
    unit;
    missKind;
    lesson;
    importance;
    progress;
    isCompleted;
    seconds;
    page;
    number;
    numberA;
    numberB;
}

class Unit {
    subject;
    unit;
}
class Where {
    subject;
    where;
}
class MyProblemSets {
    myProblemSets;
}

export async function initDB() {



    await open();

    await setAll();
    classifyAll();
    console.log(allUnit);




}

export async function save(state) {
    const tx = db.transaction("quizes", "readwrite");

    const store = tx.objectStore("quizes");

    const request = store.add(setQuizFromState(state));
    return new Promise((resolve, reject) => {
        request.onsuccess = () => {
            console.log("Quiz saved successfully");
        };

        request.onerror = () => {
            console.error("Save error:", request.error);
            reject(request.error);
        };

        tx.oncomplete = () => {
            console.log("Transaction complete");
            resolve();
        };

        tx.onerror = () => {
            console.error("Transaction error:", tx.error);
            reject(tx.error);
        };
    });
}

export async function upDateQuiz(quiz) {
    const tx = db.transaction("quizes", "readwrite");

    const store = tx.objectStore("quizes");

    const request = store.put(quiz);
    return new Promise((resolve, reject) => {
        request.onerror = () => {
            console.error("Update error:", request.error);
            reject(request.error);
        };

        tx.oncomplete = () => {
            console.log("Update transaction complete");
            resolve();
        };

        tx.onerror = () => {
            console.error("Transaction error:", tx.error);
            reject(tx.error);
        };
    });

}

export async function addUnit(subject, unit) {
    const tx = db.transaction("unit", "readwrite");

    const store = tx.objectStore("unit");

    const request = store.put(setUnit(subject, unit));
    return new Promise((resolve, reject) => {
        request.onerror = () => {
            console.error("Add unit error:", request.error);
            reject(request.error);
        };

        tx.oncomplete = () => {
            console.log("Add unit transaction complete");
            resolve();
        };

        tx.onerror = () => {
            console.error("Transaction error:", tx.error);
            reject(tx.error);
        };
    });

}

export async function addWhere(subject, where) {
    const tx = db.transaction("where", "readwrite");

    const store = tx.objectStore("where");

    const request = store.put(setWhere(subject, where));
    return new Promise((resolve, reject) => {
        request.onerror = () => {
            console.error("Add where error:", request.error);
            reject(request.error);
        };

        tx.oncomplete = () => {
            console.log("Add where transaction complete");
            resolve();
        };

        tx.onerror = () => {
            console.error("Transaction error:", tx.error);
            reject(tx.error);
        };
    });

}

export async function addMyProblemSets(myProblemSets) {
    const tx = db.transaction("myProblemSets", "readwrite");

    const store = tx.objectStore("myProblemSets");

    const request = store.put(setMyProblemSets(myProblemSets));
    return new Promise((resolve, reject) => {
        request.onerror = () => {
            console.error("Add myProblemSets error:", request.error);
            reject(request.error);
        };

        tx.oncomplete = () => {
            console.log("Add myProblemSets transaction complete");
            resolve();
        };

        tx.onerror = () => {
            console.error("Transaction error:", tx.error);
            reject(tx.error);
        };
    });

}

async function open() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("donut", 1);

        request.onupgradeneeded = (event) => {
            db = event.target.result;

            // テーブル（ObjectStore）作成
            const store = db.createObjectStore("quizes", {
                keyPath: "id",
                autoIncrement: true
            });
            const storeUnit = db.createObjectStore("unit", {
                keyPath: "unit",
                autoIncrement: false
            });
            const storeWhere = db.createObjectStore("where", {
                keyPath: "where",
                autoIncrement: false
            });
            const storeMyProblemSets = db.createObjectStore("myProblemSets", {
                keyPath: "myProblemSets",
                autoIncrement: false
            });


        };

        request.onsuccess = (event) => {
            db = event.target.result;
            console.log("DBオープン成功");
            resolve(request.result);
        };

        request.onerror = () => {
            console.log("DBオープン失敗");
            reject(request.error);
        };
    });

}

export async function getAllQuizes() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("quizes", "readonly");
        const store = transaction.objectStore("quizes");

        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

export async function getAllUnit() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("unit", "readonly");
        const store = transaction.objectStore("unit");

        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

export async function getAllWhere() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("where", "readonly");
        const store = transaction.objectStore("where");

        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

export async function getAllMyProblemSets() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("myProblemSets", "readonly");
        const store = transaction.objectStore("myProblemSets");

        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}


export function searchCustom(where, unit, myProblemSets, subject, number) {
    let filtered = null;
    if (subject) {
        filtered = allQuizes.filter(quiz => quiz.subject === subject);
    }
    if (!filtered || filtered.length === 0) {
        return false;
    }
    if (unit) {
        if (!unit === "指定なし") {
            filtered = filtered.filter(quiz => quiz.unit === unit);

        }
    }
    if (!filtered || filtered.length === 0) {
        return false;
    }
    if (where) {
        if (!where === "指定なし") {
            filtered = filtered.filter(quiz => quiz.book === where);
        }
    }
    if (!filtered || filtered.length === 0) {
        return false;
    }
    if (myProblemSets) {
        if (!myProblemSets === "指定なし") {
            filtered = filtered.filter(quiz => {
                return quiz.myProblemSets.includes(myProblemSets)
            });

        }
    }
    if (where) {
        filtered = filtered.filter(quiz => quiz.book === where);
    }
    if (!filtered || filtered.length === 0) {
        return false;
    }

    const result = filtered.slice(0, number);
    return result;
}



export function searchHomework(isDelinquent, isToday) {
    let filtered = null;
    if (isDelinquent) {
        filtered = allQuizes.filter(quiz => quiz.nextDate.setHours(0, 0, 0, 0) - state.today === 0);
    }
    if (!filtered || filtered.length === 0) {
        return false;
    }
    if (isToday) {
        filtered = filtered.filter(quiz => quiz.nextDate.setHours(0, 0, 0, 0) - state.today < 0);
    }
    if (!filtered || filtered.length === 0) {
        return false;
    }

    const result = filtered.slice(0, number);
    return result;
}



async function deleteDb() {
    return new Promise((resolve, reject) => {

        const request = indexedDB.deleteDatabase("donut");

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = () => {
            reject(request.error);
        };
        request.onblocked = () => {
            console.log("削除がブロックされた（別タブなどで開いてる）");
        };
    });
}


function setUnit(subject, unit) {
    const u = new Unit();
    u.subject = subject;
    u.unit = unit;
    return u;
}

function setWhere(subject, where) {
    const w = new Where();
    w.subject = subject;
    w.where = where;
    return w;
}
function setMyProblemSets(myProblemSets) {
    const m = new MyProblemSets();
    m.myProblemSets = myProblemSets;
    return m;
}

export function getNextDate(importance, progress, formerDate) {
    const nextDate = new Date(formerDate);
    if (importance === 1) {
        switch (progress) {
            case 0:
                nextDate.setDate(nextDate.getDate() + 5)
                return nextDate;

            case 1:
                nextDate.setDate(nextDate.getDate() + 7)
                return nextDate;

            case 2:
                nextDate.setDate(nextDate.getDate() + 10)
                return nextDate;

            case 3:
                nextDate.setDate(nextDate.getDate() + 15)
                return nextDate;

            case 4:
                nextDate.setDate(nextDate.getDate() + 30)
                return nextDate;


            default:
                nextDate.setDate(nextDate.getDate() + 50)
                return nextDate;
        }
    } else if (importance === 2) {
        switch (progress) {
            case 0:
                nextDate.setDate(nextDate.getDate() + 3)
                return nextDate;

            case 1:
                nextDate.setDate(nextDate.getDate() + 5)
                return nextDate;

            case 2:
                nextDate.setDate(nextDate.getDate() + 7)
                return nextDate;

            case 3:
                nextDate.setDate(nextDate.getDate() + 10)
                return nextDate;

            case 4:
                nextDate.setDate(nextDate.getDate() + 15)
                return nextDate;


            default:
                nextDate.setDate(nextDate.getDate() + 30)
                return nextDate;
        }
    } else if (importance === 1) {
        switch (progress) {
            case 0:
                nextDate.setDate(nextDate.getDate() + 1)
                return nextDate;

            case 1:
                nextDate.setDate(nextDate.getDate() + 3)
                return nextDate;

            case 2:
                nextDate.setDate(nextDate.getDate() + 5)
                return nextDate;

            case 3:
                nextDate.setDate(nextDate.getDate() + 7)
                return nextDate;

            case 4:
                nextDate.setDate(nextDate.getDate() + 10)
                return nextDate;


            default:
                nextDate.setDate(nextDate.getDate() + 15)
                return nextDate;
        }
    } else {
        switch (progress) {
            case 0:
                nextDate.setDate(nextDate.getDate() + 1)
                return nextDate;

            case 1:
                nextDate.setDate(nextDate.getDate() + 1)
                return nextDate;

            case 2:
                nextDate.setDate(nextDate.getDate() + 3)
                return nextDate;

            case 3:
                nextDate.setDate(nextDate.getDate() + 5)
                return nextDate;

            case 4:
                nextDate.setDate(nextDate.getDate() + 7)
                return nextDate;


            default:
                nextDate.setDate(nextDate.getDate() + 10)
                return nextDate;
        }
    }
}