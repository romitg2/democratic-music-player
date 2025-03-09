'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SpacesPage() {

    const router = useRouter();
    const [spaces, setSpaces] = useState<any>([]);


    useEffect(() => {
        const fetchSpaces = async () => {
            const res = await axios.get('/api/spaces');
            const data = res.data;
            setSpaces(data);
        };

        try {
            fetchSpaces();
        } catch (error) {
            console.error('Error fetching spaces:', error);
        }

    }, [])


    return (<div>
        <h1 className="text-2xl font-bold mb-4">Spaces</h1>
        <div className="grid grid-cols-3 gap-4">
            {spaces.map((space: any) => (
                <div key={space.id} className="bg-gray-700 shadow-md rounded-lg p-4 h-20vh flex flex-col justify-center items-center">
                    <h2 className="text-lg font-bold">{space.title}</h2>
                    <img src={space.thumbnail} alt={space.title} className="w-full h-20vh object-cover" />
                    <div className="flex gap-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Request Access</button>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.push(`/spaces/${space.id}`)}>enter</button>
                    </div>
                </div>
            ))}
        </div>


    </div>);
}