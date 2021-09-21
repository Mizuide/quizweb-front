import { Form, Popup } from 'semantic-ui-react';
import choiceFiledProp from '../../type/choiceFieldProp';
import checkImg from '../../img/check.png';

const SingleChoiceField: React.FC<choiceFiledProp[]> = (prop: choiceFiledProp[]) => {
    const propLength: number = prop.length;
    const fields = prop.map((prop, index) => {
        let popupMsg = '';
        if (propLength === 2) {
            popupMsg = '選択肢を2個より少なくはできません';
        } else if (prop.correct) {
            popupMsg = '正解になっている選択肢は削除できません';
        }
        return (
            <Form.Group unstackable inline key={prop.choiceIndex} >
                <Form.Button size='mini' color={prop.correct ? 'red' : undefined} value={prop.choiceIndex}
                    onClick={prop.chooseCorrect} >
                    <img src={checkImg} />
                </Form.Button>
                <Popup
                    content={popupMsg}
                    on='click'
                    pinned
                    trigger={<Form.Button size='medium' icon='trash' onClick={() => {
                        if (propLength === 2 || prop.correct)
                            return false;
                        prop.deleteThis()
                    }} />}
                />

                <Form.Input size='huge' placeholder='選択肢を入力してください' label={`${index + 1}`}
                    error={prop.contentError} onChange={(e) => prop.changeChoice(e.target.value, prop.choiceIndex)} width={15} />
            </Form.Group>
        )
    })

    return (
        <>
            {fields}
        </>
    )
}
export default SingleChoiceField;