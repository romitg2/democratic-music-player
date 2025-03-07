export default function Home() {
  return (
    <div className="flex text-4xl flex-col items-center justify-center h-screen">
      <a
        href="http://localhost:5555/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go to Prisma Studio
      </a>
    </div>
  );
}