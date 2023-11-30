import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import fbicon from "../img/Facebook.svg";
import twittericon from "../img/twitter.svg";
import linkicon from "../img/link.svg";
import ReactPlayer from "react-player/file";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwipeableViews from "react-swipeable-views";

const Videodetail = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleIndexChange = (index) => {
    setActiveIndex(index);
  };
  const URL = process.env.REACT_APP_URL;
  const { id } = useParams();
  const [arr1, setArr1] = useState([]);
  const [index, setIndex] = useState(0);
  const [singlevideo, setSinglevideo] = useState();
  const [allvideo, setallvideo] = useState();

  const getsinglevideo_FirstTime = async () => {
    const fetch = await axios.get(`${URL}/admin/getVideoGalleryById/${id}`);
    const response = await fetch;
    setSinglevideo(response?.data);
  };
  const getallvedio = async () => {
    const fetch = await axios.get(`${URL}/admin/getAllVideoGallery_ShortLong`);
    const response = await fetch;
    setallvideo(response?.data);
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
    getallvedio(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addCounter = async () => {
    const current_value = index;
    if (current_value < arr1.length) {
      setIndex(current_value + 1);
    } else {
      setIndex(0);
      // alert("end");
    }
  };
  const subCounter = async () => {
    const current_value = index;
    if (current_value !== 0) {
      setIndex(current_value - 1);
    } else {
      setIndex(arr1.length);
      // alert("end");
    }
  };

  return (
    <>
      <div className="main-container short-video video-detail short-vid-detail-mob">
        <div className="row">
          <Link to={"/khulasa/Video/index"}>
            <img
              src={require("../img/back-btn.png")}
              alt=""
              className="back-btn short-vid-back-btn"
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
                </Link>
                <div className="vid-top">
                  <div className="vid-logo">
                    <img
                      src={require("../img/khulasa-logo (White).png")}
                      alt=""
                    />
                  </div>
                </div>
              </div>
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
          <div className="container video-detail-one">
            <div className="row">
              <div className="col-md-12">
                {/* <h1 className="text-center">video player</h1> */}
                <SwipeableViews
                  index={activeIndex}
                  onChangeIndex={handleIndexChange}
                >
                  {allvideo?.data?.shortVideo.map((video, index) => (
                    <div key={index}>
                      <ReactPlayer
                        url={video?.videourl} // Replace with the actual video URL
                        playing={index === activeIndex} // Auto-play the current video
                        controls={true} // Show video controls
                        width="100%" // Adjust the width as needed
                        height="663px" // Adjust the height as needed
                      />
                    </div>
                  ))}
                </SwipeableViews>
              </div>
            </div>
          </div>
          <div className="short-video-title text-center d-none-mobile">
            <Link to="#">
              <h3 className="h-3">
                <span className="heading-green">
                  {singlevideo?.data?.title}
                </span>
              </h3>
            </Link>
          </div>
          <div className="up-down-btn d-flex top-0 start-75 translate-middle d-none-mobile">
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
      </div>
    </>
  );
};

export default Videodetail;
