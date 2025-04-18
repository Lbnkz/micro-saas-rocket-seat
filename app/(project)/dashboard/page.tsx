import { handleAuth } from "@/app/actions/handle-auth";
import { auth } from "@/app/lib/auth"
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="flex flex-col gap-10 items-center justify-center min-h-screen p-24">
            <h1 className="text-4xl font-bold">Protected Dashboard</h1>
            <p>{session?.user?.email ? session.user.email : "User not logged in!"}</p>
            {
                session?.user?.email && (
                    <form
                        action={handleAuth}
                    >
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded cursor-pointer">Logout</button>
                    </form>
                )
            }
            <Link href="/pagamentos" className="bg-blue-500 text-white p-2 rounded cursor-pointer">Pagamentos</Link>
        </div>
    )
}