import Login from "@/app/components/Login";
import AuthProvider from "./providers/AuthProvider";


export default function Home() {
  
  console.log('.........')
  console.log(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET)
  console.log('.........')

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
      </div>
    </>
  );
}