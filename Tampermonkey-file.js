// Key event handling improvements
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!keys.includes(key) && key !== 'Control' && key !== 'Alt') {
        keys.unshift(key);
        keysT.unshift(key);
        makemoves();
    }
});

document.addEventListener('keyup', function(event) {
    const key = event.key;
    keys = keys.filter(k => k !== key);
    keysT = keysT.filter(k => k !== key);
});

// Chess piece movement optimization
function tts(x, y, tx, ty, el = board) {
    tts1(x, y, el);
    tts1(tx, ty, el);
    movecount++;
}

// Improving element background color logic
function updatePieceColor(key, color = "blue") {
    let elements = document.getElementsByClassName(`${mycolor} ${key}`);
    if (elements.length) {
        elements.forEach(el => el.style.backgroundColor = color);
    }
}

// Example usage of background color setting
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key === biK) updatePieceColor("bishop");
    if (key === qK) updatePieceColor("queen");
});

document.addEventListener('keyup', function(event) {
    const key = event.key;
    if (key === biK) updatePieceColor("bishop", "");
    if (key === qK) updatePieceColor("queen", "");
});

// Mutation observer optimization
const target = document.querySelector('.rclock-bottom');
if (target) {
    observer = new MutationObserver(function(mutations) {
        mutations.forEach(() => {
            let clockRunning = document.querySelector(".rclock.rclock-bottom.running");
            turnC = clockRunning ? 1 : 0;
            if (turnC) {
                keysT = [...keys];
                setTimeout(makemoves, 40);
            } else {
                setTimeout(makemoves, 15);
            }
        });
    });
    observer.observe(target, { attributes: true, subtree: false });
}
