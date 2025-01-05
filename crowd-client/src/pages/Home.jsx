import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [expandedQuestions, setExpandedQuestions] = useState(
    Array(3).fill(false)
  );

  const toggleAnswer = (index) => {
    setExpandedQuestions((prev) =>
      prev.map((item, i) => (i === index ? !item : item))
    );
  };

  return (
    <div className="container-fluid pb-5">
      <div className="container d-flex flex-column flex-md-row gap-5 align-items-center py-5">
        <div className="container">
          <h1 className="display-4 mb-3 text-dark text-center text-md-start">
            What is Crowdfunding? <br />
            Everything You Should Know
          </h1>
          <p className="lead text-secondary mb-4 text-center text-md-start">
            Crowdfunding harnesses the power of social networks and the internet
            to give people the means to raise funds, help others overcome
            hardship, and meet aspirational goals. The core principle behind
            crowdfunding is that you can help a friend or an entire community.
          </p>
          <p className="text-secondary mb-4">
            You can do everything from raising money for your surgery to
            fulfilling a student’s dream of attending college—and much more. You
            can also easily share your crowdfunding fundraiser via WhatsApp with
            friends and family or on TikTok and Instagram to use the power of
            social media.
          </p>
          <p className="text-secondary mb-4">
            If you’ve ever found yourself wondering, “What is crowdfunding?”
            “What does crowdfunding mean?” or “What are the benefits of
            crowdfunding?” then keep reading. We’ll answer your questions about
            crowdfunding and give you top tips on bringing in donations.
          </p>
          <div className="d-flex justify-content-center">
            <Link to="/explore">
              <button className="btn btn-success btn-lg mb-5">
                Start Crowdfunding
              </button>
            </Link>
          </div>
        </div>

        <img
          className="img-fluid mb-5"
          style={{ maxHeight: "300px", borderRadius: "10px" }}
          src="https://www.gofundme.com/c/wp-content/uploads/2024/07/iStock-1232043247-aspect-ratio-560-355.jpg"
          alt="Crowdfunding"
        />
      </div>

      <div className="container py-5 d-flex text-center">
        <div className="">
          <h3 className="text-dark mb-4">The Rise of Crowdfunding</h3>
          <p className="text-secondary">
            In recent years, crowdfunding has transformed the traditional
            fundraising landscape, breaking down barriers between those in need
            and those available to help them. Individuals contributed the
            highest percentage of charitable giving in 2022, accounting for 64%
            of the total $499.33 billion in estimated charitable giving.
            Crowdfunding has made it possible for people to directly support
            those who need emergency financial assistance, contributing to the
            larger trend of individual giving. People often turn to crowdfunding
            platforms when they can’t afford the rapidly increasing cost of
            medical care or health insurance and have to pay for out-of-pocket
            costs. In fact, enormous medical bills are responsible for 66.5% of
            all bankruptcies in America. So how does crowdfunding work?
          </p>
        </div>
        
      </div>

      <div className="container py-5">
        <h3 className="text-dark mb-4">
          What Are the Advantages of Crowdfunding?
        </h3>
        <div className="d-flex flex-row gap-4">
          <p className="col-6 text-secondary">
            Sometimes, when government and nonprofit funding falls short,
            getting the help you need can be challenging. That’s why
            crowdfunding platforms can be such a valuable resource. It allows
            you to reach out to your community for support in a way that’s
            easy and accessible. Whether you’re facing financial difficulties
            or hoping to impact the world positively, online fundraising can
            help you achieve your fundraising goals.
          </p>
          <div className="col-6 text-secondary">
            <p>
              For those looking to discover crowdfunding basics, here are some
              of the main advantages of using crowdfunding sites:
            </p>
            <ul>
              <li>There are no long wait periods to receive your funds.</li>
              <li>
                Crowdfunding takes the fear out of asking for financial help.
                Sharing your fundraiser with your network of friends and
                family members on TikTok or Instagram is simple.
              </li>
              <li>
                Crowdfunding websites make it easy to reach people outside of
                your network.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container py-5">
        <h3 className="text-dark mb-4">Frequently Asked Questions</h3>
        <div className="accordion accordion-flush">
          {["Accordion Item #1", "Accordion Item #2", "Accordion Item #3"].map(
            (item, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${
                      expandedQuestions[index] ? "" : "collapsed"
                    }`}
                    type="button"
                    onClick={() => toggleAnswer(index)}
                  >
                    {item}
                  </button>
                </h2>
                <div
                  className={`accordion-collapse collapse ${
                    expandedQuestions[index] ? "show" : ""
                  }`}
                >
                  <div className="accordion-body">
                    This is the {item.toLowerCase()}'s accordion body.
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;


