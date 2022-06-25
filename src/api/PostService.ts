import axios, { AxiosResponse } from 'axios';
import { IPost } from '../interfaces/IPost';

class PostService {
    private static api = axios.create({
        baseURL: 'https://jsonplaceholder.typicode.com/',
    });

    public static getAll(limit?: number, page?: number): Promise<AxiosResponse<IPost[]>> {
        const params: { limit?: number, page?: number } = {};
        if (limit !== undefined) {
            params.limit = limit;
            if (page !== undefined) {
                params.page = page;
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
