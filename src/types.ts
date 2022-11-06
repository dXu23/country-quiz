export interface IAnswer {
    id: string;
    letter: string;
    content: string;
    isCorrect: boolean;
};

export interface IQuestion {
    content: string;
    selectedAnswerId: string;
    flag?: string;
    answers: IAnswer[];
};

