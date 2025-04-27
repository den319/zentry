"use client"

import React, { ReactNode, useRef, useState } from "react";


interface BentoCardProps {
    src?: string;
    title?: ReactNode;
    description?: string;
    isComingSoon?: boolean;
}

interface BentoTiltProps {
    children?:ReactNode;
    className?: string;
}

const BentoTilt= ({children, className}:BentoTiltProps) => {

    const [transformStyle, setTransformStyle]= useState("");

    const itemRef= useRef<HTMLDivElement>(null);

    const handleMouseMove= (e: React.MouseEvent) => {
        // console.log("bento started: ", itemRef.current);
        if(!itemRef.current) return;

        // console.log("item-ref is object");
        const {left, top, width, height}= itemRef.current.getBoundingClientRect();

        // console.log(left, top, width, height, e.clientX, e.clientY);

        const relativeX= (e.clientX - left) / width;

        const relativeY= (e.clientY - top) / height;

        const tiltX= (relativeY - 0.5) * 9;
        const tiltY= (relativeX - 0.5) * -9;

        const newTransform= `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.96, 0.96, 0.96)`;


        setTransformStyle(newTransform);
    }

    const handleMouseLeave= () => {
        setTransformStyle("");
    }

    console
    return(
        <div 
            ref={itemRef}
            className={className}
            style={{transform: transformStyle}}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    )
}
const BentoCard= ({src, title, description, isComingSoon}:BentoCardProps) => {
    return (
        <div className="relative size-full">
            <video
                src={src}
                loop
                muted
                autoPlay
                className="absolute left-0 top-0 size-full object-cover object-center"
            />

            <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
                <div>
                    <h1 className="bento-title special-font">
                        {title}
                    </h1>
                    {
                        description &&
                        <p className="mt-3 max-w-64 text-xs md:text-base">
                            {description}
                        </p>
                    }
                </div>
            </div>
        </div>
    )
}

const Feature= () => {
    return (
        <section className="bg-black pb-52">
            <div className="container mx-auto px-3 md:px-10">
                <div className="px-5 py-32">
                    <p className="font-circular-web text-lg text-blue-50">
                        Explore the Zentry Universe
                    </p>
                </div>

                <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
                    Immerse yourself in an IP-rich product universe where players, 
                    agentic AI and blockchain lead the new economic paradigm.
                </p>

                <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
                    <BentoCard
                        src="/videos/feature-1.mp4"
                        title={<>radia<b>n</b>t</>}
                        description="The game of games app transforming moments across 
                            Web2 & Web3 titles into rewards"
                        isComingSoon= {true}
                    />
                </BentoTilt>

                <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
                    <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
                        <BentoCard
                            src="/videos/feature-2.mp4"
                            title={<>zig<b>m</b>a</>}
                            description="The NFT collection merging Zentry’s IP, 
                                AI, and gaming—pushing the boundaries of NFT 
                                innovation."
                            isComingSoon={true}
                        />
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
                        <BentoCard
                            src="/videos/feature-3.mp4"
                            title={<>n<b>e</b>xus</>}
                            description="The metagame portal uniting humans & AI to 
                                play, compete and earn"
                            isComingSoon={true}
                        />
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 sm:me-0">
                        <BentoCard
                            src="/videos/feature-4.mp4"
                            title={<>az<b>u</b>l</>}
                            description="The agent of agents elevating agentic AI 
                                experience to be more fun and productive. "
                            isComingSoon={true}
                        />
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_2 md:col-span-1">
                        <div className="flex size-full flex-col 
                            justify-between bg-violet-300 p-4">
                            <h1 className="bento-title special-font max-w-64 text-black">
                                M<b>o</b>re co<b>m</b>ing s<b>o</b>on. 
                            </h1>

                            <div className="w-20 h-20 ml-8 self-end">
                                <img
                                    src="/img/logo/logo_black.png"
                                    alt="logo"
                                />
                            </div>
                        </div>  
                    </BentoTilt>
                    <BentoTilt className="bento-tilt_2 md:col-span-1">
                        <video
                            src="/videos/feature-5.mp4"
                            loop
                            muted
                            autoPlay
                            className="size-full object-cover object-center"
                        />
                    </BentoTilt>  
                </div>
            </div>

        </section>
    )
}

export default Feature;