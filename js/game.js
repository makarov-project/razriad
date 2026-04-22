let ss_selected = 2;
const menu_ss_2 = document.getElementById('menu-ss-2');
const menu_ss_8 = document.getElementById('menu-ss-8');
const menu_ss_16 = document.getElementById('menu-ss-16');
const game_placehold = document.getElementById('game-placehold');
const game_placehold_p = document.getElementById('game-placehold-p');
const cosmo_card = document.getElementById('cosmo-card');
const tumbler_card = document.getElementById('tumbler-card');
const color_card = document.getElementById('color-card');
const cosmo_game_block = document.getElementById('cosmo-game-block');
const tumbler_game_block = document.getElementById('tumbler-game-block');
const color_game_block = document.getElementById('color-game-block');
let menu_sound_1 = new Audio();
let menu_sound_2 = new Audio();
let menu_sound_3 = new Audio();
let menu_sound_4 = new Audio();
let sound_block = new Audio();
let sound_tumb = new Audio();
menu_sound_1.src = './assets/sounds/menu-1.mp3';
menu_sound_2.src = './assets/sounds/menu-2.mp3';
menu_sound_3.src = './assets/sounds/menu-3.mp3';
menu_sound_4.src = './assets/sounds/menu-4.mp3';
sound_block.src = './assets/sounds/block.mp3';
sound_tumb.src = './assets/sounds/tumb.mp3';
selectSsMenu(2);

function selectSsMenu(n) {
    if (ss_selected !== n) {
        menu_sound_1.currentTime = 0;
        menu_sound_1.play();
    }
    if (n == 2) {
        document.getElementById(`menu-ss-${8}`).classList.remove('sel');
        document.getElementById(`menu-ss-${16}`).classList.remove('sel');
        game_placehold_p.textContent = "Двоичная система счисления";

        tumbler_card.classList.remove('dis');
        color_card.classList.add('dis');
    }
    else if (n == 8) {
        document.getElementById(`menu-ss-${2}`).classList.remove('sel');
        document.getElementById(`menu-ss-${16}`).classList.remove('sel');
        game_placehold_p.textContent = "Восьмеричная система счисления";

        tumbler_card.classList.add('dis');
        color_card.classList.add('dis');
    }
    else if (n == 16) {
        document.getElementById(`menu-ss-${2}`).classList.remove('sel');
        document.getElementById(`menu-ss-${8}`).classList.remove('sel');
        game_placehold_p.textContent = "Шестнадцатеричная система счисления";

        tumbler_card.classList.add('dis');
        color_card.classList.remove('dis');
    }
    ss_selected = n;
    document.getElementById(`menu-ss-${n}`).classList.add('sel');
}
menu_ss_2.addEventListener('click', () => {selectSsMenu(2)});
menu_ss_8.addEventListener('click', () => {selectSsMenu(8)});
menu_ss_16.addEventListener('click', () => {selectSsMenu(16)});

function resetView() {
    resetTumblerGame();
    resetColorGame();
    updateRecord("????");
    cosmo_game_block.classList.remove('game-on');
    tumbler_game_block.classList.remove('game-on');
    color_game_block.classList.remove('game-on');
    cosmo_game_block.style.display = 'none';
    tumbler_game_block.style.display = 'none';
    color_game_block.style.display = 'none';
    setTimeout(() => {
        cosmo_game_block.style.display = 'block';
        cosmo_game_block.style.display = 'block';
        cosmo_game_block.style.display = 'block';
    }, 500);
    game_placehold.style.display = 'block';
    game_placehold.classList.remove('hid');
    dific_dot.classList.remove('disab');
    isGameOn = false;
    menu_sound_3.currentTime = 0;
    menu_sound_3.play();

    document.getElementById('activeGameArea').classList.add('hidden');
    document.getElementById('startScreen').classList.remove('hidden');
    document.getElementById('startScreen').style.opacity = '1';
}

function startGameAll() {
    menu_sound_4.currentTime = 0;
    menu_sound_4.play();
    isGameOn = true;
    dific_dot.classList.add('disab');
    game_placehold.classList.add('hid');
    setTimeout(() => {
        game_placehold.style.display = 'none';
    }, 500);
}

function cosmoGameStart() {
    if (ss_selected == 2 || ss_selected == 8 || ss_selected == 16) {
        startGameAll();
        execCosmoGame(game_mode, ss_selected);
        setTimeout(() => {
            cosmo_game_block.style.display = 'block';
            cosmo_game_block.classList.add('game-on');
        }, 500);
    }
    else {
        sound_block.currentTime = 0;
        sound_block.play();
    }
}

function tumblerGameStart() {
    if (ss_selected == 2) {
        startGameAll();
        execTumblerGame(game_mode);
        setTimeout(() => {
            tumbler_game_block.style.display = 'block';
            tumbler_game_block.classList.add('game-on');
        }, 500);
    }
    else {
        sound_block.currentTime = 0;
        sound_block.play();
    }
}

function colorGameStart() {
    if (ss_selected == 16) {
        startGameAll();
        execColorGame(game_mode);
        setTimeout(() => {
            color_game_block.style.display = 'flex';
            color_game_block.classList.add('game-on');
        }, 500);
    }
    else {
        sound_block.currentTime = 0;
        sound_block.play();
    }
}

cosmo_card.addEventListener('click', cosmoGameStart);
tumbler_card.addEventListener('click', tumblerGameStart);
color_card.addEventListener('click', colorGameStart);