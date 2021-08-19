import { useContext, useRef } from 'react'
import { QuizInfoContext } from '../component/createQuiz/CreateQuizForm'
import createQuizParam, { createChoiceParam, createQuestionParam } from '../type/createQuizParam'

export const useFetchQuestion = () =>{
    const [quiz] = useContext(QuizInfoContext);
    const quizRef = useRef<createQuizParam>(quiz);
    quizRef.current = quiz;

    return (index:number) => quizRef.current.questions[index];
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

    return (newContent: string, newComment: string, index: number) => {
        if (quizRef.current.questions.find(q => q.indexId === index) === undefined)
            throw new Error('this argument index is not exists:index' + index);
        setQuiz({
            ...quizRef.current, questions: quizRef.current.questions.map(q => {
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

export const useFetchChoice = () =>{
    const [quiz] = useContext(QuizInfoContext);
    const quizRef = useRef<createQuizParam>(quiz);
    quizRef.current = quiz;

    return (questionIndex:number,choiceIndex:number) => quizRef.current.questions[questionIndex].choices[choiceIndex];
}

export const useAddChoice = (quesitonIndex: number) => {
    const [quiz, setQuiz] = useContext(QuizInfoContext);
    const quizRef = useRef<createQuizParam>(quiz);
    quizRef.current = quiz;

    return (choice: createChoiceParam) => {
        const ownerQuestion = quizRef.current.questions.find(q => q.indexId === quesitonIndex);

        if (ownerQuestion === undefined)
            throw new Error('this question is not exists:index' + quesitonIndex);
        if (ownerQuestion.choices.find(c => c.indexId == choice.indexId) !== undefined)
            throw new Error('this choice is already exists:index' + choice.indexId);
        let flg = ownerQuestion.choices.length === 0
        ownerQuestion.choices.push({...choice,correctFlg:flg});
        
        setQuiz({
            ...quizRef.current, questions:
                quizRef.current.questions.map(q => {
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
    const quizRef = useRef<createQuizParam>(quiz);

    quizRef.current = quiz;

    return (newContent: string, index: number) => {
        
        const ownerQuestion = quizRef.current.questions.find(q => q.indexId === quesitonIndex);
        if (ownerQuestion === undefined)
            throw new Error('this question is not exists:index' + quesitonIndex);

        if (ownerQuestion.choices.find(q => q.indexId === index) === undefined)
            throw new Error('this argument index is not exists:index' + index);
        setQuiz({
            ...quizRef.current, questions:
                quizRef.current.questions.map(q => {
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
    const quizRef = useRef<createQuizParam>(quiz);

    quizRef.current = quiz;
      
    return (index: number) => {        
        const ownerQuestion = quizRef.current.questions.find(q => q.indexId === quesitonIndex);
        if (ownerQuestion === undefined)
            throw new Error('this question is not exists:index' + quesitonIndex)     
        if (ownerQuestion.choices.find(c => c.indexId === index) === undefined)
            throw new Error('this argument index is not exists:index' + index);
        setQuiz({
            ...quizRef.current, questions:
                quizRef.current.questions.map(q => {
                    if (q.indexId === quesitonIndex) {
                        return {...ownerQuestion, choices: ownerQuestion.choices.filter(c => c.indexId !== index)};
                    } else {
                        return q;
                    }
                })
        })
    }
}

export const useChangeCorrectChoice = (quesitonIndex: number) => {
    const [quiz, setQuiz] = useContext(QuizInfoContext);
    const quizRef = useRef<createQuizParam>(quiz);

    quizRef.current = quiz;

    return (index: number) => {
        const ownerQuestion = quizRef.current.questions.find(q => q.indexId === quesitonIndex);
        if (ownerQuestion === undefined)
            throw new Error('this question is not exists:index' + quesitonIndex)

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