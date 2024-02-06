'use client'
import React from 'react';
import Link from "next/link";
import {useSearchParams} from "next/navigation";

const Page = () => {

    const searchParams = useSearchParams()

    const paymentID=  searchParams.get("paymentId")
    const price=  searchParams.get("price")
    return (
        <div className={"flex flex-col items-center gap-10 justify-center p-10 h-screen"}>
            <h1 className="uppercase scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Payment Success
            </h1>

            <img src="https://cdni.iconscout.com/illustration/premium/thumb/payment-success-7242865-5902141.png?f=webp"
                 alt=""/>

            <div className={"flex gap-20 justify-center"}>
            <div className={"flex flex-col items-center justify-center"}>
                Reference ID
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    The Joke Tax
                </h3>
            </div>

            <div className={"flex flex-col items-center justify-center"}>
                Amount
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Rs. 2000 /-
                </h3>
            </div>
            </div>

            <Link href={'/home'}>Back To Home</Link>
        </div>
    );
};

export default Page;
