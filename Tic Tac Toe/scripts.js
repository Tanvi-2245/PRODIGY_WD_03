document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset-button');
    const statusDiv = document.getElementById('status');
    const confettiContainer = document.getElementById('confetti-container');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let isGameActive = true;
    let confettiInterval;
    let confettiCount = 0;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < 8; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusDiv.innerHTML = `Player ${currentPlayer} wins!`;
            isGameActive = false;
            triggerConfetti();
            return;
        }

        if (!board.includes('')) {
            statusDiv.innerHTML = 'Draw!';
            isGameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDiv.innerHTML = `Player ${currentPlayer}'s turn`;
    };

    const userAction = (cell, index) => {
        if (board[index] !== '' || !isGameActive) {
            return;
        }

        board[index] = currentPlayer;
        cell.innerHTML = currentPlayer;
        cell.classList.add(currentPlayer);
        handleResultValidation();
    };

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        currentPlayer = 'X';
        statusDiv.innerHTML = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('X');
            cell.classList.remove('O');
        });
        confettiContainer.innerHTML = '';  // Clear confetti
        clearInterval(confettiInterval);
        confettiCount = 0;
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => userAction(cell, index));
    });

    resetButton.addEventListener('click', resetBoard);

    statusDiv.innerHTML = `Player ${currentPlayer}'s turn`;

    const triggerConfetti = () => {
        confettiInterval = setInterval(() => {
            if (confettiCount >= 3) {  // Limit the number of bursts
                clearInterval(confettiInterval);
                return;
            }
            for (let i = 0; i < 100; i++) {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
                confetti.style.setProperty('--dx', `${Math.random()}`);
                confetti.style.setProperty('--dy', `${Math.random()}`);
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                confettiContainer.appendChild(confetti);
            }
            confettiCount++;
        }, 1000);
    };
});
