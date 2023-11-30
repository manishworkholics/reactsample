import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import fbicon from "../img/Facebook.svg"
import twittericon from "../img/twitter.svg"
import linkicon from "../img/link.svg"
import ReactPlayer from "react-player/file";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import Helmet from "react-helmet";
// import { Seo } from "../Template/Seo";
const Web_Url = process.env.REACT_APP_WEBSITE_URL;
// Swiper slider End
const Videodetail = () => {
  const URL = process.env.REACT_APP_URL;
  const { id } = useParams();

  const [arr1, setArr1] = useState([]);
  const [index, setIndex] = useState(0);

  const [singlevideo, setSinglevideo] = useState();
  // const [isPlaying, setIsPlaying] = useState(false);

  // const togglePlay = () => {
  //   setIsPlaying(!isPlaying);
  // };

  const getsinglevideo_FirstTime = async () => {
    const fetch = await axios.get(`${URL}/admin/getVideoGalleryById/${id}`);
    const response = await fetch;
    setSinglevideo(response?.data);
  };
  useEffect(() => {
    setArr1((arr1) => [...arr1, id]);
    getsinglevideo_FirstTime(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getsinglevideo = async () => {
    const no = arr1[index];
    const fetch = await axios.get(`${URL}/admin/getVideoGalleryById/${no}`);
    const response = await fetch;
    setSinglevideo(response?.data);
  };
  // Get Data when index change
  useEffect(() => {
    getsinglevideo(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Multiple Video
  const getAllvideo = async () => {
    const fetch = await axios.get(`${URL}/admin/getAllVideoGallery_ShortLong`);
    const data1 = await fetch;

    for (var i = 0; i < data1?.data?.data?.shortVideo.length; i++) {
      const dta = data1?.data?.data?.shortVideo[i]._id;
      setArr1((arr1) => [...arr1, dta]);
    }
  };

  console.log(arr1);
  useEffect(() => {
    getAllvideo(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Counter for add and Substract

  const addCounter = async () => {
    const current_value = index;
    if (current_value < arr1.length) {
      setIndex(current_value + 1);
    } else {
      alert("end");
    }
  };

  const subCounter = async () => {
    const current_value = index;
    if (current_value !== 0) {
      setIndex(current_value - 1);
    } else {
      alert("end");
    }
  };

  return (
    <>
      {/* -======================= Seo Start -=======================*/}
     
      {/* <Helmet>
        <title>{singlevideo?.data?.title}</title>
        <meta name="description" content={singlevideo?.data?.imageurl} />
        <meta name="keywords" content={singlevideo?.data?.title} />
        <meta name="author" content="Khulasa News" />
        <meta property="og:title" content={singlevideo?.data?.title} />
        <meta
          property="og:description"
          content={singlevideo?.data?.description}
        />
        <meta property="og:image" content={singlevideo?.data?.imageurl} />
        <meta
          property="og:url"
          content={`${Web_Url}/detail/${singlevideo?.data?.slug}`}
        />
      </Helmet> */}
      {/* -======================= Seo Start -=======================*/}
      {/* Index No Video = {arr1[index]}{" "}
                  Index No = {index} - Length ={arr1.length} */}
      <div className="main-container short-video video-detail">
        {/* <Header /> */}
        <div className="row">
          <Link to={"/khulasa/video"}>
            <img
              src={require("../img/back-btn.png")}
              alt=""
              className="back-btn"
            />
          </Link>
          <div className="d-flex justify-content-center ">
            <div className="++ vid-page-video-block ">
              <div className="video-box">
                <Link to="#" className="video-box-short-vid">
                  <ReactPlayer
                    url={singlevideo?.data?.videourl}
                    playing={true}
                    width="100% !important"
                    height="100% !important"
                    controls={true}
                  />
                  {/* <video controls autoPlay>
                    <source
                      src={singlevideo?.videourl}
                      type="video/mp4"
                      alt=""
                    />
                  </video> */}
                </Link>
                <div className="vid-top">
                <div className="vid-logo">
                  <img src={require("../img/khulasa-logo (White).png")} alt="" />
                </div>
                {/* <div className="vid-khabar-btn">
                  <button>खबर पढ़ें</button>
                </div> */}
              </div>
              </div>
              
              {/* <div className="news-title">
                                <h5 className="news-videos-title">महाराष्ट्र के 4 जिलों में बाढ़ जैसे हालात: रायगढ़ में चट्‌टान से एक गांव के 48 घर बहे; 5 की मौत, 127 लोग मलबे में दबे </h5>
                                <div className="h-4"><h4>महाकाल सेना</h4></div>
                            </div> */}
            </div>

            <div className="social-icon">
              <ul>
                <li>
                  <div className="social-icon-img">
                    <img src={fbicon} alt="" />
                  </div>
                  <h6 className="social-icon-title">फेसबुक</h6>
                </li>
                <li>
                  <div className="social-icon-img">
                    <img src={twittericon} alt="" />
                  </div>
                  <h6 className="social-icon-title">ट्विटर</h6>
                </li>
                <li>
                  <div className="social-icon-img">
                    <img src={linkicon} alt="" />
                  </div>
                  <h6 className="social-icon-title">कॉपी लिंक</h6>
                </li>
              </ul>
            </div>
          </div>
          <div className="short-video-title text-center">
            <Link to="#">
              <h3 className="h-3">
                <span className="heading-green">
                  {singlevideo?.data?.title}
                </span>
              </h3>
            </Link>
          </div>
          <div className="up-down-btn d-flex top-0 start-75 translate-middle">
            <div className="arrow-btn">
              <Link to="#" onClick={addCounter} onScroll={addCounter}>
                <img src={require("../img/up-btn.png")} alt="" />
              </Link>
            </div>
            <div className="arrow-btn">
              <Link to="#" onClick={subCounter} onScroll={subCounter}>
                <img src={require("../img/down-btn.png")} alt="" />
              </Link>
            </div>
          </div>
        </div>
        <div className="container ">
          {/* <div className="row">
                    <div className="col-md-12">
                        <div className="top-ad-block">
                            <img src={require('../img/top-ad-img.png')} alt="" />
                        </div>
                    </div>
                </div> */}

          {/* <div className="row">
                    <div className="col-md-12 bottom-advertise">
                        <img src={require('../img/bottom-ad.png')} alt="" />
                    </div>
                </div> */}
        </div>
        {/* <Footer /> */}
      </div>

      {/*---------- only for 600px screen ---------- */}
      {/* <div className="main-container short-video short-vid-mobile">
        <div className="row">
          <div className="d-flex justify-content-center mob-screen">
            <div className="vid-page-video-block ">
              <div className="video-box">
                <Link to="#">
                  <video controls autoPlay>
                    <source
                      src={require("../img/record-monsoon-rains-img.png")}
                      type="video/mp4"
                    />
                  </video>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Videodetail;
