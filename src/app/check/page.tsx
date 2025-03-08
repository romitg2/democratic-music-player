'use client';

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

interface CheckData {
    picture: string;
    status: string;
    userCount: number;
}

export default function Check() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<CheckData | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/check');
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await res.json();
                setData(jsonData);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An error occurred'));
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data available</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Database Check</h1>
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                <div className="flex items-center mb-4">
                    {data.picture && (
                        <img 
                            src={data.picture} 
                            alt="Profile" 
                            className="w-16 h-16 rounded-full mr-4"
                        />
                    )}
                    <div>
                        <p className="text-green-600 font-semibold">{data.status}</p>
                        <p className="text-gray-600">Total Users: {data.userCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}