let particles = [];
const colors = ['#FFD700', '#FFC700', '#FFB800'];
let coloredWordsCount = 0;
const randomWordsDiv = document.getElementById('randomWords');
    generateRandomWords(50)
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = color || colors[Math.floor(Math.random() * colors.length)];
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

function generateRandomWords(numberOfWords) {
    const words = ["look", "one", "show", "develop", "world"];
    let randomWords = "";
    for (let i = 0; i < numberOfWords; i++) {
        breakWordIntoDivs(words[Math.floor(Math.random() * words.length)])
    }
    
}

function breakWordIntoDivs(word) {
    var wordDiv = document.createElement('div');
    wordDiv.className = 'word';
    for (var i = 0; i < word.length; i++) {
        var charDiv = document.createElement('div');
        charDiv.textContent = word[i];
        charDiv.className = 'letter';
        wordDiv.appendChild(charDiv);
    }
    const randomWordsDiv = document.getElementById("randomWords")
    randomWordsDiv.appendChild(wordDiv);
}

function checkAndColorLetter(inputLetter) {
    var randomWordsDiv = document.getElementById('randomWords');
    if (randomWordsDiv.children.length === 0) {
        return;
    }

    // Flag to indicate if a letter has been found and colored
    let letterColored = false;

    // Iterate through all words and letters until the first uncolored letter is found
    for (var w = 0; w < randomWordsDiv.children.length; w++) {
        var wordDiv = randomWordsDiv.children[w];
        var letterDivs = wordDiv.children;

        for (var i = 0; i < letterDivs.length; i++) {
            var letterDiv = letterDivs[i];
            // Check if the letter is not colored
            if (!letterDiv.classList.contains('colored')) {
                // Check if it matches the inputLetter
                if (letterDiv.textContent === inputLetter) {
                    // Color the letter
                    letterDiv.style.color = 'gold';
                    letterDiv.classList.add('colored');
                    const rect = letterDiv.getBoundingClientRect();
                    addParticle(rect.left + rect.width / 2, rect.top + rect.height / 2);
                    letterColored = true;
                }
                // Break out of both loops after finding the first uncolored letter, regardless of match
                break;
            }
        }

        // If a letter has been colored or an uncolored letter has been found, exit the loop
        if (letterColored || i < letterDivs.length) {
            break;
        }
    }

    // After coloring a letter, check if all words are colored
    if (letterColored && areAllWordsColored()) {
        createRedParticlesBurst();
        // Clear the existing words
        while (randomWordsDiv.firstChild) {
            randomWordsDiv.removeChild(randomWordsDiv.firstChild);
        }
        // Generate new words
        generateRandomWords(50);
    }
}

function areAllWordsColored() {
    var randomWordsDiv = document.getElementById('randomWords');

    // Check if there are any words present
    if (randomWordsDiv.children.length === 0) {
        return false; // or true, depending on how you want to handle an empty list
    }

    // Iterate through all words
    for (var w = 0; w < randomWordsDiv.children.length; w++) {
        var wordDiv = randomWordsDiv.children[w];
        var letterDivs = wordDiv.children;

        // Check each letter in the word
        for (var i = 0; i < letterDivs.length; i++) {
            if (!letterDivs[i].classList.contains('colored')) {
                return false; // Found an uncolored letter, so not all words are colored
            }
        }
    }

    return true; // All words are colored
}

function createRedParticlesBurst() {
    const rect = randomWordsDiv.getBoundingClientRect();
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle(rect.left + Math.random() * rect.width, 
                                    rect.top + Math.random() * rect.height, 
                                    'red'));
    }
}

function addParticle(x, y, count = 10) {
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y));
    }
}

