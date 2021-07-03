import { ReactElement, useEffect, useRef, useState } from "react";
import { useAddChoice, useChangeCorrectChoice, useDeleteChoice } from "../../hooks/useChangeQuizContext";
import css from "../../css/createQuizForm.module.scss"
import CreateChoiceField from "./CreateChoiceField";


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
    
    const changeContext = (nextIndex: number) => {
        changeCorrect(nextIndex);
    }
    useEffect(() => {
        //FIXME:配列へのpushなので問題なく動くが、setStateの順次処理を前提としているので潜在バグがある
        addChoice(0);
        addChoice(1);
    }, [])
    
    const addChoice = (nextIndex: number) => {
        const deleteThis = (index: number) => {
            addChoicesZoneRef.current.forEach(e => console.log(e));
            //use '!=' because reactElement.key's type is string
            setAddChoicesZone(addChoicesZoneRef.current.filter(element => element.key != index));
            deleteChoise(index);
        }

        addChoiceToContext({ indexId: nextIndex, content: '', correctFlg: false });

        //this function is change style correct 
        const changeCheckValue = (e: React.ChangeEvent<HTMLInputElement>) => {

            const beforeCorrects = document.querySelectorAll(".correct");
            beforeCorrects.forEach(e => e.className = "");

            if (e.target.parentElement === null)
                throw new Error('choice zone is invalid,it need parent element');
            e.target.parentElement.className = "correct"

        }
        let firstFlg = addChoicesZoneRef.current.length === 0;
        addChoicesZone.push(
            <div key={nextIndex} className={css.contentZone}>
                <input id={`${nextIndex}`} defaultChecked={firstFlg} value={nextIndex} name="correctCheck" onChange={e => {
                    changeContext(nextIndex);
                }} type="radio" />
                <CreateChoiceField choiceIndex={nextIndex}  questionIndex={prop.quesitonIndex} />
                <div className={css.deleteButton} onClick={() => deleteThis(nextIndex)}>この選択肢を削除</div>
            </div>
        );
        setAddChoicesZone([...addChoicesZone])
    }
    const disp = addChoicesZoneRef.current.map((e,index) => {return(
        <div key={e.key} >選択肢{index+1}
            {e}</div>)})

    return (
        <div className='createChoiceForm'>
            {disp}
            <div  onClick={() => {
                addChoice(nextIndex);
                setNextIndex(nextIndex + 1);
            }}>選択肢を追加</div>
        </div>
    )
}

export default CreateChoiceForm;