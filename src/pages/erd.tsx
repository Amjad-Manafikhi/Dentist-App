import ERDImage from './../../public/ERD_Image.png';
import Image from 'next/image'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function Erd(){


    return (
        <div className=" flex items-center justify-center w-screen h-screen flex-col">
            <div className='border border-gray-400 rounded-md max-w-[800px] overflow-auto'>
            <h1 className='text-gray-400 ml-2'>the image is zoomable</h1>

                <TransformWrapper >
                    <TransformComponent>
                        <Image src={ERDImage} alt="ERD-Image" width={800} height={800} />
                    </TransformComponent>
                </TransformWrapper>
            </div>

        </div>
    )
}