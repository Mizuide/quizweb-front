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

import { COOKIE_KEY_QUIZ_TITLE, COOKIE_KEY_QUIZ_URL, GUEST_ID } from "../../const/const";

import * as api from "../../const/api";
import ResizedImageField from "../common/ResizedImageField";

type quizInfonContext = [
    quiz: createQuizParam,
    setQuiz: React.Dispatch<React.SetStateAction<createQuizParam>>
]

type zodErrorContext = [
    zodError: ZodError | undefined,
    setZodError: React.Dispatch<React.SetStateAction<ZodError | undefined>>
]

//QuizInfo is managed by context
export const QuizInfoContext = React.createContext<quizInfonContext>({} as quizInfonContext);
export const ZodErrorContext = React.createContext<zodErrorContext>({} as zodErrorContext);

type prop = {
    editQuizParam: createQuizParam,
}

const CreateQuizForm: React.FC<prop> = (prop: prop) => {
    const [title, setTitle] = useState<string>(prop.editQuizParam.title || '');
    const [description, setDescription] = useState<string>(prop.editQuizParam.description || '');
    const [thumbnailImage, setThumbnailImage] = useState<string | undefined>(undefined);
    const [tags, setTags] = useState<tag[]>([]);

    const fileReader = new FileReader();

    fileReader.onload = (() => {
        setThumbnailImage(fileReader.result as string);
        saveEdit('thumbnail', fileReader.result);
    })

    const history = useHistory();

    const [zodError, setZodError] = useState<ZodError>();
    const [titleError, setTitleError] = useState<semantic_error | undefined>(undefined);
    const [quiz, setQuiz] = useState<createQuizParam>({
        id: prop.editQuizParam.id,
        title: title,
        description: description,
        thumbnail: thumbnailImage || undefined,
        tags: tags,
        createUserId: prop.editQuizParam.createUserId,
        questions: []
    })

    useEffect(() => {
        setTitle(prop.editQuizParam.title);
        setDescription(prop.editQuizParam.description);
        if (prop.editQuizParam.thumbnail) {
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
            ...quiz, id: prop.editQuizParam.id, title: title, description: description, thumbnail: thumbnailImage || undefined, tags: tags, createUserId: prop.editQuizParam.createUserId
        });
    }, [prop, title, description, thumbnailImage, tags])

    useEffect(() => {
        if (zodError !== undefined) {
            for (let issue of zodError.issues) {
                if (issue.path.includes('title')) {
                    setTitleError({ content: issue.message, pointing: 'below' });
                }
            }
            setZodError(undefined);
        }
    }, [zodError])

    const saveEdit = (property: string, value: any) => {
        if (quiz.createUserId !== GUEST_ID) {
            let param = {
                [property]: value
            };
            api.editQuiz({ quiz: { ...param, id: quiz.id } });
        }
    }

    const addTagFunction = (tag: string) => {
        if (quiz.createUserId !== GUEST_ID) {
            api.addTag({ quizId: quiz.id, tag: tag })
        }
    }

    const putQuiz = (target: HTMLButtonElement) => {
        try {
            CreateQuizParamValidation.parse(quiz);
            // テスト中だけ外す
            // target.disabled = true;
            setZodError(undefined);
            let axiosPromise = quiz.createUserId !== GUEST_ID ? api.publish({ quizId: quiz.id }) : api.createQuiz({ createQuizParam: quiz });
            axiosPromise.then(res => {
                const encodeTitle = encodeURI(res.data.title);
                const encodeURL = encodeURI(`${process.env.REACT_APP_FQDN}/${res.data.quizId}`);
                console.log(encodeTitle, encodeURL);
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
            <QuizInfoContext.Provider value={[quiz, setQuiz]}>
                <ZodErrorContext.Provider value={[zodError, setZodError]}>
                    <Form.Input error={titleError} label='タイトル' placeholder='クイズのタイトルをここに入力してください'
                        value={title} onChange={(e) => {
                            console.log(titleError);
                            setTitle(e.target.value);
                            saveEdit('title', e.target.value);
                        }} />
                    <Form.Input label='説明文' placeholder='クイズの説明文をここに入力してください'
                        value={description} onChange={(e) => {
                            setDescription(e.target.value);
                            saveEdit('description', e.target.value);
                        }} />
                    {/* <ResizedImageField label={'サムネイル画像'} inputId={'thumbnail'}/> */}

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
                        <Image src={thumbnailImage} size='medium' verticalAlign='middle' />
                    </Form.Field>
                    <Form.Button
                        type="button"
                        size={"tiny"}
                        content="画像を選択"
                        labelPosition="left"
                        icon="image"
                        onClick={() => {
                            const t = document.querySelector(`#thumbnail`) as HTMLElement
                            t.click()
                        }}
                    />
                    <TagFields addTagFunction={addTagFunction} tags={tags} setTags={setTags} />
                    <CreateQuestionForm quizId={prop.editQuizParam.id} questions={prop.editQuizParam.questions} />
                </ZodErrorContext.Provider>
            </QuizInfoContext.Provider>

            <Form.Button icon={'pencil alternate'} content={'作成'} onClick={e => {
                putQuiz(e.target as HTMLButtonElement);
            }} />
        </Form>
    )
}

export default CreateQuizForm;