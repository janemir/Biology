export class Question {
    constructor(text, type, answers = []) {
        this.text = text;
        this.answers = answers;
        this.type = type;
    }
    //перемешивает ответы на вопрос
    mixAnswers() {
        if (this.type !== 'free') {
            const copy_answers = [...this.answers];
            for (let i = copy_answers.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [copy_answers[i], copy_answers[j]] =
                        [copy_answers[j], copy_answers[i]];
            }
            this.answers = copy_answers;
        }
        return this.answers;
    }
    //получить правильный ответ на вопрос
    getCorrectAnswer() {
        let correct = [];
        for (let i = 0; i < this.answers.length; i++) {
            if (this.answers[i].correct === true) {
                correct.push(this.answers[i].text);
            }
        }
        return correct;
    }
}

export class Answer {
    constructor(text, correct) {
        this.text = text;
        this.correct = correct;
    }
}


export class Test {
    constructor(questions = []) {
        this.questions = questions;
        this.UsersAnswers = {};
    }
    //получить массив из вопросов теста
    getQuestions() {
        let list_questions = [];
        for (let i = 0; i < this.questions.length; i++) {
            list_questions.push(this.questions[i].text);
        }
        return list_questions;
    }
    //перемешивает вопросы в тесте
    mixQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] =
                    [this.questions[j], this.questions[i]];
        }
        return this.questions;
    }
    //перемешивает ответы для каждого вопроса в тесте
    mixAnswers() {
        this.questions.forEach((question) => {
            question.mixAnswers();
        });
    }
    //отображает вопрос на странице
    displayQuestion(index) {
        const question_text = document.getElementById('question-text');
        question_text.innerHTML = '';
        question_text.textContent = this.questions[index].text;
    }
    /*отображает варианты ответов или поле для ввода на странице
     и сохраняет ответы пользователя в объект*/
    displayAnswers(index) {
        const answers_text = document.getElementById('answers-box');
        const qs = this.questions[index].text;
        answers_text.innerHTML = '';
        switch (this.questions[index].type) {
            case 'radio':
            case 'checkbox':
                this.questions[index].answers.forEach((answer, id) => {
                    const input = document.createElement('input');
                    input.type = this.questions[index].type;
                    input.name = 'group';
                    input.id = 'answer' + id;
                    const label = document.createElement('label');
                    label.textContent = answer.text;
                    label.htmlFor = 'answer' + id;
                    label.style.fontSize = "25px";
                    label.style.margin = "10px";
                    answers_text.appendChild(input);
                    answers_text.appendChild(label);
                    answers_text.appendChild(document.createElement('br'));
                    input.addEventListener('change', () => {
                        if (input.type === 'radio') {
                            if (input.checked) {
                                Object.assign(this.UsersAnswers, {[qs]:
                                            label.textContent});
                                this.setcolor(index);
                                console.log(this.UsersAnswers);
                            }
                        } else if (input.type === 'checkbox') {

                            const btn = document.getElementById('btn-' + index);
                            if (input.checked) {
                                if (!(this.UsersAnswers[qs] instanceof Array)) {
                                    this.UsersAnswers
                                    [qs] = new Array();
                                    this.UsersAnswers[qs].push
                                            (label.textContent);
                                    console.log(this.UsersAnswers);
                                    this.setcolor(index);
                                } else {
                                    this.UsersAnswers[qs].push
                                            (label.textContent);
                                    console.log(this.UsersAnswers);
                                    this.setcolor(index);
                                }
                            } else {
                                const indextoremove = this.UsersAnswers
                                [qs].indexOf
                                        (label.textContent);
                                this.UsersAnswers[qs].splice
                                        (indextoremove, 1);
                                btn.classList.remove('answered-btn');
                                btn.classList.add('checked-btn');
                                this.setcolor(index);
                                console.log(this.UsersAnswers);

                            }

                        }
                    });
                });
                break;
            case 'select':
                const select = document.createElement('select');
                select.style.width = '300px';
                select.style.height = '30px';
                select.style.margin = '10px';
                const defaultOption = document.createElement('option');
                defaultOption.disabled = true;
                defaultOption.selected = true;
                defaultOption.hidden = true;
                defaultOption.textContent = 'Выберите вариант';
                select.appendChild(defaultOption);
                this.questions[index].answers.forEach((answer) => {
                    const option = document.createElement('option');
                    option.style.fontSize = '25px';
                    option.value = answer.text;
                    option.textContent = answer.text;
                    select.appendChild(option);
                });
                answers_text.appendChild(select);
                select.addEventListener('change', () => {
                    const selectedValue = select.value;
                    this.UsersAnswers[qs] = selectedValue;
                    this.setcolor(index);
                    console.log(this.UsersAnswers);
                });
                break;
            case 'free':
                const input = document.createElement('input');
                input.type = 'number';
                input.inputMode = 'numeric';
                input.style.width = '300px';
                input.style.height = '30px';
                input.style.margin = '10px';
                answers_text.appendChild(input);
                input.addEventListener('input', () => {
                    input.value = input.value.replace(/\D/g, '');
                    const inputValue = input.value;
                    this.UsersAnswers[qs] = inputValue;
                    this.setcolor(index);
                    console.log(this.UsersAnswers);
                });
                break;
            default:
                console.log('error');
                break;
        }
    }
    /*отображает ответ и вопрос
     проверяет, отвечал ли пользователь на данный вопрос
     если отвечал, то восстанавливает его ответ из объекта*/
    render(index) {
        const qs = this.questions[index].text;
        this.displayQuestion(index);
        this.displayAnswers(index);
        if (this.UsersAnswers.hasOwnProperty(qs)) {
            const labels = document.querySelectorAll('#answers-box label');
            const select = document.querySelector('#answers-box select');
            const input = document.querySelector('#answers-box input');
            const answers = this.UsersAnswers[qs];
            if (labels.length !== 0) {
                if (answers instanceof Array) {
                    labels.forEach(label => {
                        const checkboxid = label.getAttribute('for');
                        const checkbox = document.getElementById(checkboxid);
                        if (Array.from(answers).includes(label.textContent)) {
                            checkbox.checked = true;
                            console.log('saved checkbox');
                        }
                    });
                } else {
                    labels.forEach(label => {
                        if (label.textContent === this.UsersAnswers[qs]) {
                            const radioid = label.getAttribute('for');
                            const radio = document.getElementById(radioid);
                            if (radio) {
                                radio.checked = true;
                                console.log('Saved radio');
                            }
                        }
                    });
                }
            } else if (select) {
                const options = document.querySelectorAll('option');
                options.forEach(option => {
                    if (option.textContent === this.UsersAnswers[qs]) {
                        option.selected = true;
                        console.log('saved option');
                    }
                });
            } else if (input) {
                const userinput = this.UsersAnswers[qs];
                if (!isNaN(userinput)) {
                    input.value = userinput;
                    console.log('saved input');
                }
            }
        }
    }
    //меняет цвет кнопок для переключения между вопросами
    setcolor(index) {
        const btn = document.getElementById('btn-' + index);
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const radio = document.querySelectorAll('input[type="radio"]');
        const select = document.querySelector('select');
        const input = document.querySelector('input[type="number"]');
        switch (true) {
            case checkboxes.length !== 0:
                let allChecked = false;
                checkboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        allChecked = true;
                    }
                });
                if (allChecked) {
                    btn.classList.remove('checked-btn');
                    btn.classList.add('answered-btn');
                } else {
                    btn.classList.remove('answered-btn');
                    btn.classList.add('checked-btn');
                }
                break;
            case radio.length !== 0:
                radio.forEach(() => {
                    btn.classList.remove('checked-btn');
                    btn.classList.add('answered-btn');
                });
                break;
            case select !== null:
                const selectedValue = select.value;
                if (selectedValue !== '') {
                    btn.classList.remove('checked-btn');
                    btn.classList.add('answered-btn');
                }
                break;
            case input !== null:
                const inputValue = input.value;
                if (inputValue !== '') {
                    btn.classList.remove('checked-btn');
                    btn.classList.add('answered-btn');
                } else {
                    btn.classList.remove('answered-btn');
                    btn.classList.add('checked-btn');
                }
                break;
            default:
                console.log('error');
                break;
        }
    }
    //находит правильный ответ на вопрос по тексту вопроса
    findCorrect(str) {
        let correct;
        for (let i = 0; i < this.questions.length; i++) {
            if (this.questions[i].text === str) {
                correct = this.questions[i].getCorrectAnswer();
                break;
            }
        }
        return correct;
    }
    //сохраняет ответы пользователя в сессионное хранилище
    saveUsersAnswers() {
        const stringAnswers = JSON.stringify(this.UsersAnswers);
        sessionStorage.setItem('answers', stringAnswers);
    }
}
