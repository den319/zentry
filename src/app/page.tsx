"use client";

import About from "@/components/home/about";
import HomeComponent from "../components/home";
import Feature from "@/components/home/feature";
import Story from "@/components/home/story";
import Contact from "@/components/home/contact";
import { HomeContext } from "@/providers/homeContext";
import Loader from "@/components/common/loader";

export default function Home() {
  const {loading} = HomeContext();
  
  return (
    loading ? 
    <Loader />
    :
      <>
        <HomeComponent />
        <About />
        <Feature />
        <Story />
        <Contact />
      </>
  );
}
