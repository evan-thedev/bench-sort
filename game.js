const LEVELS = [
    {
        parts: ['Hammer', 'Wrench', 'Screwdriver'],
        spots: ['Hammer', 'Wrench', 'Screwdriver']
    },
    {
        parts: ['Nail', 'Screw', 'Bolt', 'Washer'],
        spots: ['Nail', 'Screw', 'Bolt', 'Washer']
    },
    {
        parts: ['Red Paint', 'Blue Paint', 'Green Paint', 'Brush'],
        spots: ['Red Paint', 'Blue Paint', 'Green Paint', 'Brush']
    },
    {
        parts: ['Tape', 'Glue', 'Clamp', 'Ruler', 'Pencil'],
        spots: ['Tape', 'Glue', 'Clamp', 'Ruler', 'Pencil']
    },
    {
        parts: ['Drill', 'Saw', 'Chisel', 'Plane', 'File'],
        spots: ['Drill', 'Saw', 'Chisel', 'Plane', 'File']
    },
    {
        parts: ['Socket', 'Ratchet', 'Pliers', 'Wire Cutter', 'Allen Key'],
        spots: ['Socket', 'Ratchet', 'Pliers', 'Wire Cutter', 'Allen Key']
    },
    {
        parts: ['Sandpaper', 'Putty', 'Spackle', 'Caulk', 'Primer', 'Roller'],
        spots: ['Sandpaper', 'Putty', 'Spackle', 'Caulk', 'Primer', 'Roller']
    },
    {
        parts: ['Level', 'Square', 'Protractor', 'Caliper', 'Compass', 'Tape Measure', 'Chalk'],
        spots: ['Level', 'Square', 'Protractor', 'Caliper', 'Compass', 'Tape Measure', 'Chalk']
    }
];

const FAIL_MESSAGES = [
    "Nope! That's not where hammers go!",
    "Wrong spot, buddy!",
    "Nice try, but no!",
    "That's chaos, not organization!",
    "You call that tidying?!",
    "Oops! Try again!",
    "Wrong hole!",
    "Not even close!",
    "Are you even looking?",
    "Come on, read the labels!"
];

const SUCCESS_MESSAGES = [
    "Perfection!",
    "Spotless!",
    "Clean sweep!",
    "Tidy master!",
    "Organized genius!",
    "Bench sorted!",
    "Workshop wizard!",
    "Tool boss!"
];

class Game {
    constructor() {
        this.currentLevel = 0;
        this.mistakes = 0;
        this.totalMistakes = 0;
        this.startTime = null;
        this.timerInterval = null;
        this.draggedPart = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadLevel();
    }

    setupEventListeners() {
        document.getElementById('next-level-btn').addEventListener('click', () => {
            this.nextLevel();
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restart();
        });
    }

    loadLevel() {
        if (this.currentLevel >= LEVELS.length) {
            this.showGameComplete();
            return;
        }

        this.mistakes = 0;
        this.updateStats();

        const level = LEVELS[this.currentLevel];
        
        const workbench = document.getElementById('workbench');
        const messyPile = document.getElementById('messy-pile');
        
        workbench.innerHTML = '';
        messyPile.innerHTML = '';

        level.spots.forEach(spotName => {
            const spot = this.createSpot(spotName);
            workbench.appendChild(spot);
        });

        const shuffledParts = this.shuffle([...level.parts]);
        shuffledParts.forEach(partName => {
            const part = this.createPart(partName);
            messyPile.appendChild(part);
        });

        this.startTimer();
        this.showMessage('');
    }

    createSpot(name) {
        const spot = document.createElement('div');
        spot.className = 'spot';
        spot.dataset.name = name;

        const label = document.createElement('div');
        label.className = 'spot-label';
        label.textContent = name;
        spot.appendChild(label);

        spot.addEventListener('dragover', (e) => this.handleDragOver(e));
        spot.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        spot.addEventListener('drop', (e) => this.handleDrop(e));

        return spot;
    }

    createPart(name) {
        const part = document.createElement('div');
        part.className = 'part';
        part.textContent = name;
        part.draggable = true;
        part.dataset.name = name;

        part.addEventListener('dragstart', (e) => this.handleDragStart(e));
        part.addEventListener('dragend', (e) => this.handleDragEnd(e));

        return part;
    }

    handleDragStart(e) {
        this.draggedPart = e.target;
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    }

    handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }

    handleDragOver(e) {
        e.preventDefault();
        const spot = e.currentTarget;
        if (!spot.classList.contains('filled')) {
            spot.classList.add('drag-over');
            e.dataTransfer.dropEffect = 'move';
        }
    }

    handleDragLeave(e) {
        e.currentTarget.classList.remove('drag-over');
    }

    handleDrop(e) {
        e.preventDefault();
        const spot = e.currentTarget;
        spot.classList.remove('drag-over');

        if (spot.classList.contains('filled')) {
            return;
        }

        const partName = this.draggedPart.dataset.name;
        const spotName = spot.dataset.name;

        if (partName === spotName) {
            this.placePartCorrectly(spot);
        } else {
            this.placedPartIncorrectly(spot);
        }
    }

    placePartCorrectly(spot) {
        const part = this.draggedPart;
        part.classList.add('in-spot');
        part.draggable = false;
        
        spot.appendChild(part);
        spot.classList.add('filled');

        this.checkLevelComplete();
    }

    placedPartIncorrectly(spot) {
        this.mistakes++;
        this.totalMistakes++;
        this.updateStats();

        const message = FAIL_MESSAGES[Math.floor(Math.random() * FAIL_MESSAGES.length)];
        this.showMessage(message, 'error');

        spot.classList.add('shake');
        setTimeout(() => spot.classList.remove('shake'), 300);
    }

    checkLevelComplete() {
        const spots = document.querySelectorAll('.spot');
        const allFilled = Array.from(spots).every(spot => spot.classList.contains('filled'));

        if (allFilled) {
            this.stopTimer();
            this.showLevelComplete();
        }
    }

    showLevelComplete() {
        const time = this.getElapsedTime();
        const modal = document.getElementById('level-complete');
        
        document.getElementById('level-time').textContent = time.toFixed(1);
        
        let feedback = SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)];
        if (this.mistakes === 0) {
            feedback += ' FLAWLESS!';
        } else if (this.mistakes <= 2) {
            feedback += ` Only ${this.mistakes} mistake${this.mistakes === 1 ? '' : 's'}!`;
        } else {
            feedback += ` ${this.mistakes} mistakes. Practice makes perfect!`;
        }
        
        document.getElementById('level-feedback').textContent = feedback;
        
        modal.classList.remove('hidden');
    }

    showGameComplete() {
        const modal = document.getElementById('game-over');
        const title = document.getElementById('game-over-title');
        const message = document.getElementById('game-over-message');

        title.textContent = 'Workshop Mastered!';
        
        let msg = `You completed all ${LEVELS.length} levels!\n\n`;
        if (this.totalMistakes === 0) {
            msg += '🏆 PERFECT GAME! Not a single mistake!';
        } else if (this.totalMistakes <= 5) {
            msg += `Total mistakes: ${this.totalMistakes}. Excellent work!`;
        } else {
            msg += `Total mistakes: ${this.totalMistakes}. Keep practicing!`;
        }

        message.textContent = msg;
        modal.classList.remove('hidden');
    }

    nextLevel() {
        document.getElementById('level-complete').classList.add('hidden');
        this.currentLevel++;
        this.loadLevel();
    }

    restart() {
        document.getElementById('game-over').classList.add('hidden');
        this.currentLevel = 0;
        this.mistakes = 0;
        this.totalMistakes = 0;
        this.loadLevel();
    }

    startTimer() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            const elapsed = this.getElapsedTime();
            document.getElementById('timer').textContent = elapsed.toFixed(1);
        }, 100);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    getElapsedTime() {
        if (!this.startTime) return 0;
        return (Date.now() - this.startTime) / 1000;
    }

    updateStats() {
        document.getElementById('level-display').textContent = this.currentLevel + 1;
        document.getElementById('mistakes').textContent = this.mistakes;
    }

    showMessage(text, type = '') {
        const messageEl = document.getElementById('message');
        messageEl.textContent = text;
        messageEl.className = `message ${type}`;
    }

    shuffle(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new Game();
});
