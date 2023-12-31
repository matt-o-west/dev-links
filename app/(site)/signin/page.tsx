'use client'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export default function SignIn() {
  const [data, setData] = useState({
    email: '',
    password: '',
    redirect: false,
  })
  const searchParams = useSearchParams()
  const loginError = searchParams.get('error') || null
  const [error, setSerror] = useState<string>(loginError || '')
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/editor')
    }
  }, [session, status, router])

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('login function runs')
    await signIn('credentials', {
      ...data,
    }).then((callback) => {
      if (callback?.error) {
        toast.error(callback?.error)
      }
      if (callback?.ok && !callback?.error) {
        toast.success('Login successful')
      }
    })
  }

  return (
    <main className='min-h-screen flex items-center justify-center bg-background'>
      <div className='w-full max-w-md desktop:mb-0 phone:mb-16'>
        <div className='flex items-center justify-center mb-6 phone:aboslute phone:top-10'>
          <Image
            src='./images/logo-devlinks-large.svg'
            alt='Devlinks Logo'
            width={200}
            height={200}
            className='mb-1'
          />
        </div>

        <div className='p-6 pb-8 mx-6 phone:mx-2'>
          <h1 className='text-2xl font-bold text-black mb-6'>Login</h1>
          <form action='' onSubmit={loginUser}>
            <div className='mb-4'>
              <label
                className='block text-sm font-medium text-black mb-2'
                htmlFor='username'
              >
                Email
              </label>
              <input
                className='w-full px-4 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray'
                id='username'
                type='text'
                placeholder='Enter your username'
                onChange={(e) => setData({ ...data, email: e.target.value })}
                value={data.email}
                pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                required
              />
            </div>

            <div className='mb-4'>
              <label
                className='block text-sm font-medium text-black mb-2'
                htmlFor='password'
              >
                Password
              </label>
              <input
                className='w-full px-4 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray'
                id='password'
                type='password'
                placeholder='Enter your password'
                onChange={(e) => setData({ ...data, password: e.target.value })}
                minLength={5}
                value={data.password}
                required
              />
            </div>
            {error && <p className='form-validation-error'>{error}</p>}
            <div className='flex justify-end'>
              <Link href='/forgot-password'>
                <span className='text-primary.blue hover:text-secondary.blue'>
                  Forgot password?
                </span>
              </Link>
            </div>
            <div className='flex flex-col space-y-4 mt-6'>
              <button
                type='submit'
                className='w-full py-[0.82rem] px-4 bg-primary.blue text-white font-bold rounded-md hover:bg-secondary.blue'
              >
                Login
              </button>
              <button
                className='w-full py-[0.75rem] px-4 bg-charcoal text-white font-bold rounded-md hover:bg-primary.gray'
                onClick={() => signIn('github', { callbackUrl: '/editor' })}
              >
                <Image
                  src='./images/icon-github.svg'
                  alt='Github Logo'
                  width={20}
                  height={20}
                  className='inline-block mr-5 mb-1'
                />
                Login with Github
              </button>
            </div>
          </form>
          <div className='flex mt-4 justify-center flex-wrap'>
            <span className='text-black'>Don&apos;t have an account?</span>
            <Link
              href='/register'
              className='desktop:block phone:flex phone:flex-nowrap justify-center ml-2 text-primary.blue hover:text-secondary.blue'
            >
              Create one.
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
