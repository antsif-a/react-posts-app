/* eslint-disable no-underscore-dangle */
import axios, { AxiosResponse } from 'axios';
import { IPost } from './models/IPost';
import { IComment } from './models/IComment';

class PostService {
    private static api = axios.create({
        baseURL: 'https://jsonplaceholder.typicode.com/posts',
    });

    public static getAll(limit?: number, page?: number): Promise<AxiosResponse<IPost[]>> {
        const params: { _limit?: number, _page?: number } = {};
        if (limit !== undefined) {
            params._limit = limit;
            if (page !== undefined) {
                params._page = page;
            }
            return this.api.get<IPost[]>('', { params });
        }
        return this.api.get<IPost[]>('');
    }

    public static getById(id: number): Promise<AxiosResponse<IPost>> {
        return this.api.get(`${id}`);
    }

    public static getCommentsByPostId(id: number): Promise<AxiosResponse<IComment[]>> {
        return this.api.get(`${id}/comments`);
    }
}

export default PostService;
