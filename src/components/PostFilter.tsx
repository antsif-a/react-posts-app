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
        <div>
            <Input
                value={filter.searchQuery}
                onInputChange={(searchQuery) => onFilterUpdate({ ...filter, searchQuery })}
                placeholder="Search..."
            />
            <Select
                value={filter.sortOption}
                onOptionChange={(sortOption) => onFilterUpdate({ ...filter, sortOption })}
                options={[
                    { name: 'By title', value: 'title' },
                    { name: 'By description', value: 'description' },
                    { name: 'By id', value: 'id' },
                ]}
            />
        </div>
    );
}

export default PostFilter;
