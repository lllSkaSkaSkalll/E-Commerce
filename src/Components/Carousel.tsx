import { ArrowFatLinesRight } from "@phosphor-icons/react";
import { useState } from "react";

const Carousel = ({ children: banner }: { children: React.ReactNode[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? banner?.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === banner?.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="overflow-hidden relative group/banner">
            <div className="flex transition-transform ease-in-out duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {banner}
            </div>
            <div className="group-hover/banner:opacity-100 opacity-0 duration-300">
                <div className="absolute top-0 bottom-0 left-0 px-3 flex items-center justify-center bg-white/60">
                    <button onClick={handlePrev} className="border-[3px] border-black rounded-lg hover:bg-yellow-500 bg-white/50 p-1">
                        <ArrowFatLinesRight size={32} className="rotate-180" />
                    </button>
                </div>
                <div className="absolute top-0 bottom-0 right-0 px-3 flex items-center justify-center bg-white/60">
                    <button onClick={handleNext} className="border-[3px] border-black rounded-lg hover:bg-yellow-500 bg-white/50 p-1">
                        <ArrowFatLinesRight size={32} />
                    </button>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 py-5 flex items-center justify-center gap-5 z-10">
                {banner?.map((_, index) => (
                    <div key={index} className={`w-3 h-3 rounded-full cursor-pointer ${currentIndex === index ? "bg-black" : "bg-white/50"}`} onClick={() => setCurrentIndex(index)}></div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
