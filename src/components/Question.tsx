import React from 'react';

import Answer from './Answer';

import { IQuestion, IAnswer } from '../types';

interface QuestionProps {
    question: IQuestion; 
    answerHandler: (event: React.MouseEvent<HTMLDivElement>, answerId: string) => void
};

export default function Question(props: QuestionProps) {
    let { question, answerHandler } = props;
    return (
      <article>
        {question.flag && <img src={question.flag} alt="Flag of some country. No cheating!" width="84px" />}
        <h2>{question.content}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
          {question.answers.map((answer: IAnswer) => 
            <Answer
              key={answer.id}
              answer={answer}
              selectedAnswerId={question.selectedAnswerId}
              handleClick={(event) => answerHandler(event, answer.id)}
            />
          )}
        </div>
      </article>
    );
}
