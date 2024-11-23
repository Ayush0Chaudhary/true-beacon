import { ReactPortal } from "../react-portal";
import { Skeleton } from "./skeleton";

const Loader = () => {
    return (

        <>
            <ReactPortal>
                <Skeleton className="w-[300px] h-[30px] rounded-full m-2" />
                <Skeleton className="w-[250px] h-[30px] rounded-full m-2" />
            </ReactPortal>
        </>
    );

}



export default Loader; 