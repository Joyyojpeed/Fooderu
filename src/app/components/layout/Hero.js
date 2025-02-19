import Image from "next/image"
import Right from "./icons/Right"
export default function Hero(){
    return(
        <section className="hero mt-4">
            <div className="py-12">

            <h1 className="text-4xl font-semibold">
                Delicious&nbsp; 
                <span className="text-primary">
                Food&nbsp;<br />
                </span>
                is the Answer!
            </h1>

            <p className="mt-4 text-gray-500 text-sm my-6">
                Every bite you have takes you to the experience 
                of the whole world around you just sitting
                at your sofa.
            </p>

            <div className="flex gap-4 text-sm py-5">
               <button className="flex justify-center bg-primary text-white flex items-center gap-2
               px-4 py-2 rounded-full ">
                ORDER NOW
                <Right />
                </button>
               <button className="flex items-center border-0 gap-3 py-2 text-gray-600 font-semibold">
                Learn More
                <Right />
               </button> 
            </div>

            </div>
            
                <div className="relative" >
                <Image src={'/FinalFood.jpg'} layout={'fill'}
                 objectFit={'contain'} alt ={'pizza'} />
                </div>
                
        </section>
    )
}