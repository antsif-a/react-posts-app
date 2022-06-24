import React from 'react';
import Button from './ui/button/Button';
import { IPost } from '../interfaces/IPost';

interface PostItemProps {
    post: IPost
    onRemove: (post: IPost) => void;
}

function PostItem({ post, onRemove }: PostItemProps) {
    return (
        <div className="post">
            <div className="post-content">
                <strong>{post.id}. {post.title}</strong>
                <p>{post.body}</p>
            </div>
            <Button
                buttonName="Remove"
                onClick={() => onRemove(post)}
            />
        </div>
    );
}

export default PostItem;
