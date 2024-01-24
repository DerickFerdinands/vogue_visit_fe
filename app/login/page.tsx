'use client'
import React, {useEffect} from 'react';
import Image from "next/image";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from '../../lib/HttpInterceptor';
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";

const Login = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();


    useEffect(() => {
        const token = localStorage.getItem("jwt_token");
        if(token !==null){
            // router.push('/home');
        }
    }, []);

    const onSubmit = async (data:any) => {
        console.log(data); // Submit data to server or perform other actions

        try {

            const resp =  await axios.post('/users/login',data);
            console.log(resp.status, resp.data.data.token)

            if(resp.status, resp.data.data.token){
                localStorage.setItem('jwt_token',resp.data.data.token)
                const token = localStorage.getItem("jwt_token"); // Retrieve token from your preferred storage
                console.log('Retrieving',token)
                router.push('/'); // Navigate to /dashboard
            }

            // Handle successful login based on the API response
        } catch (error) {
            // setError(error.message);
            console.log(error)
        } finally {
            // setIsLoading(false);
        }
    };

    return (
        <div className={"h-screen w-screen bg-white flex"}>

            <div className="w-1/2 h-screen justify-center items-center  relative sm:hidden md:hidden lg:flex hidden">
                <img style={{height: '98%', width: '98%'}} className={"object-cover rounded-3xl"}
                     src="https://voguebebucket.s3.amazonaws.com/pexels-cottonbro-studio-3993472.jpg"
                     alt=""/>


                <div className={"absolute z-10 text-white top-10 left-10 flex flex-wrap w-max hidden"}>
                    <p className="leading-7  [&:not(:first-child)]:mt-1 uppercase max-w-md">
                        Style your moments, book your beauty – where elegance meets convenience!
                    </p>
                </div>

                <div className={"absolute z-10 text-white bottom-10 left-10 flex flex-col shadow-background" +
                    ""}>
                    <h1 className="scroll-m-20 text-4xl max-w-md font-extrabold tracking-tight lg:text-5xl">
                        Your Convenience {'\n'}
                        Is Our Duty
                    </h1>
                    <p className="leading-7  [&:not(:first-child)]:mt-1  max-w-md">
                        Welcome to Vogue Visit, your one-stop destination for effortless elegance. Discover a world of beauty at your fingertips.
                    </p>
                </div>

            </div>
            <div className="w-full lg:w-1/2 p-10   h-screen flex flex-col justify-between">
                <div className={"flex justify-center items-center mt-10 gap-1"}>
                    <Image
                        src={'https://voguebebucket.s3.amazonaws.com/Screenshot_2024-01-21_085837-removebg-preview.png'}
                        alt={'icon'}
                        height={25}
                        width={25}
                        className={"rounded-3xl"}
                    />
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        Vogue Visit
                    </h4>
                </div>
                <div className={"flex flex-col gap-10 items-center "}>
                    <div className={"text-center mt-5"}>
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Welcome Back
                        </h1>
                        <p className="leading-7  [&:not(:first-child)]:mt-1 ">
                            Enter your email and password to access your account
                        </p>
                    </div>


                    <form className={"max-w-md w-full flex flex-col gap-10 items-center"} onSubmit={handleSubmit(onSubmit)}>
                        <div className={"flex flex-col items-center relative gap-5 w-full max-w-md"}>
                            <div className="grid w-full max-w-md items-center gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input {...register('email', { required: true })} type="email" id="email" placeholder="Enter your email"/>
                                {errors.email && <span className={"text-red-700 text-sm ms-1"}>*Email is required</span>}
                            </div>

                            <div className="grid w-full max-w-md items-center gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input {...register('password', { required: true })} type="password" id="password" placeholder="Enter your password"/>
                                {errors.password && <span className={"text-red-700 text-sm ms-1"}>*Password is required</span>}
                            </div>
                            <div className={"flex justify-between items-center w-full"}>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <p className="leading-7 text-sm ">
                                    <span className={"font-semibold"}>Forgot Password</span>
                                </p>
                            </div>

                        </div>

                        <div className={"w-full max-w-md flex flex-col gap-3"}>
                            <Button type={"submit"} className={"w-full"}>Sign In</Button>
                            <Button variant={"outline"} className={"w-full flex justify-center items-center gap-2"}>
                                <Image
                                    src={'https://www.svgrepo.com/show/303108/google-icon-logo.svg'}
                                    alt={'icon'}
                                    height={18}
                                    width={18}
                                    className={"rounded-3xl"}
                                />
                                Sign In with Google</Button>
                        </div>
                    </form>
                </div>
                <div className={"flex justify-center items-center mb-10 mt-5"}>
                    <p className="leading-7 [&:not(:first-child)]:mt-6 text-black">
                        <span className={"text-gray-700"}>Dont have an account? </span> <Link href={'/sign-up'}><span className={"text-black font-bold"}>Sign Up</span></Link>
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Login;
