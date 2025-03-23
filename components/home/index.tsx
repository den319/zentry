"use client"

import { useRef, useState } from "react";

export default function HomeComponent() {
    const [currIdx, setCurrIdx]= useState<number>(1);
    const [hasClicked, setHasClicked]= useState<boolean>(false);
    const [loading, setLoading]= useState<boolean>(true);
    const [loadedVideo, setLoadedVideo]= useState<number>(0);

    const totalVideo= 4;
    const nextVideoRef= useRef(null);

    let upcomingVideoIdx= (currIdx % totalVideo) + 1;

    function handleMiniClick() {
        setHasClicked(true);
        setCurrIdx(upcomingVideoIdx);
    }

    function getVideoSrc(index:number) {
        return `/videos/hero-${index}.mp4`;
    }

    function handleVideoLoad() {
        setLoadedVideo((prev:number) => prev + 1);
    }

    console.log({currIdx, upcomingVideoIdx})
     
    return (
        <div className="relative min-h-screen w-screen overflow-x-hidden">
            <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
                <div>
                    <div className="mask-clip-path absolute-center absolute z-50 size-64
                        cursor-pointer overflow-hidden rounded-lg">
                        <div onClick={handleMiniClick} 
                            className="origin-center scale-50 opacity-0 transition-all
                                duration-500 ease-in hover:scale-100 hover:opacity-100">
                            <video ref={nextVideoRef}
                                src={getVideoSrc(upcomingVideoIdx)}
                                loop
                                muted
                                id="current-video"
                                className="size-64 origin-center scale-150 object-cover object-center"
                                onLoadedData={handleVideoLoad} 
                            ></video>
                        </div>
                    </div>

                    <video
                        ref={nextVideoRef}
                        src={getVideoSrc(currIdx)}
                        loop
                        muted
                        id="next-video"
                        className="absolute-center invisible absolute z-20 size-64 
                            object-cover object-center"
                        onLoadedData={handleVideoLoad} 
                    />

                    <video
                        src={getVideoSrc(currIdx === totalVideo + 1 ? 1 : currIdx)}
                        autoPlay
                        loop
                        muted
                        className="absolute left-0 top-0
                            object-cover object-center"
                        onLoadedData={handleVideoLoad} 
                    />

                </div>

            </div>
        </div>
    );
  }
  