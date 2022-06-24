import React from 'react';
import Button from './ui/button/Button';
import { IPost } from '../interfaces/IPost';

interface PostItemProps {
    post: IPost
    onRemove: (post: IPost) => void;
    index: number;
}

function PostItem({ post, onRemove, index }: PostItemProps) {
    return (
        <div className="post">
            <div className="post-content">
                <strong>{index + 1}. {post.title}</strong>
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
