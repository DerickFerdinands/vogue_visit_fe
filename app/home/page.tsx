'use client'
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import React, {useCallback, useEffect, useState} from "react";
import axios from "@/lib/HttpInterceptor";
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

const Home = () => {

    useEffect(() => {

        getAllSalons();
    }, []);

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    const [salons, setSalons] = useState([])

    const getAllSalons = async ()=>{
        const resp = await axios.get('/salons/all');
        console.log(resp.data.data)
        setSalons(resp.data.data)
    }

    return (
        <div  className={" p-5 flex justify-center flex-col lg:flex-row items-center"}>

            <div className={"relative flex flex-wrap justify-between object-cover w-full lg:w-1/2 items-center gap-10  p-10 h-96"}>

                <Image className={"absolute top-0"} alt={'hero img'} width={400} height={400} src={'https://voguebebucket.s3.amazonaws.com/Group+11+(1).png'}/>
                <div className={"flex items-center flex-wrap gap-10"}>

                    {/*<Image alt={'hero img'} width={200} height={100}*/}
                    {/*       src={'https://voguebebucket.s3.amazonaws.com/pexels-pixabay-219550-removebg-preview.png'}/>*/}
                    <h1 className="scroll-m-20 text-7xl font-bold tracking-tight lg:text-9xl max-w-sm ">
                        Vogue Visit
                    </h1>
                </div>


                <div className={"flex items-center gap-10"}>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl lg:text-5xl font-semibold tracking-tight max-w-sm first:mt-0">
                        Your Convenience Is Our Duty
                    </h2>

                </div>
            </div>


            <div className={"flex w-full lg:w-1/2  justify-center pt-10 px-10 lg:relative lg:right-10"}>
               {/* <div className={"w-full flex justify-start"}>
                    <h4 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
                        Discover
                    </h4>
                </div>*/}
                <Carousel orientation={"horizontal"} className="w-full max-h-screen">
                    <CarouselContent className={""}>
                        {salons.map((salon, index) => (
                            <CarouselItem
                                onClick={()=>{
                                    router.push(`/home/content?${createQueryString('id',salon.id)}`)
                                }}
                                className="" key={index}>
                                <div className="p-1 ">
                                    <Card style={{background: 'rgba(217, 217, 217, 0.12)'}} className={"border border-green-900"}>
                                        <CardContent
                                            className="flex flex-col aspect-video items-center justify-start p-5 bg-transparent">
                                            <div className="flex w-full justify-between items-center">
                                                <span className="text-xl mb-2 font-semibold ">{salon.name}</span>
                                                <span className="text-lg mb-2 font-regular flex items-center gap-2">
                                                    <svg style={{height: '15px'}} xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 384 512">
                                                        <path
                                                            d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                                                    {salon.location}</span>
                                            </div>

                                            <img
                                                style={{width: '100%', height: '100%'}}
                                                className={"rounded-xl object-cover"}
                                                src={salon.img_1}
                                                alt={'salon Image'}
                                            />

                                            <div className="flex w-full justify-between items-center">
                                                <div className={"flex justify-center gap-1"}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16"
                                                         viewBox="0 0 19 16" fill="none">
                                                        <g clip-path="url(#clip0_22_106)">
                                                            <path
                                                                d="M10.4533 0.5625C10.2785 0.21875 9.90901 0 9.50328 0C9.09755 0 8.73141 0.21875 8.55328 0.5625L6.43228 4.69688L1.69547 5.35938C1.29964 5.41563 0.969776 5.67812 0.847728 6.0375C0.725679 6.39687 0.824637 6.79375 1.10832 7.05937L4.54547 10.2812L3.73401 14.8344C3.66804 15.2094 3.83297 15.5906 4.15953 15.8125C4.4861 16.0344 4.91821 16.0625 5.27446 15.8844L9.50658 13.7437L13.7387 15.8844C14.095 16.0625 14.5271 16.0375 14.8536 15.8125C15.1802 15.5875 15.3451 15.2094 15.2792 14.8344L14.4644 10.2812L17.9015 7.05937C18.1852 6.79375 18.2875 6.39687 18.1621 6.0375C18.0368 5.67812 17.7102 5.41563 17.3144 5.35938L12.5743 4.69688L10.4533 0.5625Z"
                                                                fill="#8E782A"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_22_106">
                                                                <rect width="19" height="16" fill="white"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16"
                                                         viewBox="0 0 19 16" fill="none">
                                                        <g clip-path="url(#clip0_22_106)">
                                                            <path
                                                                d="M10.4533 0.5625C10.2785 0.21875 9.90901 0 9.50328 0C9.09755 0 8.73141 0.21875 8.55328 0.5625L6.43228 4.69688L1.69547 5.35938C1.29964 5.41563 0.969776 5.67812 0.847728 6.0375C0.725679 6.39687 0.824637 6.79375 1.10832 7.05937L4.54547 10.2812L3.73401 14.8344C3.66804 15.2094 3.83297 15.5906 4.15953 15.8125C4.4861 16.0344 4.91821 16.0625 5.27446 15.8844L9.50658 13.7437L13.7387 15.8844C14.095 16.0625 14.5271 16.0375 14.8536 15.8125C15.1802 15.5875 15.3451 15.2094 15.2792 14.8344L14.4644 10.2812L17.9015 7.05937C18.1852 6.79375 18.2875 6.39687 18.1621 6.0375C18.0368 5.67812 17.7102 5.41563 17.3144 5.35938L12.5743 4.69688L10.4533 0.5625Z"
                                                                fill="#8E782A"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_22_106">
                                                                <rect width="19" height="16" fill="white"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16"
                                                         viewBox="0 0 19 16" fill="none">
                                                        <g clip-path="url(#clip0_22_106)">
                                                            <path
                                                                d="M10.4533 0.5625C10.2785 0.21875 9.90901 0 9.50328 0C9.09755 0 8.73141 0.21875 8.55328 0.5625L6.43228 4.69688L1.69547 5.35938C1.29964 5.41563 0.969776 5.67812 0.847728 6.0375C0.725679 6.39687 0.824637 6.79375 1.10832 7.05937L4.54547 10.2812L3.73401 14.8344C3.66804 15.2094 3.83297 15.5906 4.15953 15.8125C4.4861 16.0344 4.91821 16.0625 5.27446 15.8844L9.50658 13.7437L13.7387 15.8844C14.095 16.0625 14.5271 16.0375 14.8536 15.8125C15.1802 15.5875 15.3451 15.2094 15.2792 14.8344L14.4644 10.2812L17.9015 7.05937C18.1852 6.79375 18.2875 6.39687 18.1621 6.0375C18.0368 5.67812 17.7102 5.41563 17.3144 5.35938L12.5743 4.69688L10.4533 0.5625Z"
                                                                fill="#8E782A"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_22_106">
                                                                <rect width="19" height="16" fill="white"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16"
                                                         viewBox="0 0 19 16" fill="none">
                                                        <g clip-path="url(#clip0_22_106)">
                                                            <path
                                                                d="M10.4533 0.5625C10.2785 0.21875 9.90901 0 9.50328 0C9.09755 0 8.73141 0.21875 8.55328 0.5625L6.43228 4.69688L1.69547 5.35938C1.29964 5.41563 0.969776 5.67812 0.847728 6.0375C0.725679 6.39687 0.824637 6.79375 1.10832 7.05937L4.54547 10.2812L3.73401 14.8344C3.66804 15.2094 3.83297 15.5906 4.15953 15.8125C4.4861 16.0344 4.91821 16.0625 5.27446 15.8844L9.50658 13.7437L13.7387 15.8844C14.095 16.0625 14.5271 16.0375 14.8536 15.8125C15.1802 15.5875 15.3451 15.2094 15.2792 14.8344L14.4644 10.2812L17.9015 7.05937C18.1852 6.79375 18.2875 6.39687 18.1621 6.0375C18.0368 5.67812 17.7102 5.41563 17.3144 5.35938L12.5743 4.69688L10.4533 0.5625Z"
                                                                fill="#8E782A"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_22_106">
                                                                <rect width="19" height="16" fill="white"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16"
                                                         viewBox="0 0 19 16" fill="none">
                                                        <g clip-path="url(#clip0_22_106)">
                                                            <path
                                                                d="M10.4533 0.5625C10.2785 0.21875 9.90901 0 9.50328 0C9.09755 0 8.73141 0.21875 8.55328 0.5625L6.43228 4.69688L1.69547 5.35938C1.29964 5.41563 0.969776 5.67812 0.847728 6.0375C0.725679 6.39687 0.824637 6.79375 1.10832 7.05937L4.54547 10.2812L3.73401 14.8344C3.66804 15.2094 3.83297 15.5906 4.15953 15.8125C4.4861 16.0344 4.91821 16.0625 5.27446 15.8844L9.50658 13.7437L13.7387 15.8844C14.095 16.0625 14.5271 16.0375 14.8536 15.8125C15.1802 15.5875 15.3451 15.2094 15.2792 14.8344L14.4644 10.2812L17.9015 7.05937C18.1852 6.79375 18.2875 6.39687 18.1621 6.0375C18.0368 5.67812 17.7102 5.41563 17.3144 5.35938L12.5743 4.69688L10.4533 0.5625Z"
                                                                fill="#8E782A"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_22_106">
                                                                <rect width="19" height="16" fill="white"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </div>
                                                <Button className={"mt-3"}>Book now </Button>
                                            </div>

                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious/>
                    <CarouselNext/>
                </Carousel>
            </div>

        </div>
    );
};

export default Home;
