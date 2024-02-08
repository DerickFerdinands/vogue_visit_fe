'use client'
import {useCallback, useEffect, useState} from "react";
import axios from "@/lib/HttpInterceptor";
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link";
import {Button} from "@/components/ui/button";


const Home = () => {
    const searchParams = useSearchParams()

    const router = useRouter()
    const pathname = usePathname()

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


    const salonId = searchParams.get('id')

    useEffect(() => {
        getContent();
    }, []);

    const [salon, setSalon] = useState<any>(null)
    const [services, setServices] = useState([])


    const getContent = async () => {
        const resp = await axios.get('/salons/byid/' + salonId);
        console.log(resp.data.data)
        setSalon(resp.data.data)


        const serviceResp = await axios.get('/services/salon/' + salonId);
        console.log(serviceResp.data.data)
        setServices(serviceResp.data.data)
    }

    return (
        <>
            <img style={{width:'100vw', height:'100vh', zIndex:-1, opacity:.8}} className={"fixed top-0 object-cover"} src={'https://voguebebucket.s3.amazonaws.com/pexels-cottonbro-studio-10679175+1.png'}/>
            {/*{salon && salon.name} {services && services.map((service,index)=><span key={index}>{service.name}</span>)}*/}
            <div className={"flex flex-col items-center gap-2"}>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    WELCOME TO
                </h3>
                <div className={"flex justify-center gap-1"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
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
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl">
                    {salon && salon.name}
                </h1>
                <small className="text-sm font-medium leading-none flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 22 27" fill="none">
                        <g clip-path="url(#clip0_23_151)">
                            <path
                                d="M12.3578 26.325C15.2969 22.9395 22 14.734 22 10.125C22 4.53516 17.0729 0 11 0C4.92708 0 0 4.53516 0 10.125C0 14.734 6.70313 22.9395 9.64219 26.325C10.3469 27.1318 11.6531 27.1318 12.3578 26.325ZM11 6.75C11.9725 6.75 12.9051 7.10558 13.5927 7.73852C14.2804 8.37145 14.6667 9.2299 14.6667 10.125C14.6667 11.0201 14.2804 11.8786 13.5927 12.5115C12.9051 13.1444 11.9725 13.5 11 13.5C10.0275 13.5 9.09491 13.1444 8.40728 12.5115C7.71964 11.8786 7.33333 11.0201 7.33333 10.125C7.33333 9.2299 7.71964 8.37145 8.40728 7.73852C9.09491 7.10558 10.0275 6.75 11 6.75Z"
                                fill="black"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_23_151">
                                <rect width="22" height="27" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                    {salon && salon.location}</small>
            </div>

            <div className={"flex flex-col items-center gap-10 mt-10"}>
                <h3 className="scroll-m-20 uppercase text-2xl font-semibold tracking-tight">
                    Our Latest Work
                </h3>

                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full max-w-screen-2xl"
                >
                    <CarouselContent>
                        {services.map((service:any, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                                <div className="p-1">
                                    <Card style={{background: 'rgba(83, 82, 82, 0.14)'}} className={"border-none"}>
                                        <CardContent className="flex flex-col aspect-auto gap-3 items-center justify-between p-6">
                                            <div className={"w-full flex justify-between items-center"}>
                                                <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                                                    {service.name}
                                                </h4>

                                                <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                                                    Slot Count: {service.slot_count}
                                                </h4>
                                            </div>

                                            <img src={service.img_1} className={"rounded-xl"} alt=""/>

                                            <div className={"flex justify-between items-center w-full"}>
                                                <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                                                    Price: Rs.{service.price}
                                                </h4>

                                                <Link className={"flex gap-1 items-center"} href={`/home/appointment?${createQueryString('salon_id',salon.id)}&${createQueryString('service_id',service.id)}&${createQueryString('slot_count',service.slot_count)}`}>
                                                    Book Now
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="25"
                                                         viewBox="0 0 33 30" fill="none">
                                                        <path
                                                            d="M19.25 22.5L17.325 20.6875L22.2063 16.25H5.5V13.75H22.2063L17.325 9.3125L19.25 7.5L27.5 15L19.25 22.5Z"
                                                            fill="#403F3F"/>
                                                    </svg>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

            <div className={" flex items-center justify-between mt-32 "}>
                <div style={{background: 'rgba(83, 82, 82, 0.14)'}}
                     className={"flex ms-10 gap-3 items-center border border-black rounded-xl p-3"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 30" fill="none">
                        <g clip-path="url(#clip0_23_210)">
                            <path
                                d="M12.5054 8.26172C8.95626 8.26172 6.09354 11.2676 6.09354 14.9941C6.09354 18.7207 8.95626 21.7266 12.5054 21.7266C16.0545 21.7266 18.9172 18.7207 18.9172 14.9941C18.9172 11.2676 16.0545 8.26172 12.5054 8.26172ZM12.5054 19.3711C10.2118 19.3711 8.33684 17.4082 8.33684 14.9941C8.33684 12.5801 10.2063 10.6172 12.5054 10.6172C14.8045 10.6172 16.6739 12.5801 16.6739 14.9941C16.6739 17.4082 14.7989 19.3711 12.5054 19.3711ZM20.675 7.98633C20.675 8.85938 20.0054 9.55664 19.1795 9.55664C18.348 9.55664 17.6839 8.85352 17.6839 7.98633C17.6839 7.11914 18.3536 6.41602 19.1795 6.41602C20.0054 6.41602 20.675 7.11914 20.675 7.98633ZM24.9217 9.58008C24.8268 7.47656 24.3692 5.61328 22.9016 4.07812C21.4395 2.54297 19.665 2.0625 17.6616 1.95703C15.5969 1.83398 9.40827 1.83398 7.34354 1.95703C5.34577 2.05664 3.57122 2.53711 2.10359 4.07227C0.635951 5.60742 0.183942 7.4707 0.0834961 9.57422C-0.0336914 11.7422 -0.0336914 18.2402 0.0834961 20.4082C0.178362 22.5117 0.635951 24.375 2.10359 25.9102C3.57122 27.4453 5.34019 27.9258 7.34354 28.0313C9.40827 28.1543 15.5969 28.1543 17.6616 28.0313C19.665 27.9316 21.4395 27.4512 22.9016 25.9102C24.3636 24.375 24.8212 22.5117 24.9217 20.4082C25.0389 18.2402 25.0389 11.748 24.9217 9.58008ZM22.2543 22.7344C21.819 23.8828 20.9764 24.7676 19.877 25.2305C18.2308 25.916 14.3246 25.7578 12.5054 25.7578C10.6862 25.7578 6.77434 25.9102 5.13372 25.2305C4.03997 24.7734 3.19734 23.8887 2.75649 22.7344C2.10359 21.0059 2.25425 16.9043 2.25425 14.9941C2.25425 13.084 2.10917 8.97656 2.75649 7.25391C3.19175 6.10547 4.03439 5.2207 5.13372 4.75781C6.77992 4.07227 10.6862 4.23047 12.5054 4.23047C14.3246 4.23047 18.2364 4.07812 19.877 4.75781C20.9708 5.21484 21.8134 6.09961 22.2543 7.25391C22.9072 8.98242 22.7565 13.084 22.7565 14.9941C22.7565 16.9043 22.9072 21.0117 22.2543 22.7344Z"
                                fill="black"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_23_210">
                                <rect width="25" height="30" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26 26" fill="none">
                        <g clip-path="url(#clip0_23_212)">
                            <path
                                d="M25.5938 13C25.5938 6.04297 19.957 0.40625 13 0.40625C6.04297 0.40625 0.40625 6.04297 0.40625 13C0.40625 19.2857 5.0116 24.4959 11.0322 25.4414V16.6405H7.83301V13H11.0322V10.2253C11.0322 7.06926 12.9111 5.32594 15.7889 5.32594C17.1671 5.32594 18.6083 5.57172 18.6083 5.57172V8.66938H17.0198C15.4558 8.66938 14.9678 9.64031 14.9678 10.6361V13H18.4605L17.9019 16.6405H14.9678V25.4414C20.9884 24.4959 25.5938 19.2857 25.5938 13Z"
                                fill="black"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_23_212">
                                <rect width="26" height="26" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 19 21" fill="none">
                        <g clip-path="url(#clip0_23_146)">
                            <path
                                d="M6.11934 1.00872C5.83359 0.245828 5.08027 -0.160226 4.36035 0.0571565L1.09473 1.04153C0.449023 1.23841 0 1.88645 0 2.62473C0 12.772 7.44414 20.9997 16.625 20.9997C17.293 20.9997 17.8793 20.5034 18.0574 19.7898L18.948 16.1804C19.1447 15.3847 18.7773 14.5521 18.0871 14.2363L14.5246 12.5956C13.9197 12.3167 13.2184 12.5095 12.8064 13.0714L11.3072 15.0935C8.69473 13.7277 6.57949 11.3898 5.34375 8.50227L7.17324 6.84934C7.68164 6.38997 7.85606 5.61888 7.60371 4.95032L6.11934 1.01282V1.00872Z"
                                fill="#0A0A0A"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_23_146">
                                <rect width="19" height="21" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28" fill="none">
                        <path
                            d="M3.5 6.125C3.01875 6.125 2.625 6.51875 2.625 7V8.20859L12.0586 15.9523C13.1906 16.882 14.8148 16.882 15.9469 15.9523L25.375 8.20859V7C25.375 6.51875 24.9813 6.125 24.5 6.125H3.5ZM2.625 11.6047V21C2.625 21.4813 3.01875 21.875 3.5 21.875H24.5C24.9813 21.875 25.375 21.4813 25.375 21V11.6047L17.6094 17.9812C15.5094 19.7039 12.4852 19.7039 10.3906 17.9812L2.625 11.6047ZM0 7C0 5.06953 1.56953 3.5 3.5 3.5H24.5C26.4305 3.5 28 5.06953 28 7V21C28 22.9305 26.4305 24.5 24.5 24.5H3.5C1.56953 24.5 0 22.9305 0 21V7Z"
                            fill="black"/>
                    </svg>
                </div>



                <Button className={"me-10"}>Book Now</Button>
            </div>
        </>
    );
};

export default Home;
