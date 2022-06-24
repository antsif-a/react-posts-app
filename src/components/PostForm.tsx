import React, { FormEvent, useState } from 'react';
import Input from './ui/input/Input';
import Button from './ui/button/Button';
import { IPost } from '../interfaces/IPost';

interface PostFormProps {
    onPostCreate: (post: IPost) => void;
}

function PostForm({ onPostCreate }: PostFormProps) {
    const [post, setPost] = useState<IPost>({
        id: Date.now(),
        title: '',
        body: '',
    });

    const onButtonClicked = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onPostCreate(post);
        setPost({
            id: Date.now(),
            title: '',
            body: '',
        });
    };

    return (
        <form className="form">
            <Input
                placeholder="Title"
                value={post.title}
                onInputChange={(title) => setPost({ ...post, title })}
            />
            <Input
                placeholder="Description"
                value={post.body}
                onInputChange={(description) => setPost({ ...post, body: description })}
            />
            <Button
                buttonName="Create new post"
                onClick={onButtonClicked}
            />
        </form>
    );
}

export default PostForm;
