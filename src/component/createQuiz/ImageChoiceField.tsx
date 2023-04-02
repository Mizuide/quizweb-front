import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Form, Image, Popup, Segment } from "semantic-ui-react";
import checkImg from '../../img/check.png';
import no_image from '../../img/no_image.png';
import choiceFieldProp from "../../type/choiceFieldProp";

type fileSet = {
  choiceId: number,
  file: string | ArrayBuffer | null
}

type tmpProp = {
  choiceFieldProp: choiceFieldProp;
  index: number;
  popupMsg: string;
  propLength: number;
  filesRef: React.MutableRefObject<fileSet[]>;
  fileReader: FileReader;
}

const ImageChoiceField: React.FC<tmpProp> = (prop: tmpProp) => {

  useEffect(() => {
    if (prop.choiceFieldProp.content) {
      axios.get(prop.choiceFieldProp.content, {
        responseType: 'blob'
      }).then(res => {
        prop.fileReader.readAsDataURL(res.data);
      })
    }
  }, [prop.choiceFieldProp])

  return (<Segment key={prop.choiceFieldProp.choiceId} >
    <Form.Group unstackable >
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
    </Form.Group>
    <Form.Group unstackable >
      <Image src={prop.filesRef.current.find(f => f.choiceId === prop.choiceFieldProp.choiceId)?.file || no_image}
        size='small' verticalAlign='middle' />
      <Form.Input
        error={prop.choiceFieldProp.contentError}
        hidden
        type="file"
        accept="image/*"
        id={`file${prop.index}`}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            prop.fileReader.readAsDataURL(e.target.files[0]);
          }
        }} />
    </Form.Group>
    <Form.Group unstackable>
      <Form.Button
        content="画像を選択"
        labelPosition="left"
        icon="image"
        onClick={() => {
          const t = document.querySelector(`#file${prop.index}`) as HTMLElement
          t.click()
        }}
      />
    </Form.Group>
  </Segment>
  )
}

const ImageChoiceFields: React.FC<choiceFieldProp[]> = (prop: choiceFieldProp[]) => {
  type fileSet = {
    choiceId: number,
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
      filesRef.current = filesRef.current.filter(f => f.choiceId !== prop.choiceId);
      filesRef.current.push({
        choiceId: prop.choiceId,
        file: fileReader.result
      })
      prop.changeChoice(fileReader.result as string, prop.choiceId);
      setFiles([...filesRef.current])
    })

    if (propLength === 2) {
      popupMsg = '選択肢を2個より少なくはできません';
    } else if (prop.correct) {
      popupMsg = '正解になっている選択肢は削除できません';
    }

    return (
      <ImageChoiceField key={prop.choiceId} choiceFieldProp={prop} propLength={propLength} popupMsg={popupMsg} filesRef={filesRef} fileReader={fileReader} index={index} />
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