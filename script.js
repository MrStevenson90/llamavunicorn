const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const characters = 'llamavunicorn';
const fontSize = 12;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }).fill(0);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#FFF';
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, x) => {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const xPos = x * fontSize;
        const yPos = y * fontSize;

        ctx.fillText(text, xPos, yPos);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[x] = 0;
        }

        drops[x]++;
    });
}

function animateMatrix() {
    drawMatrix();
    matrixInterval = requestAnimationFrame(animateMatrix);
}

function showIntroText() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('LLAMA v UNICORN', canvas.width / 2, canvas.height / 2);
}

function formFootballField() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFF';
    ctx.font = `${fontSize}px monospace`;
    ctx.textAlign = 'left';

    for (let y = 0; y < canvas.height; y += fontSize) {
        for (let x = 0; x < canvas.width; x += fontSize) {
            if (y % (fontSize * 3) === 0 || x % (fontSize * 7) === 0) {
                ctx.fillText(characters.charAt(Math.floor(Math.random() * characters.length)), x, y);
            }
        }
    }
}

function formClouds() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFF';
    ctx.font = `${fontSize}px monospace`;
    ctx.textAlign = 'left';

    const cloud1 = createCloud();
    const cloud2 = createCloud();

    let pos1 = -canvas.width;
    let pos2 = canvas.width;

    function moveClouds() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillText(cloud1, pos1, canvas.height / 2);
        ctx.fillText(cloud2, pos2, canvas.height / 2);

        if (pos1 < canvas.width / 2 - 100 && pos2 > canvas.width / 2 + 100) {
            pos1 += 5;
            pos2 -= 5;
            requestAnimationFrame(moveClouds);
        } else {
            startSequence();
        }
    }

    moveClouds();
}

function createCloud() {
    let cloud = '';
    for (let i = 0; i < 100; i++) {
        cloud += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return cloud;
}

function startSequence() {
    showIntroText();
    setTimeout(() => {
        matrixInterval = requestAnimationFrame(animateMatrix);
        setTimeout(() => {
            cancelAnimationFrame(matrixInterval);
            formFootballField();
            setTimeout(() => {
                formClouds();
            }, 3000);
        }, 5000);
    }, 2000);
}

window.onload = () => {
    startSequence();

    const shadedBoxes = document.querySelectorAll('.shaded-box');
    const popups = document.querySelectorAll('.popup');
    const closeButtons = document.querySelectorAll('.close-popup');

    shadedBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const popupId = box.getAttribute('data-popup');
            document.getElementById(popupId).style.display = 'block';
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.popup').style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        popups.forEach(popup => {
            if (event.target === popup) {
                popup.style.display = 'none';
            }
        });
    });
};
