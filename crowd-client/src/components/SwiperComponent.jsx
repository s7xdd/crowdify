import { useRef, useState } from "react";
import { campaigns, myActivity, users } from "../../public/data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Form from "react-bootstrap/Form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function SwiperComponent() {
  const swiperRef = useRef(null);

  const [campaignDetails, setCampaignDetails] = useState(""); // State for React-Quill
  const [errors, setErrors] = useState({}); // State for error messages

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
  
    const title = formData.get("campaignTitle");
    const description = campaignDetails; // React-Quill content
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
  
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
  
    const newCampaign = {
      id: campaigns.length + 1,
      title,
      owner: users[0].firstName,
      walletId: users[0].walletId,
    //   image: imageFile ? URL.createObjectURL(imageFile) : null,
      description,
      amount: "€0.00",
      donations: 0,
      progress: 0,
    };
  
    campaigns.push(newCampaign);
    myActivity.push({
      id: myActivity.length + 1,
      user: users[0].firstName,
      description: `Funded ${title} with $0.00 ETH`,
      amount: "$0.00",
    });
  
    if (!Array.isArray(users[0].campaigns)) {
      users[0].campaigns = [];
    }
    users[0].campaigns.push(newCampaign.id);
  
    const dataString = `export const campaigns = ${JSON.stringify(campaigns, null, 2)};\nexport const myActivity = ${JSON.stringify(myActivity, null, 2)};\nexport const users = ${JSON.stringify(users, null, 2)};`;
    const blob = new Blob([dataString], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.js";
    a.click();
    URL.revokeObjectURL(url);
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

