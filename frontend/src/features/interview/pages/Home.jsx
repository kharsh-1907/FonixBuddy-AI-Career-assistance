import { useState, useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import "../style/home.scss";
import { useInterview } from "../hook/useIntervies";
import Alert from "../../../Components/alert";
import { useAuth } from "../../auth/hooks/useAuth";
import { useTranslation } from "react-i18next";


const UploadIcon = () => (
  <svg className="upload-icon" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <path d="M35 6H17a5 5 0 0 0-5 5v42a5 5 0 0 0 5 5h30a5 5 0 0 0 5-5V20L35 6Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    <path d="M35 6v14h17M32 48V31m0 0-7 7m7-7 7 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 48c-4.5 0-8-3.2-8-7.2 0-3.5 2.5-6.5 6.1-7.1M43 48c4.5 0 8-3.2 8-7.2 0-3.5-2.5-6.5-6.1-7.1" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const Home = () => {
  const { loading, generateReport, reports } = useInterview();
  const { user, handelLogout } = useAuth()
  const [jD, SetjD] = useState("");
  const [sD, SetsD] = useState("");
  const [resume, setResume] = useState(null);
  const [showLogout, setShowLogout] = useState(true);

  const [open_drop, setOpen_drop] = useState(false);
  const { i18n, t } = useTranslation();
  const [open_Ldrop, setOpen_Ldrop] = useState(false);

  const [alert, setAlert] = useState({ type: "", message: "" });
  const ResumeRef = useRef();
  const navigate = useNavigate();

  const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const isFormValid =
    getWordCount(jD) >= 10 &&
    getWordCount(sD) >= 10 &&
    resume !== null;

  const handelGenerate = async () => {
    const resumeFile = ResumeRef.current.files[0];
    setAlert({ type: "loading", message: "Generating your interview report..." });
    try {
      const data = await generateReport({
        jobDescription: jD,
        selfDescription: sD,
        resumeFile
      });
      setAlert({ type: "success", message: "Interview report generated successfully." });
      navigate(`/interview/${data._id}`);
    } catch (error) {
      // console.log("REPORT GENERATION ERROR:", error);
      const status = error.response?.status;
      setAlert({
        type: "danger",
        message: [429, 500, 503].includes(status)
          ? "There's a lot of traffic right now. Please try again later."
          : error.response?.data?.message || "Something went wrong. Please try again."
      });
    }
  };

  // logOut

  const logout = async () => {
    try {
      await handelLogout();
      navigate("/", {
        state: { message: "Logged Out Successfully." }
      });
    } catch (error) {
      const status = error.response?.status;
      setAlert({
        type: "danger",
        message: [429, 500, 503].includes(status)
          ? "There's a lot of traffic right now. Please try again later."
          : error.response?.data?.message || "Could'nt Proceed to LogOut plaease try after some Time."
      });
    }
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
          top: section.offsetTop - 90,
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

  // Logo-Redirection
  const Main_redirecting = () => {
    navigate("/", { state: { scrollToMain: true } })
  }

  return (
    <main className="home">
      {/* Navbar */}
      <div className='Navbar'>
        <header className="header">
          <div className="logo" onClick={Main_redirecting}>FonixBuddy</div>
          <nav className="nav-links">
            {user &&
              <div className="ai-tools">
                <span className="tools-trigger" onClick={() => setOpen_drop(!open_drop)}>AI Tools
                  {open_drop ?
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m280-400 200-200 200 200H280Z" /></svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-360 280-560h400L480-360Z" /></svg>
                  }
                  <div className={`tools-dropdown ${open_drop ? "show" : ""}`}>
                    <div onClick={Interview_home_navi}>Interview Buddy</div>
                    <div onClick={Resuem_home_navi}>Resume Optimizer</div>
                  </div>

                </span>
              </div>
            }
            {user && showLogout && (
              <button className="logout-btn" onClick={logout}>
                LogOut
                <svg className="svg-style" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
              </button>
            )}
          </nav>
        </header>

      </div>
      {/* Interview-Home-contents */}
      <section className="interview-workspace" id='main_Homescroll' aria-label="Interview report details">
        <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ message: "", type: "" })} />
        <article className="form-panel job-panel">
          <h2>Job Description</h2>
          <textarea onChange={(e) => { SetjD(e.target.value) }} id="jobDescription" placeholder="Enter job description here... (e.g., Software Engineer, 5+ yrs experience, Python, AWS,...atleast 15 words ) " />
        </article>
        <article className="form-panel candidate-panel">
          <h2>Candidate Input</h2>

          <div className="field-group resume-field">
            <p className="field-label">
              Resume <span className="highlight">(Use Resume and self description together)</span>
            </p>

            <label className="upload-area" htmlFor="resume">
              <UploadIcon />
              <strong>Upload Resume (.pdf)</strong>
              <small>Drag &amp;  Click to Upload (.pdf, max 5MB)</small>
            </label>

            <input ref={ResumeRef} id="resume" type="file" accept=".pdf" hidden onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setResume(file);
                setAlert({ type: "success", message: "Resume uploaded successfully." });
              }
            }} /></div>

          <div className="field-group">
            <label className="field-label" htmlFor="selfDescription"> Self Description</label>
            <textarea onChange={(e) => { SetsD(e.target.value) }} id="selfDescription" placeholder="Tell us about your background, skills, achievements, and career goals...(atleast 15 words)" />
          </div>
          <button onClick={handelGenerate} className="btn generate-button" type="button" disabled={!isFormValid || loading} style={{ cursor: !isFormValid && !loading ? "not-allowed" : "pointer" }} title={getWordCount(jD) < 10 && getWordCount(sD) < 10 ? "Job Description and Self Description should contain at least 10 words." : getWordCount(jD) < 10 ? "Job Description should contain at least 10 words." : getWordCount(sD) < 10 ? "Self Description should contain at least 10 words." : !resume ? "Please upload your resume." : ""}>
            {loading ? "Generating..." : "Generate"}
          </button>
        </article>
        <article className="recent-reports" aria-labelledby="recent-reports-title">
          <h2 id="recent-reports-title">My Recent Interview Plans</h2>
          <ul className="reports-list">
            {reports?.length > 0 ? reports.map((report) => (
              <li key={report._id}>
                <button
                  className="report-item"
                  type="button"
                  onClick={() => navigate(`/interview/${report._id}`)}
                >
                  <h3>{report.title || "Interview Report"}</h3>
                  <p className="report-meta">
                    Generated on {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                  <p className={`match-score ${report.match_Score >= 80 ? "score--high" : report.match_Score >= 60 ? "score--mid" : "score--low"}`}>
                    Match Score: {report.match_Score}%
                  </p>
                </button>
              </li>
            )) : (
              <li className="reports-empty">
                No interview plans yet. Generate one to see it here.
              </li>
            )}
          </ul>
        </article>
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
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#634FA2"><path d="M325-111.5q-73-31.5-127.5-86t-86-127.5Q80-398 80-480.5t31.5-155q31.5-72.5 86-127t127.5-86Q398-880 480.5-880t155 31.5q72.5 31.5 127 86t86 127Q880-563 880-480.5T848.5-325q-31.5 73-86 127.5t-127 86Q563-80 480.5-80T325-111.5ZM480-162q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21 1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z" /></svg>
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
              <p className="s2-cont-1" onClick={Resuem_home_navi}>AI Resume Optimizer</p>
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
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42C12.73.222 12.15.087 11.3.048 10.445.01 10.173 0 8 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
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
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
