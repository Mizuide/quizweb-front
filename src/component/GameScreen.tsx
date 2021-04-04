import axios from 'axios';

type prop ={
    id:string
}

function GameScreen(props:prop){
   let num:string = fetchQuestion(props.id);
    return(
        
        <div className="GameScreen">{num}</div>
    )

}

function fetchQuestion(id:string):string{
    return id;
}

export default GameScreen;