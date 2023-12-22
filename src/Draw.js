import './Draw.css'
import Square from './Square'

const Draw = ({rows, cols, user, changeUser}) => {

    const rowList = [];
    for(let i = 0; i < rows; i++){
        rowList.push(i + 1);
    }

    const colList = [];
    for(let j = 0; j < cols; j++){
        colList.push(j + 1);
    }
   
    const render = rowList.map(row => 
        <div className="board-row" key={row}>
            {
                colList.map(col => 
                    <Square value={user} key={col} posX = {row} posY = {col} changeUser = {changeUser}/>
                ) 
            }
        </div>

    );

    return (
        <div className="drawContainer">
            {render}
        </div>
    )
}

export default Draw;