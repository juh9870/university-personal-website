window.addEventListener('load', function (event) {
    var cells = [...document.getElementsByTagName("td")];
    var field = new Array(9).fill('');
    var table = document.getElementById("ttt");
    var title = document.getElementById("title");
    var playerTurn = true;

    function checkWin(i1, i2, i3) {
        return field[i1] === field[i2] && field[i2] === field[i3];
    }

    function paintCell(i, char) {
        field[i] = char;
        cells[i].classList = char;

        var row = Math.floor(i / 3);
        var col = i % 3;
        var topLeftDiagonal = row === col
        var topRightDiagonal = row === 2 - col;
        if (checkWin(3 * row, 3 * row + 1, 3 * row + 2) ||
            checkWin(col, col + 3, col + 6) ||
            (topLeftDiagonal && checkWin(0, 4, 8)) ||
            (topRightDiagonal && checkWin(2, 4, 6))) {
            title.textContent = `${char} won!`;
            return false;
        }
        return true;
    }

    function getFreeCells() {
        var cells = [];
        for (let i = 0; i < field.length; i++) {
            if (field[i] === '') cells.push(i);
        }
        return cells;
    }

    function botTurn() {
        var cells = getFreeCells();
        var i = cells[Math.floor(Math.random() * cells.length)];
        return paintCell(i, 'o');
    }

    function checkDraw() {
        if (getFreeCells().length === 0) {
            title.textContent = "Draw!";
            playerTurn = false;
            return true;
        }
        return false;
    }

    table.addEventListener('click', (e) => {
        if (!playerTurn) return;
        var i = cells.indexOf(e.target);
        if (field[i] !== '') return;
        playerTurn = false;
        if (paintCell(i, 'x')) {
            if (!checkDraw()) {
                if (botTurn()) {
                    playerTurn = true;
                    checkDraw();
                }
            }
        }
    });
});