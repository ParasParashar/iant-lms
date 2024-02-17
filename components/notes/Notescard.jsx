"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { HiDotsVertical } from "react-icons/hi"
import { FaRegBookmark } from "react-icons/fa"
import Preview from "../shared/Preview";
const Notescard = ({ noteid, time, content, ispublished, title }) => {

    console.log(title, content ,time, "title")
    return (

        <Card className="w-[210px] h-[250px]  px-2 gap-2 flex flex-col py-1 justify-around m-1"  >
            <CardHeader className="p-0">
                <div className=" flex justify-between items-center">
                    <FaRegBookmark size={18} />
                    <div>
                        <HiDotsVertical size={18} />
                    </div>
                </div>
            </CardHeader>
            {/* <CardContent className="m-0 p-1 rounded-md h-[px]  shadow-md text-[14px] "> */}
                {/* {content} */}
                <Preview value={content}/>
            {/* </CardContent> */}
            <CardTitle className="m-0 mt-2">
                <p className=" font-normal text-[20px]">
                    <span className="font-semibold">Title</span> - {title}
                </p>
            </CardTitle>
            <CardFooter className="flex flex-col gap-2 items-start p-0 leading-none">
                <div className="text-[16px]">
                    By-alok singh
                </div>
                <div className=" text-[12px]">
                    {new Date(time).toTimeString()}
                </div>
            </CardFooter>
        </Card>
    )
}

export default Notescard