import "./App.css";
import Draw from "./Draw";
import { useState } from 'react'

const rows = 10, cols = 10, countWin = 3;
const Matrix = [];

for(let i = 0; i <= rows; i++){
    const row = []
    for(let j = 0; j <= cols; j++){
        row.push('');
    }
    Matrix.push(row);
}

const colorWinning = (winningArr) => {
    winningArr.forEach(item => {
        var posX = item.posX
        var posY = item.posY

        var square = document.querySelector(`.square[posx='${posX}'][posy='${posY}']`)
        square.style.backgroundColor = '#FF9800'
    });
}

function App() {
    
    const [curUser, ChangeUser] = useState('X');

    const ChangeCurUser = (value, posX, posY) => {
        // thay đỗi giá trị trên mảng
        Matrix[posX][posY] = value;
        // Chỉnh sửa trên giao diện
        if(value === 'X'){
            ChangeUser('O');
        }else{
            ChangeUser('X');
        }
        // Kiểm tra win
        let winningArr = checkWin(posX, posY, value);

        if(winningArr.length >= countWin){
            colorWinning(winningArr)
            alert(`Congratulation! You are the winner!`);
        }
    }
    
    let className;
    if(curUser === 'X'){
        className = 'currX';
    }else{
        className = 'currO'
    }

    const checkWin = (posX, posY, value) => {
        let count = 0;
        let winningArr = []
        // 1) Kiểm tra hướng đông tây
        let stepLeft = posY; let stepRight = posY;
        // 1a) tìm 2 cận biên
        for(let i = 1; i < countWin; i++){
            if(posY + i <= cols){
                stepRight ++;
            }

            if(posY - i >= 1){
                stepLeft --;
            }
        }
        // 1b) tìm trên 2 biên
        count = 0
        winningArr = []
        for(let i = stepLeft; i <= stepRight; i++){
            if(Matrix[posX][i] === value){
                count ++;
                winningArr.push({
                    posX: posX,
                    posY: i
                })

                if(count >= countWin){
                    return winningArr;
                }

            }else{
                count = 0;
                winningArr = []
            }   
        }
        
        // 2) Kiểm tra hướng Bắc Nam
        let top = posX; let bottom = posX;
        // 2a) tìm 2 cận biên
        for(let i = 1; i < countWin; i++){
            if(posX + i <= rows){
                bottom ++;
            }

            if(posX - i >= 1){
                top --;
            }
        }
        // 2b) tìm trên 2 biên
        count = 0
        winningArr = []
        for(let i = top; i <= bottom; i++){
            if(Matrix[i][posY] === value){
                count ++;
                winningArr.push({
                    posX: i,
                    posY: posY
                })

                if(count >= countWin){
                    return winningArr;
                }

            }else{
                count = 0;
                winningArr = []
            }   
        }

        // 3) Kiểm tra hướng dấu sắc
        let TopRight = 0; let BottomLeft = 0;
        // 3a) tìm 2 cận biên
        for(let i = 1; i < countWin; i++){
            if(posX - i >= 1 && posY + 1 <= cols){
                TopRight ++;
            }

            if(posX + i <= rows && posY - i >= 1){
                BottomLeft --;
            }
        }
        // 3b) tìm
        count = 0
        winningArr = []
        for(let i = BottomLeft; i<= TopRight; i ++){
            let item = Matrix[posX - i][posY + i]
            if(item === value){
                count ++;
                winningArr.push({
                    posX: posX - i,
                    posY: posY + i
                })
              
                if(count >= countWin){
                    return winningArr;
                }

            }else{
                count = 0;
                winningArr = []
            }   
        }
        // 4) Hướng dấu huyền
        let TopLeft = 0; let BottomRight = 0;
        // 4a) tìm 2 cận biên
        for(let i = 1; i < countWin; i++){
            if(posX + i <= rows && posY + 1 <= cols){
                BottomRight ++;
            }

            if(posX - i >= 1 && posY - i >= 1){
                TopLeft --;
            }
        }
        // 4b) Tìm
        count = 0
        winningArr = []
        for(let i = TopLeft; i<= BottomRight; i ++){
            let item = Matrix[posX + i][posY + i]
            if(item === value){
                count ++;
                winningArr.push({
                    posX: posX + i,
                    posY: posY + i
                })
              
                if(count >= countWin){
                    return winningArr;
                }

            }else{
                count = 0;
                winningArr = []
            }   
        }
        return []
          
    }

    return (
        <div className="App">
            <div className="mainContainer">
                <h3 className={`currUser ${className}`}>Đến lượt: {curUser}</h3>
                <Draw  rows={rows} cols={cols} user={curUser} changeUser={ChangeCurUser}/>
            </div>
        </div>
    );
}

export default App;
