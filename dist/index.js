(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define('quickmaths', factory) :
            (global.quickmaths = factory());
}(this, (function () {
    'use strict';
    var elements = {
        question: document.querySelector("#question"),
        input: document.querySelector("#input"),
        emoji: document.querySelector("#emoji")
    };
    var record = {
        correct: [],
        incorrect: [],
        history: []
    };
    var state = {
        correctAnswer: undefined,
        type: undefined,
        min: 1,
        max: 50
    };
    var emojis = {
        bad: ["👿", "😾", "😡", "👎"],
        negative: [
            "😠",
            "😧",
            "💔",
            "😱",
            "🙀",
            "💩",
            "😈",
            "😭",
            "😟",
            "😰",
            "😖",
            "😕",
            "😢",
            "😿",
            "😞",
            "🤕",
            "😨",
            "😳",
            "☹️",
            "😬",
            "🤥",
            "🤢",
            "😮",
            "😣",
            "💀",
            "☠️",
            "🤧",
            "😫",
            "😒",
            "😩",
            "😥",
            "😵",
            "🤒",
            "😦",
            "👻",
            "😯",
            "😷",
            "🤓",
            "😔",
            "👊",
            "🙄",
            "🙁",
            "😜",
            "😓",
            "🤔",
            "🤐"
        ],
        neutral: ["🤡", "🤤", "😑", "🤑", "😐", "😶", "😴", "😪", "😝", "😤", "🙃"],
        positive: [
            "🤝",
            "😆",
            "🙏",
            "🙂",
            "😛",
            "😎",
            "😲",
            "😊",
            "🤠",
            "🤞",
            "😁",
            "😀",
            "🤗",
            "👌",
            "☺️",
            "😌",
            "😄",
            "😸",
            "😃",
            "😺",
            "😏",
            "😼",
            "😅",
            "👍",
            "✌️",
            "💯",
            "🖤",
            "💙",
            "👏",
            "💘",
            "💝",
            "💚",
            "❤️",
            "😍",
            "😻",
            "💓",
            "💗",
            "😇",
            "😂",
            "😹",
            "💜",
            "💞",
            "💖",
            "💕",
            "😉",
            "💛",
            "😋",
            "🙌",
            "🤣"
        ]
    };
    function askQuestion() {
        var min = state.min;
        var max = state.max;
        var number1 = Math.floor(Math.random() * (max - min + 1)) + min;
        var number2 = Math.floor(Math.random() * (max - min + 1)) + min;
        elements.input.value = "";
        switch (state.type) {
            case "multiplication":
                elements.question.innerHTML = number1 + " \u00D7 " + number2;
                return number1 * number2;
                break;
            case "addition":
            default:
                elements.question.innerHTML = number1 + " + " + number2;
                return number1 + number2;
        }
    }
    function showEmoji(key) {
        clearTimeout(state.emojiTimeout);
        elements.emoji.style = "";
        state.emojiTimeout = setTimeout(function () {
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
        }
        else {
            record.incorrect.push(elements.question.innerHTML);
            record.history.push(false);
            showEmoji("negative");
        }
    }
    elements.input.onkeypress = function (e) {
        if (e.key === "Enter") {
            if (parseInt(elements.input.value) === state.correctAnswer) {
                answerWas(true);
                state.correctAnswer = askQuestion();
            }
            else {
                answerWas(false);
                elements.input.value = "";
            }
        }
    };
    var index = {
        elements: elements,
        record: record,
        state: state,
        askQuestion: askQuestion
    };
    return index;
})));
