import React, { HTMLProps } from 'react';
import classList from './Select.module.scss';

interface SelectPropsOption {
    name: string;
    value: string;
}

interface SelectProps extends HTMLProps<HTMLSelectElement> {
    options: SelectPropsOption[];
    onOptionChange: (option: string) => void;
}

function Select({ options, onOptionChange, ...props }: SelectProps) {
    return (
        <div>
            <select
                className={classList.select}
                onChange={(e) => onOptionChange(e.target.value)}
                {...props}
            >
                {options.map((option) => <option
                    value={option.value}
                    key={option.value}
                >
                    {option.name}
                </option>)}
            </select>
        </div>
    );
}

export default Select;
