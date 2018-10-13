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
        history: [],
        previousQuestion: ""
    };
    function getQuerys() {
        var query = {};
        var pairs = document.location.search.substr(1).split("&");
        pairs.forEach(function (pair) {
            var _a = pair.split("="), key = _a[0], value = _a[1];
            query[decodeURIComponent(key)] = JSON.parse(decodeURIComponent(value || ""));
        });
        return query;
    }
    var queries = getQuerys();
    var state = {
        correctAnswer: undefined,
        type: queries.type,
        range: queries.range
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
    function integerInRange(range) {
        if (Number.isInteger(range)) {
            return range;
        }
        else if (Array.isArray(range)) {
            var min = range[0], max = range[1];
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
    function askQuestion() {
        var number1 = integerInRange(state.range[0]);
        var number2 = integerInRange(state.range[1]);
        elements.input.value = "";
        switch (state.type) {
            case "multiplication":
                var nextQuestion = number1 + " \u00D7 " + number2;
                if (nextQuestion === record.previousQuestion) {
                    return askQuestion();
                }
                elements.question.innerHTML = record.previousQuestion = nextQuestion;
                return number1 * number2;
                break;
            case "addition":
            default:
                var nextQuestion = number1 + " + " + number2;
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
        state.emojiTimeout = setTimeout(function () {
            elements.emoji.style = "opacity:0;";
        }, 500);
        elements.emoji.innerHTML =
            emojis[key][Math.floor(Math.random() * emojis[key].length)];
    }
    function check(answered) {
        var correct = answered === state.correctAnswer;
        record.history.push({
            correct: correct,
            question: record.previousQuestion,
            answered: answered
        });
        if (correct) {
            state.correctAnswer = askQuestion();
            showEmoji("positive");
        }
        else {
            elements.input.value = "";
            showEmoji("negative");
        }
    }
    document.onkeypress = function (e) {
        if (e.key === "Enter") {
            check(parseInt(elements.input.value));
        }
        else if (e.code === "Space") {
            alert("paused.");
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
