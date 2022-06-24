import React, { useEffect, useState } from 'react';
import { useAsyncLoader } from '../hooks/useLoader';
import { usePosts } from '../hooks/usePosts';
import PostList from './PostList';
import PostForm from './PostForm';
import PostFilter from './PostFilter';
import Modal from './ui/modal/Modal';
import Loader from './ui/loader/Loader';
import Button from './ui/button/Button';
import PostService from '../api/PostService';
import { IPost } from '../interfaces/IPost';
import '../styles/main.scss';

function App() {
    const [modalVisible, setModalVisible] = useState(false);

    const [posts, setPosts] = useState<IPost[]>([]);
    const [postsFilter, setPostsFilter] = useState({ sortOption: 'id', searchQuery: '' });
    const sortedAndSearchedPosts = usePosts(posts, postsFilter);

    const [fetchPosts, postsLoading, postsError] = useAsyncLoader(async () => {
        const postsData = await PostService.getAll();
        setPosts(postsData);
    });

    useEffect(() => {
        fetchPosts();
    }, []);

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
        </div>
    );
}

export default App;
