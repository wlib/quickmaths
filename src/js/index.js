import elements from "./elements.js";
import record from "./record.js";
import state from "./state.js";
import emojis from "./emojis.js";

function askQuestion() {
  const min = state.min;
  const max = state.max;
  const number1 = Math.floor(Math.random() * (max - min + 1)) + min;
  const number2 = Math.floor(Math.random() * (max - min + 1)) + min;
  elements.input.value = "";
  switch (state.type) {
    case "multiplication":
      elements.question.innerHTML = `${number1} × ${number2}`;
      return number1 * number2;
      break;
    case "addition":
    default:
      elements.question.innerHTML = `${number1} + ${number2}`;
      return number1 + number2;
  }
}

function showEmoji(key) {
  clearTimeout(state.emojiTimeout);
  elements.emoji.style = "";
  state.emojiTimeout = setTimeout(function() {
    elements.emoji.style = "opacity:0;";
  }, 500);
  elements.emoji.innerHTML =
    emojis[key][Math.floor(Math.random() * emojis[key].length)];
}

function answerWas(correct) {
  if (correct) {
    record.correct.push(elements.question.innerHTML);
    record.history.push(true);
    showEmoji("positive");
  } else {
    record.incorrect.push(elements.question.innerHTML);
    record.history.push(false);
    showEmoji("negative");
  }
}

elements.input.onkeypress = e => {
  if (e.key === "Enter") {
    if (parseInt(elements.input.value) === state.correctAnswer) {
      answerWas(true);
      state.correctAnswer = askQuestion();
    } else {
      answerWas(false);
      elements.input.value = "";
    }
  }
};

export default {
  elements,
  record,
  state,
  askQuestion
};
