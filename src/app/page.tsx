"use client";

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import Image from "next/image";
import { useEffect } from "react";
import youtubeDl from "youtube-dl-exec";

export default function Home() {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
    };
    return (
        <BackgroundBeamsWithCollision className="justify-center items-center">
            {/* <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
                What&apos;s cooler than Beams?{" "}
                <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                    <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                        <span className="">Exploding beams.</span>
                    </div>
                    <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                        <span className="">Exploding beams.</span>
                    </div>
                </div>
            </h2> */}
            <div className="h-40 sm:w-[70vw] md:w-[50vw] w-[80vw] flex flex-col justify-center  items-center px-4 -mt-20">
                <h2 className="mb-10 text-3xl md:text-5xl text-center sm:text-4xl dark:text-white text-black">
                    Input the Link
                </h2>
                <PlaceholdersAndVanishInput
                    // placeholders={placeholders}
                    onChange={handleChange}
                    onSubmit={onSubmit}
                />
            </div>
        </BackgroundBeamsWithCollision>
    );
}
