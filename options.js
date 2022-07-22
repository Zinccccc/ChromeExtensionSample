let page = document.getElementById("buttonDiv");
let selectedClassName = "current";
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

// 버튼을 클릭하면 선택된 것으로 표시하고 선택사항을 저장한다.
function handleButtonClick(event) {
    // 기존에 설정되어있던 색상에서 스타일 해제
    let current = event.target.parentElement.querySelector(
      `.${selectedClassName}`  
    );
    if(current && current !== event.target) {
        current.classList.remove(selectedClassName);
    }

    // 버튼을 선택된 것으로 표시
    let color = event.target.dataset.color;
    event.target.classList.add(selectedClassName);
    chrome.storage.sync.set({ color });
}

// 옵션 페이지에 색상별 버튼을 추가한다.
function constructOptions(buttonColors) {
    chrome.storage.sync.get("color", (data) => {
        let currentColor = data.color;
        for(let buttonColor of buttonColors) {
            let button = document.createElement("button");
            button.dataset.color = buttonColor;
            button.style.backgroundColor = buttonColor;

            // 현재 선택된 버튼이면 표시한다
            if(buttonColor === currentColor) {
                button.classList.add(selectedClassName);
            }

            // 버튼에 click listner를 등록한다.
            button.addEventListener("click", handleButtonClick);
            page.appendChild(button);
        }
    });
}

constructOptions(presetButtonColors);