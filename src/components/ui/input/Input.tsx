import React, { HTMLProps } from 'react';
import classList from './Input.module.scss';

interface InputProps extends HTMLProps<HTMLInputElement> {
    onInputChange: (value: string) => void;
}

function Input({ onInputChange, ...props }: InputProps) {
    return (
        <input
            className={classList.input}
            onChange={(e) => onInputChange(e.target.value)}
            {...props}
        />
    );
}

export default Input;
