import elements from "./elements.js";
import record from "./record.js";
import state from "./state.js";
import emojis from "./emojis.js";

function integerInRange(range) {
  if (Number.isInteger(range)) {
    return range;
  } else if (Array.isArray(range)) {
    const [min, max] = range;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

function askQuestion() {
  const number1 = integerInRange(state.range[0]);
  const number2 = integerInRange(state.range[1]);
  elements.input.value = "";
  switch (state.type) {
    case "multiplication":
      const nextQuestion = `${number1} × ${number2}`;
      if (nextQuestion === record.previousQuestion) {
        return askQuestion();
      }
      elements.question.innerHTML = record.previousQuestion = nextQuestion;
      return number1 * number2;
      break;
    case "addition":
    default:
      const nextQuestion = `${number1} + ${number2}`;
      if (nextQuestion === record.previousQuestion) {
        return askQuestion();
      }
      elements.question.innerHTML = record.previousQuestion = nextQuestion;
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

function check(answered) {
  const correct = answered === state.correctAnswer;
  record.history.push({
    correct,
    question: record.previousQuestion,
    answered
  });
  if (correct) {
    state.correctAnswer = askQuestion();
    showEmoji("positive");
  } else {
    elements.input.value = "";
    showEmoji("negative");
  }
}

document.onkeypress = e => {
  if (e.key === "Enter") {
    check(parseInt(elements.input.value));
  } else if (e.code === "Space") {
    alert("paused.");
  }
};

export default {
  elements,
  record,
  state,
  askQuestion
};
