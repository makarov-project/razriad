let isTumblerGameOn = false;
let tumbNum = 0;
let tumbBinNum = 0;
let tumbLamps = 3;
let tumbUserAns = -1;
let lev = [false, false, false, false, false];

const tumb_help = document.getElementById('tumb-help');
const tumb_reload = document.getElementById('tumb-reload');
const tumb_text = document.getElementById('tumb-text');

function execTumblerGame(dif) {
    isTumblerGameOn = true;
    record = localStorage.getItem('tumbler-record') | 0;
    updateRecord(record);
    setTumbNum(dif);
    drawLamps(tumbLamps);
    setTumbNote();
    
    tumb_text.textContent = tumbNum;
}

function tumbReload() {
    menu_sound_3.currentTime = 0;
    menu_sound_3.play();
    resetTumblerGame();
    execTumblerGame(game_mode);
}

function setTumbNum(dif) {
    let multiplier;
    if (dif == 'easy') {
        multiplier = 8;
        tumbLamps = 3;
    }
    else if (dif == 'normal') {
        multiplier = 16;
        tumbLamps = 4;
    }
    else {
        multiplier = 32;
        tumbLamps = 5;
    }

    let r;
    do {
        r = Math.floor(Math.random() * multiplier);
    } while (r == tumbNum || r == 0);

    tumbNum = r;
    tumbBinNum = r.toString(2);
}

tumb_help.addEventListener('click', function() {
    menu_sound_1.currentTime = 0;
    menu_sound_1.play();
    alert("Слева сверху число в десятичной системе счисления. Оно сгенерировано случайным образом. \n\nНажмите ENTER чтобы продолжить...");
    setTimeout(() => {
        menu_sound_1.currentTime = 0;
        menu_sound_1.play();
        alert("Ваша задача - составить двоичную запись этого числа при помощи рычагов... \n\nНажмите ENTER чтобы продолжить...");
        setTimeout(() => {
            menu_sound_1.currentTime = 0;
            menu_sound_1.play();
            alert("Если лампа над рычагом горит - он в положении ВКЛ (то есть в данном разряде двоичной записи числа будет 1) \n\nНажмите ENTER чтобы продолжить...");
            setTimeout(() => {
                menu_sound_1.currentTime = 0;
                menu_sound_1.play();
                alert(`Например: \n "ВКЛ ВЫКЛ ВКЛ" соответствует записи "101", что в свою очередь соответствует числу "5" \n\nНажмите ENTER чтобы продолжить...`);
                setTimeout(() => {
                    menu_sound_1.currentTime = 0;
                    menu_sound_1.play();
                    alert("Чем выше сложность игры, тем больше генерируемые числа \n\nНажмите ENTER чтобы продолжить...");
                    setTimeout(() => {
                        menu_sound_1.currentTime = 0;
                        menu_sound_1.play();
                    }, 0);
                }, 0);
            }, 0);
        }, 0);
    }, 0);
});

function resetTumblerGame() {
    tumbUserAns = -1;
    isTumblerGameOn = false;
    tumbLamps = 3;
}

function drawLamps(n) {
    for (let index = 1; index <= 5; index++) {
        document.getElementById(`tumb-lamp-box-${index}`).style.display = 'none';
        document.getElementById(`tumb-lamp-box-${index}`).classList.remove('on');
        document.getElementById(`tumb-lamp-box-${index}`).classList.remove('off');
        document.getElementById(`tumb-lamp-box-${index}`).classList.add('off');
    }
    for (let index = 1; index <= n; index++) {
        document.getElementById(`tumb-lamp-box-${index}`).style.display = 'flex';
    }
}

function pickLever(n) {
    if (n <= tumbLamps) {
        sound_tumb.currentTime = 0;
        sound_tumb.play();
    
        const isOn = document.getElementById(`tumb-lamp-box-${n}`).classList.contains('on');
        document.getElementById(`tumb-lamp-box-${n}`).classList.remove(!isOn ? 'off' : 'on');
        document.getElementById(`tumb-lamp-box-${n}`).classList.add(isOn ? 'off' : 'on');
    }
    setTumbNote();
}

function setTumbNote() {
    for (let index = 0; index < 5; index++) {
        lev[index] = document.getElementById(`tumb-lamp-box-${index+1}`).classList.contains('on');
    }
    let note;
    let ans;

    if (tumbLamps == 3) {
        let l1 = lev[0] ? 4 : 0;
        let l2 = lev[1] ? 2 : 0;
        let l3 = lev[2] ? 1 : 0;
        note = `${l1} + ${l2} + ${l3} = `;
        ans = `${l1 + l2 + l3}`;
    }
    else if (tumbLamps == 4) {
        let l1 = lev[0] ? 8 : 0;
        let l2 = lev[1] ? 4 : 0;
        let l3 = lev[2] ? 2 : 0;
        let l4 = lev[3] ? 1 : 0;
        note = `${l1} + ${l2} + ${l3} + ${l4} = `;
        ans = `${l1 + l2 + l3 + l4}`;
    }
    else if (tumbLamps == 5) {
        let l1 = lev[0] ? 16 : 0;
        let l2 = lev[1] ? 8 : 0;
        let l3 = lev[2] ? 4 : 0;
        let l4 = lev[3] ? 2 : 0;
        let l5 = lev[4] ? 1 : 0;
        note = `${l1} + ${l2} + ${l3} + ${l4} + ${l5} = `;
        ans = `${l1 + l2 + l3 + l4 + l5}`;
    }

    document.getElementById('tumb-note').textContent = note;
    document.getElementById('tumb-ans').textContent = ans;
    tumbUserAns = +ans;
    document.getElementById('tumb-continue').disabled = !(tumbUserAns === tumbNum);
}

document.getElementById('tumb-lamp-box-1').addEventListener('click', () => pickLever(1));
document.getElementById('tumb-lamp-box-2').addEventListener('click', () => pickLever(2));
document.getElementById('tumb-lamp-box-3').addEventListener('click', () => pickLever(3));
document.getElementById('tumb-lamp-box-4').addEventListener('click', () => pickLever(4));
document.getElementById('tumb-lamp-box-5').addEventListener('click', () => pickLever(5));

tumb_reload.addEventListener('click', tumbReload);

document.addEventListener('keydown', function(e) {
    if (isTumblerGameOn) {
        if (['1', '2', '3', '4', '5'].includes(e.key)) {
            let n = +e.key;
            if (n > 0) {
                pickLever(n);
            }
        }

        else if (e.key == 'Enter') {
            if (tumbUserAns === tumbNum) {
                tumbReload();
            }
            else {
                sound_block.currentTime = 0;
                sound_block.play();
            }
        }
    }
})