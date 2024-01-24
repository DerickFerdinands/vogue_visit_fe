'use client'
import React, {useEffect} from 'react';
import Image from "next/image";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import axios from "@/lib/HttpInterceptor";

const SignUp = () => {


    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    useEffect(() => {
        const token = localStorage.getItem("jwt_token");
        if(token !==null){
            router.push('/');
        }
    }, []);

    const onSubmit = async (data:any) => {
        console.log(data); // Submit data to server or perform other actions

        try {
            data.id=null;
            const resp =  await axios.post('/users/',data);

            if(resp.status, resp.data.data){
                localStorage.setItem('jwt_token',resp.data.data)
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

    // @ts-ignore
    const validateConfirmPassword = (value) => {
        const password = watch('password'); // Access the current value of the 'password' field
        return validateFieldsAreEqual(value, password);
    };
    // @ts-ignore
    const validateFieldsAreEqual = (value1, value2) => {
        if (value1 !== value2) {
            return 'Fields must be equal';
        }
        return undefined; // No error
    };

    return (
        <div className={"h-screen w-screen bg-white flex"}>

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
                    <div className={"text-start mt-5"}>
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Welcome
                        </h1>
                        <p className="leading-7  [&:not(:first-child)]:mt-1 ">
                            Please enter your details
                        </p>
                    </div>

                    <form className={"max-w-md w-full flex flex-col gap-10 items-center"} onSubmit={handleSubmit(onSubmit)}>
                    <div className={"flex flex-col items-center relative gap-5 w-full max-w-md"}>
                        <div className="grid w-full max-w-md items-center gap-3">
                            <Label htmlFor="name">Full name</Label>
                            <Input {...register('name', { required: true })} type="text" id="name" placeholder="John Lamar"/>
                            {errors.name && <span className={"text-red-700 text-sm ms-1"}>*Name is required</span>}
                        </div>

                        <div className={"w-full"}>
                            <Label htmlFor="email">Gender</Label>
                            <RadioGroup {...register('gender', { required: true })} style={{display: 'flex'}}
                                        className={"justify-start items-start w-full my-3 mb-7"}
                                        defaultValue="Male">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Male" id="r1"/>
                                    <Label htmlFor="r1">Male</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Female" id="r2"/>
                                    <Label htmlFor="r2">Female</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Custom" id="r3"/>
                                    <Label htmlFor="r3">Custom</Label>
                                </div>
                            </RadioGroup>
                            {errors.gender && <span className={"text-red-700 text-sm ms-1"}>*Gender is required</span>}
                            <div className="grid w-full max-w-md items-center gap-3">
                                <Label htmlFor="age">Age</Label>
                                <Input {...register('age', { required: true })} type="number" id="age" placeholder="21"/>
                                {errors.age && <span className={"text-red-700 text-sm ms-1"}>*Age is required</span>}
                            </div>
                        </div>

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

                        <div className="grid w-full max-w-md items-center gap-3">
                            <Label htmlFor="cpassword">Confirm your password</Label>
                            <Input {...register('confirmPassword', { required: true, validate: validateConfirmPassword })}  type="password" id="cpassword" placeholder="Enter your password again"/>
                            {errors.confirmPassword && <span className={"text-red-700 text-sm ms-1"}>Passwords must match</span>}
                        </div>


                    </div>

                    <div className={"w-full max-w-md flex flex-col gap-3"}>
                        <Button type={"submit"} className={"w-full"}>Sign Up</Button>
                        <Button variant={"outline"} className={"w-full flex justify-center items-center gap-2"}>
                            <Image
                                src={'https://www.svgrepo.com/show/303108/google-icon-logo.svg'}
                                alt={'icon'}
                                height={18}
                                width={18}
                                className={"rounded-3xl"}
                            />
                            Sign Up with Google</Button>
                    </div>
                    </form>
                </div>
                <div className={"flex justify-center items-center mb-10 mt-5"}>
                    <p className="leading-7 [&:not(:first-child)]:mt-6 text-black">
                        <span className={"text-gray-700"}>Already have an account? </span> <Link href={'/login'}><span
                        className={"text-black font-bold"}>Sign In</span></Link>
                    </p>
                </div>
            </div>
            <div className="w-1/2 h-screen justify-center items-center  relative sm:hidden md:hidden lg:flex hidden">
                <img style={{height: '98%', width: '98%'}} className={"object-cover rounded-3xl"}
                     src="https://voguebebucket.s3.amazonaws.com/pexels-cottonbro-studio-3998407.jpg"
                     alt=""/>


                <div className={"absolute z-10 text-black top-10 left-10 flex flex-wrap w-max"}>
                    <p className="leading-7  [&:not(:first-child)]:mt-1 uppercase max-w-md hidden">
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
                        Welcome to Vogue Visit, your one-stop destination for effortless elegance. Discover a world of
                        beauty at your fingertips.
                    </p>
                </div>

            </div>

        </div>
    );
};

export default SignUp;
