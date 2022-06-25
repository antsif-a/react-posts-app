import React from 'react';
import { Link } from 'react-router-dom';
import Button from './ui/button/Button';
import { IPost } from '../interfaces/IPost';

interface PostItemProps {
    post: IPost
    onRemove: (post: IPost) => void;
}

function PostItem({ post, onRemove }: PostItemProps) {
    return (
        <div className="post-item">
            <div className="post-item-content">
                <Link
                    to={`/posts/${post.id}`}
                    className="post-item-title"
                >
                    {post.id}. {post.title}
                </Link>
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
