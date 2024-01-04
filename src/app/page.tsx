'use client'

import { post } from '@/utils/network-manager'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LoginPage = () => {

    const router = useRouter()
    const [email, setEmail] = useState<string>('')

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await post('/api/auth/login', {email: email})
            // TO-DO: redirect to page that inform user to check email
        } catch (err: any) {
            console.log(err)
        }
    }

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <form className='w-96' onSubmit={handleLogin}>
                <h1>Login</h1>
                <input
                    name='email'
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='w-full my-6 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent'
                />
                <button type='submit' className='py-4 px-8 bg-black text-white'>Login</button>
            </form>
        </div>
    )
}

export default LoginPage