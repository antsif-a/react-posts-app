import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useLoader<Args extends any[]>(
    callback: (...args: Args) => Promise<void>,
): [(...args: Args) => Promise<void>, boolean, string?] {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState<string>();

    const loader = async (...args: Args) => {
        try {
            await callback(...args);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
        } finally {
            setLoaded(true);
        }
    };

    return [loader, loaded, error];
}
