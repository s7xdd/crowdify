import SwiperComponent from "../components/SwiperComponent";
import img from "../assets/29f04f1f9c7291186775a7121672b510.png";
import Highlight from "../components/Highlight";
import { Link } from "react-router-dom";

function CampaignPage() {
    return (
        <div style={{ minHeight: "100vh" }}>
            <div className="container  ">
            <div className="container d-flex mt-5 ms-4 justify-content-end  pb-2">
                 <Link to="/my-campaign"><button className="btn btn-success">My Campaign</button></Link>
                
            </div>
                <div className="row gap-0  pt-2 align-items-center justify-content-center">
                    {/* Swiper Component */}
                    <div className="col-md-6">
                        <SwiperComponent />
                    </div>

                    {/* Background Image Section */}
                    <div
                        className="col-md-6 d-flex align-items-center justify-content-center text-center"
                        style={{
                            backgroundImage: `url(${img})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            height: "600px",
                        }}
                    >
                        <div style={{}}>
                            <Highlight className="text-dark"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CampaignPage;
