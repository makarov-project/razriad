let r_col_hex = 'ff';
let g_col_hex = 'ff';
let b_col_hex = 'ff';
let r_true = 0;
let g_true = 0;
let b_true = 0;
let r_rgb = 0;
let g_rgb = 0;
let b_rgb = 0;

const hex_r_html = document.getElementById('hex-r');
const hex_g_html = document.getElementById('hex-g');
const hex_b_html = document.getElementById('hex-b');
const rgb_input_r = document.getElementById('rgb-input-r');
const rgb_input_g = document.getElementById('rgb-input-g');
const rgb_input_b = document.getElementById('rgb-input-b');
const hex_color_html = document.getElementById('hex-color');
const rgb_color_preview = document.getElementById('rgb-color-preview');

const hex_help = document.getElementById('hex-help');
const hex_reload = document.getElementById('hex-reload');

function execColorGame(dif) {
    record = localStorage.getItem('color-record') | 0;
    updateRecord(record);
    setHexColor();

    if (dif == 'easy') {
        rgb_input_r.focus();
        g_rgb = parseInt(g_col_hex, 16);
        b_rgb = parseInt(b_col_hex, 16);

        hex_g_html.classList.add('dis');
        hex_b_html.classList.add('dis');

        rgb_input_g.classList.add('yes');
        rgb_input_b.classList.add('yes');

        rgb_input_g.disabled = true;
        rgb_input_g.value = g_rgb;
        
        rgb_input_b.disabled = true;
        rgb_input_b.value = b_rgb;
    }
    else if (dif == 'normal') {
        b_rgb = parseInt(b_col_hex, 16);
        hex_b_html.classList.add('dis');
        rgb_input_b.classList.add('yes');
        
        rgb_input_b.disabled = true;
        rgb_input_b.value = b_rgb;
    }

    resetRgbColor();
}

hex_help.addEventListener('click', function() {
    menu_sound_1.currentTime = 0;
    menu_sound_1.play();
    alert("Слева сверху расположена HEX-запись случайного цвета. Нужно преобразовать ее в RGB. \n\nНажмите ENTER чтобы продолжить...");
    setTimeout(() => {
        menu_sound_1.currentTime = 0;
        menu_sound_1.play();
        alert("Первые 2 цифры HEX-цвета - это закодированное в 16-ричную систему значение R из RGB (то есть значение красного цвета) \n\nНажмите ENTER чтобы продолжить...");
        setTimeout(() => {
            menu_sound_1.currentTime = 0;
            menu_sound_1.play();
            alert("Требуется составить полную запись RGB-цвета. \nЗначения RGB записываются в 10-ричной системе счисления, в промежутке [0, 255] \n\nНажмите ENTER чтобы продолжить...");
            setTimeout(() => {
                menu_sound_1.currentTime = 0;
                menu_sound_1.play();
                alert(`R - Red (1 и 2 цифры HEX) \nG - Green (3 и 4 цифры HEX) \nB - Blue (5 и 6 цифры HEX) \n\nНажмите ENTER чтобы продолжить...`);
                setTimeout(() => {
                    menu_sound_1.currentTime = 0;
                    menu_sound_1.play();
                    alert("Удачи! \n\nНажмите ENTER чтобы продолжить...");
                    setTimeout(() => {
                        menu_sound_1.currentTime = 0;
                        menu_sound_1.play();
                    }, 0);
                }, 0);
            }, 0);
        }, 0);
    }, 0);
});

hex_reload.addEventListener('click', () => {
    menu_sound_3.currentTime = 0;
    menu_sound_3.play();
    resetColorGame();
    execColorGame(game_mode);
})

function setHexColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    r_true = r;
    g_true = g;
    b_true = b;

    r_col_hex = r.toString(16).padStart(2, '0').toLocaleUpperCase();
    g_col_hex = g.toString(16).padStart(2, '0').toLocaleUpperCase();
    b_col_hex = b.toString(16).padStart(2, '0').toLocaleUpperCase();

    hex_r_html.textContent = r_col_hex;
    hex_g_html.textContent = g_col_hex;
    hex_b_html.textContent = b_col_hex;

    hex_color_html.style.backgroundColor = `#${r_col_hex}${g_col_hex}${b_col_hex}`;
}

hex_r_html.addEventListener('pointerenter', () => {
    rgb_input_r.focus();
});
hex_g_html.addEventListener('pointerenter', () => {
    if (game_mode !== 'easy') {
        rgb_input_g.focus();
    }
});
hex_b_html.addEventListener('pointerenter', () => {
    if (game_mode == 'hard') {
        rgb_input_b.focus();
    }
});

rgb_input_r.oninput = function() {
    this.value = this.value.replace(/\D/g, '');
    
    if (this.value !== '' && parseInt(this.value) > 255) {
        this.value = 255;
    }

    r_rgb = this.value ? this.value : 0;
    resetRgbColor();
};
rgb_input_g.oninput = function() {
    this.value = this.value.replace(/\D/g, '');
    
    if (this.value !== '' && parseInt(this.value) > 255) {
        this.value = 255;
    }

    g_rgb = this.value ? this.value : 0;
    resetRgbColor();
};
rgb_input_b.oninput = function() {
    this.value = this.value.replace(/\D/g, '');
    
    if (this.value !== '' && parseInt(this.value) > 255) {
        this.value = 255;
    }

    b_rgb = this.value ? this.value : 0;
    resetRgbColor();
};

function resetRgbColor() {
    rgb_color_preview.style.backgroundColor = `rgb(${r_rgb}, ${g_rgb}, ${b_rgb})`;
}

function resetColorGame() {
    rgb_input_r.value = '';
    rgb_input_g.value = '';
    rgb_input_b.value = '';
    r_rgb = 0;
    g_rgb = 0;
    b_rgb = 0;
    rgb_input_r.disabled = false;
    rgb_input_g.disabled = false;
    rgb_input_b.disabled = false;
    resetRgbColor();
    hex_r_html.classList.remove('dis');
    hex_g_html.classList.remove('dis');
    hex_b_html.classList.remove('dis');
}

function checkColorAnswer() {
    if (rgb_input_r.disabled && rgb_input_g.disabled && rgb_input_b.disabled) {
        menu_sound_3.currentTime = 0;
        menu_sound_3.play();
        resetColorGame();
        execColorGame(game_mode);
    }
    else if (r_rgb == r_true && g_rgb == g_true && b_rgb == b_true) {
        menu_sound_4.currentTime = 0;
        menu_sound_4.play();
    }
    else {
        menu_sound_3.currentTime = 0;
        menu_sound_3.play();
    }

    rgb_input_r.classList.remove('no');
    rgb_input_r.classList.remove('yes');

    rgb_input_g.classList.remove('no');
    rgb_input_g.classList.remove('yes');

    rgb_input_b.classList.remove('no');
    rgb_input_b.classList.remove('yes');

    rgb_input_r.classList.add(r_rgb == r_true ? 'yes' : 'no');
    rgb_input_g.classList.add(g_rgb == g_true ? 'yes' : 'no');
    rgb_input_b.classList.add(b_rgb == b_true ? 'yes' : 'no');

    rgb_input_r.disabled = r_rgb == r_true;
    rgb_input_g.disabled = g_rgb == g_true;
    rgb_input_b.disabled = b_rgb == b_true;

    setTimeout(() => {
        rgb_input_r.classList.remove('no');
        rgb_input_g.classList.remove('no');
        rgb_input_b.classList.remove('no');
    }, 1000);
}

rgb_input_r.addEventListener('keydown', function(e) {
    if (e.key == 'Enter' || e.key == 'Return') {
        checkColorAnswer();
    }
})
rgb_input_g.addEventListener('keydown', function(e) {
    if (e.key == 'Enter' || e.key == 'Return') {
        checkColorAnswer();
    }
})
rgb_input_b.addEventListener('keydown', function(e) {
    if (e.key == 'Enter' || e.key == 'Return') {
        checkColorAnswer();
    }
})
