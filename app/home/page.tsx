import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Home = () => {
    return (
        <div  className={" p-5 flex justify-center flex-col lg:flex-row items-center"}>

            <div  className={"flex flex-wrap justify-between   w-full lg:w-1/2 items-center gap-10  p-10"}>

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
                        {Array.from({length: 10}).map((_, index) => (
                            <CarouselItem className="" key={index}>
                                <div className="p-1">
                                    <Card style={{background: 'rgba(217, 217, 217, 0.12)'}} className={""}>
                                        <CardContent
                                            className="flex flex-col aspect-video items-center justify-start p-5 bg-transparent">
                                            <div className="flex w-full justify-between items-center">
                                                <span className="text-xl mb-2 font-semibold ">Maxx Mark</span>
                                                <span className="text-lg mb-2 font-regular flex items-center gap-2">
                                                    <svg style={{height: '15px'}} xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 384 512">
                                                        <path
                                                            d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                                                    Colombo 5</span>
                                            </div>

                                            <img
                                                style={{width: '100%', height: '100%'}}
                                                className={"rounded-xl object-cover"}
                                                src={'https://voguebebucket.s3.amazonaws.com/pexels-thgusstavo-santana-1813272.jpg'}
                                                alt={'salon Image'}
                                            />

                                            <div className="flex w-full justify-between items-center">
                                                <p className="leading-7 [&:not(:first-child)]:mt-3">
                                                    Rating: 5/5
                                                </p>
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
