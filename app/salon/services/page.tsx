"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label";
import React, {useEffect, useState} from "react";
import {uploadToS3} from "@/lib/AWSS3";
import {Progress} from "@/components/ui/progress";
import axios from "@/lib/HttpInterceptor";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast"

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {any} from "prop-types";
import Link from "next/link";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Salon name must be at least 2 characters.",
    }),

    description: z.string().min(5, {
        message: "Please Enter a valid Description.",
    }),

    price: z.string().min(1, {
        message: "Please Enter a valid Price.",
    }),

    slot_count: z.string().min(1, {
        message: "Please Enter a valid Slot Count.",
    }),

})

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

        const services = await axios.get('/services/owner');
        console.log(services.data.data)
        setServices(services.data.data)
    }

    const [img01, setImg01] = useState(null);
    const [img02, setImg02] = useState(null);
    const [img03, setImg03] = useState(null);
    const [img04, setImg04] = useState(null);
    const [img05, setImg05] = useState(null);
    const [submit, setSubmit] = useState(false);

    const [salon, setSalon] = useState<any>(null);
    const [services, setServices] = useState([]);

    const [img01Progress, setImg01Progress] = useState(0);
    const [img02Progress, setImg02Progress] = useState(0);
    const [img03Progress, setImg03Progress] = useState(0);
    const [img04Progress, setImg04Progress] = useState(0);
    const [img05Progress, setImg05Progress] = useState(0);

    // @ts-ignore
    const handleFileChange = (setSelectedFiles, e) => {
        setSelectedFiles(e.target.files[0]);
        console.log(e.target.files)
        console.log(img01, img02, img03, img04, img05)
    };


    // ...
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        if (img01 && img02 && img03 && img04 && img05) {

            const uploadPromises = [
                uploadToS3(img01, setImg01Progress),
                uploadToS3(img02, setImg02Progress),
                uploadToS3(img03, setImg03Progress),
                uploadToS3(img04, setImg04Progress),
                uploadToS3(img05, setImg05Progress),
            ];

// Use Promise.all() to wait for all uploads to complete
            try {
                const [img1Url, img2Url, img3Url, img4Url, img5Url] = await Promise.all(uploadPromises);

                // All uploads are complete, you can execute another block of code here
                console.log('All uploads completed successfully');
                console.log('URLs:', img1Url, img2Url, img3Url, img4Url, img5Url);


                try {

                    const data = {
                        ...values,
                        id: null,
                        salon_id: null,
                        salon: null,
                        img_1: img1Url,
                        img_2: img2Url,
                        img_3: img3Url,
                        img_4: img4Url,
                        img_5: img5Url

                    }

                    const resp = await axios.post('/services/', data);
                    console.log(resp.status, resp.data)

                    if (resp.status == 200 && resp.data) {
                        // localStorage.setItem('salon',resp.data.data.token)
                        // const token = localStorage.getItem("jwt_token"); // Retrieve token from your preferred storage
                        // console.log('Retrieving',token)
                        // router.push('/'); // Navigate to /dashboard
                        toast({
                            title: "Success",
                            description: "Service Registered Successfully!",
                        })

                        const services = await axios.get('/services/owner');
                        console.log(services.data.data)
                        setServices(services.data.data)
                    }

                    // Handle successful login based on the API response
                } catch (error) {
                    // setError(error.message);
                    console.log(error)
                } finally {
                    // setIsLoading(false);
                }

                // Execute another block of code here
            } catch (error) {
                // Handle errors during any upload
                console.error('Error during upload:', error);
            }

        }

        console.log(values)
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
                    className="w-full lg:w-1/2 p-10 overflow-scroll h-screen hide-scrollbar flex flex-col justify-between">
                    <div className={"max-w-screen-lg w-full px-10 mb-5"}>
                        <div className={"my-10"}>

                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-3">
                                Vogue Visit
                            </h1>
                            <p>Add services to your salon</p>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Service Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Salon Name" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Description" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 w-full  items-center gap-3">
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Service Price</FormLabel>
                                                <FormControl>
                                                    <Input type={"number"} placeholder="20" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="slot_count"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Service Slot Count</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type={"number"}
                                                        placeholder="Enter Slot Count, Where One Slot == 15 minutes" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-2 w-full  items-center gap-3">

                                    <div className="grid w-full  items-center gap-3">
                                        <Label htmlFor="picture">Image 01</Label>
                                        <Input onChange={e => handleFileChange(setImg01, e)} name="img_1" id="picture"
                                               type="file"/>
                                        {(submit && !img01) && <p className={"text-red-700"}>*Select Image</p>}
                                        <div className={"flex items-center gap-2 px-1"}>
                                            <Progress value={img01Progress}/> {img01Progress}%
                                        </div>


                                    </div>
                                    <div className="grid w-full  items-center gap-3">
                                        <Label htmlFor="picture">Image 02</Label>
                                        <Input onChange={e => handleFileChange(setImg02, e)} name="img_1" id="picture"
                                               type="file"/>
                                        {(submit && !img02) && <p className={"text-red-700"}>*Select Image</p>}
                                        <div className={"flex items-center gap-2 px-1"}>
                                            <Progress value={img02Progress}/> {img02Progress}%
                                        </div>
                                    </div>

                                    <div className="grid w-full  items-center gap-3">
                                        <Label htmlFor="picture">Image 03</Label>
                                        <Input onChange={e => handleFileChange(setImg03, e)} name="img_1" id="picture"
                                               type="file"/>
                                        {(submit && !img03) && <p className={"text-red-700"}>*Select Image</p>}
                                        <div className={"flex items-center gap-2 px-1"}>
                                            <Progress value={img03Progress}/> {img03Progress}%
                                        </div>

                                    </div>
                                    <div className="grid w-full  items-center gap-3">
                                        <Label htmlFor="picture">Image 04</Label>
                                        <Input onChange={e => handleFileChange(setImg04, e)} name="img_1" id="picture"
                                               type="file"/>
                                        {(submit && !img04) && <p className={"text-red-700"}>*Select Image</p>}
                                        <div className={"flex items-center gap-2 px-1"}>
                                            <Progress value={img04Progress}/> {img04Progress}%
                                        </div>

                                    </div>
                                    <div className="grid w-full  items-center gap-3">
                                        <Label htmlFor="picture">Image 05</Label>
                                        <Input onChange={e => handleFileChange(setImg05, e)} name="img_1" id="picture"
                                               type="file"/>
                                        {(submit && !img05) && <p className={"text-red-700"}>*Select Image</p>}
                                        <div className={"flex items-center gap-2 px-1"}>
                                            <Progress value={img05Progress}/> {img05Progress}%
                                        </div>

                                    </div>
                                    <Button className={"mb-5"} type="submit">Add Service</Button>
                                </div>


                            </form>
                        </Form>
                    </div>
                </div>
                <div
                    className="w-full lg:w-1/2 p-10 overflow-scroll  hide-scrollbar flex flex-col">
                    <p className={"mb-5 mt-10"}>Service List</p>

                    <Table>
                        <TableCaption>A list of your services.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Service ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Image 01</TableHead>
                                <TableHead>Image 02</TableHead>
                                <TableHead>Image 03</TableHead>
                                <TableHead>Image 04</TableHead>
                                <TableHead>Image 05</TableHead>
                                <TableHead className="text-right">Slot Count</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {services.map((service:any, index) => {
                                return <TableRow key={index}>
                                    <TableCell className="font-medium">{service.id}</TableCell>
                                    <TableCell>{service.name}</TableCell>
                                    <TableCell>{service.description}</TableCell>
                                    <TableCell><a target={"_blank"} href={service.img_1}>Link</a></TableCell>
                                    <TableCell><a target={"_blank"} href={service.img_2}>Link</a></TableCell>
                                    <TableCell><a target={"_blank"} href={service.img_3}>Link</a></TableCell>
                                    <TableCell><a target={"_blank"} href={service.img_4}>Link</a></TableCell>
                                    <TableCell><a target={"_blank"} href={service.img_5}>Link</a></TableCell>
                                    <TableCell className="text-right">{service.slot_count}</TableCell>
                                    <TableCell className="text-right">Rs.{service.price}</TableCell>
                                </TableRow>
                            }
                            )}

                        </TableBody>
                    </Table>

                </div>

            </div>

        </div>

    )
}
