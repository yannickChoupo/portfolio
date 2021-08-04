import {useSelector} from "react-redux";
import $ from 'jquery'
export const Logo = () => {
    const {isLoading} = useSelector(state => state.request);
    // const lineStyle = isLoading ? {"animation-name": "fade"} : {};
    if(isLoading){
        console.log("LOG************************************");
            $(".line").toggleClass("fade");
    }else{
        $(".line").removeClass("fade");
    }
    return (
        <>
            <div className="logo">
                <div className="logo__container">
                    <div className="logo__circle">
                        <div className={`logo__cube`}>
                            <div line="1" className={`line`}/>
                            <div line="2" className={`line`}/>
                            <div line="3" className={`line`}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
