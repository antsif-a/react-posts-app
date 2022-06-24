import React, { HTMLProps } from 'react';
import classList from './Modal.module.scss';

interface ModalProps extends HTMLProps<HTMLElement> {
    visible: boolean;
    setVisible: (isVisible: boolean) => void;
}

function Modal({ children, visible, setVisible }: ModalProps) {
    const classNames = visible
        ? [classList.modal, classList.active].join(' ')
        : classList.modal;

    return (
        <div
            className={classNames}
            onClick={() => setVisible(false)}
        >
            <div className={classList['modal-content']} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;
