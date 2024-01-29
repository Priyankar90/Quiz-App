const questions = [
    {
        question:"Who is the mascot of Pokemon?",
        answers:[
            {text:"Pikachu", correct:true},
            {text:"Charmander", correct:false},
            {text:"Bulbasaur", correct:false},
            {text:"Squirtle", correct:false},
        ]
    },
    {
        question:"Which Pokemon type is super effective against Water types?",
        answers:[
            {text:"Grass", correct:true},
            {text:"Electric", correct:false},
            {text:"Fire", correct:false},
            {text:"Ground", correct:false},
        ]
    },
    {
        question:"What is the name of the professor who gives you your first Pokemon in most Pokemon games?",
        answers:[
            {text:"Professor Oak", correct:true},
            {text:"Professor Birch", correct:false},
            {text:"Professor Elm", correct:false},
            {text:"Professor Rowan", correct:false},
        ]
    },
    {
        question:"Which Pokemon evolves into Gyarados?",
        answers:[
            {text:"Magikarp", correct:true},
            {text:"Feebas", correct:false},
            {text:"Carvanha", correct:false},
            {text:"Goldeen", correct:false},
        ]
    },
    {
        question:"What is the name of the criminal organization in the Pokemon series?",
        answers:[
            {text:"Team Rocket", correct:true},
            {text:"Team Magma", correct:false},
            {text:"Team Aqua", correct:false},
            {text:"Team Galactic", correct:false},
        ]
    },
    {
        question:"Which Pokemon is known as the 'Fire Mouse'?",
        answers:[
            {text:"Charmander", correct:false},
            {text:"Pikachu", correct:false},
            {text:"Cyndaquil", correct:true},
            {text:"Torchic", correct:false},
        ]
    },
    {
        question:"What is the evolved form of Eevee when exposed to a Thunder Stone?",
        answers:[
            {text:"Vaporeon", correct:false},
            {text:"Jolteon", correct:true},
            {text:"Flareon", correct:false},
            {text:"Espeon", correct:false},
        ]
    },
    {
        question:"Which Legendary Pokemon is known for controlling time?",
        answers:[
            {text:"Dialga", correct:true},
            {text:"Palkia", correct:false},
            {text:"Giratina", correct:false},
            {text:"Arceus", correct:false},
        ]
    },
    {
        question:"What is the name of the Pokemon that evolves into Gengar when traded?",
        answers:[
            {text:"Haunter", correct:true},
            {text:"Gastly", correct:false},
            {text:"Drowzee", correct:false},
            {text:"Cubone", correct:false},
        ]
    },
    {
        question:"In Pokemon, what type is super effective against Psychic types?",
        answers:[
            {text:"Dark", correct:true},
            {text:"Ghost", correct:false},
            {text:"Fighting", correct:false},
            {text:"Bug", correct:false},
        ]
    }
];



const question_element = document.getElementById("question");
const answer_buttons = document.getElementById("answer-buttons");
const next_button = document.getElementById("next-btn");
const timer_display = document.getElementById("timer-display");

let current_question_index = 0;
let score = 0;
let timer;

const showQuestion = () => {
    resetState();
    let current_question = questions[current_question_index];
    let question_no = current_question_index + 1;
    question_element.innerHTML = question_no + ". " + current_question.question;

    current_question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answer_buttons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    startTimer();
}

const resetState = () => {
    clearInterval(timer);
    next_button.style.display = "none";
    timer_display.textContent = 5; 
    while (answer_buttons.firstChild) {
        answer_buttons.removeChild(answer_buttons.firstChild);
    }
}

const startQuiz = () => {
    current_question_index = 0;
    score = 0;
    next_button.innerHTML = "Next";
    showQuestion();
}

const selectAnswer = (e) => {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answer_buttons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
        next_button.style.display = "block";
        clearInterval(timer); // Stop the timer after answering
    });
}

next_button.addEventListener("click", () => {
    if (current_question_index < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

const handleNextButton = () => {
    current_question_index++;
    if (current_question_index < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

const showScore = () => {
    resetState();
    question_element.innerHTML = ` Your scored ${score} out of ${questions.length}!`;
    next_button.innerHTML = "Play Again";
    next_button.style.display = "block";
}

const startTimer = () => {
    let timeLeft = 5;
    timer = setInterval(() => {
        timeLeft--;
        timer_display.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            handleNextButton();
        }
    }, 1000);
}

startQuiz();