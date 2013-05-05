/*
function Grid(size) {
    var _me = this;
    _me.size = size;
    _me.buffer = null;

    _me.create = function () {
        _me.buffer = new Array(_me.size);
        $.each(_me.buffer, function (i, value) {
            _me.buffer[i] = new Array(_me.size);
        });
    };

    _me.clear = function () {
        $.each(_me.buffer, function (x, value) {
            $.each(_me.buffer[x], function (y, value) {
                _me.buffer[x][y] = 0;
            });
        });
    };

    _me.create();
    _me.clear();
}
*/

function Game(size) {
    var _me = this;

    _me.size = size;

    this.createGrid = function () {
        var grid = new Array(_me.size);
        $.each(grid, function (i, value) {
            grid[i] = new Array(_me.size);
        });

        _me.clearGrid(grid);

        return grid;
    };

    this.clearGrid = function (grid) {
        $.each(grid, function (x, value) {
            $.each(grid[x], function (y, value) {
                grid[x][y] = 0;
            });
        });
    };

    this.randomiseGrid = function (grid) {
        $.each(grid, function (x, value) {
            $.each(grid[x], function (y, value) {
                grid[x][y] = Math.round(Math.random());
            });
        });
    };

    this.calculateGeneration = function () {
        var nextGridIndex = (_me.currentGridIndex == 0) ? 1 : 0;

        _me.clearGrid(_me.grids[nextGridIndex]);

        for (var y = 0; y < _me.size; ++y) {
            for (var x = 0; x < _me.size; ++x) {
                _me.calculateCellGeneration(_me.grids[_me.currentGridIndex], _me.grids[nextGridIndex], x, y);
            }
        }

        ++_me.generation;

        _me.currentGridIndex = nextGridIndex;

        return _me.grids[nextGridIndex];
    };

    this.calculateCellGeneration = function (currentGrid, nextGrid, x, y) {
        var neighbours = _me.calculateNeighbours(currentGrid, x, y);
        if (currentGrid[x][y] == 0 && neighbours == 3) {
            nextGrid[x][y] = 1;
        }
        else if ((currentGrid[x][y] == 1 || currentGrid[x][y] == 2) && (neighbours == 2 || neighbours == 3)) {
            nextGrid[x][y] = 2;
        }
        else {
            nextGrid[x][y] = 0;
        }
    };

    this.calculateNeighbours = function (grid, x, y) {
        var neighbours = 0;

        for (var b = y - 1; b <= y + 1; ++b) {
            for (var a = x - 1; a <= x + 1; ++a) {
                if (a >= 0 && a < _me.size && b >= 0 && b < _me.size && !(a == x & b == y)) {
                    if (grid[a][b] > 0) {
                        ++neighbours;
                    }
                }
            }
        }

        return neighbours;
    };

    _me.currentGridIndex = 0;
    _me.generation = 0;

    _me.grids = new Array(2);
    _me.grids[0] = this.createGrid();
    _me.grids[1] = this.createGrid();

    _me.randomiseGrid(_me.grids[_me.currentGridIndex]);
}

