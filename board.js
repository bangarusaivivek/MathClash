function Board(rowSize,colSize){
    this.rowSize = rowSize;
    this.colSize = colSize;
    this.currentSum = 0;
    this.cells = [];

    this.addCells = () =>{
        const arr = [];
        for(let i=0;i<colSize;i++){
            arr.push(new Cell());
        }
        this.cells.unshift(arr);
    };

    this.removeSelectedReplace = () =>{
        let count = 0;
        for(let i=0;i<this.cells.length;i++){
            for(let j=0;j<this.cells[i].length;j++){
                if(this.cells[i][j].selected){
                    count++;
                    this.cells[i][j].number = "";
                    this.cells[i][j].selected = false;
                    //render();
                    
    
                }
            }
        }
        return count;
    };

    this.removeAllSelected = () => {
        for(let i=0;i<this.cells.length;i++){
            for(let j=0;j<this.cells[i].length;j++){
                if(this.cells[i][j].selected){
                    this.cells[i][j].selected = false;
                    //render();
                }
            }
        }
    };
    
}