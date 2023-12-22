import './Square.css'
import { useState } from 'react';

const Square = ({value, changeUser, posX, posY}) => {

    const [user, setUser] = useState('');

    const clickSquare = () => {
        
        setUser(value);

      
        changeUser(value, posX, posY);
    
    }

    let realValue = user.toUpperCase();
    let type = user.toUpperCase() === 'X' ? 'squareX' : 'squareO';

    return(
        <div className={`square ${type}`} onClick={clickSquare} posx={posX} posy={posY}>
            {realValue}
        </div>
    )
}

export default Square;