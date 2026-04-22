import "./Home.css";
import { Carousel } from "react-bootstrap";
import FeatureCard from "./FeatureCard";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PublicIcon from "@mui/icons-material/Public";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import screenshot1 from "../../../Assets/Images/screenshot1.jpg";
import screenshot2 from "../../../Assets/Images/screenshot2.jpg";
import screenshot3 from "../../../Assets/Images/screenshot3.jpg";
import screenshot4 from "../../../Assets/Images/screenshot4.jpg";
import screenshot5 from "../../../Assets/Images/screenshot5.jpg";
import screenshot6 from "../../../Assets/Images/screenshot6.jpg";
import screenshot7 from "../../../Assets/Images/screenshot7.jpg";

function Home(): JSX.Element {
    return (
        <div className="Home">
            {/* Hero Section */}
            <section className="Hero">
                <div className="Hero-content">
                    <h1>האפליקציה היחידה שתצטרך</h1>
                    <h2 className="Hero-subtitle">לכל אשכוליאן</h2>
                    <p className="Hero-description">
                        הכלי שמרכז את כל מה שלוהט🔥 בעולם האשכול.
                        <br />
                        הורידו עכשיו והצטרפו למהפכה!
                    </p>
                    <div className="Hero-cta">
                        <a
                            href="https://github.com/ogadassi/download-the-grapevine/releases/download/default/app.apk"
                            download
                            className="Download-link"
                        >
                            <button className="Download-button">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="16"
                                    width="20"
                                    viewBox="0 0 640 512"
                                >
                                    <path
                                        d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                                <span>הורד עכשיו</span>
                            </button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="Features">
                <div className="Features-grid">
                    <FeatureCard
                        icon={<RocketLaunchIcon color="secondary" />}
                        title="מהירות שיא"
                        description="חווית גלישה חלקה ומהירה ללא פשרות."
                    />
                    <FeatureCard
                        icon={<AutoAwesomeIcon color="secondary" />}
                        title="תוכן חם"
                        description="כל האשכולות הכי מעניינים במקום אחד."
                    />
                    <FeatureCard
                        icon={<NotificationsActiveIcon color="secondary" />}
                        title="התראות בזמן אמת"
                        description="אל תפספסו שום דבר שקורה בעולם האשכול."
                    />
                    <FeatureCard
                        icon={<PublicIcon color="secondary" />}
                        title="קהילה תוססת"
                        description="הצטרפו לאלפי משתמשים שכבר נהנים מהאפליקציה."
                    />
                </div>
            </section>
            <section className="Screenshots">
                <h3>מבט מקרוב</h3>
                <Carousel className="carousel" indicators={true} interval={3000}>
                    {[screenshot1, screenshot2, screenshot3, screenshot4, screenshot5, screenshot6, screenshot7].map((src, idx) => (
                        <Carousel.Item key={idx}>
                            <div className="carousel-img-container">
                                <img className="carousel-img" src={src} alt={`Screenshot ${idx + 1}`} />
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </section>

            {/* Footer / Final CTA */}
            <footer className="Footer">
                <p>&copy; {new Date().getFullYear()} The Grapevine. כל הזכויות שמורות.</p>
            </footer>
        </div>
    );
}

export default Home;
