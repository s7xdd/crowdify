import { useRef, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Form from "react-bootstrap/Form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { WalletContext } from "../ContextAPI/walletContext";

function SwiperComponent() {
  const swiperRef = useRef(null);
  const { account } = useContext(WalletContext); // Get account from context
  const [campaignDetails, setCampaignDetails] = useState("");
  const [errors, setErrors] = useState({});
  const [campaignTitle, setCampaignTitle] = useState(""); // New state for campaign title

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const title = campaignTitle; // Use the campaign title state
    const description = campaignDetails; 
    const deadline = formData.get("campaignDeadline");
    const goal = formData.get("campaignGoal");
    const imageFile = formData.get("campaignImage");

    // Validation errors
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
      errors.goal = "Campaign goal is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Prepare the data to send
    const newCampaign = {
      title,
      owner: "Owner Name", // You can dynamically set this from user data
      account,
      description,
      deadline,
      walletId: account,
      goal,
      amount: "€0.00",
      donations: 0,
      progress: 0,
    };

    // Add the image file if it exists
    if (imageFile) {
      newCampaign.image = imageFile;
    }

    // Use FormData to append campaign details and image
    const campaignFormData = new FormData();
    campaignFormData.append("title", title);
    campaignFormData.append("owner", "Owner Name");
    campaignFormData.append("walletId", account);
    campaignFormData.append("description", description);
    campaignFormData.append("deadline", deadline);
    campaignFormData.append("goal", goal);
    campaignFormData.append("amount", "€0.00");
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

      // Redirect or notify the user about successful campaign creation
      // router.push("/campaigns"); // Example redirect after success
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
      {/* Slide 1 */}
      <SwiperSlide className="d-flex flex-column justify-content-center align-items-center bg-light border p-4 rounded-0">
        <div className="text-center">
          <h3>1. Tell about your campaign</h3>
          <p className="text-muted">What is it about your campaign?</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <Form.Group className="mb-3">
            <Form.Label>Your campaign title</Form.Label>
            <Form.Control
              type="text"
              name="campaignTitle"
              placeholder="Write your beautiful title here"
              value={campaignTitle}
              onChange={(event) => setCampaignTitle(event.target.value)}
              required
            />
            {errors.title && <div className="text-danger">{errors.title}</div>}
          </Form.Group>
          <Form.Group className="mb-3">
            <ReactQuill
              value={campaignDetails}
              onChange={setCampaignDetails}
              placeholder="Describe your campaign here"
            />
            {errors.description && <div className="text-danger">{errors.description}</div>}
          </Form.Group>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleNext}
          >
            Next
          </button>
        </form>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide className="d-flex flex-column justify-content-center align-items-center bg-light border p-4 rounded-0">
        <div className="text-center">
          <h3>2. Give more details</h3>
          <p className="text-muted">Provide specific details about your campaign.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <Form.Group className="mb-3">
            <Form.Label>Create a deadline for your campaign</Form.Label>
            <Form.Control
              type="date"
              name="campaignDeadline"
              placeholder="dd/mm/yyyy"
              required
            />
            {errors.deadline && <div className="text-danger">{errors.deadline}</div>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Goal</Form.Label>
            <Form.Control
              type="number"
              name="campaignGoal"
              placeholder="e.g., $10,000"
              required
            />
            {errors.goal && <div className="text-danger">{errors.goal}</div>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Upload a beautiful cover image</Form.Label>
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
            <Form.Control
              id="fileInput"
              type="file"
              name="campaignImage"
              accept=".svg, .png, .jpg, .jpeg, .gif"
              style={{ display: "none" }}
            />
            {errors.imageFile && <div className="text-danger">{errors.imageFile}</div>}
          </Form.Group>
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


