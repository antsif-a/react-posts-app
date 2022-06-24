import { useState } from 'react';

export function useAsyncLoader(
    callback: () => Promise<void>,
): [() => Promise<void>, boolean, string?] {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>();

    const loader = async () => {
        try {
            setIsLoading(true);
            await callback();
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return [loader, isLoading, error];
}

export function useLoader(
    callback: () => void,
): [() => void, boolean, string?] {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>();

    const loader = () => {
        try {
            setIsLoading(true);
            callback();
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return [loader, isLoading, error];
}
