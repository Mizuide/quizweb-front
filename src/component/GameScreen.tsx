import { useState } from "react";
import * as fetch from "../util/fetchAPI";

type prop ={
    id:number
}

const [qustion,setQuestion] = useState<fetch.question>();



function GameScreen(props:prop){
    fetch.fetchQuestion(props.id).then(res => console.log(res)).catch(res => console.log());
    return(
        <div className="GameScreen">{props.id}</div>
    )

}





export default GameScreen;