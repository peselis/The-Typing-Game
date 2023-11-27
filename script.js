document.addEventListener("DOMContentLoaded", () => {
    const wordInput = document.getElementById('wordInput');
    const randomWordsDiv = document.getElementById('randomWords');
    randomWordsDiv.textContent = generateRandomWords(50);
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    const cursor = document.getElementById('cursor');

    let particles = [];
    const colors = ['#FFD700', '#FFC700', '#FFB800'];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function updateCursorPosition(input) {
        const cursor = document.getElementById('cursor');
        if (cursor) {
            const textWidth = ctx.measureText(input).width;
            cursor.style.left = `calc(50% - 50px + ${textWidth}px)`;
        }
    }

    wordInput.addEventListener('input', (event) => {
        const inputText = event.target.value;
        const targetText = randomWordsDiv.textContent.trim();
    
        if (targetText.startsWith(inputText)) {
            updateCursorPosition(inputText);
        }
    });

    const addParticle = (x, y, count = 1) => {
        for (let i = 0; i < count; i++) {
            particles.push(new Particle(x, y));
        }
    };

    canvas.addEventListener('mousemove', (event) => {
        addParticle(event.x, event.y);
    });

    canvas.addEventListener('click', (event) => {
        addParticle(event.x, event.y, 10);
    });

    const handleParticles = () => {
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].size <= 0.2) {
                particles.splice(i, 1);
                i--;
            }
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
        requestAnimationFrame(animate);
    };

    animate();

    // Set the initial position of the cursor
    updateCursorPosition(wordInput.value);
});

function generateRandomWords(numberOfWords) {
    const words = ["look", "one", "show", "develop", "world", /* ...other words... */];
    let randomWords = "";
    for (let i = 0; i < numberOfWords; i++) {
        randomWords += words[Math.floor(Math.random() * words.length)] + " ";
    }
    return randomWords.trim(); // Trim the trailing space
}
