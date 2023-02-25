import semantic_error from "./semantic_error";

type choiceFieldProp = {
    choiceIndex: number;
    content?: string;
    deleteThis: () => void;
    correct: boolean;
    chooseCorrect: () => void;
    contentError?: semantic_error;
    changeChoice: (arg0: string, arg1: number) => void;
}

export default choiceFieldProp;