let particles = [];
const colors = ['#FFD700', '#FFC700', '#FFB800'];
const randomWordsDiv = document.getElementById('randomWords');
    generateRandomWords(50)
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

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

document.addEventListener("DOMContentLoaded", () => {

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
});

document.addEventListener('keydown', function(event) {
    checkAndColorLetter(event.key)
});

function handleLetter(letter) {

}

function handleBackspace() {

}

function generateRandomWords(numberOfWords) {
    const words = ["look", "one", "show", "develop", "world"];
    let randomWords = "";
    for (let i = 0; i < numberOfWords; i++) {
        breakWordIntoDivs(words[Math.floor(Math.random() * words.length)])
    }
    
}

function breakWordIntoDivs(word) {
    var wordDiv = document.createElement('div');
    for (var i = 0; i < word.length; i++) {
        var charDiv = document.createElement('div');
        charDiv.textContent = word[i];
        charDiv.className = 'letter';
        wordDiv.appendChild(charDiv);
    }

    console.log("rtest")

    const randomWordsDiv = document.getElementById("randomWords")
    randomWordsDiv.appendChild(wordDiv);
}

function checkAndColorLetter(inputLetter) {
    var randomWordsDiv = document.getElementById('randomWords');
    if (randomWordsDiv.children.length === 0) {
        return; // No words to check
    }

    var wordDiv = randomWordsDiv.children[0];
    var letterDivs = wordDiv.children;
    var allColored = true;

    for (var i = 0; i < letterDivs.length; i++) {
        var letterDiv = letterDivs[i];
        if (!letterDiv.classList.contains('colored')) {
            allColored = false; // There's at least one uncolored letter in the word

            if (letterDiv.textContent === inputLetter) {
                letterDiv.style.color = 'gold';
                letterDiv.classList.add('colored');

                // Create a particle explosion at the letter's position
                const rect = letterDiv.getBoundingClientRect();
                addParticle(rect.left + rect.width / 2, rect.top + rect.height / 2);

                break; // Exit the loop after coloring a letter
            }
        }
    }

    if (allColored) {
        randomWordsDiv.removeChild(wordDiv);
    }
}

function addParticle(x, y, count = 10) {
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y));
    }
}



