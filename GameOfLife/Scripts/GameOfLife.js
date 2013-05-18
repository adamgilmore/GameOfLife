function Grid(width, height) {
    var _me = this;
    _me.width = width;
    _me.height = height;
    _me.buffer = null;

    this.create = function () {
        _me.buffer = [];
        for (var x = 0; x < _me.width; ++x)
            _me.buffer[x] = [];
    };

    this.clear = function () {
        for (var x = 0; x < _me.width; ++x)
            for (var y = 0; y < _me.height; ++y)
                _me.buffer[x][y] = 0;
    };

    this.randomise = function () {
        for (var x = 0; x < _me.width; ++x)
            for (var y = 0; y < _me.height; ++y)
                _me.buffer[x][y] = Math.round(Math.random());
    };

    this.createGlider = function (x, y) {
        _me.buffer[x + 1][y] = 1;
        _me.buffer[x + 2][y + 1] = 1;
        _me.buffer[x][y + 2] = 1;
        _me.buffer[x + 1][y + 2] = 1;
        _me.buffer[x + 2][y + 2] = 1;
    }

    this.createRPentimino = function (x, y) {
        _me.buffer[x + 1][y] = 1;
        _me.buffer[x + 2][y] = 1;
        _me.buffer[x][y + 1] = 1;
        _me.buffer[x + 1][y + 1] = 1;
        _me.buffer[x + 1][y + 2] = 1;
    }

    _me.create();
    _me.clear();
}

function Game(width, height) {
    var _me = this;

    _me.width = width;
    _me.height = height;

    _me.currentGridIndex = 0;
    _me.generation = 0;

    _me.grids = [];
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
            for (var y1 = y - 1; y1 <= y + 1; ++y1) {

                var x2, y2;

                if (x1 < 0) x2 = _me.width + x1;
                else if (x1 > _me.width - 1) x2 = x1 - _me.width;
                else x2 = x1;

                if (y1 < 0) y2 = _me.height + y1;
                else if (y1 > _me.height - 1) y2 = y1 - _me.height;
                else y2 = y1;
                
                if (!(x2 == x & y2 == y))
                    if (currentGrid.buffer[x2][y2] > 0)
                        ++neighbours;
            }

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

