import { NavLink } from "react-router-dom";
import ecoImg from "../assets/model-removebg.png";
import { useEffect, useState } from "react";
import About from "./About";
import Services from "../components/Services";
import Trusted from "../components/Trusted";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

const Home = () => {

  const[istoggle, setIstoggle] = useState(false)

    useEffect(() => {
      const handleScroll = () => {
        const scrolled = window.scrollY < 600
        setIstoggle(prev => (prev === scrolled ? prev : scrolled))
      }
      window.addEventListener("scroll", handleScroll)
        handleScroll()

        return () => {
          window.removeEventListener("scroll", handleScroll)
        }
    }, [])

  return (
<>
    <HeroSection istoggle={istoggle} ecoImg = {ecoImg}/>
    
      <Services/>
      <Trusted/>
      <Footer/>
    </>
  );
};

export default Home;