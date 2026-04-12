import { NavLink } from "react-router-dom"


const HeroSection = ({istoggle, ecoImg}) => {
  return (
    <>
     <section className="bg-green-500 border border-green-500">
      <div className={`grid grid-cols-1 md:grid-cols-[auto_auto] items-center justify-center gap-6 md:gap-50 px-6 py-10 transition-all duration-1000 ${istoggle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

      {/* Text */}
      <div className="flex gap-5 flex-col max-w-md text-center md:text-left justify-center items-center md:items-start">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight">
          Let's Buy Some Great Stuff
        </h1>

        <p className="text-green-200 text-sm sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas asperiores quo sapiente ipsum incidunt. Numquam nulla aut tempora dolor totam.
        </p>
        <NavLink to= "/product" className=" bg-black text-white w-50 p-3 border border-black rounded-3xl text-center hover:text-shadow-lg/50">Explore Products

        </NavLink>
      </div>

      {/* Image */}
      <div className="flex justify-center">
        <img 
          src={ecoImg} 
          alt="eco" 
          className="w-auto h-150 object-contain drop-shadow-2xl/50 drop-shadow-white"
        />
      </div>
         
      </div>
    </section> 
    </>
  )
}

export default HeroSection
