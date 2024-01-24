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

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Salon name must be at least 2 characters.",
    }),

    description: z.string().min(50, {
        message: "Please Enter a valid Description.",
    }),

    location: z.string().min(5, {
        message: "Please Enter a valid Location.",
    }),

    instagram_url: z.string().min(5, {
        message: "Please Enter a valid instagram url.",
    }).regex(/^(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:[A-Za-z0-9_.-]+\/)?$/),

    facebook_url: z.string().min(5, {
        message: "Please Enter a valid facebook url.",
    }).regex(/^(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#! \/)?(?:pages\/)?(?:[? \w\-]*\/)?(?:profile\.php\? id=(?=\d. *))?([\w\-]*)?$/),

    phone_num: z.string().min(5, {
        message: "Please Enter a valid phone number.",
    }).regex(/^(?:\+94|0)?(?:7\d{8}|11\d{7})$/),

    email: z.string().min(5, {
        message: "Please Enter a valid email.",
    }).regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),

})

export default function ProfileForm() {

    const {toast} = useToast()

    let router = useRouter();

    useEffect(() => {
        console.log(".env", process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID)

        toast({
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
        })
    }, []);

    const [img01, setImg01] = useState(null);
    const [img02, setImg02] = useState(null);
    const [img03, setImg03] = useState(null);
    const [img04, setImg04] = useState(null);
    const [img05, setImg05] = useState(null);
    const [submit, setSubmit] = useState(false);

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
                        salon_owner: null,
                        owner_id: 1,
                        img_1: img1Url,
                        img_2: img2Url,
                        img_3: img3Url,
                        img_4: img4Url,
                        img_5: img5Url

                    }

                    const resp = await axios.post('/salons/', data);
                    console.log(resp.status, resp.data)

                    if (resp.status == 200 && resp.data) {
                        // localStorage.setItem('salon',resp.data.data.token)
                        // const token = localStorage.getItem("jwt_token"); // Retrieve token from your preferred storage
                        // console.log('Retrieving',token)
                        // router.push('/'); // Navigate to /dashboard
                        toast({
                            title: "Success",
                            description: "Salon Registered Successfully!",
                        })
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

        <div className={"h-screen w-screen bg-white flex"}>

            <div className="w-1/2 h-screen justify-center items-center  relative sm:hidden md:hidden lg:flex hidden">
                <img style={{height: '98%', width: '98%'}} className={"object-cover rounded-3xl"}
                     src="https://voguebebucket.s3.amazonaws.com/pexels-rajaa-lemnari-19686451.jpg"
                     alt=""/>

            </div>
            <div className="w-full lg:w-1/2 p-10 overflow-scroll h-screen hide-scrollbar flex flex-col justify-between">
                <div className={"max-w-screen-lg w-full px-10 mb-5"}>
                    <div className={"my-10"}>

                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-3">
                            Vogue Visit
                        </h1>
                        <p>Fill out the details to register at Vogue Visit</p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Salon Name</FormLabel>
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

                            <FormField
                                control={form.control}
                                name="location"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Location" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="instagram_url"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Instagram URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Instagram URL" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="facebook_url"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Facebook URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Facebook URL" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone_num"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Phone Number" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Email" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

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
                                <Label htmlFor="picture">Image 01</Label>
                                <Input onChange={e => handleFileChange(setImg02, e)} name="img_1" id="picture"
                                       type="file"/>
                                {(submit && !img02) && <p className={"text-red-700"}>*Select Image</p>}
                                <div className={"flex items-center gap-2 px-1"}>
                                    <Progress value={img02Progress}/> {img02Progress}%
                                </div>
                            </div>
                            <div className="grid w-full  items-center gap-3">
                                <Label htmlFor="picture">Image 01</Label>
                                <Input onChange={e => handleFileChange(setImg03, e)} name="img_1" id="picture"
                                       type="file"/>
                                {(submit && !img03) && <p className={"text-red-700"}>*Select Image</p>}
                                <div className={"flex items-center gap-2 px-1"}>
                                    <Progress value={img03Progress}/> {img03Progress}%
                                </div>

                            </div>
                            <div className="grid w-full  items-center gap-3">
                                <Label htmlFor="picture">Image 01</Label>
                                <Input onChange={e => handleFileChange(setImg04, e)} name="img_1" id="picture"
                                       type="file"/>
                                {(submit && !img04) && <p className={"text-red-700"}>*Select Image</p>}
                                <div className={"flex items-center gap-2 px-1"}>
                                    <Progress value={img04Progress}/> {img04Progress}%
                                </div>

                            </div>
                            <div className="grid w-full  items-center gap-3">
                                <Label htmlFor="picture">Image 01</Label>
                                <Input onChange={e => handleFileChange(setImg05, e)} name="img_1" id="picture"
                                       type="file"/>
                                {(submit && !img05) && <p className={"text-red-700"}>*Select Image</p>}
                                <div className={"flex items-center gap-2 px-1"}>
                                    <Progress value={img05Progress}/> {img05Progress}%
                                </div>

                            </div>


                            <Button className={"mb-5"} type="submit">Upload Images & Register Salon</Button>
                        </form>
                    </Form>
                </div>
            </div>

        </div>

    )
}
