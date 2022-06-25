/* eslint-disable no-underscore-dangle */
import axios, { AxiosResponse } from 'axios';
import { IPost } from './models/IPost';

class PostService {
    private static api = axios.create({
        baseURL: 'https://jsonplaceholder.typicode.com/',
    });

    public static getAll(limit?: number, page?: number): Promise<AxiosResponse<IPost[]>> {
        const params: { _limit?: number, _page?: number } = {};
        if (limit !== undefined) {
            params._limit = limit;
            if (page !== undefined) {
                params._page = page;
            }
            return this.api.get<IPost[]>('posts', { params });
        }
        return this.api.get<IPost[]>('posts');
    }

    public static getById(id: number): Promise<AxiosResponse<IPost>> {
        return this.api.get(`posts/${id}`);
    }
}

export default PostService;
