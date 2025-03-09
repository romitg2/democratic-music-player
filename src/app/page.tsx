'use client';

import Login from "@/app/components/Login";
import AuthProvider from "./providers/AuthProvider";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="flex text-4xl flex-col items-center gap-4 justify-center h-screen">
        <a
          href="http://localhost:5555/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Prisma Studio
        </a>
        <AuthProvider>
          <Login />
        </AuthProvider>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.push('/spaces', { scroll: false })}>spaces</button>
      </div>
    </>
  );
}