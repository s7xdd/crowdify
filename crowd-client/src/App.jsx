import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Explore from "./pages/Explore";
import CampaignPage from "./pages/CampaignPage";
import ProfilePage from "./pages/ProfilePage";
import Nav from "./components/Nav";
import MyCampaignsPage from "./pages/MyCampaignsPage";

function App() {

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/campaigns" element={<CampaignPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-campaign" element={<MyCampaignsPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

