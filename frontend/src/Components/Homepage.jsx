import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style/homepage.scss";
import feedbacks from "./feedBack_data.js/feedback.json"
import { useTranslation } from "react-i18next";

import { useAuth } from "../features/auth/hooks/useAuth";

const Homepage = () => {

    // User Authen.
    const { user, handelLogout, loading } = useAuth();


    // Navigation Use for Login,SignUp,&AI-tools
    const navigate = useNavigate();
    const location = useLocation()

    // Dropdown State of AI-tools[Navbar]
    const [open_drop, setOpen_drop] = useState(false);

    // Dropdown State of Language[Footer]
    const [open_Ldrop, setOpen_Ldrop] = useState(false);

    // Feedback content Contexts
    const positions = ["position-1", "position-2", "position-4", "position-6", "position-8", "position-9", "position-10", "position-11", "position-12", "position-13", "position-14"/*5&7 is removed for better visibility ofother  Contents.*/];
    const [visibleFeedbacks, setVisibleFeedbacks] = useState(feedbacks.slice(0, 3).map((feedback, index) => ({ ...feedback, position: positions[index] })));
    const [feedbackIndex, setFeedbackIndex] = useState(3);
    useEffect(() => {
        const interval = setInterval(() => {

            setVisibleFeedbacks((current) => {

                const shuffledPositions = [...positions]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 3);

                return current.map((feedback, index) => ({
                    ...feedbacks[(feedbackIndex + index) % feedbacks.length],
                    position: shuffledPositions[index]
                }));
            });

            setFeedbackIndex((current) =>
                (current + 3) % feedbacks.length
            );

        }, 5000);

        return () => clearInterval(interval);
    }, [feedbackIndex]);

    // Translation of page (Under Progress!!!!!!!!!!!)
    const { i18n, t } = useTranslation();

    // scrolling to ai-Tools-content
    const scrollTo = () => {
        const section = document.getElementById("Ai_content");

        if (section) {
            window.scrollTo({
                top: section.offsetTop - 4,
                behavior: "smooth"
            });
        }
    };

    // Logout:
    const [showLogout, setShowLogout] = useState(true);

    const logout = async () => {
        await handelLogout();
        navigate("/", {
            state: { message: "Logged Out Successfully." }
        });
    };
    // After Log-out Presentation handleing
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setShowLogout(false);
            } else {
                setShowLogout(true);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Function for AI-Report home
    const Interview_home_navi = () => {
        if (user) {
            navigate("/InterviewReport-Home");

            const section = document.getElementById("main_Homescroll");
            if (section) {
                window.scrollTo({
                    top: section.offsetTop - 4,
                    behavior: "smooth"
                });
            }

            return;
        }
        navigate("/login", {
            state: {
                redirectTo: "/InterviewReport-Home",
                message: "Please login first to visit Interview tools."
            }
        });
    }

    // Function for AI-Resume home
    const Resuem_home_navi = () => {
        if (user) {
            navigate("/resume");

            const section = document.getElementById("main_Homescroll");
            if (section) {
                window.scrollTo({
                    top: section.offsetTop - 34,
                    behavior: "smooth"
                });
            }

            return;
        }
        navigate("/login", {
            state: {
                redirectTo: "/resume",
                message: "Please login first to visit Resume tools."
            }
        });
    }

    // Function for Login-in
    const login_Redirection = () => {

        navigate("/login", {
            state: {
                message: "Please login to Use Our tools."
            }
        });

    }
    // Function for sign-up
    const signUp_Redirection = () => {
        navigate("/signup", {
            state: {
                message: "Please SignUp to Connect with Us."
            }
        });
    }

    // Logo-Redirection
    const Main_redirecting = () => {
        navigate("/", { state: { scrollToMain: true } })
    }
    useEffect(() => {
        if (location.state?.scrollToMain) {
            const section = document.getElementById("main_Homescroll");

            if (section) {
                window.scrollTo({
                    top: section.offsetTop - 20,
                    behavior: "smooth"
                });
            }
            navigate("/", { replace: true, state: {} })
        }
    }, [location.state, navigate])

    return (
        <>
            {loading && (
                <div className="loading-screen">
                    <h2>Loading...</h2>
                </div>
            )}
            <div className='home_page'>

                {/* Navbar */}
                <div className='Navbar'>
                    <header className="header">
                        <div className="logo" onClick={Main_redirecting}>FonixBuddy</div>
                        <nav className="nav-links">
                            <div className="ai-tools">
                                <span className="tools-trigger" onClick={() => setOpen_drop(!open_drop)}>AI Tools
                                    {open_drop ?
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m280-400 200-200 200 200H280Z" /></svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-360 280-560h400L480-360Z" /></svg>
                                    }
                                    <div className={`tools-dropdown ${open_drop ? "show" : ""}`}>
                                        <div onClick={Interview_home_navi} >Interview Buddy</div>
                                        <div onClick={Resuem_home_navi} >Resume Optimizer</div>
                                    </div>

                                </span>
                            </div>
                            {/* Login & SignUp */}
                            {!user && <>
                                <button className="login-btn" onClick={login_Redirection} >Log in</button>
                                <button className="signup-btn" onClick={signUp_Redirection}>Sign up</button>
                            </>
                            }
                            {/* LogOut */}
                            {user && showLogout && (
                                <button className="logout-btn" onClick={logout}>
                                    LogOut
                                    <svg className="svg-style" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
                                </button>
                            )}

                        </nav>
                    </header>

                </div>

                {/* Homepage-Intro-contents */}
                <section className="hero" id="main_Homescroll">
                    <div className="hero-content">
                        <h1> Your AI-Powered <br /><span>Career Assistant</span></h1>
                        <p>{t("Get personalized guidance to improve your resume, prepare for interviews, identify skill gaps, and take the next step in your career.")}

                        </p>
                        <div className="hero-buttons">
                            <button onClick={scrollTo} className="hero-btn">Prepare for Interview </button>
                            <button onClick={scrollTo} className="hero-btn secondary">Explore Resume Tools</button>
                        </div>
                    </div>

                    <div className="floating-feedbacks">
                        {visibleFeedbacks.map((feedback) => (
                            <div
                                className={`feedback ${feedback.position}`}
                                key={`${feedback.id}-${feedback.position}`}
                            >
                                <div className="feedback-stars">
                                    {"★".repeat(feedback.stars)}
                                    {"☆".repeat(5 - feedback.stars)}
                                </div>
                                <p>"{feedback.message}"</p>
                                <span>— {feedback.author}</span>
                            </div>
                        ))}
                    </div>

                    <div className="hero-preview">
                        <div className="preview-card resume-preview">
                            <div className="preview-title">Resume Analysis</div>
                            <div className="match-score">
                                <div className="score-ring">
                                    <strong>87%</strong>
                                    <span>Match</span>
                                </div>
                            </div>
                            <div className="analysis-items">
                                <span>Skills ✓</span>
                                <span>Keywords ✓</span>
                                <span>Structure ✓</span>
                            </div>
                        </div>

                        <div className="preview-card interview-preview">
                            <div className="preview-title">Interview Report</div>
                            <div className="report-item">
                                <span>Technical Questions</span>
                                <span>✓</span>
                            </div>
                            <div className="report-item">
                                <span>Behavioral Questions</span>
                                <span>✓</span>
                            </div>
                            <div className="report-item">
                                <span>Preparation Road Map</span>
                                <span>→</span>
                            </div>
                        </div>

                        <div className="preview-card skill-preview">
                            <div className="preview-title">Skill Gap</div>
                            <span className="skill-label"><span className='skill-label-dot'></span> Missing Skills</span>
                            <div className="skills">
                                <span>React.js</span>
                                <span>REST APIs</span>
                                <span>System Design</span>
                            </div>
                            <div className="roadmap">View Roadmap → </div>
                        </div>
                    </div>
                </section>

                {/* Homepage-Working-contents */}
                <section className="how-it-works">
                    <div className="how-header">
                        <div className="how-label">
                            <span></span>
                            <strong>HOW IT WORKS</strong>
                            <span></span>
                        </div>
                        <h2>Your Goals. <strong>Our Tools.</strong></h2>
                        <p>Choose what you need, share your details, and let Interview-AI
                            give you clear, personalised guidance. </p>
                    </div>

                    <div className="tools-container">
                        {/* Resume Optimisation */}
                        <div className="tool-card resume-tool">
                            <div className="tool-heading">
                                <div className="tool-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor" >
                                        <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM320-240h320v-80H320v80Zm0-160h320v-80H320v80Zm0-160h160v-80H320v80Zm200-40v-200 200Z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3>Resume Optimisation</h3>
                                    <p>Turn your experience into a stronger, focused resume.</p>
                                </div>
                            </div>
                            <div className="tool-content">
                                <div className="preview-card">
                                    <div className="resume-preview">
                                        <div className="preview-top">
                                            <strong>Your Resume</strong>
                                            <span>Optimised</span>
                                        </div>
                                        <h4>Software Developer</h4>
                                        <div className="preview-section">
                                            <strong>Skills</strong>
                                            <div className="preview-tags">
                                                <span>React.js</span>
                                                <span>Node.js</span>
                                                <span>MongoDB</span>
                                                <span>Express</span>
                                            </div>
                                        </div>
                                        <div className="preview-section">
                                            <strong>Experience</strong>
                                            <div className="preview-lines">
                                                <i></i>
                                                <i></i>
                                                <i></i>
                                                <i></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="resume-insight">
                                        <span>✓</span>
                                        <div>
                                            <strong>Resume Insights</strong>
                                            <p>Skills • Structure • Relevance</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tool-steps">
                                    <div className="step">
                                        <span>01</span>
                                        <div>
                                            <h4>Upload & Share</h4>
                                            <p>Add your resume and relevant job details.</p>
                                        </div>
                                    </div>
                                    <div className="step">
                                        <span>02</span>
                                        <div>
                                            <h4>AI Analyses</h4>
                                            <p>Interview-AI reviews your skills, experience and resume. </p>
                                        </div>
                                    </div>
                                    <div className="step">
                                        <span>03</span>
                                        <div>
                                            <h4>Get Insights</h4>
                                            <p>Understand your strengths and areas to improve.</p>
                                        </div>
                                    </div>                                <div className="step">
                                        <span>04</span>
                                        <div>
                                            <h4>Improve</h4>
                                            <p> Apply the guidance to build a stronger resume.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Interview Report */}
                        <div className="tool-card interview-tool">
                            <div className="tool-heading">
                                <div className="tool-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor" >
                                        <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14T240-272v32Zm240-400q33 0 56.5-23.5T640-720q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720q0 33 23.5 56.5T480-640Zm0-80Z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3>Interview Report</h3>
                                    <p>Prepare smarter with AI-powered interview insights.</p>
                                </div>
                            </div>
                            <div className="tool-content">
                                <div className="preview-card">
                                    <div className="interview-preview">
                                        <div className="preview-top">
                                            <strong>Interview Report</strong>
                                            <span>Generated</span>
                                        </div>
                                        <div className="report-row">
                                            <span>Technical Questions</span>
                                            <b>✓</b>
                                        </div>
                                        <div className="report-row">
                                            <span>Behavioral Questions</span>
                                            <b>✓</b>
                                        </div>

                                        <div className="report-row">
                                            <span>Skill Gaps</span>
                                            <b>→</b>
                                        </div>
                                        <div className="report-row">
                                            <span>Preparation Road Map</span>
                                            <b>→</b>
                                        </div>
                                    </div>
                                    <div className="interview-insight">
                                        <span>✦</span>
                                        <div>
                                            <strong>Personalised Guidance</strong>
                                            <p>Questions • Gaps • Preparation</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="tool-steps">
                                    <div className="step">
                                        <span>01</span>
                                        <div>
                                            <h4>Share Details</h4>
                                            <p>Add your resume, job description and role details.</p>
                                        </div>
                                    </div>
                                    <div className="step">
                                        <span>02</span>
                                        <div>
                                            <h4>AI Analyses</h4>
                                            <p>Interview-AI evaluates your skills and experience. </p>
                                        </div>
                                    </div>
                                    <div className="step">
                                        <span>03</span>
                                        <div>
                                            <h4>Get Your Report</h4>
                                            <p>See questions, skill gaps and useful insights.</p>
                                        </div>
                                    </div>
                                    <div className="step">
                                        <span>04</span>
                                        <div>
                                            <h4>Prepare Better</h4>
                                            <p>Follow the guidance and focus on what matters. </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Common Flow */}
                    <div className="common-flow">
                        <div className="flow-item">
                            <span>01</span>
                            <strong>You Share</strong>
                            <p>Your details and goals.</p>
                        </div>
                        <div className="flow-arrow">→</div>
                        <div className="flow-item">
                            <span>02</span>
                            <strong>AI Analyses</strong>
                            <p>Interview-AI finds useful insights.</p>
                        </div>
                        <div className="flow-arrow">→</div>
                        <div className="flow-item">
                            <span>03</span>
                            <strong>You Understand</strong>
                            <p>See strengths, gaps and next steps.</p>
                        </div>
                        <div className="flow-arrow">→</div>
                        <div className="flow-item">
                            <span>04</span>
                            <strong>You Grow</strong>
                            <p>Take action with clear guidance.</p>
                        </div>
                    </div>
                </section>

                {/* Homepage-What's-inside-contents */}
                <section className="ai-tools-section" id="Ai_content">
                    <div className="ai-tools-header">
                        <span>AI-POWERED GUIDANCE</span>
                        <h2>Tools Built Around Your Career.</h2>
                        <p>Whether you're improving your resume or preparing for an interview,
                            get focused guidance exactly where you need it.</p>
                    </div>
                    <div className="tools-container">
                        {/* Resume Optimisation */}
                        <div className="tool-card resume-tool">
                            <div className="background-visual resume-bg">
                                <div className="bg-resume">
                                    <strong>Alex Morgan</strong>
                                    <span>Software Developer</span>
                                    <div className="bg-line"></div>
                                    <div className="bg-line"></div>
                                    <div className="bg-line short"></div>
                                    <h5>Skills</h5>
                                    <div className="bg-tags">
                                        <i>React.js</i>
                                        <i>Node.js</i>
                                        <i>MongoDB</i>
                                    </div>
                                    <h5>Experience</h5>
                                    <div className="bg-line"></div>
                                    <div className="bg-line"></div>
                                    <div className="bg-line short"></div>
                                </div>
                            </div>
                            <div className="tool-content">
                                <h3>Turn Your Resume Into Your Strongest First Impression.</h3>
                                <p>Understand what works, what needs improvement, and how to
                                    present your skills and experience more effectively.</p>
                                <div className="tool-points">
                                    <span>✓ Skills</span>
                                    <span>✓ Structure</span>
                                    <span>✓ Relevance</span>
                                </div>
                                <button onClick={Resuem_home_navi} >Optimise Your Resume →</button>
                            </div>
                        </div>
                        {/* Interview Report */}
                        <div className="tool-card interview-tool">
                            <div className="background-visual interview-bg">
                                <div className="bg-report">
                                    <div className="report-heading">
                                        <strong>Interview Report</strong>
                                        <span>Generated</span>
                                    </div>
                                    <div className="report-line">
                                        <span>Technical Questions</span>
                                        <b>✓</b>
                                    </div>
                                    <div className="report-line">
                                        <span>Behavioral Questions</span>
                                        <b>✓</b>
                                    </div>
                                    <div className="report-line">
                                        <span>Skill Gaps</span>
                                        <b>→</b>
                                    </div>
                                    <div className="report-line">
                                        <span>Preparation Road Map</span>
                                        <b>→</b>
                                    </div>
                                </div>
                            </div>
                            <div className="tool-content">
                                <h3>Know What To Prepare Before You Walk In.</h3>
                                <p>Get personalised interview insights, identify skill gaps,
                                    and follow a clearer preparation roadmap.</p>
                                <div className="tool-points">
                                    <span>✓ Technical</span>
                                    <span>✓ Behavioral</span>
                                    <span>→ Road Map</span>
                                </div>
                                <button onClick={Interview_home_navi} >Prepare For Interview →</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/*HomePage-About-contents */}
                <section className="why-choose-us">
                    <div className="why-header">
                        <span>WHY CHOOSE US</span>
                        <h2>Guidance That Moves <strong>You Forward.</strong></h2>
                        <p>Understand where you stand, what to improve, and what to focus on next with personalised AI-powered career guidance.</p>
                    </div>

                    <div className="why-grid">
                        <div className="main-benefit">
                            <div className="main-content">
                                <span className="main-number">01</span>
                                <h3>Your Career, <strong>Clearly Mapped.</strong></h3>
                                <p>Bring your resume, interview preparation, skill gaps and learning goals together in one place.</p>

                                <div className="main-points">
                                    <span>Resume Analysis</span>
                                    <span>Interview Prep</span>
                                    <span>Skill Gaps</span>
                                    <span>Career Roadmap</span>
                                </div>
                            </div>

                            <div className="career-dashboard">
                                <div className="dashboard-top">
                                    <span>Career Overview</span>
                                    <span className="active-status">AI Guidance</span>
                                </div>

                                <div className="career-progress">
                                    <div className="progress-info">
                                        <span>Career Preparation</span>
                                        <strong>Progress</strong>
                                    </div>
                                    <div className="progress-track">
                                        <span></span>
                                    </div>
                                </div>

                                <div className="dashboard-items">
                                    <div>
                                        <span>Resume</span>
                                        <b>Reviewed</b>
                                    </div>
                                    <div>
                                        <span>Interview</span>
                                        <b>Preparing</b>
                                    </div>
                                    <div>
                                        <span>Skills</span>
                                        <b>3 Areas</b>
                                    </div>
                                </div>

                                <div className="next-step">
                                    <span>Next Step</span>
                                    <strong>Focus on your skill gaps →</strong>
                                </div>
                            </div>
                        </div>

                        <div className="benefit-card benefit-1">
                            <div className="benefit-visual guidance-visual">
                                <div className="ai-orb">✦</div>
                                <div className="guidance-message">
                                    <span>AI Suggestion</span>
                                    <strong>Improve your React experience section</strong>
                                </div>
                            </div>
                            <div className="benefit-content">
                                <span className="benefit-number">02</span>
                                <h3>Personalised Guidance</h3>
                                <p>Get recommendations based on your skills, experience and career goals.</p>
                            </div>
                        </div>

                        <div className="benefit-card benefit-2">
                            <div className="benefit-visual skills-visual">
                                <div className="skill-row">
                                    <span>React.js</span>
                                    <i><b></b></i>
                                </div>
                                <div className="skill-row">
                                    <span>REST APIs</span>
                                    <i><b></b></i>
                                </div>
                                <div className="skill-row">
                                    <span>System Design</span>
                                    <i><b></b></i>
                                </div>
                            </div>

                            <div className="benefit-content">
                                <span className="benefit-number">03</span>
                                <h3>Clear Skill Gaps</h3>
                                <p>See which areas need attention so you can focus your learning where it matters.</p>
                            </div>
                        </div>

                        <div className="benefit-card benefit-3">
                            <div className="benefit-content">
                                <span className="benefit-number">04</span>
                                <h3>Actionable Roadmaps</h3>
                                <p>Turn your insights into clear steps instead of guessing what to work on next.</p>
                            </div>

                            <div className="roadmap-visual">
                                <div className="roadmap-line"></div>

                                <div className="roadmap-step active">
                                    <span>01</span>
                                    <b>Identify</b>
                                </div>

                                <div className="roadmap-step">
                                    <span>02</span>
                                    <b>Improve</b>
                                </div>

                                <div className="roadmap-step">
                                    <span>03</span>
                                    <b>Prepare</b>
                                </div>
                            </div>
                        </div>

                        <div className="benefit-card benefit-4">
                            <div className="benefit-content">
                                <span className="benefit-number">05</span>
                                <h3>One Career Assistant</h3>
                                <p>Keep your resume, interview preparation and career guidance connected in one experience.</p>
                            </div>

                            <div className="assistant-visual">
                                <div className="assistant-item active">
                                    <span>✓</span>
                                    <strong>Resume</strong>
                                </div>
                                <div className="assistant-item">
                                    <span>→</span>
                                    <strong>Interview</strong>
                                </div>
                                <div className="assistant-item">
                                    <span>→</span>
                                    <strong>Skills</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*Footer */}
                <div className="footer">
                    <div className="footer-sections">
                        <span className="fsection-1">
                            <div className="logo" onClick={Main_redirecting}>
                                <img src="/android-chrome-192x192.png" alt="FonixBuddy" />
                                <span>FonixBuddy</span>
                            </div>
                            <div className="lan-setting">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#634FA2"><path d="M325-111.5q-73-31.5-127.5-86t-86-127.5Q80-398 80-480.5t31.5-155q31.5-72.5 86-127t127.5-86Q398-880 480.5-880t155 31.5q72.5 31.5 127 86t86 127Q880-563 880-480.5T848.5-325q-31.5 73-86 127.5t-127 86Q563-80 480.5-80T325-111.5ZM480-162q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z" /></svg>
                                <span className="Ltools-trigger" onClick={() => setOpen_Ldrop(!open_Ldrop)}>
                                    <button className="current-lan">
                                        {t("language")}
                                    </button>
                                    <div className={`Ltools-dropdown ${open_Ldrop ? "show" : ""}`}>
                                        <div onClick={() => i18n.changeLanguage("en")}>
                                            English
                                        </div>
                                        <div onClick={() => i18n.changeLanguage("hi")}>
                                            {t("hindi")}
                                        </div>
                                        <div onClick={() => i18n.changeLanguage("mr")}>
                                            {t("marathi")}
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </span>
                        <span className="fsection-2">
                            <h2>Tools</h2>
                            <div className="s2-cont">
                                <p className="s2-cont-1" onClick={Resuem_home_navi} >AI Resume Optimizer</p>
                                <p className="s2-cont-2" onClick={Interview_home_navi} >AI Interview Helper</p>
                            </div>
                        </span>
                        <span className="fsection-3">
                            <h2>Contact</h2>
                            <div className="s3-cont">
                                <p className="s3-cont-1"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#634FA2"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
                                    khaddeharsh1907@gmail.com</p>
                                <div className="s3-cont-2">
                                    <p>FonixBuddy Ltd</p>
                                    <p>Company No. 98274631</p>
                                    <p>Suite 4, Sai Vihar Business Centre</p>
                                    <p>10 Tech Home Labs</p>
                                    <p>Hadapsar, Pune, Maharashtra 411028, India</p>
                                </div>
                            </div>
                        </span>
                    </div>
                    <div className="f-footer">
                        <p className="Lf-ff">© 2026 FonixBuddy Limited, All rights reserved</p>
                        <div className="Rf-ff">
                            <p className="Rf-ff-1">
                                <a href="http://www.instagram.com/harsh_khadde_1907">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                    </svg>
                                </a>
                            </p>
                            <p className="Rf-ff-2">
                                <a href="http://www.linkedin.com/in/harsh-khadde-142625385">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                    </svg>
                                </a>
                            </p>
                            <p className="Rf-ff-3">
                                <a href="https://github.com/kharsh-1907">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                    </svg>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Homepage
