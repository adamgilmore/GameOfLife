function Grid(width, height) {
    var _me = this;
    _me.width = width;
    _me.height = height;
    _me.buffer = null;

    this.create = function () {
        _me.buffer = new Array(_me.width);
        $.each(_me.buffer, function (i, value) {
            _me.buffer[i] = new Array(_me.height);
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

function Game(width, height) {
    var _me = this;

    _me.width = width;
    _me.height = height;

    _me.currentGridIndex = 0;
    _me.generation = 0;

    _me.grids = new Array(2);
    _me.grids[0] = new Grid(_me.width, _me.height);
    _me.grids[1] = new Grid(_me.width, _me.height);

    this.randomise = function () {
        _me.grids[_me.currentGridIndex].randomise();
    }

    this.calculateGeneration = function () {
        var nextGridIndex = (_me.currentGridIndex == 0) ? 1 : 0;

        _me.grids[nextGridIndex].clear();

        for (var x = 0; x < _me.width; ++x) {
            for (var y = 0; y < _me.height; ++y) {
                _me.calculateCellGeneration(_me.grids[_me.currentGridIndex], _me.grids[nextGridIndex], x, y);
            }
        }

        _me.currentGridIndex = nextGridIndex;

        ++_me.generation;
    };

    this.calculateCellGeneration = function (currentGrid, nextGrid, x, y) {
        var neighbours = 0;

        for (var x1 = x - 1; x1 <= x + 1; ++x1)
            for (var y1 = y - 1; y1 <= y + 1; ++y1)
                if (x1 >= 0 && x1 < _me.width && y1 >= 0 && y1 < _me.height && !(x1 == x & y1 == y))
                    if (currentGrid.buffer[x1][y1] > 0)
                        ++neighbours;

        if (currentGrid.buffer[x][y] == 0 && neighbours == 3) 
            nextGrid.buffer[x][y] = 1; // birth
        else if ((currentGrid.buffer[x][y] == 1 || currentGrid.buffer[x][y] == 2) && (neighbours == 2 || neighbours == 3)) 
            nextGrid.buffer[x][y] = 2; // alive
        else 
            nextGrid.buffer[x][y] = 0; // dead
    };

    this.currentGrid = function () {
        return _me.grids[_me.currentGridIndex];
    }
}

