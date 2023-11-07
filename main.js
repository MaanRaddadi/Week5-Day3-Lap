const questions = [
  {
    questionTitle: "ماهي عاصمه السعوديه؟",
    options: ["الرياض", "جدة", "القصيم", "الكويت"],
    keyAnswer: "الرياض",
  },
  {
    questionTitle: "افضل نادي فالعالم",
    options: ["الاهلي", "النصر", "الهلال", "التعاون"],
    keyAnswer: "الهلال",
  },
  {
    questionTitle: "ماهو افضل لون",
    options: ["احمر", "اصفر", "ازرق", "وردي"],
    keyAnswer: "ازرق",
  },
  {
    questionTitle: "ماهو ناتج ضرب 5*13",
    options: ["70", "60", "65", "55"],
    keyAnswer: "65",
  },
  {
    questionTitle: "ما هو اسم المعسكر ؟",
    keyAnswer: "الويب",
  },
  {
    questionTitle: "عدد شهور السنة ؟",
    keyAnswer: "12",
  },
];

const qustionsCont = document.getElementById("qustions-cont");
const qustionsText = document.getElementById("qustions-text");
const options = document.getElementById("options");
const timeLeft = document.getElementById("time-left");
const resultCont = document.getElementById("result-cont");
const resultText = document.getElementById("result-text");
const submit = document.createElement("button");
const input = document.createElement("input");

submit.innerText = "Submit";
let currentIndex = 0;
let score = 0;
let timer = 10;
let countDown;

showQuestion(currentIndex);
showTimer();
function showQuestion(index) {
  input.value = "";
  const questin = questions[index];
  qustionsText.innerText = questin.questionTitle;
  options.innerHTML = "";

  if (!questions[index].hasOwnProperty("options")) {
    options.insertAdjacentElement("afterbegin", input);
    options.insertAdjacentElement("afterbegin", submit);
    submit.addEventListener("click", () => {
      checkAnswer(input.value, questions[index].keyAnswer);
    });
  } else {
    questin.options.forEach((option) => {
      const b = document.createElement("button");
      b.textContent = option;
      options.appendChild(b);

      b.addEventListener("click", () => {
        checkAnswer(option, questin.keyAnswer);
      });
      // options.insertAdjacentHTML("afterbegin", `<button>${option}</button>`);
    });
  }
}

function showTimer() {
  countDown = setInterval(function () {
    timer--;
    timeLeft.textContent = timer;
    if (timer <= 0) {
      clearInterval(countDown);
      checkAnswer("", null);
    }
  }, 1000);
}

function checkAnswer(myAnswer, correctAnswer) {
  currentIndex++;
  clearInterval(countDown);
  showTimer();
  if (myAnswer === correctAnswer) {
    score++;
  }
  if (currentIndex < questions.length) {
    timer = 10;
    showQuestion(currentIndex);
    timeLeft.textContent = timer;
  } else {
    showResult();
  }
}

function showResult() {
  qustionsCont.style.display = "none";
  resultCont.style.display = "flex";
  resultText.textContent = `Your Score is ${score} of ${questions.length}`;
}
