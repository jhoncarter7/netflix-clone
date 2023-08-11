import React from "react";

interface MobileMenuProps{
    visible?: Boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({visible}) =>{
if(!visible){
    return null;
}
return(
    <div className="w-56 bg-black absolute top-8 left-8 py-5 flex-col border-2 border-gray-800 flex">
        <div className="flex flex-col gap-4">
            <div className="px-3 text-center text-white hover:underline">
                Home
            </div>
            <div className="px-3 text-center text-white hover:underline">
            Series
            </div>
            <div className="px-3 text-center text-white hover:underline">
            Film
            </div>
            <div className="px-3 text-center text-white hover:underline">
                Anime
            </div>
            <div className="px-3 text-center text-white hover:underline">
            New & Popular
            </div>
            <div className="px-3 text-center text-white hover:underline">
            My List
            </div>
            <div className="px-3 text-center text-white hover:underline">
            Brows By Languages
            </div>
        </div>
    </div>
)
}

export default MobileMenu