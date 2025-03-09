'use client';

import {useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function spaceStreams() {
    const [streams, setStreams] = useState<any>([]);
    const { id } = useParams();
    
    useEffect(() => {
        const fetchStreams = async () => {
            const res = await axios.get('/api/spaces/streams', {
                params: {
                    spaceId: id 
                }
            });
            const data = res.data;
            setStreams(data);
        };

        try {
            fetchStreams();
        } catch (error) {
            console.error('Error fetching streams:', error);
        }
    }, [])


    return <div>{id}</div>;
}