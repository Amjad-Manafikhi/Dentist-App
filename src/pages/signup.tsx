import { useRouter } from 'next/router';
import { FaTooth } from 'react-icons/fa';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import Link from 'next/link';
import bcrypt from "bcryptjs"
import toast, { Toaster } from 'react-hot-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, 'Password should be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

type FormSchemaType = z.infer<typeof formSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const [userRole, setUserRole] = useState(""); 
  console.log(userRole)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (data: FormSchemaType) => {
    if(!error && userRole===""){
        setError("choose your account type");
        return 
    }
    else if(!error)(setError(""));
    setLoading(true);
    const email = data.email;
    const nonHashwedPassword = data.password;
    const saltRounds=10;
    const password= await bcrypt.hash(nonHashwedPassword,saltRounds);
    console.log("qwerqwer")
    console.log(password)
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, userRole }),
    });
    const result= await response.json();
    setLoading(false);
    console.log(response)
    if (response.ok) {
        setError("");
        toast.success('Logged in Successfully!')
        router.push('/dashboard/course');
    } else {
        setError(result.error || "somthing went wrong");
        toast.error(result.error);

    }
  };


  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div><Toaster/></div>
      <form
        noValidate
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
        <div className='flex flex-col'>
            <input
            type="password"
            placeholder="Confirm Password"
            className="bg-white p-2 rounded-md"
            {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
        </div>
        <div className='flex flex-col'>
            <Select value={userRole} onValueChange={setUserRole}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Create Account as a"/>
                </SelectTrigger>
                <SelectContent className='bg-gray-200 border-1'>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="patient">Patient</SelectItem>
                </SelectContent>
            </Select>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <p className='text-[12px] text-gray-500'>if you already have an account, please click the link {<Link className="underline text-[#0000EE]" href={"/login"}>the link</Link>}</p>
        <button
          type="submit"
          className="bg-gradient-to-b from-black to-gray-800 w-26 h-10 text-gray-200 rounded-md m-auto mt-4 cursor-pointer"
        >
          {loading ? (
            <div className="w-4 h-4 rounded-full border-2 border-white border-t-black border-b-black animate-spin m-auto" />
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
    </div>
  );
}
