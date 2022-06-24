import React, { HTMLProps } from 'react';
import classList from './Button.module.scss';

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
    type?: 'button' | 'submit' | 'reset';
    buttonName?: string;
}

function Button({ buttonName, children, ...props }: ButtonProps) {
    return (
        <button {...props} className={classList.button}>
            { children || buttonName }
        </button>
    );
}

export default Button;
