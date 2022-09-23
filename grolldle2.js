import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
// let rightGuessString = WORDS[Math.floor(Math.random() * 4)];
let rightGuessString = "loupe";

// function openMessage() {
//   toastr.options = {
//     closeButton: true,
//     debug: false,
//     newestOnTop: false,
//     progressBar: false,
//     positionClass: "toast-bottom-center",
//     preventDuplicates: false,
//     onclick: null,
//     showDuration: "1000",
//     hideDuration: "1000",
//     timeOut: false,
//     extendedTimeOut: "1000",
//     showEasing: "swing",
//     hideEasing: "linear",
//     showMethod: "fadeIn",
//     hideMethod: "fadeOut",
//     tapToDismiss: true,
//   };
//   toastr.info(
//     "You should know that the Grolldle contains all of the typical five-letter words of the English lexicon AND words that are in our vocabulary as residents of Galway. Think places. Good luck! xoxo",
//     "Solve today's Grolldle for your first Birthday surprise! ;)"
//   );
// }

// function nimmoSuccessMsg() {
//   toastr.options = {
//     closeButton: true,
//     debug: false,
//     newestOnTop: false,
//     progressBar: false,
//     positionClass: "toast-bottom-center",
//     preventDuplicates: false,
//     onclick: null,
//     showDuration: "300",
//     hideDuration: "1000",
//     timeOut: 0,
//     extendedTimeOut: 0,
//     showEasing: "swing",
//     hideEasing: "linear",
//     showMethod: "fadeIn",
//     hideMethod: "fadeOut",
//     tapToDismiss: true,
//   };
//   toastr.success(
//     `You guessed right, smart cookie :) But you know what's better than cookies? Dinner at Ard Bia at 7pm on Friday. Go on, check out the <a href='http://www.ardbia.com/menus' target='blank'>menu</a> to get you excited`
//   );
// }

// function nimmoErrMsg() {
//   toastr.options = {
//     closeButton: true,
//     debug: false,
//     newestOnTop: false,
//     progressBar: false,
//     positionClass: "toast-bottom-center",
//     preventDuplicates: false,
//     onclick: null,
//     showDuration: "300",
//     hideDuration: "1000",
//     timeOut: 0,
//     extendedTimeOut: 0,
//     showEasing: "swing",
//     hideEasing: "linear",
//     showMethod: "fadeIn",
//     hideMethod: "fadeOut",
//     tapToDismiss: true,
//   };
//   toastr.error(
//     `Okay, that was kind of hard, but I did enjoy the idea of making a custom Wordle game just to throw you for a loop... whoops, it's your birthday, supposed to be nice..;) So how about dinner at Nimmo's at Ard Bia at 7pm on Friday? Go on, check out the <a href='http://www.ardbia.com/menus' target='blank'>menu</a> to get yourself excited.`,
//     `The correct guess was "NIMMO"!`
//   );
// }

function initBoard() {
  let board = document.getElementById("game-board");

  for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
    let row = document.createElement("div");
    row.className = "letter-row";

    for (let j = 0; j < 5; j++) {
      let box = document.createElement("div");
      box.className = "letter-box";
      row.appendChild(box);
    }

    board.appendChild(row);
  }
}

function insertLetter(pressedKey) {
  if (nextLetter === 5) {
    return;
  }
  pressedKey = pressedKey.toLowerCase();

  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = row.children[nextLetter];
  animateCSS(box, "pulse");
  box.textContent = pressedKey;
  box.classList.add("filled-box");
  currentGuess.push(pressedKey);
  nextLetter += 1;
}

function deleteLetter() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = row.children[nextLetter - 1];
  box.textContent = "";
  box.classList.remove("filled-box");
  currentGuess.pop();
  nextLetter -= 1;
}

function checkGuess() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let guessString = "";
  let rightGuess = Array.from(rightGuessString);

  for (const val of currentGuess) {
    guessString += val;
  }

  if (guessString.length != 5) {
    toastr.error("Not enough letters!");
    return;
  }

  if (!WORDS.includes(guessString)) {
    toastr.error("Word not in list!");
    return;
  }

  for (let i = 0; i < 5; i++) {
    let letterColor = "";
    let box = row.children[i];
    let letter = currentGuess[i];

    let letterPosition = rightGuess.indexOf(currentGuess[i]);
    // is letter in the correct guess
    if (letterPosition === -1) {
      letterColor = "#3a3a3c";
    } else {
      // now, letter is definitely in word
      // if letter index and right guess index are the same
      // letter is in the right position
      if (currentGuess[i] === rightGuess[i]) {
        // shade green
        letterColor = "#538c4f";
      } else {
        // shade box yellow
        letterColor = "#b69f3c";
      }

      rightGuess[letterPosition] = "#";
    }

    let delay = 250 * i;
    setTimeout(() => {
      //flip box
      animateCSS(box, "flipInX");
      //shade box
      box.style.backgroundColor = letterColor;
      box.style.borderColor = letterColor;
      shadeKeyBoard(letter, letterColor);
    }, delay);
  }

  if (guessString === rightGuessString) {
    toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: "toast-bottom-center",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: 0,
      extendedTimeOut: 0,
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
      tapToDismiss: true,
    };

    toastr.success(
      `You guessed correct! Check behind <a target="_blank" href="loupe2.html">this door</a> if you fancy sappy birthday messages and metaphors :)`
    );
    guessesRemaining = 0;
    return;
  } else {
    guessesRemaining -= 1;
    currentGuess = [];
    nextLetter = 0;

    if (guessesRemaining === 0) {
      toastr.options = {
        closeButton: true,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-bottom-center",
        preventDuplicates: false,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: 0,
        extendedTimeOut: 0,
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
        tapToDismiss: true,
      };
      toastr.error(
        `Are these wrong answer messages a complete waste of time? I hope not. If you're reading this, you either guessed wrong <a target="blank" href="https://miro.medium.com/max/1400/1*KDq7nthm2mTfq0qgSdxQrA.jpeg">on purpose</a> just to get here, or I've actually got you on one. I'd send you on a wild link chase, but I'm bad at keeping secrets so let's do more <a target="_blank" href="loupe2.html">birthday</a> things :) `
      );
      // toastr.error("You've run out of guesses! Game over!");
      toastr.info(`The right word was: "${rightGuessString}"`);
    }
  }
}

function shadeKeyBoard(letter, color) {
  for (const elem of document.getElementsByClassName("keyboard-button")) {
    if (elem.textContent === letter) {
      let oldColor = elem.style.backgroundColor;
      if (oldColor === "#538c4f") {
        return;
      }

      if (oldColor === "#b69f3c" && color !== "#538c4f") {
        return;
      }

      elem.style.backgroundColor = color;
      elem.style.borderColor = color;
      break;
    }
  }
}

initBoard();

document.addEventListener("keyup", (e) => {
  if (guessesRemaining === 0) {
    return;
  }

  let pressedKey = String(e.key);
  if (pressedKey === "Backspace" && nextLetter !== 0) {
    deleteLetter();
    return;
  }

  if (pressedKey === "Enter") {
    checkGuess();
    return;
  }

  let found = pressedKey.match(/[a-z]/gi);
  if (!found || found.length > 1) {
    return;
  } else {
    insertLetter(pressedKey);
  }
});

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
  const target = e.target;

  if (!target.classList.contains("keyboard-button")) {
    return;
  }
  let key = target.textContent;

  if (key === "Del") {
    key = "Backspace";
  }

  document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
});

const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element;
    node.style.setProperty("--animate-duration", "0.3s");

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });
