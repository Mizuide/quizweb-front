import React, { ReactElement } from "react";
import { useParams } from 'react-router-dom'
import * as fetch from '../util/fetchAPI' 

export type param = {
    id: string
}

const GameScreen: React.FC =  () => {
    let prop: param = useParams<param>();
    fetch.fetchQuestions(prop.id).then(res => console.log(res)).catch(res => console.log());
    return (
        <div className="GameScreen">
            {prop.id}
        </div>
    )
}

export default GameScreen;