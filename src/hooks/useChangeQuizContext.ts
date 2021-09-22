import { useContext, useRef } from 'react'
import { QuizInfoContext } from '../component/createQuiz/CreateQuizForm'
import choiceType from '../type/choiceType';
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
        if (quiz.questions.find(q => q.indexId === question.indexId) !== undefined)
            throw new Error('this argument index already exists:index' + question.indexId)
        quizRef.current.questions.push(question);
        setQuiz({ ...quizRef.current, questions: quizRef.current.questions });
    }
}

export const useChangeQuestion = () => {
    const [quiz, setQuiz] = useContext(QuizInfoContext);
    const quizRef = useRef<createQuizParam>(quiz);
    quizRef.current = quiz;

    return (index: number, newContent: string, newComment: string, choiceType: choiceType) => {
        if (quizRef.current.questions.find(q => q.indexId === index) === undefined)
            throw new Error('this argument index is not exists:index' + index);
        setQuiz({
            ...quizRef.current, questions: quizRef.current.questions.map(q => {
                if (q.indexId === index) {
                    return { ...q, content: newContent, comment: newComment ,choiceType: choiceType  };
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

    return (index: number) => {
        if (quizRef.current.questions.find(q => q.indexId === index) === undefined)
            throw new Error('this argument index is not exists:index' + index);
        setQuiz({
            ...quizRef.current, questions: quizRef.current.questions.filter(q => q.indexId !== index)
        });
    }
}

export const useFetchChoice = () => {
    const [quiz] = useContext(QuizInfoContext);
    const quizRef = useRef<createQuizParam>(quiz);
    quizRef.current = quiz;

    return (questionIndex: number, choiceIndex: number) => quizRef.current.questions[questionIndex].choices[choiceIndex];
}

export const useIndexOfChoices = (questionIndex: number) => {
    const [quiz] = useContext(QuizInfoContext);
    const quizRef = useRef<createQuizParam>(quiz);
    quizRef.current = quiz;

    return (choiceIndex: number) => {
        const choices = quizRef.current.questions.find(q => q.indexId === questionIndex)?.choices;
        if (choices === undefined)
            throw new Error('this question is not exists:index' + questionIndex);
        let index = 1;
        for (let c of choices) {
            if (choiceIndex === c.indexId) {
                return index;
            }
            index++;
        }
    }

}

export const useAddChoice = (questionIndex: number) => {
    const [quiz, setQuiz] = useContext(QuizInfoContext);
    const quizRef = useRef<createQuizParam>(quiz);
    quizRef.current = quiz;

    return (choice: createChoiceParam) => {
        const ownerQuestion = quizRef.current.questions.find(q => q.indexId === questionIndex);

        if (ownerQuestion === undefined)
            throw new Error('this question is not exists:index' + questionIndex);
        if (ownerQuestion.choices.find(c => c.indexId === choice.indexId) !== undefined)
            throw new Error('this choice is already exists:index' + choice.indexId);
        let flg = ownerQuestion.choices.length === 0
        ownerQuestion.choices.push({ ...choice, correctFlg: flg });

        setQuiz({
            ...quizRef.current, questions:
                quizRef.current.questions.map(q => {
                    if (q.indexId === questionIndex) {
                        return ownerQuestion;
                    } else {
                        return q;
                    }
                })
        })
    }
}

export const useChangeChoice = (questionIndex: number) => {
    const [quiz, setQuiz] = useContext(QuizInfoContext);
    const quizRef = useRef<createQuizParam>(quiz);

    quizRef.current = quiz;

    return (newContent: string, index: number) => {

        const ownerQuestion = quizRef.current.questions.find(q => q.indexId === questionIndex);
        if (ownerQuestion === undefined)
            throw new Error('this question is not exists:index' + questionIndex);

        if (ownerQuestion.choices.find(q => q.indexId === index) === undefined)
            throw new Error('this argument index is not exists:index' + index);
        setQuiz({
            ...quizRef.current, questions:
                quizRef.current.questions.map(q => {
                    if (q.indexId === questionIndex) {
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

export const useDeleteChoice = (questionIndex: number) => {
    const [quiz, setQuiz] = useContext(QuizInfoContext);
    const quizRef = useRef<createQuizParam>(quiz);

    quizRef.current = quiz;

    return (index: number) => {
        const ownerQuestion = quizRef.current.questions.find(q => q.indexId === questionIndex);
        if (ownerQuestion === undefined)
            throw new Error('this question is not exists:index' + questionIndex)
        if (ownerQuestion.choices.find(c => c.indexId === index) === undefined)
            throw new Error('this argument index is not exists:index' + index);
        setQuiz({
            ...quizRef.current, questions:
                quizRef.current.questions.map(q => {
                    if (q.indexId === questionIndex) {
                        return { ...ownerQuestion, choices: ownerQuestion.choices.filter(c => c.indexId !== index) };
                    } else {
                        return q;
                    }
                })
        })
    }
}

export const useChangeCorrectChoice = (questionIndex: number) => {
    const [quiz, setQuiz] = useContext(QuizInfoContext);
    const quizRef = useRef<createQuizParam>(quiz);

    quizRef.current = quiz;

    return (index: number) => {
        const ownerQuestion = quizRef.current.questions.find(q => q.indexId === questionIndex);
        if (ownerQuestion === undefined)
            throw new Error('this question is not exists:index' + questionIndex)

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
            ...quizRef.current, questions:
                quizRef.current.questions.map(q => {
                    if (q.indexId === questionIndex) {
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