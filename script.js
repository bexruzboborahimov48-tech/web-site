const questions = [
    {
        question: "HTML nima uchun ishlatiladi?",
        options: [
            "Veb sahifa tuzilishini yaratish uchun",
            "Ma’lumotlar bazasini boshqarish uchun",
            "Kompyuter tezligini oshirish uchun"
        ],
        correct: 0
    },
    {
        question: "CSS ning asosiy vazifasi nima?",
        options: [
            "Server bilan ishlash",
            "Sayt dizayni va tashqi ko‘rinishini belgilash",
            "Ma’lumotlarni saqlash"
        ],
        correct: 1
    },
    {
        question: "JavaScript veb sahifalarda nima vazifani bajaradi?",
        options: [
            "Faqat dizaynni",
            "Interaktivlik va mantiqni ta’minlash",
            "Ma’lumotlarni saqlash"
        ],
        correct: 1
    },
    {
        question: "Onlayn ta’limning asosiy afzalligi nimada?",
        options: [
            "Faqat video ko‘rishda",
            "Joy va vaqtga bog‘liq bo‘lmasdan o‘rganishda",
            "Faqat test ishlashda"
        ],
        correct: 1
    },
    {
        question: "Bilimni mustahkamlash uchun qaysi usul eng samarali?",
        options: [
            "Faqat o‘qish",
            "Takrorlash va amaliyot",
            "Faqat yodlash"
        ],
        correct: 1
    },
    {
        question: "Kompyuterning asosiy qurilmalaridan biri qaysi?",
        options: [
            "Monitor",
            "Printer",
            "Skaner"
        ],
        correct: 0
    },
    {
        question: "Internet nima?",
        options: [
            "Bitta kompyuter",
            "Global axborot tarmog‘i",
            "Dasturiy ta’minot"
        ],
        correct: 1
    },
    {
        question: "Amir Temur tarixda qaysi soha bilan mashhur?",
        options: [
            "Adabiyot",
            "Harbiy va davlat boshqaruvi",
            "Tasviriy san’at"
        ],
        correct: 1
    },
    {
        question: "Algoritm nima?",
        options: [
            "Tasodifiy buyruqlar",
            "Muammoni yechish ketma-ketligi",
            "Faqat dastur kodi"
        ],
        correct: 1
    },
    {
        question: "Ta’limda testlar nima uchun muhim?",
        options: [
            "Faqat baho qo‘yish uchun",
            "Bilim darajasini aniqlash uchun",
            "Faqat vaqt o‘tkazish uchun"
        ],
        correct: 1
    }
];


let currentIndex = 0;
let answers = [];

const quiz = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");
const resultDiv = document.getElementById("result");

function showQuestion() {
    nextBtn.disabled = true;

    const q = questions[currentIndex];
    quiz.innerHTML = `
        <div class="question">
            <h2>${currentIndex + 1}. ${q.question}</h2>
            ${q.options.map((opt, i) =>
                `<div class="option" onclick="selectAnswer(${i}, this)">${opt}</div>`
            ).join("")}
        </div>
    `;

    nextBtn.innerText =
        currentIndex === questions.length - 1
            ? "Yakunlash"
            : "Keyingi savol";
}

function selectAnswer(index, element) {
    document.querySelectorAll(".option")
        .forEach(o => o.classList.remove("selected"));

    element.classList.add("selected");
    answers[currentIndex] = index;
    nextBtn.disabled = false;
}

nextBtn.onclick = () => {
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        showQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    let score = 0;
    quiz.innerHTML = "";

    questions.forEach((q, i) => {
        const correct = q.correct === answers[i];
        if (correct) score++;

        quiz.innerHTML += `
            <div class="question">
                <h2>${i + 1}. ${q.question}</h2>
                <div class="option ${correct ? "correct" : "wrong"}">
                    Sizning javobingiz: ${q.options[answers[i]] || "Javob berilmagan"}
                </div>
                <div class="option correct">
                    To‘g‘ri javob: ${q.options[q.correct]}
                </div>
            </div>
        `;
    });

    nextBtn.style.display = "none";
    resultDiv.innerHTML = `<strong>Natija:</strong> ${score} / ${questions.length} ball`;
}

showQuestion();


function showResult() {
    let score = 0;
    quiz.innerHTML = "";

    questions.forEach((q, i) => {
        const correct = q.correct === answers[i];
        if (correct) score++;

        quiz.innerHTML += `
            <div class="question">
                <h2>${i + 1}. ${q.question}</h2>
                <div class="option ${correct ? "correct" : "wrong"}">
                    Sizning javobingiz: ${answers[i] != null ? q.options[answers[i]] : "Javob berilmagan"}
                </div>
                <div class="option correct">
                    To‘g‘ri javob: ${q.options[q.correct]}
                </div>
            </div>
        `;
    });

    resultDiv.innerHTML = `<strong>Natija:</strong> ${score} / ${questions.length} ball`;

    // Boshiga qaytish tugmasini shu existing button orqali qilamiz
    nextBtn.style.display = "block";
    nextBtn.innerText = "Boshiga qaytish"; // tugma matni o‘zgardi
    nextBtn.disabled = false;
    nextBtn.onclick = resetQuiz; // tugma bosilganda resetQuiz funksiyasi ishlaydi
}

function resetQuiz() {
    currentIndex = 0;
    answers = [];
    resultDiv.innerHTML = "";
    showQuestion(); // testni boshidan boshlaymiz

    // Keyingi savol tugmasini asl holatiga qaytaramiz
    nextBtn.innerText = "Keyingi savol";
    nextBtn.onclick = () => {
        if (currentIndex < questions.length - 1) {
            currentIndex++;
            showQuestion();
        } else {
            showResult();
        }
    };
}

