import axios, { AxiosResponse } from 'axios';
import { IPost } from '../interfaces/IPost';

class PostService {
    private static api = axios.create({
        baseURL: 'https://jsonplaceholder.typicode.com/',
    });

    public static async get(limit = 10, page = 1): Promise<AxiosResponse<IPost[]>> {
        return this.api.get('posts', {
            params: {
                _limit: limit,
                _page: page,
            },
        }).then((res) => res as AxiosResponse<IPost[]>);
    }

    public static async getAll(): Promise<AxiosResponse<IPost[]>> {
        return this.api.get('posts').then((res) => res as AxiosResponse<IPost[]>);
    }

    public static async getPosts(limit: number, pages: number): Promise<IPost[]> {
        return this.get(limit, pages).then((res) => res.data);
    }

    public static async getAllPosts(): Promise<IPost[]> {
        return this.getAll().then((res) => res.data);
    }
}

export default PostService;
