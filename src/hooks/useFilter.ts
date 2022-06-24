import { useMemo } from 'react';
import { IPost } from '../interfaces/IPost';
import { IFilter } from '../interfaces/IFilter';

export function useFilter(posts: IPost[], filter: IFilter) {
    const sortedPosts = useMemo(() => {
        const { sortOption } = filter;
        if (sortOption === 'title' || sortOption === 'body') {
            return [...posts].sort((a, b) => a[sortOption].localeCompare(b[sortOption]));
        }
        return posts;
    }, [filter.sortOption, posts]);

    return useMemo(() => {
        const { searchQuery } = filter;
        if (searchQuery !== '') {
            return [...sortedPosts].filter((post) => post.title.toLowerCase()
                .includes(searchQuery.toLowerCase()));
        }
        return sortedPosts;
    }, [filter.searchQuery, sortedPosts]);
}
