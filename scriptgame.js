let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
//Комбинации выигрыша
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];
//Игрок х начинает первый
let xTurn = true;
let count = 0;

//Отключить все кнопки
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  //включить всплывающее окно
  popupRef.classList.remove("hide");
};

//Включить все кнопки (для новой игры и перезапуска)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //выключить всплывающее окно
  popupRef.classList.add("hide");
};

//Эта функция выполняется, когда игрок выигрывает
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Выиграл";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Выиграл";
  }
};

//Функция ничья
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> Ничья";
};

//Новая игра
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

//Логика победы
const winChecker = () => {
  //Перебрать все выигрышные шаблоны
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    //Проверка, заполнены ли элементы.
    //Если 3 пустых элемента одинаковы и дадут выигрыш, как было бы
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        //Если все 3 кнопки имеют одинаковые значения, то передайте значение в winFunction
        winFunction(element1);
      }
    }
  }
};

//Отображение X/O по щелчку
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      //Отображение х
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      //Отображение у
      element.innerText = "O";
      element.disabled = true;
    }
    //Увеличивать количество при каждом клике
    count += 1;
    if (count == 9) {
      drawFunction();
    }
    //Увеличивать количество при каждом клике
    winChecker();
  });
});
//Включить кнопки и отключить всплывающие окна при загрузке страницы
window.onload = enableButtons;