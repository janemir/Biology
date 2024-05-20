import {DATA} from './TestData.js';

var minutes = parseInt(sessionStorage.getItem('minutes'), 10);
var seconds = parseInt(sessionStorage.getItem('seconds'), 10);
const buttons = document.querySelectorAll('.btn-questions');
const timer_box = document.getElementById('timer-box');
const timer = document.getElementById('timer');
const timer_container = document.getElementById('timer-container');
const mix_questions = sessionStorage.getItem('mix-q');
const mix_answers = sessionStorage.getItem('mix-a');


//если таймер не установлен, скрывает его рамку
if (isNaN(seconds) && isNaN(minutes)) {
    timer_box.style.display = 'none';
} else {
    timer.textContent = formatTime(minutes, seconds);
    const timerInterval = setInterval(countdown, 1000);
}

//перемешать вопросы (если стоял чекбокс)
if(mix_questions === 'true'){
    DATA.mixQuestions();
}

//записать вопросы в хранилище
sessionStorage.setItem('q-list', JSON.stringify(DATA.getQuestions()));

//перемешать ответы
if(mix_answers === 'true'){
    DATA.mixAnswers();
}

//удалить ненужные переменные из хранилища
sessionStorage.removeItem('mix-q');
sessionStorage.removeItem('mix-a');
sessionStorage.removeItem('minutes');
sessionStorage.removeItem('seconds');

btnCheckColor();
questionRender();
document.getElementById('complete-test').addEventListener('click', testOver);

//форматирование вывода времени
function formatTime(minutes, seconds) {
    return (minutes < 10 ? '0' : " ") + minutes + ":"
            + (seconds < 10 ? '0' : "") + seconds;
}

//обновление таймера
function countdown(timerInterval) {
    if (minutes === 0 && seconds === 0) {
        clearInterval(timerInterval);
        testOver();
        return;
    }
    if (seconds === 0) {
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
    timer.textContent = formatTime(minutes, seconds);
}

//изменения цвета кнопок, по которым нажали для просмотра вопроса
function btnCheckColor() {
    buttons.forEach((button, index) => {
        button.addEventListener('click', function () {
            // Удаляем класс active-question у всех кнопок
            buttons.forEach((btn) => {
                btn.classList.remove('active-question');
            });
            // Добавляем класс active-question нажатой кнопке
            button.classList.add('active-question');

            // Проверяем, был ли дан ответ на вопрос
            const questionText = DATA.questions[index].text;
            if (DATA.UsersAnswers.hasOwnProperty(questionText)) {
                // Если ответ был дан, меняем цвет кнопки на зеленый
                button.classList.remove('checked-btn');
                button.classList.add('answered-btn');
            } else {
                // Если ответ не был дан, меняем цвет кнопки на красный
                button.classList.remove('answered-btn');
                button.classList.add('checked-btn');
            }
        });
    });
}

//отображение вопроса и вариантов ответа
function questionRender() {
    DATA.render(0);
    buttons.forEach((button, index) => {
        button.addEventListener('click', function () {
            DATA.render(index);
        });
    });
}

/*завершает тест, сохраняя ответы пользователя, переходит на страницу
с результатами*/
function testOver(){
    DATA.saveUsersAnswers();
    window.location.href = 'results.html';
}