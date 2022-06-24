import React from 'react';
import classList from './Loader.module.scss';

function Loader() {
    return (
        <div className={classList['loader-box']}>
            <div className={classList.loader}>
                <div />
                <div />
                <div />
            </div>
        </div>
    );
}

export default Loader;
