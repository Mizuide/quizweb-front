import { useEffect, useRef, useState } from "react";
import { Form, Image, Popup, Segment } from "semantic-ui-react";
import checkImg from '../../img/check.png';
import no_image from '../../img/no_image.png';
import choiceFieldProp from "../../type/choiceFieldProp";


const ImageChoiceFields: React.FC<choiceFieldProp[]> = (prop: choiceFieldProp[]) => {
  type fileSet = {
    choiceIndex: number,
    file: string | ArrayBuffer | null
  }
  const [files, setFiles] = useState<fileSet[]>([]);
  const filesRef = useRef(files);

  const [fields, setFields] = useState<any>();

  const propLength: number = prop.length;

  const render = () => setFields(prop.map((prop, index) => {
    let popupMsg = '';

    const fileReader = new FileReader();
    fileReader.onload = (() => {
      filesRef.current = filesRef.current.filter(f => f.choiceIndex !== prop.choiceIndex);
      filesRef.current.push({
        choiceIndex: prop.choiceIndex,
        file: fileReader.result
      })
      prop.changeChoice(fileReader.result as string, prop.choiceIndex);
      setFiles([...filesRef.current])
    })

    if (propLength === 2) {
      popupMsg = '選択肢を2個より少なくはできません';
    } else if (prop.correct) {
      popupMsg = '正解になっている選択肢は削除できません';
    }

    return (
      <Segment key={prop.choiceIndex} >
        <Form.Group unstackable >
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
        </Form.Group>
        <Form.Group unstackable >
          <Image src={filesRef.current.find(f => f.choiceIndex === prop.choiceIndex)?.file || no_image}
            size='medium' verticalAlign='middle' />
          <Form.Input
            error={prop.contentError}
            hidden
            type="file"
            accept="image/*"
            id={`file${index}`}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                fileReader.readAsDataURL(e.target.files[0]);
              }
            }} />
        </Form.Group>
        <Form.Group unstackable>
          <Form.Button
            content="画像を選択"
            labelPosition="left"
            icon="image"
            onClick={() => {
              const t = document.querySelector(`#file${index}`) as HTMLElement
              t.click()
            }}
          />
        </Form.Group>
      </Segment>
    )
  }))
  useEffect(() => {
    render();
  }, [prop, files])

  return (
    <>
      {fields}
    </>
  )
}

export default ImageChoiceFields;