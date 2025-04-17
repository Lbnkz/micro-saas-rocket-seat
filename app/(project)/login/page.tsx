import { handleAuth } from "@/app/actions/handle-auth";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-4xl font-bold mb-10">Login</h1>
      <form
        action={handleAuth}
      >
        <button type="submit" className="bg-blue-500 text-white p-2 rounded cursor-pointer">Signin with Google</button>
      </form>
    </div>
  )
}