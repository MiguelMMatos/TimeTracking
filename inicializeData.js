const timeSelectors = document.querySelectorAll("div[data-timeSelector]");
const currentHours = document.querySelector("#CurrentHours")
const lastHours = document.querySelector("#LastHours")
const allCurrentHours = document.querySelectorAll("#CurrentHours")
const allLastHours = document.querySelectorAll("#LastHours")

let data;
let currentSelected = timeSelectors[0];

fetch("data.json")
    .then(response => response.json())
    .then(json => data = json)
    .then(setValuesOnCard)


function clearSelected() {
    if (currentSelected == null) return;
    currentSelected.classList.remove("selected")
}

function handleClick(e) {
    clearSelected()
    currentSelected = e.target;
    currentSelected.classList.add("selected");
    setValuesOnCard()
}

function setValuesOnCard() {
    data.forEach((time, index) => {
        const currentData = time.timeframes[currentSelected.innerHTML.toLowerCase()]
        const hour = currentData.current
        const last = currentData.previous

        allCurrentHours[index].innerHTML = hour + "hrs";
        allLastHours[index].innerHTML = "Last " + currentSelected.innerHTML + " - " + last + "hrs";
    })
}

timeSelectors.forEach(time => time.addEventListener("click", handleClick))