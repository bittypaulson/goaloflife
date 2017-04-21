import { Component, OnInit } from '@angular/core';

import { Cell } from '../../cell';

@Component({
    moduleId: module.id,
    selector:    'grid',
    templateUrl: './grid.view.html',
    providers:  [ ]
})
export class GridComponent implements OnInit {

    gridCellsArray = new Array();
    initialCellsArray = new Array();
    updatedCellsArray = new Array();
    timer: any;
    playing: boolean;

    rows = 25;
    cols = 50;

    constructor() {
        this.initilizeGrid();
    }

    ngOnInit() {}

    initilizeGrid() {
        for (let x = 0; x < this.rows; x += 1) {
            this.gridCellsArray[x] = new Array(this.cols);
            for (let y = 0; y < this.cols; y += 1) {
                this.gridCellsArray[x][y] = new Cell(x, y, false);
            }
        }
        this.initialCellsArray = JSON.parse(JSON.stringify(this.gridCellsArray));
    }

    changePopulateState(columnCell: Cell) {
        columnCell.populated = !columnCell.populated;
    }

    checkNeighborsCount(cell: Cell) {
        let count = 0;
        for ( let x = -1; x <= 1; x += 1) {
            for ( let y = -1; y <= 1; y += 1 ) {
                let tmpX = cell.x + x,
                    tmpY = cell.y + y;
                if ( tmpX >= 0 && tmpX < this.rows && tmpY >= 0 && tmpY < this.cols &&
                    !( x === 0 && y === 0 ) && this.gridCellsArray[tmpX][tmpY].populated) {
                        count += 1;
                }
            }
        }
        return count;
    }

    generateGrid() {
        this.updatedCellsArray = JSON.parse(JSON.stringify(this.gridCellsArray));

        for (let x = 0; x < this.gridCellsArray.length; x += 1 ) {
            for ( let y = 0; y < this.gridCellsArray[x].length; y += 1 ) {
                let neighborsCount = this.checkNeighborsCount(this.gridCellsArray[x][y]);
                if (this.gridCellsArray[x][y].populated) {
                    if ( neighborsCount === 2  || neighborsCount === 3 ) {
                        this.updatedCellsArray[x][y].populated = true;
                    } else {
                        this.updatedCellsArray[x][y].populated = false;
                    }
                } else {
                    if ( neighborsCount === 3 ) {
                        this.updatedCellsArray[x][y].populated = true;
                    }
                }
            }
        }
        this.gridCellsArray = JSON.parse(JSON.stringify(this.updatedCellsArray));
    }

    play() {
        let _this = this;
        _this.playing = true;
        _this.generateGrid();
        this.timer = setInterval( function(){
            _this.generateGrid();
        }, 1000 );
    }

    reset() {
        this.stop();
        this.gridCellsArray = JSON.parse(JSON.stringify(this.initialCellsArray));
    }

    stop() {
        this.playing = false;
        clearInterval(this.timer);
    }
}
