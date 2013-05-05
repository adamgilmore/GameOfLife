function Grid(size) {
    var _me = this;
    _me.size = size;
    _me.buffer = null;

    this.create = function () {
        _me.buffer = new Array(_me.size);
        $.each(_me.buffer, function (i, value) {
            _me.buffer[i] = new Array(_me.size);
        });
    };

    this.clear = function () {
        $.each(_me.buffer, function (x, value) {
            $.each(_me.buffer[x], function (y, value) {
                _me.buffer[x][y] = 0;
            });
        });
    };

    this.randomise = function () {
        $.each(_me.buffer, function (x, value) {
            $.each(_me.buffer[x], function (y, value) {
                _me.buffer[x][y] = Math.round(Math.random());
            });
        });
    };

    _me.create();
    _me.clear();
}

function Game(size) {
    var _me = this;

    _me.size = size;

    this.calculateGeneration = function () {
        var nextGridIndex = (_me.currentGridIndex == 0) ? 1 : 0;

        _me.grids[nextGridIndex].clear();

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
        var neighbours = 0;

        for (var b = y - 1; b <= y + 1; ++b) 
            for (var a = x - 1; a <= x + 1; ++a) 
                if (a >= 0 && a < _me.size && b >= 0 && b < _me.size && !(a == x & b == y)) 
                    if (currentGrid.buffer[a][b] > 0) 
                        ++neighbours;

        if (currentGrid.buffer[x][y] == 0 && neighbours == 3) {
            nextGrid.buffer[x][y] = 1;
        }
        else if ((currentGrid.buffer[x][y] == 1 || currentGrid.buffer[x][y] == 2) && (neighbours == 2 || neighbours == 3)) {
            nextGrid.buffer[x][y] = 2;
        }
        else {
            nextGrid.buffer[x][y] = 0;
        }
    };

    _me.currentGridIndex = 0;
    _me.generation = 0;

    _me.grids = new Array(2);
    _me.grids[0] = new Grid(_me.size);
    _me.grids[1] = new Grid(_me.size);

    _me.grids[0].randomise();
}

