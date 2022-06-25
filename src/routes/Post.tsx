import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPost } from '../api/models/IPost';
import { IComment } from '../api/models/IComment';
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

    const [comments, setComments] = useState<IComment[]>([]);
    const [fetchComments, commentsLoaded, commentsError] = useLoader<[number]>(async (id) => {
        const res = await PostService.getCommentsByPostId(id);
        setComments(res.data);
    });

    console.log(comments);

    useEffect(() => {
       if (params.id) {
           const id = Number.parseInt(params.id, 10);
           void fetchPost(id);
           void fetchComments(id);
       }
    }, []);

    if (!postLoaded || !post) {
        return <Loader />;
    }

    if (postError || commentsError) {
        return <h1 className="title">{postError || commentsError}</h1>;
    }

    return (
        <div>
            <h1 className="title">
                {post.id}. {post.title}
            </h1>
            <div className="post">{post.body}</div>
            <div className="comments">
                <h2>Comments:</h2>
                {commentsLoaded
                    ? comments.map((c, index) => <div
                        key={c.id}
                        className="comment"
                    >
                        <h4>{index + 1}. {c.name} [{c.email}]</h4>
                        <p>{c.body}</p>
                    </div>)
                    : <Loader/>}
            </div>
        </div>
    );
}

export default Post;
