import React, { useState } from "react";

type imgSliderProps = {
    src: URL[]
}

export function ImageSlider({ src }: imgSliderProps) {
    const [get_index, set_index] = useState(0);


    function nextImg() {
        set_index(x => {
            if (x === src.length - 1) {
                return 0
            }
            return x + 1
        })
    }

    function prevImg() {
        set_index(x => {
            if (x === 0) {
                return src.length - 1
            }
            return x - 1
        })
    }


    return (

        <div className="relative">
            <img src={src ? src[get_index].toString() : ""} className='object-cover w-full h-full' />
            <button className="absolute left-0 top-[50%]" onClick={nextImg}>l</button>
            <button className="absolute right-0 top-[50%]" onClick={prevImg}>r</button>
        </div>

    );


}