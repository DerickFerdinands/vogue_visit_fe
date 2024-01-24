import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Input} from "@/components/ui/input";
// import { Icons } from "@/components/icons"
const Nav = () => {
    return (
        <div className={"flex p-10 gap-5 justify-between flex-wrap items-center max-w-screen-3xl"}>
            <div style={{width: 'max-content !important'}} className={"flex gap-10 flex-wrap  w-auto items-center"}>
                <Image
                    src={'https://voguebebucket.s3.amazonaws.com/Screenshot_2024-01-21_085837-removebg-preview.png'}
                    alt={'icon'}
                    height={25}
                    width={25}
                    className={"rounded-3xl"}
                />

                <div className="flex gap-5">


                    <Link href={"/home"}>
                        <div className={"text-md font-semibold flex items-center gap-1"}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={"h-3"}
                                 viewBox="0 0 576 512">
                                <path
                                    d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                            </svg>
                            Home
                        </div>
                    </Link>

                    <Link href={"/bookings"}>
                        <div className={"text-md font-semibold flex items-center gap-1"}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={"h-3"}
                                 viewBox="0 0 576 512">
                                <path
                                    d="M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z"/>
                            </svg>
                            Bookings
                        </div>
                    </Link>
                </div>
                {/*<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">*/}
                {/*    Vogue Visit*/}
                {/*</h4>*/}

            </div>
            {/*<Input type="text" className={"max-w-sm"} placeholder="Search Salon..."/>*/}
            <div className={"flex gap-10 items-center text-md flex-wrap"}>


                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline"
                                className={"py-5 flex gap-2 justify-around p-5 bg-transparent text-white"}
                                size="default">
                            <Avatar className={"scale-75"}>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h5 className={"text-black"}>Derick Ferdinands</h5>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={"w-full"} align="end">

                        <DropdownMenuItem>
                            <Link className={"flex gap-3 items-center"} href={"/account"}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="12" viewBox="0 0 448 512">
                                    <path fill="#191919"
                                          d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                                </svg>

                                Account</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link className={"flex gap-3 items-center"} href={"/login"}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512">
                                    <path fill="#191919"
                                          d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
                                </svg>
                                Sign Out</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link className={"flex gap-3 items-center"} href={"/settings"}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14"
                                     viewBox="0 0 512 512">{/*<!--!Font Awesome Free 6.5.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->*/}
                                    <path fill="#191919"
                                          d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>
                                </svg>
                                Settings</Link>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>


        </div>
    );
};

export default Nav;
