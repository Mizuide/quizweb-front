import { useContext, useRef } from 'react'
import { QuizInfoContext } from '../component/createQuiz/CreateQuizForm'
import choicetype from '../type/choicetype';
import createQuizParam, { createChoiceParam, createQuestionParam } from '../type/createQuizParam'

export const useFetchQuestion = () => {
    const [quiz] = useContext(QuizInfoContext);
    const quizRef = useRef<createQuizParam>(quiz);
    quizRef.current = quiz;

    return (index: number) => quizRef.current.questions[index];
}

export const useAddQuestion = () => {
    const [quiz, setQuiz] = useContext(QuizInfoContext);
    const quizRef = useRef<createQuizParam>(quiz);
    quizRef.current = quiz;

    return (question: createQuestionParam) => {
        if (quiz.questions.find(q => q.id === question.id) !== undefined)
            throw new Error('this argument index already exists:index' + question.id)
        quizRef.current.questions.push(question);
        setQuiz({ ...quizRef.current, questions: quizRef.current.questions });
    }
}

export const useChangeQuestion = () => {
    const [quiz, setQuiz] = useContext(QuizInfoContext);
    const quizRef = useRef<createQuizParam>(quiz);
    quizRef.current = quiz;

    return (id: number, newContent: string, newComment: string, choicetype: choicetype) => {
        if (quizRef.current.questions.find(q => q.id === id) === undefined)
            throw new Error('this argument index is not exists:index' + id);
        setQuiz({
            ...quizRef.current, questions: quizRef.current.questions.map(q => {
                if (q.id === id) {
                    return { ...q, content: newContent, comment: newComment, choicetype: choicetype };
                } else {
                    return q;
                }
            })
        })
    }
}

export const useDeleteQuestion = () => {
    const [quiz, setQuiz] = useContext(QuizInfoContext);
    const quizRef = useRef<createQuizParam>(quiz);
    quizRef.current = quiz;

    return (id: number) => {
        if (quizRef.current.questions.find(q => q.id === id) === undefined)
            throw new Error('this argument index is not exists:index' + id);
        setQuiz({
            ...quizRef.current, questions: quizRef.current.questions.filter(q => q.id !== id)
        });        
    }
}

export const useFetchChoice = () => {
    const [quiz] = useContext(QuizInfoContext);
    const quizRef = useRef<createQuizParam>(quiz);
    quizRef.current = quiz;

    return (questionIndex: number, choiceIndex: number) => quizRef.current.questions[questionIndex].choices[choiceIndex];
}

export const useIndexOfChoices = (id: number) => {
    const [quiz] = useContext(QuizInfoContext);
    const quizRef = useRef<createQuizParam>(quiz);
    quizRef.current = quiz;

    return (choiceId: number) => {
        const choices = quizRef.current.questions.find(q => q.id === id)?.choices;
        if (choices === undefined)
            throw new Error('this question is not exists:index' + id);
        let index = 1;
        for (let c of choices) {
            if (choiceId === c.id) {
                return index;
            }
            index++;
        }
    }

}

export const useAddChoice = (questionId: number) => {
    const [quiz, setQuiz] = useContext(QuizInfoContext);
    const quizRef = useRef<createQuizParam>(quiz);
    quizRef.current = quiz;

    return (choice: createChoiceParam) => {
        const ownerQuestion = quizRef.current.questions.find(q => q.id === questionId);

        if (ownerQuestion === undefined)
            throw new Error('this question is not exists:index' + questionId);
        if (ownerQuestion.choices.find(c => c.id === choice.id) !== undefined)
            throw new Error('this choice is already exists:index' + choice.id);
        let flg = ownerQuestion.choices.length === 0
        ownerQuestion.choices.push({ ...choice, correctFlg: flg });
        
        setQuiz({
            ...quizRef.current, questions:
                quizRef.current.questions.map(q => {
                    if (q.id === questionId) {
                        return ownerQuestion;
                    } else {
                        return q;
                    }
                })
        })
    }
}

export const useChangeChoice = (questionId: number) => {
    const [quiz, setQuiz] = useContext(QuizInfoContext);
    const quizRef = useRef<createQuizParam>(quiz);

    quizRef.current = quiz;

    return (newContent: string, choiceId: number) => {

        const ownerQuestion = quizRef.current.questions.find(q => q.id === questionId);
        if (ownerQuestion === undefined)
            throw new Error('this question is not exists:index' + questionId);

        if (ownerQuestion.choices.find(c => c.id === choiceId) === undefined)
            throw new Error('this argument index is not exists:index' + choiceId);
        setQuiz({
            ...quizRef.current, questions:
                quizRef.current.questions.map(q => {
                    if (q.id === questionId) {
                        return {
                            ...ownerQuestion, choices: ownerQuestion.choices.map(c => {
                                if (c.id === choiceId) {
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

export const useDeleteChoice = (questionId: number) => {
    const [quiz, setQuiz] = useContext(QuizInfoContext);
    const quizRef = useRef<createQuizParam>(quiz);

    quizRef.current = quiz;

    return (choiceId: number) => {
        const ownerQuestion = quizRef.current.questions.find(q => q.id === questionId);
        if (ownerQuestion === undefined)
            throw new Error('this question is not exists:index' + questionId)
        if (ownerQuestion.choices.find(c => c.id === choiceId) === undefined)
            throw new Error('this argument index is not exists:index' + choiceId);
        setQuiz({
            ...quizRef.current, questions:
                quizRef.current.questions.map(q => {
                    if (q.id === questionId) {
                        return { ...ownerQuestion, choices: ownerQuestion.choices.filter(c => c.id !== choiceId) };
                    } else {
                        return q;
                    }
                })
        })
    }
}

export const useChangeCorrectChoice = (questionId: number) => {
    const [quiz, setQuiz] = useContext(QuizInfoContext);
    const quizRef = useRef<createQuizParam>(quiz);

    quizRef.current = quiz;

    return (choiceId: number) => {
        const ownerQuestion = quizRef.current.questions.find(q => q.id === questionId);
        if (ownerQuestion === undefined)
            throw new Error('this question is not exists:index' + questionId)

        let targetChoices = ownerQuestion.choices;
        targetChoices = targetChoices.map(c => {
            if (c.id === choiceId) {
                return { ...c, correctFlg: true }
            } else if (c.id !== choiceId && c.correctFlg === true) {
                return { ...c, correctFlg: false }
            } else {
                return c;
            }
        }
        )
        setQuiz({
            ...quizRef.current, questions:
                quizRef.current.questions.map(q => {
                    if (q.id === choiceId) {
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