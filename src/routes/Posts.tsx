import React, { useEffect, useState } from 'react';
import { IPost } from '../api/models/IPost';
import { useFilter } from '../hooks/useFilter';
import { IFilter } from '../interfaces/IFilter';
import { useLoader } from '../hooks/useLoader';
import PostService from '../api/PostService';
import Modal from '../components/ui/modal/Modal';
import PostForm from '../components/PostForm';
import Button from '../components/ui/button/Button';
import PostFilter from '../components/PostFilter';
import Loader from '../components/ui/loader/Loader';
import PostList from '../components/PostList';
import Pagination from '../components/ui/pagination/Pagination';

function Posts() {
    const [modalVisible, setModalVisible] = useState(false);

    const [posts, setPosts] = useState<IPost[]>([]);
    const [postsFilter, setPostsFilter] = useState<IFilter>({ sortOption: 'id', searchQuery: '', limit: 0 });
    const sortedAndSearchedPosts = useFilter(posts, postsFilter);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [
        fetchPosts,
        postsLoaded,
        postsError,
    ] = useLoader<[number, number]>(async (_limit, _page) => {
        if (_limit > 0) {
            const res = await PostService.getAll(_limit, _page);
            const totalPosts = Number.parseInt(res.headers['x-total-count'], 10);
            setPosts(res.data);
            setTotalPages(Math.ceil(totalPosts / _limit));
        } else {
            const res = await PostService.getAll();
            setPosts(res.data);
            setTotalPages(1);
        }
    });

    useEffect(() => {
        fetchPosts(postsFilter.limit, page);
    }, [postsFilter.limit, page]);

    const onPostRemove = (post: IPost) => {
        setPosts([...posts].filter((p) => p.id !== post.id));
    };

    const onPostCreate = (post: IPost) => {
        setPosts([...posts, post]);
        setModalVisible(false);
    };

    return (
        <>
            <Modal visible={modalVisible} setVisible={setModalVisible}>
                <PostForm onPostCreate={onPostCreate}/>
            </Modal>

            <Button
                buttonName="Create new post"
                onClick={() => setModalVisible(true)}
            />
            <hr className="separator"/>
            <PostFilter
                filter={postsFilter}
                onFilterUpdate={setPostsFilter}
            />
            {postsError
                && <h1 className="title">An error has occurred: {postsError}</h1>}
            {postsLoaded
                ? <PostList posts={sortedAndSearchedPosts} title="Posts" onPostRemove={onPostRemove}/>
                : <Loader/>}
            <Pagination
                page={page}
                onPageChange={setPage}
                totalPages={totalPages}
            />
        </>
    );
}

export default Posts;
