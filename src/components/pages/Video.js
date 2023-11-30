import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import fbicon from "../img/Facebook.svg";
import twittericon from "../img/twitter.svg";
import linkicon from "../img/link.svg";
import ReactPlayer from "react-player/file";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Video = () => {
  const { ids } = useParams();
  const [video, setVideo] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [id, setId] = useState(ids);

  const url = [
    '653faaf865eb64655060761b',
    '653faa0f65eb646550607616',
    '653fa88b65eb646550607613',
    '653fa52165eb64655060760a',
    '653f5db85cb9ade1973e2689',
    '653f5bea5cb9ade1973e2367'
  ];

  const getVideo = () => {
    fetch(`http://new.khulasafirst.com:8080/api/v1/admin/getVideoGalleryById/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setVideo(data?.data);
      });
  };

  useEffect(() => {
    getVideo();
  }, [id]);// eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    setId(url[currentIndex]);
  }, [currentIndex]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='main-container short-video video-detail short-vid-detail-mob '>
      <div className='row'>
        <Link to={"/home"}>
          <img
            src={require("../img/back-btn.png")}
            alt=""
            className="back-btn short-vid-back-btn"
          />
        </Link>
        <div className="d-flex justify-content-center d-none-mobile">
          <div className="++ vid-page-video-block ">
            <div className="video-box">
              <Link to="#" className="video-box-short-vid">
                <ReactPlayer
                  url={video?.videourl}
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

        <div className="up-down-btn d-flex top-0 start-75 translate-middle d-none-mobile">
          <div className="arrow-btn">

            {currentIndex > 0 && (
              <Link to={`/home/${url[currentIndex - 1]}`}>
                <img
                  onClick={() => setCurrentIndex(currentIndex - 1)}
                  src={require("../img/up-btn.png")}
                  alt=""
                />
              </Link>
            )}
          </div>
          <div className="arrow-btn">

            {currentIndex < url.length - 1 && (
              <Link to={`/home/${url[currentIndex + 1]}`}>
                <img
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                  src={require("../img/down-btn.png")}
                  alt=""
                />
              </Link>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Video