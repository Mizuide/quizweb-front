import { useState } from "react";
import * as fetch from "../util/fetchAPI";
import {
    useParams
  } from 'react-router-dom'

export type param ={
    id:string
}

// const [qustion,setQuestion] = useState<fetch.question>();



function GameScreen(){
    // fetch.fetchQuestion(props.id).then(res => console.log(res)).catch(res => console.log());
    let prop:param = useParams<param>();
    return(
        <div className="GameScreen">{prop.id}</div>
    )

}





export default GameScreen;