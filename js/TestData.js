import {Question, Answer, Test} from './QuestionsAnswersClass.js';
const TESTDATA = [
    new Question('Кто из ученых предложил теорию естественного отбора ?', 'radio', [
        new Answer('Грегор Мендель ', false),
        new Answer('Луи Пастер ', false),
        new Answer('Чарльз Дарвин ', true),
        new Answer('Иван Павлов ', false)
    ]),
    new Question('Какой процесс способствует сохранению наиболее приспособленных к окружающей среде особей?', 'radio', [
        new Answer('Мутация ', false),
        new Answer('Селекция ', true),
        new Answer('Гибридизация ', false),
        new Answer('Кластеризация ', false)
    ]),
    new Question('Какой вид эволюции характеризуется изменением генетического состава популяции из-за случайных факторов?', 'radio', [
        new Answer('Генетический дрейф ', true),
        new Answer('Мутационная ', false),
        new Answer('Дивергентная ', false),
        new Answer('Конвергентная ', false)
    ]),
    new Question('Какая теория эволюции предполагает равномерное изменение организма в течение времени?','radio', [
                new Answer('Постоянство видов ', false),
                new Answer('Периодическая революция ', false),
                new Answer('Постепенное развитие ', true),
                new Answer('Постепенное равновесие ', false)
            ]),
    new Question('Сколько камер в сердце человека ?', 'free',
            [new Answer('4', true)]),
    new Question('Что относят к основным отличиям человека от животных? (выберите несколько вариантов)', 'checkbox', [
        new Answer('Прямохождение', true),
        new Answer('Четырехкамерное сердце', false),
        new Answer('Теплокровность', false),
        new Answer('Речь и мышление', true)
    ]),
    new Question('Какой из перечисленных факторов НЕ является механизмом эволюции?','select', [
                new Answer('Селекция ', false),
                new Answer('Экзосомы ', true),
                new Answer('Наследственность ', false),
                new Answer('Мутация ', false)
            ]),
    new Question(' Какая теория эволюции утверждает, что изменения происходят скачкообразно, а не плавно?','radio', [
                new Answer('Постепенное равновесие', false),
                new Answer('Постепенное развитие ', false),
                new Answer('Постоянство видов ', false),
                new Answer('Периодическая революция ', true)
            ]),
    new Question('Что такое адаптивная радиация?', 'radio', [
        new Answer('Разнообразие видов в новой среде ', true),
        new Answer('Быстрое размножение организмов ', false),
        new Answer('Распространение генетических заболеваний ', false),
        new Answer('Медленное вымирание видов ', false)
    ]),
    new Question('К факторам эволюции НЕ относится...', 'radio', [
        new Answer('Наследственная изменчивость ', false),
        new Answer('Модификационная изменчивость', true),
        new Answer('Дрейф генов ', false),
        new Answer('Естественный отбор ', false)
    ])
];

export const DATA = new Test(TESTDATA);