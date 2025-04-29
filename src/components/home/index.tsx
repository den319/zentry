"use client"

import { useEffect, useRef, useState } from "react";
import Button from "../common/button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

// const VideoPlayer = dynamic(() => import('../home'), {
//     ssr: false
// })

export default function HomeComponent() {
    const [currIdx, setCurrIdx]= useState<number>(1);
    const [hasClicked, setHasClicked]= useState<boolean>(false);
    const [loading, setLoading]= useState<boolean>(true);
    const [loadedVideo, setLoadedVideo]= useState<number>(0);

    const totalVideo= 4;
    const nextVideoRef = useRef<HTMLVideoElement>(null);

    // let upcomingVideoIdx= (currIdx % totalVideo) + 1;

    const handleVideoLoad= () => {
        setLoadedVideo((prev:number) => {
            console.log("Video loaded, updating count:", prev + 1);
            return prev + 1;
        });
    }

    useEffect(() => {
        console.log("Loaded videos:", loadedVideo);
        if(loadedVideo === totalVideo) {
            setLoading(false);
        }
    }, [loadedVideo, totalVideo]);
    

    function handleMiniClick() {
        console.log("clicked"); 
        setHasClicked(true);
        setCurrIdx((prev: number) => (prev % totalVideo) + 1);
    }

    function getVideoSrc(index:number) {
        return `/videos/hero-${index}.mp4`;
    }



    // console.log({currIdx, upcomingVideoIdx, totalVideo, loadedVideo, loading});

    // Preload all videos on component mount
    useEffect(() => {
        // Create an array of video sources to preload
        const videoSources = Array.from({ length: totalVideo }, (_, i) => getVideoSrc(i + 1));
        
        // Preload each video
        videoSources.forEach(src => {
            const video = document.createElement('video');
            video.src = src;
            video.preload = 'auto';
            
            // Use the loadeddata event
            video.addEventListener('loadeddata', handleVideoLoad);
            
            // Clean up
            return () => {
                video.removeEventListener('loadeddata', handleVideoLoad);
            };
        });
    }, [totalVideo]);


    useGSAP(() => {
        if(hasClicked) {
            const nextVideo:HTMLVideoElement | null= nextVideoRef?.current;

            console.log("next-video: ", nextVideo);

            gsap.set("next-video", {visibility: 'visible'});

            gsap.to('#next-video', {
                transformOrigin: 'center center',
                scale: 1,
                width: '100%',
                height: '100%',
                duration: 1,
                ease: 'power1.inOut',
                onStart: () => {
                    if (nextVideo) {
                      nextVideo.play().catch((err) => {
                        console.warn("Video play failed:", err);
                      });
                    }
                  }
            })

            gsap.from('#current-video', {
                transformOrigin: 'center center',
                scale: 1.5,
                ease: 'power1.inOut',
            })
        }
    }, {dependencies: [currIdx], revertOnUpdate: true});

    useGSAP(() => {
        gsap.set('#video-frame', {
            clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
            borderRadius: '0 0 40% 10%',
        });
        gsap.from('#video-frame', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0 0 0 0',
            ease: 'power1.inOut',
            color: 'black',
            scrollTrigger: {
                trigger: '#video-frame',
                start: 'center center',
                end: 'bottom center',
                scrub: true,
            }
        })
    })
     
    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">
            {
                loading && (
                    <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                        <div className="three-body">
                            <div className="three-body__dot" />
                            <div className="three-body__dot" />
                            <div className="three-body__dot" />
                        </div>
                    </div>
                )
            }
            <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
                <div>
                    <div className="mask-clip-path absolute-center absolute z-50 size-64
                        cursor-pointer overflow-hidden rounded-lg">
                        <div onClick={handleMiniClick} 
                            className="origin-center scale-50 opacity-0 transition-all
                                duration-500 ease-in hover:scale-100 hover:opacity-100">
                            <video ref={nextVideoRef}
                                src={getVideoSrc((currIdx % totalVideo) + 1)}
                                loop    
                                muted
                                preload="auto"
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
                            className="absolute left-0 top-0 size-full
                                object-cover object-center"
                            onLoadedData={handleVideoLoad} 
                        />

                </div>

                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                    G<b>a</b>ming
                </h1>

                <div className="absolute left-0 top-0 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font leading-none hero-heading text-blue-100">
                            redefi<b>n</b>e
                        </h1>

                        <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                            Enter the Metagame Layer <br /> Unleash the Play Economy
                        </p>

                        <Button 
                            id="watch-trailer" 
                            title="Watch Trailer" 
                            leftIcon={<TiLocationArrow size={20} />}
                            containerClass="!bg-yellow-300 flex-center gap-1 z-10" 
                            // textClass="text-black"
                        />
                    </div>
                </div>
            </div>

            <div className="absolute left-0 top-0 size-full">
                <div className="mt-24 px-5 sm:px-10">
                    <h1 className="special-font leading-none hero-heading text-black">
                        redefi<b>n</b>e
                    </h1>

                    <p className="mb-5 max-w-64 font-robert-regular text-black">
                        Enter the Metagame Layer <br /> Unleash the Play Economy
                    </p>

                    <Button 
                        id="watch-trailer-background" 
                        title="Watch Trailer" 
                        leftIcon={<TiLocationArrow color="white" size={20} />}
                        containerClass="!bg-black flex-center gap-1"
                        textClass="text-white" 
                    />
                </div>
            </div>

            <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
                G<b>A</b>MING
            </h1>
        </div>
    );
  }
  