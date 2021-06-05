import { ReactElement, useEffect, useRef, useState } from "react";
import CreateChoiceField from "./CreateChoiceField";
import { useAddChoice, useChangeCorrectChoice, useDeleteChoice } from "../../hooks/useChangeQuizContext"

type prop = {
    quesitonIndex: number
}

const CreateChoiceForm: React.FC<prop> = (prop: prop) => {
    const [nextIndex, setNextIndex] = useState<number>(2);
    const [addChoicesZone, setAddChoicesZone] = useState<ReactElement[]>([]);

    const changeCorrect = useChangeCorrectChoice(prop.quesitonIndex); 

    const addChoiceToContext = useAddChoice(prop.quesitonIndex);
    const deleteChoise = useDeleteChoice(prop.quesitonIndex);

    let addChoicesZoneRef = useRef<ReactElement[]>([]);
    addChoicesZoneRef.current = addChoicesZone;

    useEffect(() => {
        addChoice(0);
        addChoice(1);
    }, [])

    const addChoice = (nextIndex:number) => {
        const deleteThis = (index: number) => {
            //use '!=' because reactElement.key's type is string
            setAddChoicesZone(addChoicesZoneRef.current.filter(element => element.key != index));
            deleteChoise(index);
        }


        addChoiceToContext({ indexId: nextIndex, content: '', correctFlg: false });

        //this function is change style correct 
        const changeCheckValue = (e: React.ChangeEvent<HTMLInputElement>) => {
            changeCorrect(nextIndex);           

            const beforeCorrects= document.querySelectorAll(".correct");
            beforeCorrects.forEach(e => e.className= "");

            if (e.target.parentElement === null)
                throw new Error('choice zone is invalid,it need parent element');
            e.target.parentElement.className = "correct"

        }

        addChoicesZoneRef.current.push(
            <div key={nextIndex} >
                <CreateChoiceField questionIndex={prop.quesitonIndex} choiceIndex={nextIndex} />
                <input id={`${nextIndex}`} value={nextIndex} name="correctCheck" onChange={e => changeCheckValue(e)} type="radio" />
                <div className="delete" onClick={() => deleteThis(nextIndex)}>この選択肢を削除</div>
            </div>
        );
        setAddChoicesZone([...addChoicesZoneRef.current])
    }

    return (
        <div className='createChoiceForm'>
            {addChoicesZone}
            <div onClick={() => {
                addChoice(nextIndex);
                setNextIndex(nextIndex+1);
            }}>選択肢を追加</div>
        </div>
    )
}

export default CreateChoiceForm;