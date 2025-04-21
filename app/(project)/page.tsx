import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-4xl font-bold text-gray-800">Landing Page</h1>
      <Link href="/login" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        <button>Login</button>
      </Link>
      
    </div>
  );
}
