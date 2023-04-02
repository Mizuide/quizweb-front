import axios, { AxiosResponse } from "axios"
import createQuizParam from "../type/createQuizParam";
import loginUser from "../type/loginUser";
import quiz from "../type/quiz";
import quizDetail from "../type/quizDetail";
import searchQuizesCondition from "../type/searchQuizesConditions";
import tag from "../type/tag";


export type loginRes = { user: loginUser };
export const login: () => Promise<AxiosResponse<loginRes>> = () => axios.get('/quizWeb/api/login');

export type newQuizRes = { quizId: number, createUserId: number }
export const newQuiz: () => Promise<AxiosResponse<newQuizRes>> = () => axios.post("/quizWeb/api/quiz/new");

export type newQuestionReq = {
    quizId: number,
    num: number,
    choicetype: string
}
export type newQuestionRes = { questionId: number, createUserId: number }
export const newQuestion: (req: newQuestionReq) => Promise<AxiosResponse<newQuestionRes>> = (req) => axios.post("/quizWeb/api/question/new", req);

export type newChoiceReq = {
    quizId: number,
    questionId: number,
    selectionNo: number,
    correctFlg: boolean
}
export type newChoiceRes = { choiceId: number, createUserId: number }
export const newChoice: (req: newChoiceReq) => Promise<AxiosResponse<newChoiceRes>> = (req) => axios.post("/quizWeb/api/choice/new", req);

export type getQuizListReq = {
    fetchSize: number;
    page: number;
    searchConditions: searchQuizesCondition;
};
export type getQuizListRes = {
    quizInfoList: {
        quiz: quiz
        tags: tag[]
    }[],
    count: number
}
export const getQuizList: (req: getQuizListReq) => Promise<AxiosResponse<getQuizListRes>> = (req) => axios.post("/quizWeb/api/quiz/getlist", req);

export type quizDetailReq = { quizId: number };
export type quizDetailRes = { quizDetail: quizDetail };
export const getQuizDetail: (req: quizDetailReq) => Promise<AxiosResponse<quizDetailRes>> = (req) => axios.get("/quizWeb/api/quizDetail", { params: req });

export type answerReq = { questionId: number, selectionNo: number };
export type answerRes = { answer: number };
export const answer: (req: answerRes) => Promise<AxiosResponse<answerRes>> = (req) => axios.get("/quizWeb/api/answer", { params: req });

export type createQuizReq = { createQuizParam: createQuizParam };
export type createQuizRes = { quizId: number, title: string };
export const createQuiz: (req: createQuizReq) => Promise<AxiosResponse<createQuizRes>> = (req) => axios.post("/quizWeb/api/insert/inbulk", req);

export type editParamReq = { quizId: number };
export type editParamRes = { createQuizParam: createQuizParam };
export const editParam: (req: editParamReq) => Promise<AxiosResponse<editParamRes>> = (req) => axios.get("/quizWeb/api/edit/param", { params: req });

export type editQuizReq = { quiz: { [property: string]: any } };
export type editQuizRes = void;
export const editQuiz: (req: editQuizReq) => Promise<AxiosResponse<editQuizRes>> = (req) => axios.put("/quizWeb/api/quiz/edit/save", req);

export type editQuestionReq = { question: { [property: string]: any } };
export type editQuestionRes = void;
export const editQuestion: (req: editQuestionReq) => Promise<AxiosResponse<editQuestionRes>> = (req) => axios.put("/quizWeb/api/question/edit/save", req);

export type editChoiceReq = { choice: { [property: string]: any } };
export type editChoiceRes = void;
export const editChoice: (req: editChoiceReq) => Promise<AxiosResponse<editChoiceRes>> = (req) => axios.put("/quizWeb/api/choice/edit/save", req);

export type deleteChoiceReq = { id: number };
export const deleteChoice: (req: deleteChoiceReq) => Promise<AxiosResponse<void>> = (req) => axios.delete("/quizWeb/api/choice", { data: req });

export type getTagListByPrefixReq = { prefix: string };
export type getTagListByPrefixRes = { tagList: tag[] };
export const getTagList: (req: getTagListByPrefixReq) => Promise<AxiosResponse<getTagListByPrefixRes>> = (req) => axios.get("/quizWeb/api/taglist/prefix", { params: req });

// TODO
export type addTagReq = { quizId: number, tag: string };
export const addTag: (req: addTagReq) => Promise<AxiosResponse<void>> = (req) => axios.post("/quizWeb/api/tag/add", req);

export type publishReq = { quizId: number };
export type publishRes = { title: string, quizId: number };
export const publish: (req: publishReq) => Promise<AxiosResponse<publishRes>> = (req) => axios.put("/quizWeb/api/quiz/publish", req);

// "anwesr": {
    //     "url": "/quizWeb/api/answer"
    // },
    // "createQuiz": {
    //     "url": "/quizWeb/api/insert/inbulk"
    // },
    // "getEditParamByUser":{
    //     "url": "/quizWeb/api/edit/param"
    // },
    // "editQuiz":{
    //     "url":"/quizWeb/api/quiz/edit/save"
    // },
    // "editQuestion":{
    //     "url":"/quizWeb/api/question/edit"
    // },
    // "editChoice":{
    //     "url":"/quizWeb/api/choice/edit"
    // },
    // "tag": {
    //     "url": "/quizWeb/api/tag"
    // }



// export const apis = [{}] as const;