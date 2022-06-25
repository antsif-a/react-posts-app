import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPost } from '../api/models/IPost';
import { useAsyncLoader } from '../hooks/useLoader';
import PostService from '../api/PostService';
import Loader from '../components/ui/loader/Loader';

function Post() {
    const params = useParams<'id'>();
    const [post, setPost] = useState<IPost>();
    const [fetchPost, postLoading, error] = useAsyncLoader(async () => {
        if (params.id) {
            const res = await PostService.getById(Number.parseInt(params.id, 10));
            setPost(res.data);
        }
    });

    useEffect(() => {
       fetchPost();
    }, []);

    if (postLoading || !post) {
        return <Loader />;
    }

    if (error) {
        return <h1 className="title">{error}</h1>;
    }

    return (
        <div>
            <h1 className="title">
                {post.id}. {post.title}
            </h1>
            <div className="post">{post.body}</div>
        </div>
    );
}

export default Post;
