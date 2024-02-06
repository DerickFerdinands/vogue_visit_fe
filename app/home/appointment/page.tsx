'use client'
import {useCallback, useEffect, useState} from "react";
import axios from "@/lib/HttpInterceptor";
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {Card, CardContent} from "@/components/ui/card"
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";


const Home = () => {

    const { toast } = useToast()
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


    const salonId = searchParams.get('salon_id')
    const serviceId = searchParams.get('service_id')
    const slotCount = searchParams.get('slot_count')

    useEffect(() => {
        getContent();
    }, []);

    const [salon, setSalon] = useState<any>(null)
    const [service, setService] = useState<any>(null)
    const [dates, setDates] = useState([])
    const [selectedDate, setSelectedDate] = useState(null)
    const [slots, setSlots] = useState<any>([])
    const [selectedSlots, setSelectedSlots] = useState([])


    const getContent = async () => {
        const resp = await axios.get('/salons/byid/' + salonId);
        console.log(resp.data.data)
        setSalon(resp.data.data)


        const serviceResp = await axios.get('/services/id/' + serviceId);
        console.log(serviceResp.data.data)
        setService(serviceResp.data.data)

        const datesResp = await axios.get('/slots/dates/salon/' + salonId);
        console.log(datesResp.data.data)
        setDates(datesResp.data.data)
    }

    const handleOnDateSelect = async (date: any) => {

        setSelectedDate(date)
        const slotsResp = await axios.get(`/slots/salon/${salonId}/date/${date}`);
        console.log(slotsResp.data.data)
        setSlots(slotsResp.data.data)
    }

    const checkIfSlotExists = (slot: any) => {
        // @ts-ignore
        return selectedSlots.some(sSlot => sSlot.id == slot.id)
    }

    const handleSlotOnClick = (slot: any) => {

        if (!checkIfSlotExists(slot) && service.slot_count > selectedSlots.length && !slot.is_booked)
            // @ts-ignore
            setSelectedSlots((sSlots: any[]) => [...sSlots, slot])
    }

    const handleSlotOnDblClick = (slot: any) => {
        if (checkIfSlotExists(slot))
            setSelectedSlots(selectedSlots.filter(sSlot => sSlot.id !== slot.id))
    }

    const  handleAppointmentOnClick = async ()=> {

        const appointmentResp = await axios.post(`/appointments/`,{
            salon_id:salon.id,
            service_id:service.id,
            slots:selectedSlots.map(sSlot=>sSlot.id)
        });
        console.log(appointmentResp.data.data)

        if (appointmentResp.status == 200){
            // toast({
            //     title: "Success",
            //     description: "Appointment Successfull",
            // })
            console.log(appointmentResp.data.data.identifier)
            const payment = await axios.get(`/paypal/initiate-payment/${appointmentResp.data.data.identifier}`);

            if(payment.status == 200)
                router.push(payment.data)
        }

    }

    return (
        <>
            <div className={"flex p-10 gap-10 items-center"}>
                <div>
                    Salon name
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        {salon && salon.name}
                    </h3>
                </div>

                <div>
                    Service name
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        {service && service.name}
                    </h3>
                </div>

                <div>
                    Slot Count
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        {service && service.slot_count}
                    </h3>
                </div>

                <div>
                    Estimated duration (1 slot = 15 mins)
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        {service && service.slot_count * 15 > 60 ? <span>{service.slot_count * 15 / 60} Hours</span> :
                            <span>{service && service.slot_count * 15} Minutes</span>
                        }
                    </h3>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full max-w-lg ms-10"
                >
                    <CarouselContent>
                        {dates.map((date, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                                <div className="p-1">
                                    <Card
                                        onClick={() => handleOnDateSelect(date)}
                                        style={{background: 'rgba(83, 82, 82, 0.14)'}}
                                        className={"cursor-pointer flex justify-center items-center"}>
                                        <CardContent className="flex w-max items-center justify-center p-2">
                                            <span className="text-sm">{date}</span>
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

            <div className={"max-w-screen-2xl w-full grid grid-cols-5 p-10 pt-0"}>
                <img alt={'img1'} className={"h-full w-full object-cover"} src={service ? service.img_1 : ''}/>
                <img alt={'img1'} className={"h-full w-full object-cover"} src={service ? service.img_2 : ''}/>
                <img alt={'img1'} className={"h-full w-full object-cover"} src={service ? service.img_3 : ''}/>
                <img alt={'img1'} className={"h-full w-full object-cover"} src={service ? service.img_4 : ''}/>
                <img alt={'img1'} className={"h-full w-full object-cover"} src={service ? service.img_5 : ''}/>
            </div>

            <div className={"flex justify-between items center p-10 pt-0"}>
                <div className={"flex gap-10"}>
                    <div>
                        Selected Date
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            {selectedDate ? selectedDate : '--'}
                        </h3>
                    </div>

                    <div>
                        Price
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            Rs. {service && service.price} /-
                        </h3>
                    </div>

                </div>

                <div className={"flex items-center gap-5"}>
                    <div>
                        Available
                        <div className={"w-28 h-10 bg-white border-2 rounded"}>
                        </div>
                    </div>
                    <div>
                        Taken
                        <div className={"w-28 h-10 bg-black border-2 rounded"}></div>
                    </div>

                    <div>
                        Selected
                        <div className={"w-28 h-10 bg-green-700 border-2 rounded"}></div>
                    </div>
                </div>
            </div>

            <div className={"p-10 pt-0 flex gap-5 flex-wrap max-h-64 hide-scrollbar overflow-scroll"}>
                {slots.map((slot: any, index: number) =>
                    <div
                        onClick={
                            () => {
                                handleSlotOnClick(slot)
                            }}

                        onDoubleClick={
                            () => {
                                handleSlotOnDblClick(slot)
                            }}

                        className={`${checkIfSlotExists(slot) ? 'bg-green-700 text-white' : slot.is_booked ? 'bg-black text-white' : 'bg-white text-black'} cursor-pointer border-2 rounded p-1 flex justify-center items-center w-32`}
                        key={index}>{slot && slot.start_time}</div>)}
            </div>

            <div className={"p-10 pt-0 flex justify-end"}>
                <Button onClick={()=>{
                    handleAppointmentOnClick()
                }
                } disabled={service ? selectedSlots.length !== service.slot_count : true}>Reserve</Button>
            </div>
        </>
    );
};

export default Home;
