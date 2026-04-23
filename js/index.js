let isGameOn = false;
let game_mode = "normal";
let tri_tochki_cont = "";
let draw_inter;
let dif_but = document.getElementById('difficulty');
let dific_dot = document.getElementById('diffic-dot');
let dific_box = document.getElementById('diffic-box');
let tri_tochki = document.getElementById('tri-tochki');
let record_val = document.getElementById('record-val');
let logo_text = document.getElementById('logo-text');
let rec_clear_timeout;
let record = +localStorage.getItem('record') || 0;

function updateRecord(r) {
    let str_rec = String(r).padStart(4, '0').slice(-4);
    record_val.textContent = str_rec;
}

logo_text.addEventListener('click', function() {
    resetView();
})


record_val.addEventListener('click', function() {
    clearTimeout(rec_clear_timeout);
    rec_clear_timeout = setTimeout(() => {
        alert(isGameOn ? "Нажмите 2 раза чтобы очистить рекорд." : "Войдите в игру для просмотра рекорда.");
    }, 300);
})
record_val.addEventListener('dblclick', function() {
    clearTimeout(rec_clear_timeout);
    if (isGameOn) {
        menu_sound_3.currentTime = 0;
        menu_sound_3.play();
        record = 0;
        localStorage.setItem('record', record);
        updateRecord(record);
    }
    else {
        sound_block.currentTime = 0;
        sound_block.play();
    }
})


setInterval(() => {
    if (tri_tochki_cont.length < 3) {
        tri_tochki_cont += ".";
    }
    else {
        tri_tochki_cont = "";
    }

    tri_tochki.textContent = tri_tochki_cont;
}, 500);


document.getElementById('startBtn').addEventListener('click', function () {
    menu_sound_3.currentTime = 0;
    menu_sound_3.play();
    
    document.getElementById('startScreen').style.opacity = '0';
    setTimeout(function () {
        document.getElementById('startScreen').classList.add('hidden');
        document.getElementById('activeGameArea').classList.remove('hidden');
    }, 700);
});

dific_box.addEventListener('click', function() {
    if (!isGameOn) {
        menu_sound_2.currentTime = 0;
        menu_sound_2.play();
        if (game_mode == "easy") {
            dif_but.classList.remove('easy');
            dific_dot.classList.remove('easy');
            dif_but.textContent = "НОРМАЛЬНО";
            dif_but.classList.add('normal');
            dific_dot.classList.add('normal');
    
            game_mode = "normal";
        }
        else if (game_mode == "normal") {
            dif_but.classList.remove('normal');
            dific_dot.classList.remove('normal');
            dif_but.textContent = "СЛОЖНО";
            dif_but.classList.add('hard');
            dific_dot.classList.add('hard');
    
            game_mode = "hard";
        }
        else if (game_mode == "hard") {
            dif_but.classList.remove('hard');
            dific_dot.classList.remove('hard');
            dif_but.textContent = "ЛЕГКО";
            dif_but.classList.add('easy');
            dific_dot.classList.add('easy');
    
            game_mode = "easy";
        }
    }
    else {
        sound_block.currentTime = 0;
        sound_block.play();
    }
})

const canv = document.getElementById('canvas-bg');
const cntx = canv.getContext('2d');
let w, h;
let col;
const fontSize = 14;
const drops = [];

function initCanvas() {
    w = window.innerWidth;
    h = window.innerHeight;
    canv.width = w;
    canv.height = h;

    col = Math.floor(w / fontSize);
    drops.length = 0;

    for (let i = 0; i < col; i++) {
        drops[i] = Math.random() * -100;
    }
}

function draw() {
    cntx.fillStyle = '#0505100d';
    cntx.fillRect(0, 0, w, h);

    cntx.fillStyle = '#00f3ff';
    cntx.font = fontSize + 'px JetBrains Mono';

    for (let i = 0; i < drops.length; i++) {
        const chars = '01ABCDEF';
        const text = chars.charAt(Math.floor(Math.random() * chars.length));

        cntx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > h && Math.random() > 0.9) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

let wasFreezedBg = false;
initCanvas();
draw_inter = setInterval(draw, 50);

window.addEventListener('resize', function() {
    if (!wasFreezedBg) {
        initCanvas();
    }
});

function setRainFPS(n, shouldFreeze = false) {
    clearInterval(draw_inter);
    draw_inter = setInterval(draw, n);
    wasFreezedBg = shouldFreeze;
}

const observer = new ResizeObserver(() => {
    if (body.scrollHeight > window.innerHeight) {
        body.style.overflowY = 'auto';
    } else {
        body.style.overflowY = 'hidden';
    }
});
observer.observe(document.body);
