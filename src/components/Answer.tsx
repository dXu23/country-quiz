import React, { useState, useRef, useEffect, RefObject } from 'react';

import { IAnswer } from '../types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelCircleOutlineIcon from '@mui/icons-material/CancelOutlined';

interface AnswerProps {
    answer: IAnswer;
    selectedAnswerId: string;
    handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

function useHover(): [boolean, RefObject<HTMLDivElement> | undefined] {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    function enter() {
        setIsHovering(true);
    }

    function leave() {
        setIsHovering(false);
    }

    useEffect(() => {
        ref.current?.addEventListener('mouseenter', enter);
        ref.current?.addEventListener('mouseleave', leave);

        return () => {
            ref.current?.removeEventListener('mouseenter', enter);
            ref.current?.removeEventListener('mouseleave', leave);
        };
    }, []);

    return [isHovering, ref];
}


export default function Answer(props: AnswerProps) {
    const [isHovering, ref] = useHover();

    const { answer, selectedAnswerId, handleClick } = props;

    const styles = {
        backgroundColor: '#fff',
        border: '2px solid rgba(96, 102, 208, 0.7)',
        borderRadius: '12px',
        color: 'inherit',
        cursor: 'pointer',
        display: 'flex',
        gap: '1.5em',
        justifyContent: 'start',
        padding: '0.4em 0.8em',
     };

    console.log(`selectedAnswerId: ${selectedAnswerId}`);
    if (selectedAnswerId) {
        if (answer.isCorrect) {
            styles.backgroundColor = '#60bf88';
            styles.color = '#fff';
            styles.border = 'none';
        } else {
            if (selectedAnswerId === answer.id) {
                styles.backgroundColor = '#ea8282';
                styles.color = '#fff';
                styles.border = 'none';
            }
        }

        styles.cursor = 'default';
    } else {
        if (isHovering) {
            styles.backgroundColor = '#f9a826';
        }
    }

    return (
      <div onClick={handleClick} ref={ref} style={styles}>
        <span>{answer.letter}</span>
        <span>{answer.content}</span>
      </div>
    );
}
