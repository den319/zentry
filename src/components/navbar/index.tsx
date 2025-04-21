"use client"

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Button from "../common/button";
import { TiLocationArrow } from "react-icons/ti";
import { navItems } from "@/const";
import { TbArrowBadgeDown, TbArrowBadgeDownFilled } from "react-icons/tb";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const Navbar= () => {

    const [isAudioPlaying, setAudioState]= useState(false);
    const [isIndicatorActive, setIndicatorState]= useState(false);
    const [lastScrollY, setLastScrollY]= useState(0);
    const [isNaveVisible, setNavVisible]= useState(true);

    const navRef= useRef<HTMLDivElement | any>(undefined);
    const audioRef= useRef<HTMLAudioElement | any>(undefined);

    const {y: currentScrollY}= useWindowScroll();


    const toggleAudio= () => {
        setAudioState((prev:boolean) => !prev);
        setIndicatorState((prev:boolean) => !prev);
    }

    useEffect(() => {
        if(currentScrollY === 0) {
            setNavVisible(true);
            navRef.current.classList.remove('floating-nav');
        } else if(currentScrollY > lastScrollY) {
            setNavVisible(false);
            navRef.current.classList.add('floating-nav');
        } else if(currentScrollY < lastScrollY){
            setNavVisible(true);
            navRef.current.classList.add('floating-nav');
        }

        setLastScrollY(currentScrollY); 
    }, [currentScrollY, lastScrollY]);

    useEffect(() => {
        gsap.to(navRef.current, {
            y:isNaveVisible ? 0 : -100,
            opacity: isNaveVisible ? 1 : 0,
            duration:0.2,
        })
    }, [isNaveVisible])

    useEffect(() => {
        if(window != undefined && document != undefined && audioRef?.current) {
            if(isAudioPlaying) {
                audioRef?.current?.play();
            } else {
                audioRef?.current?.pause();
            }
        }
    }, [isAudioPlaying])

    return (
        <div
            ref={navRef} 
            className="text-white fixed inset-x-0 top-4 z-50 h-20 border-none transition-all duration-700 sm:inset-x-6"
        >
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between py-8 pr-4">
                    <div className="flex items-center gap-7">
                        <img 
                            src="/img/logo/logo_white.png" 
                            alt="logo"
                            className="w-20"
                        />

                        <Button
                            id="product-button"
                            title="Products"
                            rightIcon={<TbArrowBadgeDownFilled className="ml-2" size={20} />} 
                            textClass=""
                            containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1 py-2 px-4"   
                        >
                        </Button>
                    </div>

                    <div className="flex h-full items-center">
                        <div className="hidden md:block">
                            {
                                navItems.map((item:string) => (
                                    <a 
                                        key={item} 
                                        href={`#${item.toLowerCase()}`}
                                        className="nav-hover-btn"    
                                    >
                                        {item}
                                    </a>
                                ))
                            }
                        </div>

                        <button
                            className="ml-10 flex items-center space-x-0.5"   
                            onClick={toggleAudio} 
                        >
                            <audio
                                ref={audioRef}
                                className="hidden "
                                src="/audio/loop.mp3"
                                loop  
                                muted={isAudioPlaying ? false : true}                          
                            />
                            {
                                [1,2,3,4].map((bar:number) => (
                                    <div 
                                        key={bar} 
                                        className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
                                        style={{animationDelay: `${bar * 0.3}s`}}
                                    > 
                                    </div>
                                ))
                            }
                        </button>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar;