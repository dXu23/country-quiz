import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid';
import Question from './components/Question';
import Results from './components/Results';

import Adventure from './assets/adventure.svg';
import { IAnswer, IQuestion } from './types';
import './App.css'

function App() {
    function generateCountryNdx() {
        return Math.floor(Math.random() * countriesList.length);
    }


    const [countriesList, setCountriesList] = useState([]);

    const [correctQuestions, setCorrectQuestions] = useState(0);
    let [question, setQuestion] = useState<IQuestion>({ content: '', selectedAnswerId: '', answers: [] });
    let [wasCorrect, setWasCorrect] = useState(true);
    let [showResults, setShowResults] = useState(false);

    function handleAnswerClick(event: React.MouseEvent<HTMLDivElement>, answerId: string) {
        if (question.selectedAnswerId) {
            return;
        }

        setQuestion(prevQuestion => ({ ...prevQuestion, selectedAnswerId: answerId }));
    }

    useEffect(() => {
        if (question.selectedAnswerId) {
            const answer = question.answers.find((answer: IAnswer) => answer.id === question.selectedAnswerId);

            if (answer?.isCorrect) {
                setCorrectQuestions(prevCorrectQuestions => prevCorrectQuestions + 1);
            } else {
                setWasCorrect(false);
            }
        }
    }, [question.selectedAnswerId]);

    function generateQuestion() {
        let question: IQuestion = { content: '', selectedAnswerId: '', answers: [] };
        if (countriesList.length === 0) {
            return question;
        }

        const questionType = Math.random() >= 0.5;

        const correctCountryNdx = generateCountryNdx();

        if (questionType) {
            question.content = `${countriesList[correctCountryNdx]['capital'][0]} is the capital of`;
        } else {
            question.content = 'Which country does this flag belong to?';
            question.flag = countriesList[correctCountryNdx]['flags']['svg'];
        }

        let answerIndices: number[] = [];
        let answerStrings: string[] = [];
        let i = 0;
        while (i < 3) {
            const possibleWrongAnswerNdx = generateCountryNdx();

            if (correctCountryNdx === possibleWrongAnswerNdx || possibleWrongAnswerNdx in answerIndices) {
                continue;
            }

            answerIndices.push(possibleWrongAnswerNdx);
            i++;
        }

        const randNdx = Math.floor(4 * Math.random());
        answerIndices.splice(randNdx, 0, correctCountryNdx);

        question.answers = answerIndices.map((answerNdx: number, i: number) => 
            ({
                id: nanoid(),
                letter: String.fromCharCode(i + 0x41),
                isCorrect: i === randNdx,
                content: countriesList[answerNdx]['name']['common']
            })
        );

        return question;
    }

    function handleNext() {
        setShowResults(!wasCorrect);

        if (!showResults) {
            setQuestion(generateQuestion());
        }
    }

    function handleTryAgain() {
        setCorrectQuestions(0);
        setWasCorrect(true);
        setShowResults(false);

        setQuestion(generateQuestion());
    }

    useEffect(() => {
        if (countriesList.length === 0) {
            fetch('https://restcountries.com/v3.1/all')
                .then(res => res.json())
                .then(data => setCountriesList(data));
        }
    }, []);

    useEffect(() => {
        setQuestion(generateQuestion());
    }, [countriesList]);

    return (
      <main>
        <h1 className="quiz-heading">Country Quiz</h1>
        {showResults ?
            <Results numCorrect={correctQuestions} tryAgainHandler={handleTryAgain}/> :
            <>
              <img className="world" src={Adventure} alt="image of traveler next to world"/>
              <Question
                question={question}
                answerHandler={handleAnswerClick}
              />
            </>
        }
        {question.selectedAnswerId !== '' && <button className="next" onClick={handleNext}>Next</button>}
      </main>
    );
}

export default App
