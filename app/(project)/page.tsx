import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-4xl font-bold text-gray-800">Landing Page</h1>
      <Link href="/login">
        <button>Login</button>
      </Link>
      
    </div>
  );
}
