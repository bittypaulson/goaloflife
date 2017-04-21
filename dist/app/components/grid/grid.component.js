"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var cell_1 = require("../../cell");
var GridComponent = (function () {
    function GridComponent() {
        this.gridCellsArray = new Array();
        this.initialCellsArray = new Array();
        this.updatedCellsArray = new Array();
        this.rows = 25;
        this.cols = 50;
        this.initilizeGrid();
    }
    GridComponent.prototype.ngOnInit = function () { };
    GridComponent.prototype.initilizeGrid = function () {
        for (var x = 0; x < this.rows; x += 1) {
            this.gridCellsArray[x] = new Array(this.cols);
            for (var y = 0; y < this.cols; y += 1) {
                this.gridCellsArray[x][y] = new cell_1.Cell(x, y, false);
            }
        }
        this.initialCellsArray = JSON.parse(JSON.stringify(this.gridCellsArray));
    };
    GridComponent.prototype.changePopulateState = function (columnCell) {
        columnCell.populated = !columnCell.populated;
    };
    GridComponent.prototype.checkNeighborsCount = function (cell) {
        var count = 0;
        for (var x = -1; x <= 1; x += 1) {
            for (var y = -1; y <= 1; y += 1) {
                var tmpX = cell.x + x, tmpY = cell.y + y;
                if (tmpX >= 0 && tmpX < this.rows && tmpY >= 0 && tmpY < this.cols &&
                    !(x === 0 && y === 0) && this.gridCellsArray[tmpX][tmpY].populated) {
                    count += 1;
                }
            }
        }
        return count;
    };
    GridComponent.prototype.generateGrid = function () {
        this.updatedCellsArray = JSON.parse(JSON.stringify(this.gridCellsArray));
        for (var x = 0; x < this.gridCellsArray.length; x += 1) {
            for (var y = 0; y < this.gridCellsArray[x].length; y += 1) {
                var neighborsCount = this.checkNeighborsCount(this.gridCellsArray[x][y]);
                if (this.gridCellsArray[x][y].populated) {
                    if (neighborsCount === 2 || neighborsCount === 3) {
                        this.updatedCellsArray[x][y].populated = true;
                    }
                    else {
                        this.updatedCellsArray[x][y].populated = false;
                    }
                }
                else {
                    if (neighborsCount === 3) {
                        this.updatedCellsArray[x][y].populated = true;
                    }
                }
            }
        }
        this.gridCellsArray = JSON.parse(JSON.stringify(this.updatedCellsArray));
    };
    GridComponent.prototype.play = function () {
        var _this = this;
        _this.playing = true;
        _this.generateGrid();
        this.timer = setInterval(function () {
            _this.generateGrid();
        }, 1000);
    };
    GridComponent.prototype.reset = function () {
        this.stop();
        this.gridCellsArray = JSON.parse(JSON.stringify(this.initialCellsArray));
    };
    GridComponent.prototype.stop = function () {
        this.playing = false;
        clearInterval(this.timer);
    };
    return GridComponent;
}());
GridComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'grid',
        templateUrl: './grid.view.html',
        providers: []
    }),
    __metadata("design:paramtypes", [])
], GridComponent);
exports.GridComponent = GridComponent;
//# sourceMappingURL=grid.component.js.map