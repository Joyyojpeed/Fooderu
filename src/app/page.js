
import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import HomeMenu from "./components/layout/HomeMenu";
import SectionHeaders from "./components/layout/SectionHeaders";


export default function Home() {
  return (
    <>
      
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders 
        subHeader={'Our Story'}
        mainHeader={'About us'}/>
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex
        flex-col gap-4">
        <p >
        This project is a modern web application designed to simplify and enhance the food ordering experience.
        Built using cutting-edge technologies like React and Next.js 14, the platform offers a sleek, responsive interface that 
        seamlessly adapts to any device. 
        </p>
        <p>
        This project is a modern web application designed to simplify and enhance the food ordering experience.
        Built using cutting-edge technologies  
        </p>
        <p>
        This project is a modern web application designed to simplify and enhance the food ordering experience.
         
        </p>
        </div>
       
      </section>
      <section className="text-center my-8">
        <SectionHeaders subHeader={'Don\'t hesitate'}
                        mainHeader={'Contact us'}>

        </SectionHeaders>
        <div className="mt-8">

        
        <a className="text-4xl" href="tel:+917596923557">
        +91 7596 9235 57
        </a>
        </div>
      </section>

    </>
    
  );
    

}
