import React from 'react';
import Input from './ui/input/Input';
import Select from './ui/select/Select';
import { IFilter } from '../interfaces/IFilter';

interface PostFilterProps {
    filter: IFilter;
    onFilterUpdate: (filter: IFilter) => void;
}

function PostFilter({ filter, onFilterUpdate }: PostFilterProps) {
    return (
        <div className="filter">
            <Input
                className="filter-query"
                value={filter.searchQuery}
                onInputChange={(searchQuery) => onFilterUpdate({ ...filter, searchQuery })}
                placeholder="Search..."
            />
            <div className="filter-flex">
                <Select
                    value={filter.sortOption}
                    onOptionChange={(sortOption) => onFilterUpdate({ ...filter, sortOption })}
                    options={[
                        { name: 'By title', value: 'title' },
                        { name: 'By description', value: 'description' },
                        { name: 'By id', value: 'id' },
                    ]}
                />
                <Input
                    className="filter-limit"
                    value={filter.limit > 0 ? filter.limit : undefined}
                    onInputChange={(limit) => onFilterUpdate({
                        ...filter,
                        limit: Number.parseInt(limit, 10) || 0,
                    })}
                    placeholder="Limit..."
                    type="number"
                />
            </div>
        </div>
    );
}

export default PostFilter;
