var timeValue;
const timeinputcontainer = document.getElementById('input-timer-container');
const timeinput = document.getElementById("input-timer");
const timecheckbox = document.getElementById("set-timer");

/*отображает окно ввода таймера и предупреждение,
если активен чекбокс*/
function getTimerCheckbox() { 
    timecheckbox.addEventListener("change", () => {
        if (timecheckbox.checked) {
            timeinputcontainer.style.display = 'block';
            timeinput.style.display= 'block';
            const warn = document.getElementById('warning');
            warn.textContent = "Укажите время или отмените выбор чекбокса.";
        } else {
            timeinputcontainer.style.display = 'none';
        }
    });
}

getTimerCheckbox();

//записывает время таймера и нажатые чекбоксы, переходит на страницу теста
document.getElementById("start-btn").addEventListener("click", () => {
    timeValue = timeinput.value;
    console.log(timeValue);
    if(timeValue.length === 0 && timecheckbox.checked === true){
        return;
    }else{
        let time = timeValue.split(':');
        let minutes = parseInt(time[0], 10);
        sessionStorage.setItem('minutes', minutes);
        let seconds = parseInt(time[1],10);
        sessionStorage.setItem('seconds', seconds);
        let mix_questions = document.getElementById('mix-q').checked;
        sessionStorage.setItem('mix-q', mix_questions);
        let mix_answers = document.getElementById('mix-ans').checked;
        sessionStorage.setItem('mix-a', mix_answers);
        window.location.href = 'html/test.html';
    }
});
