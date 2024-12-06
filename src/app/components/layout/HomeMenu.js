import Image from "next/image";
import MenuItem from "./Menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
export default function HomeMenu(){
    return(
    <section className="">

    <div className="absolute left-0 right-0 
    justify-start">

        <div className="absolute left-0 -top-[140px] -z-10 text-left">
        <Image src ={'/FinalSalad.png'} width={170} height={190} 
        alt={'bro1'} />
        </div>

        <div className="absolute -top-36    right-0">
        <Image src ={'/Foood-PNG.png'} width={160} height={195} alt={'bro2'} />
        </div>
    </div>

        <div className="text-center mb-6">

        <SectionHeaders 
        subHeader = {'check out'}
        mainHeader= {'Menu'}>

        </SectionHeaders>
        </div>
        <div className="grid grid-cols-3 gap-4">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        </div>
    
    </section>
    );
}