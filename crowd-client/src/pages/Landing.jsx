import { Link } from "react-router-dom";
import Highlight from "../components/Highlight"; // Corrected the typo "componets" to "components"


function Landing() {
    return (
        <>

        <div style={{ position: "relative", width: "100%", height: "95vh" }}>
            {/* Background Container with Blur */}
            <div
                style={{
                    backgroundImage:
                        "url('https://s3-alpha-sig.figma.com/img/face/484c/fa1229d44ffc5d9d067c3df926b2f544?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SAW5CpQzSNwX8n2XfLAeac5lnfPE6vZtVhgjs9jV2RzEUVblOXmLz51rvFPma9zgoJi5ZwQzFdEy8OHMAqsAcYZ8J8VAuQLlhDVbgRrUbfj4~gjGCHKlUWHcuS7t9wRQQsqiFaeLFYx-YKF~xUu4DOTDYjfkwcmwJvQIlXAmN4VvYeZOZpYutJWCj3e8ElMtwClPAGPRNCC~FJoi1DA1exE~YX1EgVK2sPzt5ok9gR2V7AEHk0mwl13u4CQdkitbc5Rrjy9o5AUgeprISrty3TrPuB0IHMCoBbDBmIDLwrdIJI5I5-FqHTvsZoQAB~EqbHctEeX0Og9a5deiDmjl4w__')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    filter: "blur(5px)",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: -1,
                }}
            />

            {/* Foreground Content */}
            <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: "100%", position: "relative" }}
            >
                <div style={{ position: "absolute", left: "260px", top: "200px" }}>
                    <svg
                        width="130"
                        height="107"
                        viewBox="0 0 130 107"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M39.5084 6.0022C34.6759 6.1274 29.8942 6.20883 25.0679 6.47481C24.0294 6.52826 23.2385 7.40867 23.2948 8.44028C23.3483 9.47882 24.2356 10.2727 25.2672 10.2164C30.0669 9.95558 34.8081 9.87353 39.6071 9.75059C40.6439 9.72079 41.4598 8.85882 41.4341 7.83186C41.4043 6.79509 40.5451 5.9724 39.5084 6.0022Z"
                            fill="#BEF264"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M60.3619 40.1113C49.1024 50.4339 38.3715 61.319 27.3396 71.8749C26.5916 72.5945 26.5675 73.7796 27.2802 74.5247C27.9998 75.2728 29.1817 75.3037 29.9367 74.587C40.9461 64.046 51.6542 53.1758 62.8952 42.878C63.6611 42.174 63.7091 40.9909 63.012 40.2278C62.308 39.4619 61.1249 39.4142 60.3619 40.1113Z"
                            fill="#BEF264"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M109.671 64.6353C106.641 77.188 103.957 89.8451 100.787 102.364C100.538 103.365 101.145 104.383 102.144 104.638C103.15 104.896 104.17 104.283 104.426 103.284C107.595 90.7486 110.284 78.0777 113.314 65.5082C113.555 64.5035 112.938 63.4896 111.934 63.2483C110.922 63.0041 109.915 63.6237 109.671 64.6353Z"
                            fill="#BEF264"
                        />
                    </svg>
                </div>

                {/* Main Title */}
                <h1
                    style={{
                        fontSize: "clamp(2rem, 8vw, 89px)",
                        fontWeight: "600",
                        height: "82px",
                        textAlign: "center",
                        animationDelay: "1s",
                        animation: "slideInOut 1s ease-in-out forwards",
                    }}
                    className="text-white"
                >
                    Solve problems all <br />  around the world
                </h1>
                <h1
                    style={{
                        fontSize: "89px",
                        fontWeight: "600",
                        height: "82px",
                        textAlign: "center"
                    }}
                    className="text-white"
                >
                   
                </h1>

                <div style={{ position: "absolute", right: "325px", top: "330px" }}>
                    <svg
                        width="70"
                        height="67"
                        viewBox="0 0 70 67"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.29675 33.7612C9.06049 38.741 8.1197 43.7242 7.17229 48.5466C6.96484 49.5841 5.96622 50.2794 4.96896 50.0269C3.94733 49.8453 3.29306 48.8369 3.47685 47.8705C4.399 43.1978 5.32848 38.3699 5.54143 33.6194C5.58217 32.6055 6.46301 31.7914 7.50279 31.821C8.54186 31.8503 9.33677 32.747 9.29675 33.7612Z"
                            fill="#BEF264"
                            style={{ animation: "pulse 2s ease-in-out infinite" }}
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M32.009 25.9804C37.0523 35.7981 40.825 46.2208 46.1163 55.9628C46.6207 56.8419 46.2806 57.9934 45.3742 58.4824C44.4672 58.9712 43.3163 58.6672 42.8355 57.717C37.5222 47.9676 33.7281 37.5378 28.6628 27.7128C28.1991 26.7683 28.5677 25.6265 29.4932 25.1439C30.3944 24.7322 31.5454 25.0358 32.009 25.9804Z"
                            fill="#BEF264"
                            style={{ animation: "pulse 2s ease-in-out infinite", animationDelay: "1s" }}
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M65.3496 21.8099C61.139 20.1728 56.9284 18.5362 52.7171 16.8988C51.7364 16.5727 51.2632 15.4665 51.6422 14.486C52.0219 13.5057 53.0932 13.072 54.0746 13.3983C58.2923 15.0378 62.5094 16.6766 66.7263 18.3158C67.6834 18.7131 68.1516 19.8174 67.767 20.796C67.406 21.7034 66.3059 22.2069 65.3496 21.8099Z"
                            fill="#BEF264"
                            style={{ animation: "pulse 2s ease-in-out infinite", animationDelay: "2s" }}
                        />
                    </svg>
                </div>

                {/* Campaign Info */}
                <h3
                    style={{
                        fontSize: "24px",
                        fontWeight: "600",
                        height: "82px",
                        marginTop: "40px",
                        textAlign: "center",
                        color: "white",
                        animation: "fadeIn 2s ease-in-out forwards",
                        animationDelay: "3s",
                    }}
                >
                    Fund and sign campaigns and missions in <br /> all the 234 countries on the globe
                </h3>

                {/* Buttons */}
                <div className="btn bg-success text-light">
                    <Link to="/home" className="text-light text-decoration-none">Get Started</Link>
                </div>

                <div className="text-light mt-3">
                    <span>Already have an account? </span>
                    <Link className="text-light" to="/login">Login</Link>
                </div>
                
                {/* Highlight Component */}
                <div className="mt-5">

                <Highlight />
                </div>
            </div>
        </div>
        </>
    );
}

export default Landing;
