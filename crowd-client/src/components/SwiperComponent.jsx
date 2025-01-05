import { useRef, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { WalletContext } from "../ContextAPI/walletContext";

function SwiperComponent() {
  const swiperRef = useRef(null);
  const { account } = useContext(WalletContext);
  const [campaignDetails, setCampaignDetails] = useState("");
  const [errors, setErrors] = useState({});
  const [campaignTitle, setCampaignTitle] = useState("");

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const title = campaignTitle;
    const description = campaignDetails;
    const deadline = formData.get("campaignDeadline");
    const goal = formData.get("campaignGoal");
    const imageFile = formData.get("campaignImage");

    const errors = {};
    if (!title) {
      errors.title = "Campaign title is required";
    }
    if (!description) {
      errors.description = "Campaign description is required";
    }
    if (!deadline) {
      errors.deadline = "Campaign deadline is required";
    }
    if (!goal) {
      errors.goal = "Campaign goal is required";
    }
    if (!imageFile) {
      errors.imageFile = "Campaign image is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const newCampaign = {
      title,
      owner: "Owner Name",
      account,
      description,
      deadline,
      walletId: account,
      goal,
      amount: "0.00",
      donations: 0,
      progress: 0,
    };

    if (imageFile) {
      newCampaign.image = imageFile;
    }

    const campaignFormData = new FormData();
    campaignFormData.append("title", title);
    campaignFormData.append("owner", "Owner Name");
    campaignFormData.append("walletId", account);
    campaignFormData.append("description", description);
    campaignFormData.append("deadline", deadline);
    campaignFormData.append("goal", goal);
    campaignFormData.append("amount", "0.00");
    campaignFormData.append("donations", 0);
    campaignFormData.append("progress", 0);

    if (imageFile) {
      campaignFormData.append("image", imageFile);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/campaigns",
        campaignFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Campaign created:", response.data);
      alert("Campaign created successfully!");
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  return (
    <Swiper
      style={{ width: "auto", height: "600px" }}
      spaceBetween={50}
      slidesPerView={1}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
    >
      <SwiperSlide className="d-flex flex-column justify-content-center align-items-center bg-light border p-4 rounded-0">
        <div className="text-center">
          <h3>1. Tell about your campaign</h3>
          <p className="text-muted">What is it about your campaign?</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <label>Your campaign title</label>
            <input
              type="text"
              name="campaignTitle"
              placeholder="Write your beautiful title here"
              value={campaignTitle}
              onChange={(event) => setCampaignTitle(event.target.value)}
              required
            />
            {errors.title && <div className="text-danger">{errors.title}</div>}
          </div>
          <div className="mb-3">
            <ReactQuill
              value={campaignDetails}
              onChange={setCampaignDetails}
              placeholder="Describe your campaign here"
            />
            {errors.description && <div className="text-danger">{errors.description}</div>}
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleNext}
          >
            Next
          </button>
        </form>
      </SwiperSlide>

      <SwiperSlide className="d-flex flex-column justify-content-center align-items-center bg-light border p-4 rounded-0">
        <div className="text-center">
          <h3>2. Give more details</h3>
          <p className="text-muted">Provide specific details about your campaign.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <label>Create a deadline for your campaign</label>
            <input
              type="date"
              name="campaignDeadline"
              placeholder="dd/mm/yyyy"
              required
            />
            {errors.deadline && <div className="text-danger">{errors.deadline}</div>}
          </div>
          <div className="mb-3">
            <label>Goal</label>
            <input
              type="number"
              name="campaignGoal"
              placeholder="e.g., $10,000"
              required
            />
            {errors.goal && <div className="text-danger">{errors.goal}</div>}
          </div>
          <div className="mb-3">
            <label>Upload a beautiful cover image</label>
            <div
              style={{
                border: "2px dashed #ccc",
                padding: "20px",
                borderRadius: "8px",
                textAlign: "center",
                backgroundColor: "#f9f9f9",
                cursor: "pointer",
              }}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <p style={{ margin: 0 }}>
                Click to upload or drag and drop your image here.
                <br />
                <small>SVG, PNG, JPG, GIF (max. 1MB)</small>
              </p>
            </div>
            <input
              id="fileInput"
              type="file"
              name="campaignImage"
              accept=".svg, .png, .jpg, .jpeg, .gif"
              style={{ display: "none" }}
            />
            {errors.imageFile && <div className="text-danger">{errors.imageFile}</div>}
          </div>
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={handlePrev}
          >
            Previous
          </button>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </SwiperSlide>
    </Swiper>
  );
}

export default SwiperComponent;

