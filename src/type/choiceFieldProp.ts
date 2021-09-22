import semantic_error from "./semantic_error";

type choiceFiledProp = {
    choiceIndex: number;
    deleteThis: () => void;
    correct: boolean;
    chooseCorrect: () => void;
    contentError?: semantic_error;
    changeChoice: (arg0: string, arg1: number) => void;
}

export default choiceFiledProp;