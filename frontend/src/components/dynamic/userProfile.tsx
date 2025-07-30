import CameraUtil from "@/utils/cameraUtil";

export default function UserProfile(){

    return(
        <div className="flex flex-col justify-center h-[50vh] items-center">
            <div className=" w-[80%] h-60">
                <CameraUtil/>
            </div>
            <h2 className="m-1"><span className="font-bold">User CAM</span></h2>
        </div>
    )
}