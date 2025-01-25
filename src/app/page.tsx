"use client";

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useState } from "react";
import youtubeDl from "youtube-dl-exec";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/ui/loader";
export default function Home() {
    const [url, setUrl] = useState("");
    const [isDownloading, setIsDownloading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const downloadSong = async (url: string) => {
        try {
            setIsDownloading(true);

            const response = await fetch("/api/download", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Download failed");
            }

            const result = await response.json();

            if (result.success) {
                setResult(result.data);
                // console.log("Download completed:", result.data);
            } else {
                throw new Error(result.error || "Download failed");
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Download failed";
            toast.error(errorMessage); // Display error as a pop-up
        } finally {
            setIsDownloading(false);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResult(null);
        if (!url) {
            toast.error("Please enter a valid URL");
            return;
        }
        await downloadSong(url);
    };

    return (
        <BackgroundBeamsWithCollision className="justify-center items-center">
            <div className="h-40 sm:w-[70vw] md:w-[50vw] w-[80vw] flex flex-col justify-center  items-center px-4 -mt-20">
                <h2 className="mb-10 text-3xl md:text-5xl text-center sm:text-4xl dark:text-white text-black">
                    Input the Link
                </h2>
                <PlaceholdersAndVanishInput
                    onChange={handleChange}
                    onSubmit={onSubmit}
                />

                {isDownloading && !result ? (
                    <Loader className="translate-y-12" />
                ) : result ? (
                    <div className="w-full rounded-full h-10 translate-y-10 justify-center items-center flex">
                        <p className="ml-4">
                            {result.info.split("\n")[0] +
                                " - " +
                                result.info.split("\n")[1] +
                                " has been downloaded."}
                        </p>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
            <ToastContainer position="top-right" autoClose={5000} />
        </BackgroundBeamsWithCollision>
    );
}
