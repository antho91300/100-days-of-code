const tabsTitles = [...document.getElementsByClassName("tab-title")];
const tabsContents = [...document.getElementsByClassName("tab-content")];

tabsTitles.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    const tabTarget = tab.dataset.tab;
    if (!tab.classList.contains("open")){
        tabsTitles.forEach((item) => { item.classList.remove("open") });
        tabsContents.forEach((content) => { content.classList.remove("open") });
    }
    tab.classList.toggle("open");
    tabsContents.forEach((tabContent) => {
        if (tabContent.dataset.tab == tabTarget) {
          tabContent.classList.toggle("open");
        }
      });
  });
});
