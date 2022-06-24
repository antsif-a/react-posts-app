import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PostItem from './PostItem';
import { IPost } from '../interfaces/IPost';

interface PostListProps {
    posts: IPost[];
    title: string;
    onPostRemove: (post: IPost) => void;
}

function PostList({ posts, title, onPostRemove }: PostListProps) {
    if (!posts.length) {
        return <h1 className="title">No posts found</h1>;
    }

    return (
        <div>
            <h1 className="title">{title}</h1>
            <TransitionGroup>
                {posts.map((post) => <CSSTransition
                    key={post.id}
                    timeout={500}
                    classNames="post"
                >
                    <PostItem
                        post={post}
                        onRemove={onPostRemove}
                    />
                </CSSTransition>)}
            </TransitionGroup>
        </div>
    );
}

export default PostList;
