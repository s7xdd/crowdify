import { useEffect, useState } from "react";
import { campaigns } from "../../public/data";

function Highlight() {
  const [highlight, setHighlight] = useState([]);

  useEffect(() => {
    const getHightlight = () => {
      setHighlight(campaigns.slice(-1));
    };
    getHightlight();
  }, []);

  return (
    <div className="d-flex flex-column gap-3">
      {highlight.map((item) => (
        <div
          key={item.id}
          style={{
            padding: "20px",
            maxWidth: "500px",
            gap: "24px",
            border: "0px ",
            borderRadius: "12px",
            backgroundColor: "white",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <div>
            <div className="d-flex flex-row gap-3">
              <img
                width={"30px"}
                height={"30px"}
                style={{ borderRadius: "50%" }}
                src={item.image}
                alt=""
              />
              <h4 style={{ fontSize: "20px" }}>{item.title}</h4>
            </div>
            <div>
              <p className="text-muted">{item.description}</p>
            </div>
            <div className="border p-2 d-flex flex-row justify-content-between align-items-center gap-3">
              <div className="d-flex align-items-center gap-5  flex-row">
                <div className="d-flex flex-row gap-3">
                  <img
                    width={"30px"}
                    height={"30px"}
                    style={{ borderRadius: "50%" }}
                    src={item.image}
                    alt=""
                  />
                  <p className="text-muted">{item.owner}</p>
                </div>
                <div className="text-muted">
                  <i className="fa-solid fa-location-dot"></i> {item.location}
                </div>
              </div>
              <div
                style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 30px" }}
                className="btn bg-success text-light"
              >
                Donate
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Highlight;

