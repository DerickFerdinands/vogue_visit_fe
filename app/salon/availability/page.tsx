"use client"

import {Button} from "@/components/ui/button"
import React, {useEffect, useState} from "react";
import axios from "@/lib/HttpInterceptor";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast"
import {CalendarIcon} from "@radix-ui/react-icons"
import Link from "next/link";
import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {format} from "date-fns";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Card, CardContent} from "@/components/ui/card";


export default function Services() {

    const {toast} = useToast()

    let router = useRouter();

    useEffect(() => {
        getSalonByOwner();
    }, []);

    const getSalonByOwner = async () => {
        const resp = await axios.get('/salons/owner');
        console.log(resp.data.data)
        setSalon(resp.data.data)

        const slotsResp = await axios.get('/slots');
        console.log(slotsResp.data.data)
        setDates(slotsResp.data.data)
    }

    const [submit, setSubmit] = useState(false);

    const [salon, setSalon] = useState(null);
    const [dates, setDates] = useState([]);
    const [slots, setSlots] = useState([]);
    const [date, setDate] = React.useState<Date>()
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)

    const handleOnSubmit = async  ()=>{

        if(date && startTime && endTime){
            console.log(date,
            startTime,
            endTime)
            const resp = await axios.post('/slots/',{
                    "date": date.getFullYear()+"-"+2+"-"+date.getDate(),
                    "start_time": startTime,
                    "end_time": endTime
                }
            );
            console.log(resp.data.data)
        }
    }

    const getSlotsForDate = async (val:string)=>{
        const slots = await axios.get('/slots/date/'+val,
        );
        console.log(slots.data.data)
        setSlots(slots.data.data)
    }

    return (
        <div className={" flex overflow-hidden "}>
            <div style={{background: 'rgba(217, 217, 217, 0.12)'}}
                 className={"border flex items-center justify-around gap-10 p-10 fixed bottom-0 left-0 right-0 w-full"}>
                <div>
                    <p>Salon name</p>
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-2xl">
                        {salon && salon.name}
                    </h1>
                </div>

                <div>
                    <p>Salon location</p>
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-2xl">
                        {salon && salon.location}
                    </h1>
                </div>

                <div>
                    <p>Instagram URL</p>
                    <div className="flex items-center gap-1 text-blue-900">
                        <svg style={{height: '15px'}} xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 448 512">
                            <path
                                d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                        </svg>
                        <a href={salon ? salon.instagram_url : ''}>Click here</a>
                    </div>
                </div>

                <div>
                    <p>Facebook URL</p>
                    <div className="flex items-center gap-1 text-blue-900">
                        <svg style={{height: '15px'}} xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <path
                                d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/>
                        </svg>
                        <a href={salon ? salon.facebook_url : ''}>Click here</a>
                    </div>
                </div>

                <div>
                    <p>Email</p>
                    <div className="flex items-center gap-1 text-blue-900">
                        <svg style={{height: '15px'}} xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <path
                                d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                        </svg>
                        <a href={salon ? salon.email : ''}>Click here</a>
                    </div>
                </div>

                <div>
                    <p>Phone Number</p>
                    <div className="flex items-center gap-1 text-blue-900">
                        <svg style={{height: '15px'}} xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <path
                                d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
                        </svg>
                        <a href={salon ? salon.phone_num : ''}>Click here</a>
                    </div>
                </div>

                <Button>Update Salon</Button>
                <Link href={'/salon/services'}>
                    <Button variant={"outline"}>Add Services</Button>
                </Link>

                <Link href={'/salon/availability'}>
                    <Button variant={"outline"}>Add Availability</Button>
                </Link>

                {/*<div className={"flex w-full max-w-screen-sm overflow-hidden flex-wrap mt-5  gap-2"}>
                    <img className={"w-1/3 rounded"} src={salon ? salon.img_1 :''} alt=""/>
                    <img className={"w-1/3 rounded"} src={salon ? salon.img_2 : ''} alt=""/>
                    <img className={"w-1/3 rounded"} src={salon ? salon.img_3 : ''} alt=""/>
                    <img className={"w-1/3 rounded"} src={salon ? salon.img_4 : ''} alt=""/>
                    <img className={"w-1/3 rounded"} src={salon ? salon.img_5 : ''} alt=""/>
                </div>*/}
            </div>

            <div className={"h-screen w-screen bg-white flex"}>

                <div
                    className="w-full lg:w-1/2 p-10 overflow-scroll h-screen hide-scrollbar flex flex-col ">
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-3">
                        Vogue Visit
                    </h1>
                    <p>Add Time Slots</p>

                    <div className="flex gap-5">
                        <div className={"flex flex-col gap-3 mt-5"}>
                            <Label>Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[240px] justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4"/>
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className={"flex flex-col gap-3 mt-5"}>
                            <Label>Start Time</Label>
                            <Input onChange={(e)=>{
                                setStartTime(e.target.value)
                                console.log(e)
                            }} type={"time"}/>
                        </div>
                        <div className={"flex flex-col gap-3 mt-5"}>
                            <Label>End Time</Label>
                            <Input onChange={(e)=>{
                                setEndTime(e.target.value)
                                console.log(e)
                            }} type={"time"}/>
                        </div>
                    </div>
                    <Button onClick={handleOnSubmit} className={"mt-3 max-w-sm w-32 px-5"}>Add Availability</Button>

                    <div className={"max-h-80 h-full mt-20"}>

                        <Carousel
                            opts={{
                                align: "start",
                            }}
                            className="w-full max-w-sm ms-5"
                        >
                            <CarouselContent>
                                {dates.map((date, index) => (
                                    <CarouselItem
                                        onClick={()=>{getSlotsForDate(date)}}
                                        key={index} className="md:basis-1/2 lg:basis-1/3 cursor-pointer">
                                        <div className="p-1">
                                            <Card >
                                                <CardContent className="flex aspect-auto items-center justify-center p-6">
                                                    <span className="text-lg font-semibold">{date}</span>
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


                </div>
                <div
                    className="w-full lg:w-1/2 p-10 overflow-scroll  hide-scrollbar flex flex-col ">
                    <p className={"mb-5 mt-10"}>Time Slots</p>
                    <div style={{height:'70vh'}} className={"flex w-full flex-wrap gap-3 hide-scrollbar overflow-scroll"}>
                        {slots && slots.map((slot:any, index:number)=>  <Card className={"w-28"} key={index}>
                            <CardContent className="flex flex-col items-center justify-center p-6">
                            <span className="text-sm ">{slot? slot.start_time : ''} to {slot? slot.end_time : ''}</span>

                                {slot.is_booked ? <span className="text-sm text-red-700">Booked</span> :
                                    <span className="text-sm text-green-700">Available</span>}


                            </CardContent>
                        </Card>)}
                    </div>
                </div>

            </div>

        </div>

    )
}
