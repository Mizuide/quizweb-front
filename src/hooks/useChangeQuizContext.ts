import { useContext, useRef } from 'react'
import { QuizInfoContext } from '../component/createQuiz/CreateQuizForm'
import { createChoiceParam, createQuestionParam } from '../type/createQuizParam'

export const useAddQuestion = () => {
    const [quiz, setQuiz] = useContext(QuizInfoContext);
    const questionArrayRef = useRef<createQuestionParam[]>([]);
    questionArrayRef.current = quiz.questions;

    return (question: createQuestionParam) => {
        if (quiz.questions.find(q => q.indexId === question.indexId) !== undefined)
            throw new Error('this argument index already exists:index'+question.indexId)
        questionArrayRef.current.push(question);
        setQuiz({ ...quiz, questions: questionArrayRef.current });
    }
}

export const useChangeQuestion = () => {
    const [quiz, setQuiz] = useContext(QuizInfoContext);
    const questionArrayRef = useRef<createQuestionParam[]>([]);
    questionArrayRef.current = quiz.questions;

    return (newContent: string, newComment: string, index: number) => {
        if (questionArrayRef.current.find(q => q.indexId === index) === undefined)
            throw new Error('this argument index is not exists:index'+index);
        setQuiz({
            ...quiz, questions: questionArrayRef.current.map(q => {
                if (q.indexId === index) {
                    return { ...q, content: newContent, comment: newComment };
                } else {
                    return q;
                }
            })
        })
    }
}

export const useDeleteQuestion = () => {
    const [quiz, setQuiz] = useContext(QuizInfoContext);
    const questionArrayRef = useRef<createQuestionParam[]>([]);
    questionArrayRef.current = quiz.questions;

    return (index: number) => {
        if (questionArrayRef.current.find(q => q.indexId === index) === undefined)
            throw new Error('this argument index is not exists:index'+index);
        setQuiz({
            ...quiz, questions: questionArrayRef.current.filter(q => q.indexId !== index)
        });
    }
}

export const useAddChoice = (quesitonIndex: number) => {
    const [quiz, setQuiz] = useContext(QuizInfoContext);
    const questionArrayRef = useRef<createQuestionParam[]>([]);
    questionArrayRef.current = quiz.questions;
    const ownerQuestion = questionArrayRef.current.find(q => q.indexId === quesitonIndex);

    if (ownerQuestion === undefined)
        throw new Error('this question is not exists:index'+quesitonIndex);

    return (choice: createChoiceParam) => {
        if (ownerQuestion.choices.find(c => c.indexId == choice.indexId) !== undefined)
            throw new Error('this choice is already exists:index'+choice.indexId);
        ownerQuestion.choices.push(choice);
        setQuiz({
            ...quiz, questions:
                questionArrayRef.current.map(q => {
                    if (q.indexId === quesitonIndex) {
                        return ownerQuestion;
                    } else {
                        return q;
                    }
                })
        })
    }
}

export const useChangeChoice = (quesitonIndex: number) => {
    const [quiz, setQuiz] = useContext(QuizInfoContext);
    const questionArrayRef = useRef<createQuestionParam[]>([]);

    questionArrayRef.current = quiz.questions;
    const ownerQuestion = questionArrayRef.current.find(q => q.indexId === quesitonIndex);

    if (ownerQuestion === undefined)
        throw new Error('this question is not exists:index'+quesitonIndex);

    return (newContent: string, index: number) => {
        if (ownerQuestion.choices.find(q => q.indexId === index) === undefined)
            throw new Error('this argument index is not exists:index'+index);
        setQuiz({
            ...quiz, questions:
                questionArrayRef.current.map(q => {
                    if (q.indexId === quesitonIndex) {
                        return {
                            ...ownerQuestion, choices: ownerQuestion.choices.map(c => {
                                if (c.indexId === index) {
                                    return { ...c, content: newContent }
                                } else {
                                    return c;
                                }
                            })
                        };
                    } else {
                        return q;
                    }
                })
        })
    }
}

export const useDeleteChoice = (quesitonIndex: number) => {
    const [quiz, setQuiz] = useContext(QuizInfoContext);
    const questionArrayRef = useRef<createQuestionParam[]>([]);

    questionArrayRef.current = quiz.questions;
    const ownerQuestion = questionArrayRef.current.find(q => q.indexId === quesitonIndex);

    if (ownerQuestion === undefined)
        throw new Error('this question is not exists:index'+quesitonIndex)

    return (index: number) => {
        if (ownerQuestion.choices.find(c => c.indexId === index) === undefined)
            throw new Error('this argument index is not exists:index'+ index);
        setQuiz({
            ...quiz, questions:
                questionArrayRef.current.map(q => {
                    if (q.indexId === quesitonIndex) {
                        return {
                            ...ownerQuestion, choices: ownerQuestion.choices.filter(c => c.indexId !== index)
                        };
                    } else {
                        return q;
                    }
                })
        })
    }
}

export const useChangeCorrectChoice = (quesitonIndex: number) => {
    const [quiz, setQuiz] = useContext(QuizInfoContext);
    const questionArrayRef = useRef<createQuestionParam[]>([]);

    questionArrayRef.current = quiz.questions;
    const ownerQuestion = questionArrayRef.current.find(q => q.indexId === quesitonIndex);

    if (ownerQuestion === undefined)
        throw new Error('this question is not exists:index'+quesitonIndex)

    return (index: number) => {
        let targetChoices = ownerQuestion.choices;
        targetChoices = targetChoices.map(c => {
            if (c.indexId === index) {
                return { ...c, correctFlg: true }
            } else if (c.indexId !== index && c.correctFlg === true) {
                return { ...c, correctFlg: false }
            } else {
                return c;
            }
        }
        )
        setQuiz({
            ...quiz, questions:
                questionArrayRef.current.map(q => {
                    if (q.indexId === quesitonIndex) {
                        return {
                            ...ownerQuestion, choices: targetChoices
                        };
                    } else {
                        return q;
                    }
                })
        });
    }

}