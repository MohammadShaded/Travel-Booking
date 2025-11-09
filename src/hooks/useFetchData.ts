import { useState, useEffect } from 'react';

interface UseFetchDataResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}


export function useFetchData<T>(
    fetchFn: () => Promise<T>,
    dependencies: unknown[] = []
): UseFetchDataResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await fetchFn();
            setData(result);
        } catch (err) {
            console.error('Error fetching data:', err);
            const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);

    return {
        data,
        loading,
        error,
        refetch: fetchData,
    };
}
