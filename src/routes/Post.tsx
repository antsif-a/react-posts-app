import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPost } from '../api/models/IPost';
import { useLoader } from '../hooks/useLoader';
import PostService from '../api/PostService';
import Loader from '../components/ui/loader/Loader';

function Post() {
    const params = useParams<'id'>();
    const [post, setPost] = useState<IPost>();
    const [fetchPost, postLoaded, postError] = useLoader<[number]>(async (id) => {
        const res = await PostService.getById(id);
        setPost(res.data);
    });

    useEffect(() => {
       if (params.id) {
           fetchPost(Number.parseInt(params.id, 10));
       }
    }, []);

    if (!postLoaded || !post) {
        return <Loader />;
    }

    if (postError) {
        return <h1 className="title">{postError}</h1>;
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
