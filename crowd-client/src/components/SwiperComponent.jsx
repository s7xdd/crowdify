import { useRef, useState, useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ethers } from "ethers";
import axios from "axios";
import { WalletContext } from "../ContextAPI/walletContext";
import { checkIfImage } from "../utils";
import { StateContextProvider, useStateContext } from "../ContextAPI/web3";

function SwiperComponent() {
  const swiperRef = useRef(null);
  const { publishCampaign, address } = useStateContext();
  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    goal: "",
    image: "",
    target: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("form", form);
  }, [form]);

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleFormFieldChange = (fieldName, value) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { title, description, deadline, goal, image } = form;
    const errors = {};
    if (!title) errors.title = "Campaign title is required";
    if (!description) errors.description = "Campaign description is required";
    if (!deadline) errors.deadline = "Campaign deadline is required";
    if (!goal) errors.goal = "Campaign goal is required";
    if (!image) errors.image = "Campaign image is required";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Check if image URL is valid
    checkIfImage(image, async (exists) => {
      if (!exists) {
        setErrors({ image: "Provide a valid image URL" });
        return;
      }

      try {
        setIsLoading(true);

        await publishCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.goal, 18),
          deadline: new Date(form.deadline).getTime() / 1000,
        });

        console.log("Campaign published to blockchain");

        const campaignData = {
          ...form,
          owner: "Owner Name",
          account: address,
          walletId: address,
          amount: "0.00",
          donations: 0,
          progress: 0,
        };

        const response = await axios.post(
          "http://localhost:5000/api/campaigns",
          campaignData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Campaign saved to backend:", response.data);

        alert("Campaign created successfully!");
        setIsLoading(false);
      } catch (error) {
        console.error("Error creating campaign:", error);
        alert("Failed to create the campaign. Please try again.");
        setIsLoading(false);
      }
    });
  };

  return (
    <Swiper
      style={{ width: "auto", height: "600px" }}
      spaceBetween={50}
      slidesPerView={1}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
    >
      {/* Step 1 */}
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
              name="title"
              placeholder="Write your beautiful title here"
              value={form.title}
              onChange={(event) =>
                handleFormFieldChange("title", event.target.value)
              }
              required
            />
            {errors.title && <div className="text-danger">{errors.title}</div>}
          </div>
          <div className="mb-3">
            <ReactQuill
              value={form.description}
              onChange={(value) => handleFormFieldChange("description", value)}
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

      {/* Step 2 */}
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
              name="deadline"
              value={form.deadline}
              onChange={(event) =>
                handleFormFieldChange("deadline", event.target.value)
              }
              required
            />
            {errors.deadline && <div className="text-danger">{errors.deadline}</div>}
          </div>
          <div className="mb-3">
            <label>Goal</label>
            <input
              type="number"
              name="goal"
              placeholder="e.g., 10 ETH"
              value={form.goal}
              onChange={(event) =>
                handleFormFieldChange("goal", event.target.value)
              }
              required
            />
            {errors.goal && <div className="text-danger">{errors.goal}</div>}
          </div>
          <div className="mb-3">
            <label>Campaign image</label>
            <input
              type="url"
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={(event) =>
                handleFormFieldChange("image", event.target.value)
              }
              required
            />
            {errors.image && <div className="text-danger">{errors.image}</div>}
          </div>
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={handlePrev}
          >
            Previous
          </button>
          <button type="submit" className="btn btn-success">
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </SwiperSlide>
    </Swiper>
  );
}

export default SwiperComponent;


