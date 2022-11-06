import React from 'react';
import Trophy from '../assets/trophy.svg';

interface ResultsProps {
    numCorrect: number;
    tryAgainHandler: () => void;
}

export default function Results(props: ResultsProps) {
    return (
      <article className="results">
        <img src={Trophy} alt="Trophy" />
        <h2>Results</h2>
        <p>You got <span className="num-correct">{props.numCorrect}</span> correct answers</p>
        <button onClick={props.tryAgainHandler}>Try again</button>
      </article>
    );
}
