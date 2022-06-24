import React from 'react';
import { IoTriangle } from 'react-icons/io5';
import Button from '../button/Button';
import classList from './Pagination.module.scss';

interface PaginationProps {
    page: number;
    onPageChange: (page: number) => void;
    totalPages: number;
}

function Pagination({ page, onPageChange, totalPages }: PaginationProps) {
    const nextPage = () => {
        if (page < totalPages) {
            onPageChange(page + 1);
        }
    };
    const prevPage = () => {
        if (page > 1) {
            onPageChange(page - 1);
        }
    };

    return (
        <div className={classList['page-container']}>
            <Button onClick={prevPage}>
                <IoTriangle className={classList['icon-left']}/>
            </Button>
            <span>{page}</span>
            <Button onClick={nextPage}>
                <IoTriangle className={classList['icon-right']}/>
            </Button>
        </div>
    );
}

export default Pagination;
