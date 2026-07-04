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
}

function renderHome() {
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