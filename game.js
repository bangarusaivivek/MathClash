function Game(rowSize,colSize){
    this.rowSize = rowSize;
    this.colSize = colSize;
    this.board = new Board(rowSize,colSize);
    this.target = 0;
    this.score = 0;

    this.getRandomTarget = () =>{
        return 5 + Math.ceil(Math.random()*50)
    };

    this.init = () => {
        this.initBoard();
        this.board.addCells();
        this.render();
        this.startTimer();
        this.initCurrentSum();
        this.initScore();
        this.initTarget();
    };
    this.initTarget = () => {
        this.target = 5 + Math.ceil(Math.random()*50)
        document.getElementById("target").innerText = this.target;
        console.log(typeof target)
    };
    
    this.initCurrentSum = () => {
        document.getElementById("currentsum").innerText = this.board.currentSum;
    };
    
    this.initScore = () => {
        document.getElementById("score").innerText = `score : ${this.score}`;
    };
    
    this.startTimer = () =>{
        const interval = setInterval(()=>{
            if(this.board.cells.length == rowSize){
                clearInterval(interval);
                document.querySelectorAll(".cell").classList.add("disabled")
                alert("game over")
                return;
            }
            this.board.addCells();
            //console.log(cells)
            this.render();
        },10000);
    };

    this.render = () => {
        for(let i=0;i<this.board.cells.length;i++){
            for(let j=0;j<this.board.cells[i].length;j++){
                const el = document.getElementById("cell"+i+j);
                el.innerText = this.board.cells[i][j].number;
                
                if(this.board.cells[i][j].number !== ""){
                    el.classList.add("filledcell")
                }
                else if(el.classList.contains("filledcell")){
                    el.classList.remove("filledcell")
                }

                if(this.board.cells[i][j].selected){
                    console.log(el)
                    el.classList.add("greenselect")
                }
                else if(el.classList.contains("greenselect")){
                    el.classList.remove("greenselect")
                }
            }
    
        }
    };
    this.handleClick = (event,i,j,insideEl) => {
            // if(i>= cells.length || j>=cells[i].length){
            //     return;
            // }
        if(this.board.cells[i][j].number === ""){
            return;
        }
        this.board.cells[i][j].selected = !this.board.cells[i][j].selected;
        
        insideEl.classList.add("greenselect")
        if(this.board.cells[i][j].selected){
            this.board.currentSum += this.board.cells[i][j].number
        }
        else{
            this.board.currentSum -= this.board.cells[i][j].number
        }
            
        if(this.board.currentSum > this.target){
            this.board.removeAllSelected();
            this.board.currentSum = 0;
                
        }
        else if(this.board.currentSum === this.target){
                
            const addScore = this.board.removeSelectedReplace();
            this.score += addScore
            this.board.currentSum = 0;
            this.initScore();
        
            this.initTarget();
                
        }
    
        this.initCurrentSum ();
        this.render();
        console.log(event.target)
        console.log('clicked',i,j)
    };

    this.initBoard = () => {
        const board = document.getElementById("board");
        for(let i=0;i<rowSize;i++){
            let rowEl = document.createElement('div');
                rowEl.classList.add('row')
                for(let j=0;j<colSize;j++)
                {
                    let insideEl = document.createElement('div');
                    insideEl.classList.add("cell");
                    insideEl.setAttribute("id","cell"+i+j);
                    insideEl.addEventListener("click",(event)=> this.handleClick(event,i,j,insideEl));
                    rowEl.appendChild(insideEl);
                }
                board.appendChild(rowEl);
        }
     
    };
    
}