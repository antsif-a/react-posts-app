import axios from 'axios';
import { IPost } from '../interfaces/IPost';

class PostService {
    private static api = axios.create({
        baseURL: 'https://jsonplaceholder.typicode.com/',
        timeout: 3000,
    });

    public static async get(limit: number, pages: number): Promise<IPost[]> {
        return this.api.get('posts', {
            params: {
                _limit: limit,
                _pages: pages,
            },
        }).then((res) => res.data as IPost[]);
    }

    public static async getAll(): Promise<IPost[]> {
        return this.api.get('posts').then((res) => res.data as IPost[]);
    }
}

export default PostService;
