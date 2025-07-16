// import CameraUtil from "@/utils/cameraUtil";
import InterviewInfo from "./interviewInfo";
import UserProfile from "./userProfile";

export default function InfoSection(){
    return(
        <div className="text-black dark:text-white">
            {/* <CameraUtil/> */}
            <InterviewInfo/>
            <UserProfile/>
        </div>
    )
}