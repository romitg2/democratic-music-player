'use client';


import {signIn, signOut, useSession } from "next-auth/react"

export default function Login() {
    const data = useSession(); 
     
    const loginButton = (<button onClick={() => signIn()}>Login</button>)
    const logoutButton = (<button onClick={() => signOut()}>Logout</button>)

    return (
        <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {data.data ? logoutButton : loginButton}
        </div>
    )
}