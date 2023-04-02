import { Form, Popup } from 'semantic-ui-react';
import choiceFieldProp from '../../type/choiceFieldProp';
import checkImg from '../../img/check.png';
import { useEffect, useState } from 'react';
import { GUEST_ID } from '../../const/const';
import * as api from '../../const/api';
import axios from 'axios';

type tmpProp = {
    choiceFieldProp: choiceFieldProp;
    index: number;
    popupMsg: string;
    propLength: number;
}

const SingleChoiceField: React.FC<tmpProp> = (prop: tmpProp) => {
    const [value, setValue] = useState<string>(prop.choiceFieldProp?.content || '');
    useEffect(() => prop.choiceFieldProp.changeChoice(value, prop.choiceFieldProp.choiceId), [value])
    const saveEdit = (property: string, value: any) => {
        if (prop.choiceFieldProp.createUserId !== GUEST_ID) {
            let param = {
                [property]: value
            }
            api.editChoice({ choice: { ...param, id: prop.choiceFieldProp.choiceId } });
        }
    }

    return (
        <Form.Group unstackable inline key={prop.choiceFieldProp.choiceId} >
            <Form.Button size='mini' color={prop.choiceFieldProp.correct ? 'red' : undefined} value={prop.choiceFieldProp.choiceId}
                onClick={prop.choiceFieldProp.chooseCorrect} >
                <img src={checkImg} />
            </Form.Button>
            <Popup
                content={prop.popupMsg}
                on='click'
                pinned
                trigger={<Form.Button size='medium' icon='trash' onClick={() => {
                    if (prop.propLength === 2 || prop.choiceFieldProp.correct)
                        return false;
                    prop.choiceFieldProp.deleteThis()
                }} />}
            />

            <Form.Input size='huge' value={value} placeholder='選択肢を入力してください' label={`${prop.index + 1}`}
                error={prop.choiceFieldProp.contentError} onChange={e => {
                    setValue(e.target.value);
                    saveEdit('content', e.target.value);
                }} width={15} />
        </Form.Group>
    )
}

const SingleChoiceFields: React.FC<choiceFieldProp[]> = (prop: choiceFieldProp[]) => {
    const propLength: number = prop.length;
    const fields = prop.map((prop, index) => {
        let popupMsg = '';
        if (propLength === 2) {
            popupMsg = '選択肢を2個より少なくはできません';
        } else if (prop.correct) {
            popupMsg = '正解になっている選択肢は削除できません';
        }
        return (<SingleChoiceField key={prop.choiceId} choiceFieldProp={prop} index={index} popupMsg={popupMsg} propLength={propLength} />)
    })

    return (
        <>
            {fields}
        </>
    )
}
export default SingleChoiceFields;