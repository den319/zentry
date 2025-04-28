import About from "@/components/home/about";
import HomeComponent from "../components/home";
import Feature from "@/components/home/feature";
import Story from "@/components/home/story";
import Contact from "@/components/home/contact";

export default function Home() {
  return (
    <>
      <HomeComponent />
      <About />
      <Feature />
      <Story />
      <Contact />
    </>
  );
}
