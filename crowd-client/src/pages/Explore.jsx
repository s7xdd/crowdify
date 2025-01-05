import CampaignCard from "../components/CampaignCard";

function Explore() {
    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            {/* Background Container with Blur */}
            <div className=" blur-bg" >
                <div className="container py-5">
                    <div className="d-flex flex-column align-items-center">
                        <h4 className="text-dark">Explore</h4>
                        <p className="text-muted">Where do you want to help</p>
                    

                        <CampaignCard />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Explore;

