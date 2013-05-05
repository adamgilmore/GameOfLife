var ArraySize = 64;
var currentGridIndex;
var life;
var generation;

function initialiseGame() {
    // create array
    life = new Array(2);
    life[0] = createGrid();
    life[1] = createGrid();

    generation = 0;
    currentGridIndex = 0;
    randomiseGrid(life[currentGridIndex]);
}

function createGrid() {
    var grid = new Array(ArraySize);
    $.each(grid, function (x, value) {
        grid[x] = new Array(ArraySize);
    });

    clearGrid(grid);

    return grid;
}

function clearGrid(grid) {
    $.each(grid, function (x, value) {
        $.each(grid[x], function (y, value) {
            grid[x][y] = 0;
        });
    });
}

function randomiseGrid(grid) {
    $.each(grid, function (x, value) {
        $.each(grid[x], function (y, value) {
            grid[x][y] = Math.round(Math.random());
        });
    });
}

function initialiseGrid(grid) {
    // block
    life[0][0][0] = 1;
    life[0][1][0] = 1;
    life[0][0][1] = 1;
    life[0][1][1] = 1;

    // ship
    life[0][3][0] = 1;
    life[0][4][0] = 1;
    life[0][3][1] = 1;
    life[0][5][1] = 1;
    life[0][4][2] = 1;
    life[0][5][2] = 1;

    // blinker
    life[0][0][5] = 1;
    life[0][1][5] = 1;
    life[0][2][5] = 1;

    // glider
    life[0][5][8] = 1;
    life[0][5][9] = 1;
    life[0][6][9] = 1;
    life[0][4][10] = 1;
    life[0][6][10] = 1;
}

function calculateGeneration() {
    var nextGridIndex = (currentGridIndex == 0) ? 1 : 0;

    clearGrid(life[nextGridIndex]);

    for (var y = 0; y < ArraySize; ++y) {
        for (var x = 0; x < ArraySize; ++x) {
            calculateCellGeneration(life[currentGridIndex], life[nextGridIndex], x, y);
        }
    }

    ++generation;

    currentGridIndex = nextGridIndex;

    return life[nextGridIndex];
}

function calculateCellGeneration(currentGrid, nextGrid, x, y) {
    var neighbours = calculateNeighbours(currentGrid, x, y);
    if (currentGrid[x][y] == 0 && neighbours == 3) {
        nextGrid[x][y] = 1;
    }
    else if ((currentGrid[x][y] == 1 || currentGrid[x][y] == 2) && (neighbours == 2 || neighbours == 3)) {
        nextGrid[x][y] = 2;
    }
    else {
        nextGrid[x][y] = 0;
    }

}

function calculateNeighbours(grid, x, y) {
    var neighbours = 0;

    for (var b = y - 1; b <= y + 1; ++b) {
        for (var a = x - 1; a <= x + 1; ++a) {
            if (a >= 0 && a < ArraySize && b >= 0 && b < ArraySize && !(a == x & b == y)) {
                if (grid[a][b] > 0) {
                    ++neighbours;
                }
            }
        }
    }

    return neighbours;
}
