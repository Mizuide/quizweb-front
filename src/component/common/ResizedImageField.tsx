import { useState } from "react";
import { Form, Image as ImageE } from "semantic-ui-react";


type prop = {
    label: string,
    inputId: string
}

const ResizedImageField: React.FC<prop> = (prop: prop) => {

    const fileReader = new FileReader();
    const [src, setSrc] = useState<String>('');
    fileReader.onload = () => {
        const imgDataURL = fileReader.result;
        setSrc(imgDataURL as string);
        // const image = new Image();
        // image.onload = (e) => {
        //     const resizedImgData = resizeImg(e.target as HTMLImageElement);
        //     // setSrc(resizedImgData);
        // }
        // image.src = imgDataURL as string;
    };

    function resizeImg(img: HTMLImageElement) {
        const canvas = (document.querySelector('#canvasin') as HTMLCanvasElement);
        canvas.width = 400;
        canvas.height = 300;
        // document.querySelector('#emb')?.append(canvas);
        const ctx = canvas.getContext('2d');

        ctx?.drawImage(img, 0, 0, 300, 300);
        return canvas.toDataURL('image/png')
    }
    return (
        <>
            <Form.Field>
                <label>{prop.label}</label>
                <input
                    hidden
                    id={prop.inputId}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0])
                            fileReader.readAsDataURL(e.target.files[0]);
                    }} />
                <ImageE  src={src} size='medium' verticalAlign='middle' />
            </Form.Field>
            <Form.Button
                type="button"
                size={"tiny"}
                content="画像を選択"
                labelPosition="left"
                icon="image"
                onClick={() => {
                    const t = document.querySelector(`#${prop.inputId}`) as HTMLElement
                    t.click()
                }}
            />
        </>
    )
}

export default ResizedImageField;

