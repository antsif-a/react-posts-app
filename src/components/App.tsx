import React, { useEffect, useState } from 'react';
import { useAsyncLoader } from '../hooks/useLoader';
import { useFilter } from '../hooks/useFilter';
import PostList from './PostList';
import PostForm from './PostForm';
import PostFilter from './PostFilter';
import Modal from './ui/modal/Modal';
import Loader from './ui/loader/Loader';
import Button from './ui/button/Button';
import Pagination from './ui/pagination/Pagination';
import PostService from '../api/PostService';
import { IFilter } from '../interfaces/IFilter';
import { IPost } from '../interfaces/IPost';
import '../styles/main.scss';

function App() {
    const [modalVisible, setModalVisible] = useState(false);

    const [posts, setPosts] = useState<IPost[]>([]);
    const [postsFilter, setPostsFilter] = useState<IFilter>({ sortOption: 'id', searchQuery: '', limit: 0 });
    const sortedAndSearchedPosts = useFilter(posts, postsFilter);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [fetchPosts, postsLoading, postsError] = useAsyncLoader(async () => {
        if (postsFilter.limit > 0) {
            const res = await PostService.get(postsFilter.limit, page);
            const totalPosts = Number.parseInt(res.headers['x-total-count'], 10);
            setPosts(res.data);
            setTotalPages(Math.ceil(totalPosts / postsFilter.limit));
        } else {
            const newPosts = await PostService.getAllPosts();
            setPosts(newPosts);
            setTotalPages(1);
        }
    });

    useEffect(() => {
        fetchPosts();
    }, [page, postsFilter.limit]);

    const onPostRemove = (post: IPost) => {
        setPosts([...posts].filter((p) => p.id !== post.id));
    };

    const onPostCreate = (post: IPost) => {
        setPosts([...posts, post]);
        setModalVisible(false);
    };

    return (
        <div className="app">
            <Modal visible={modalVisible} setVisible={setModalVisible}>
                <PostForm onPostCreate={onPostCreate}/>
            </Modal>

            <Button
                buttonName="Create new post"
                style={{ marginTop: 15 }}
                onClick={() => setModalVisible(true)}
            />
            <hr className="separator"/>
            <PostFilter
                filter={postsFilter}
                onFilterUpdate={setPostsFilter}
            />
            {postsError
                && <h1 className="title">An error has occurred: {postsError}</h1>
            }
            {postsLoading
                ? <Loader/>
                : <PostList posts={sortedAndSearchedPosts} title="Posts" onPostRemove={onPostRemove}/>
            }
            <Pagination
                page={page}
                onPageChange={setPage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default App;
