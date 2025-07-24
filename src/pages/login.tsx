import { useState } from 'react'
import { useRouter } from 'next/router'
import { FaTooth } from 'react-icons/fa'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from "zod"
import toast, { Toaster } from 'react-hot-toast';
 
export default function LoginPage() {


  const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const formSchema = z
      .object({
        email: z.string().email(),
        password: z.string().min(8, 'Password should be at least 8 characters'),
      })
      
    
    type FormSchemaType = z.infer<typeof formSchema>;


    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormSchemaType>({
      resolver: zodResolver(formSchema),
    });
    const onSubmit = async (data: FormSchemaType) => {
      setLoading(true);
      const {email, password}=data;
      const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      const result= await response.json();
      setLoading(false);
      console.log(response)
      if (response.ok) {
        setError("");
        toast.success('Logged in Successfully!')
        router.push('/dashboard/course');
      } else {
          setError(result.error || "Somthing Went Wrong")
          toast.error(result.error);
      }
    };
 
  return (
    <div className='flex w-screen h-screen justify-center items-center'>
        <div><Toaster/></div>
        <form
        noValidate={true}
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[400px] bg-gray-200 rounded-md px-6 py-8 gap-4"
      >
        <div className="flex justify-between">
          <h1 className="">Dental Education System</h1>
          <FaTooth className="w-5 h-5" />
        </div>
        <div className='flex flex-col'>
            <input
            type="email"
            placeholder="Email"
            className="bg-white p-2 rounded-md"
            {...register('email')}
            
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className='flex flex-col'>

            <input
            type="password"
            placeholder="Password"
            className="bg-white p-2 rounded-md"
            {...register('password')}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-gradient-to-b from-black to-gray-800 w-26 h-10 text-gray-200 rounded-md m-auto mt-4 cursor-pointer"
        >
          {loading ? (
            <div className="w-4 h-4 rounded-full border-2 border-white border-t-black border-b-black animate-spin m-auto" />
          ) : (
            'Log in'
          )}
        </button>
        </form>
    </div>
  )
}