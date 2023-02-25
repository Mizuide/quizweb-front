import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Form, Image } from "semantic-ui-react";
import { ZodError } from "zod";
import semantic_error from "../../type/semantic_error";

import createQuizParam from "../../type/createQuizParam";
import tag from "../../type/tag";

import { putCookie } from "../../util/cookieUtil";
import CreateQuizParamValidation from "../../validate/CreateQuizParamValidation";
import CreateQuestionForm from "./CreateQuestionForm";
import TagFields from "./TagFields";

import { COOKIE_KEY_QUIZ_TITLE, COOKIE_KEY_QUIZ_URL } from "../../const/const";

import no_image from '../../img/no_image.png';
import api from "../../property/api.json";

type quizInfonContext = [
    quiz: createQuizParam,
    setQuiz: React.Dispatch<React.SetStateAction<createQuizParam>>
]

//QuizInfo is managed by context
export const QuizInfoContext = React.createContext<quizInfonContext>({} as quizInfonContext);
export const ZodErrorContext = React.createContext<ZodError | undefined>({} as ZodError);

type prop = {
    editQuizParam?: createQuizParam,
    password?: string
}

const CreateQuizForm: React.FC<prop> = (prop: prop) => {
    const [title, setTitle] = useState<string>(prop.editQuizParam?.title || '');
    const [description, setDescription] = useState<string>(prop.editQuizParam?.description || '');
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
        title: title,
        description: description,
        thumbnail: thumbnailImage || undefined,
        tags: tags,
        questions: []
    })

    useEffect(() => {
        setTitle(prop.editQuizParam?.title || '');
        setDescription(prop.editQuizParam?.description || '');
        if (prop.editQuizParam?.thumbnail) {
            axios.get(prop.editQuizParam.thumbnail, {
                responseType: 'blob'
            }).then(res => {
                fileReader.readAsDataURL(res.data);
            })
        }
        if (prop.editQuizParam?.tags) {
            setTags([...prop.editQuizParam.tags]);
        }
    }, [prop])

    useEffect(() => {
        setQuiz({
            ...quiz, title: title, description: description, thumbnail: thumbnailImage || undefined, tags: tags
        });
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


    const putQuiz = (target: HTMLButtonElement) => {
        try {
            CreateQuizParamValidation.parse(quiz);
            target.disabled = true;
            setZodError(undefined);
            // 編集ならput,新規作成ならpost
            let axiosPromise = prop.editQuizParam ? axios.put(api.createQuiz.url, { createQuizParam: quiz }) : axios.post(api.createQuiz.url, { createQuizParam: quiz });
            axiosPromise.then(res => {
                const encodeTitle = encodeURI(res.data.title);
                const encodeURL = encodeURI(`${process.env.REACT_APP_FQDN}/${res.data.id}`)
                putCookie(COOKIE_KEY_QUIZ_TITLE, encodeTitle);
                putCookie(COOKIE_KEY_QUIZ_URL, encodeURL);
                history.push(`/create/done`);
            });
        } catch (e) {
            if (e instanceof ZodError) {
                setZodError(e);
            } else {
                throw e;
            }
        }
    }

    return (
        <Form>
            {/* <h1>クイズを作成する</h1> */}
            <QuizInfoContext.Provider value={[quiz, setQuiz]}>
                <ZodErrorContext.Provider value={zodError}>
                    <Form.Input error={titleError} label='タイトル' placeholder='クイズのタイトルをここに入力してください'
                        value={quiz.title} onChange={(e) => setTitle(e.target.value)} />
                    <Form.Input label='説明文' placeholder='クイズの説明文をここに入力してください'
                        value={quiz.description} onChange={(e) => setDescription(e.target.value)} />

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
                    <TagFields tags={tags} setTags={setTags} />
                    <CreateQuestionForm questions={prop.editQuizParam?.questions} />
                </ZodErrorContext.Provider>
            </QuizInfoContext.Provider>
            <Form.Button icon={'save'} content={'保存'} onClick={e => {
                putQuiz(e.target as HTMLButtonElement);
            }} />
            <Form.Button icon={'pencil alternate'} content={'作成'} onClick={e => {
                putQuiz(e.target as HTMLButtonElement);
            }} />
        </Form>
    )
}

export default CreateQuizForm;