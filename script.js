document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const resetBtn = document.querySelector('#reset-btn');
    const newGameBtn = document.querySelector('#new-btn');
    const msgContainer = document.querySelector('.msg-container');
    const msg = document.querySelector('#msg');
    const playerScoreDisplay = document.querySelector('#player-score');
    const computerScoreDisplay = document.querySelector('#computer-score');
    const clickSound = document.getElementById('click-sound');
    const backgroundSound = document.getElementById('background-sound');
    const toggleSoundBtn = document.getElementById('toggle-sound-btn');
    const volumeIcon = document.getElementById('volume-icon');
    const volumeSlider = document.getElementById('volume-slider');
    const balloonContainer = document.getElementById('balloon-container');
    const easyBtn = document.getElementById('easy-btn');
    const mediumBtn = document.getElementById('medium-btn');
    const hardBtn = document.getElementById('hard-btn');

    let turnO = true;
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let playerScore = 0;
    let computerScore = 0;
    let isSoundOn = true;
    let difficulty = 'easy';

    const winPatterns = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ];

    
    function createBalloon(emoji) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.textContent = emoji;
        balloonContainer.appendChild(balloon);
    }

    
    function showBalloons(emoji, count) {
        for (let i = 0; i < count; i++) {
            createBalloon(emoji);
        }
    }

   
    function handleGameResult(result) {
        const winEmoji = '🎈🎉'; 
        const loseEmoji = '🎈😢'; 

        if (result === 'win') {
            showBalloons(winEmoji, 10); 
        } else if (result === 'lose') {
            showBalloons(loseEmoji, 5);
        }
    }


    const resetGame = () => {
        turnO = true;
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        enableBoxes();
        msgContainer.classList.add('hide');
        updateScores();
        clearBalloons();
    };


    const disableBoxes = () => {
        boxes.forEach(box => box.disabled = true);
    };

   
    const enableBoxes = () => {
        boxes.forEach((box, index) => {
            if (gameBoard[index] === "") {
                box.disabled = false;
                box.innerText = "";
            } else {
                box.disabled = true;
                box.innerText = gameBoard[index];
            }
        });
    };

   
    const showWinner = (winner) => {
        msg.innerText = `Congratulations, winner is ${winner}`;
        msgContainer.classList.remove('hide');
        disableBoxes();
        if (winner === 'O') {
            playerScore++;
            handleGameResult('win'); 
        } else if (winner === 'X') {
            computerScore++;
            handleGameResult('lose'); 
        }
        updateScores();
    };

    
    const checkWinner = (currentPlayer) => {
        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;
            if (gameBoard[a] === currentPlayer && gameBoard[b] === currentPlayer && gameBoard[c] === currentPlayer) {
                showWinner(currentPlayer);
                return true;
            }
        }
        return false;
    };

   
    const computerMove = () => {
        let emptyIndexes = gameBoard.reduce((acc, val, idx) => (val === "" ? [...acc, idx] : acc), []);
        let randomIndex;

        if (difficulty === 'easy') {
            randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
        } else if (difficulty === 'medium') {
           
            randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
        } else if (difficulty === 'hard') {
          
            randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
        }

        gameBoard[randomIndex] = "X";
        checkWinner("X");
        turnO = true;
        enableBoxes();
    };


    
    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            if (turnO && gameBoard[index] === "") {
                gameBoard[index] = "O";
                box.innerText = "O";
                if (!checkWinner("O")) {
                    turnO = false;
                    currentPlayer = "X";
                    setTimeout(computerMove, 500);
                }
                enableBoxes();
                playClickSound();
            }
        });
    });

    newGameBtn.addEventListener("click", resetGame);

   
    resetBtn.addEventListener("click", resetGame);

    
    const updateScores = () => {
        playerScoreDisplay.textContent = playerScore;
        computerScoreDisplay.textContent = computerScore;
    };

   
    const playClickSound = () => {
        clickSound.currentTime = 0;
        clickSound.play();
    };

    
    const updateVolume = (volume) => {
        backgroundSound.volume = volume / 100;
    };

   
    const toggleSound = () => {
        if (isSoundOn) {
            backgroundSound.pause();
            isSoundOn = false;
            volumeIcon.classList.remove('fa-volume-high');
            volumeIcon.classList.add('fa-volume-mute');
        } else {
            backgroundSound.play();
            isSoundOn = true;
            volumeIcon.classList.remove('fa-volume-mute');
            volumeIcon.classList.add('fa-volume-high');
        }
    };

    
    toggleSoundBtn.addEventListener("click", toggleSound);

   
    volumeSlider.addEventListener("input", () => {
        updateVolume(volumeSlider.value);
    });

    
    easyBtn.addEventListener("click", () => {
        difficulty = 'easy';
        easyBtn.style.backgroundColor = 'gray';
        mediumBtn.style.backgroundColor = 'black';
        hardBtn.style.backgroundColor = 'black';
    });

    mediumBtn.addEventListener("click", () => {
        difficulty = 'medium';
        easyBtn.style.backgroundColor = 'black';
        mediumBtn.style.backgroundColor = 'gray';
        hardBtn.style.backgroundColor = 'black';
    });

    hardBtn.addEventListener("click", () => {
        difficulty = 'hard';
        easyBtn.style.backgroundColor = 'black';
        mediumBtn.style.backgroundColor = 'black';
        hardBtn.style.backgroundColor = 'gray';
    });

  
    updateVolume(volumeSlider.value);

    
    backgroundSound.play();
});


function clearBalloons() {
    const balloonContainer = document.getElementById('balloon-container');
    balloonContainer.innerHTML = ''; 
}
