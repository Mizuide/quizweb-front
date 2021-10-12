import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Form, Image } from "semantic-ui-react";
import { ZodError } from "zod";
import * as categoryConst from '../../const/category';
import no_image from '../../img/no_image.png';
import api from "../../property/api.json";
import createQuizParam from "../../type/createQuizParam";
import loginUser from "../../type/loginUser";
import semantic_error from "../../type/semantic_error";
import tag from "../../type/tag";
import CreateQuizParamValidation from "../../validate/CreateQuizParamValidation";
import CreateQuestionForm from "./CreateQuestionForm";
import TagFields from "./TagFields";

type quizInfonContext = [
    quiz: createQuizParam,
    setQuiz: React.Dispatch<React.SetStateAction<createQuizParam>>
]

//QuizInfo is managed by context
export const QuizInfoContext = React.createContext<quizInfonContext>({} as quizInfonContext);
export const ZodErrorContext = React.createContext<ZodError | undefined>({} as ZodError);

type prop = {
    loginUser: loginUser | undefined
}

const CreateQuizForm: React.FC<prop> = (prop: prop) => {
    const [category,] = useState<categoryConst.categoryId>(categoryConst.categoryId.all);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [thumbnailImage, setThumbnailImage] = useState<string | undefined>(undefined);
    const [tags, setTags] = useState<tag[]>([]);

    const fileReader = new FileReader();

    fileReader.onload = (() => {
        setThumbnailImage(fileReader.result as string)
    })

    const history = useHistory();

    const [zodError, setZodError] = useState<ZodError>();
    const [titleError, setTitleError] = useState<semantic_error | undefined>(undefined);

    const [quiz, setQuiz] = useState<createQuizParam>({
        category: category,
        description: description,
        thumbnail: thumbnailImage || undefined,
        title: title,
        tags: tags,
        questions: []
    })

    useEffect(() => {
        setQuiz({
            ...quiz, title: title, description: description, thumbnail: thumbnailImage || undefined, tags: tags
        });
        console.log(tags);
    }, [title, description, thumbnailImage, tags])

    useEffect(() => {
        setTitleError(undefined)
        if (zodError !== undefined) {
            for (let issue of zodError.issues) {
                if (issue.path.includes('title')) {
                    setTitleError({ content: issue.message, pointing: 'below' });
                }
            }
        }
    }, [zodError])


    const submit = (target: HTMLButtonElement) => {
        try {
            CreateQuizParamValidation.parse(quiz);
            target.disabled = true;
            setZodError(undefined);
            axios.post(api.createQuiz.url, { createQuizParam: quiz }).then(res => history.push('/'));
        } catch (e) {
            if (e instanceof ZodError) {
                setZodError(e);
            } else {
                throw e;
            }
        }
    }
    if (!prop.loginUser)
        return (<>
            クイズを作成するにはtwitter連携でログインする必要があります<br />
            <a href="/quizWeb/doAuth">ここ</a>をクリックしてログインしてください
        </>)
    return (
        <Form>
            <h1>クイズを作成する</h1>
            <QuizInfoContext.Provider value={[quiz, setQuiz]}>
                <TagFields setTags={setTags} />
                <ZodErrorContext.Provider value={zodError}>
                    {/* <Categories setCategory={setCategory} /> */}
                    <Form.Input error={titleError} label='タイトル' placeholder='クイズのタイトルをここに入力してください'
                        onChange={(e) => setTitle(e.target.value)} />
                    <Form.Input label='説明文' placeholder='クイズの説明文をここに入力してください'
                        onChange={(e) => setDescription(e.target.value)} />

                    <Form.Field>
                        <label>サムネイル画像</label>
                        <input
                            hidden
                            type="file"
                            accept="image/*"
                            id='thumbnail'
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0])
                                    fileReader.readAsDataURL(e.target.files[0]);
                            }} />
                        <Image src={thumbnailImage || no_image} size='medium' verticalAlign='middle' />
                    </Form.Field>
                    <Form.Button
                        size={"tiny"}
                        content="画像を選択"
                        labelPosition="left"
                        icon="image"
                        onClick={() => {
                            const t = document.querySelector(`#thumbnail`) as HTMLElement
                            t.click()
                        }}
                    />

                    <CreateQuestionForm />
                </ZodErrorContext.Provider>
            </QuizInfoContext.Provider>
            <Form.Button icon={'pencil alternate'} content={'クイズを作成する'} onClick={e => {
                submit(e.target as HTMLButtonElement);
            }} />
        </Form>
    )
}

export default CreateQuizForm;