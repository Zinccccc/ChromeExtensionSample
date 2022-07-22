// 사용자 정의 색상으로 배경색을 설정한다.
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// 버튼이 클릭되면 setPageBackgroundColor를 현재 페이지에 적용한다.
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id },
        function: setPageBackgroundColor,
    });
});

// 아래 함수는 현재 페이지 내부의 content stript로서 실행된다.
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}