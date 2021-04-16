import React, { ReactElement } from "react";
import { useParams } from 'react-router-dom'

export type param = {
    id: string
}



const GameScreen:React.FC = function () {
    // fetch.fetchQuestion(props.id).then(res => console.log(res)).catch(res => console.log());
    let prop: param = useParams<param>();
    return (
        <div className="GameScreen">{prop.id}</div>
    )
}

export default GameScreen;