import {DATA} from './TestData.js';

let number = 1;
const StoredUsersAnswers = sessionStorage.getItem('answers');
const UsersAnswers = JSON.parse(StoredUsersAnswers);
const element = document.getElementById("table-result");
const questions_list_stored = sessionStorage.getItem('q-list');
const questions_list = JSON.parse(questions_list_stored);

console.log(questions_list);

setTable();

//при нажатии "На главную" переход к настройкам теста
document.getElementById('back-btn').addEventListener('click', ()=>{
    window.location.href = 'index.html';
    sessionStorage.removeItem('q-list');
    sessionStorage.removeItem('answers');
});

//формирование таблицы результатов
function setTable(){
    let rightanswers = 0;
    for(let i = 0; i<questions_list.length; i++){
        const newrow = element.insertRow(-1);
        const cell1 = newrow.insertCell(0);
        cell1.innerText = number;
        number++;
        const cell2 = newrow.insertCell(1);
        cell2.innerText = questions_list[i];
        const cell3 = newrow.insertCell(2);
        if(UsersAnswers.hasOwnProperty(questions_list[i])){
            if(Array.isArray(UsersAnswers[questions_list[i]])){
                let tmp = UsersAnswers[questions_list[i]];
                tmp.sort();
                UsersAnswers[questions_list[i]] = tmp.join(',\n');
            }
            cell3.innerText = UsersAnswers[questions_list[i]];
        }else{
            cell3.innerText = 'Ответ не дан';
        }
        const cell4 = newrow.insertCell(3);
        cell4.innerText = DATA.findCorrect(questions_list[i]).join(',\n');
        const cell5 = newrow.insertCell(4);
        if(cell4.textContent === cell3.textContent){
            rightanswers++;
            cell5.innerText = 1;
            newrow.style.backgroundColor = 'lightgreen';
        }else{
            cell5.innerText = 0;
            newrow.style.backgroundColor = '#F08080';
        }
    }
    const resrow = element.insertRow(-1);
    const cellLeft = resrow.insertCell(0);
    cellLeft.innerText = 'Итого:';
    cellLeft.style.border = 'none';
    const cell6 = resrow.insertCell(1);
    cell6.style.border = 'none';
    const cell7 = resrow.insertCell(2);
    cell7.style.border = 'none';
    const cell8 = resrow.insertCell(3);
    cell8.style.border = 'none';
    const cellRight = resrow.insertCell(4);
    cellRight.style.textAlign = 'right';
    cellRight.style.border = 'none';
    cellRight.innerText = rightanswers;
}
