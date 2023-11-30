import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import ReactPlayer from 'react-player';

const Home = () => {
  const videos = [
    { url: 'http://206.189.130.102:8080/uploads/video/1698384341896-1698384341896.mp4' },
    { url: 'http://206.189.130.102:8080/uploads/video/1698384460339-1698384460339.mp4' },
    { url: 'http://206.189.130.102:8080/uploads/video/1698384341896-1698384341896.mp4' },
    { url: 'http://206.189.130.102:8080/uploads/video/1698384460339-1698384460339.mp4' },
    { url: 'http://206.189.130.102:8080/uploads/video/1698384341896-1698384341896.mp4' },
    { url: 'http://206.189.130.102:8080/uploads/video/1698384460339-1698384460339.mp4' },
    { url: 'http://206.189.130.102:8080/uploads/video/1698384341896-1698384341896.mp4' },
    { url: 'http://206.189.130.102:8080/uploads/video/1698384460339-1698384460339.mp4' },
    { url: 'http://206.189.130.102:8080/uploads/video/1698384341896-1698384341896.mp4' },
    { url: 'http://206.189.130.102:8080/uploads/video/1698384460339-1698384460339.mp4' },
    { url: 'http://206.189.130.102:8080/uploads/video/1698384341896-1698384341896.mp4' },
    { url: 'http://206.189.130.102:8080/uploads/video/1698384460339-1698384460339.mp4' },
    { url: 'http://206.189.130.102:8080/uploads/video/1698384341896-1698384341896.mp4' },
    { url: 'http://206.189.130.102:8080/uploads/video/1698384460339-1698384460339.mp4' },
    { url: 'http://206.189.130.102:8080/uploads/video/1698384341896-1698384341896.mp4' },
    { url: 'http://206.189.130.102:8080/uploads/video/1698384460339-1698384460339.mp4' },
    // Add more video objects as needed
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleIndexChange = (index) => {
    setActiveIndex(index);
  };
  return (
    <div className='container '>
      <div className='row'>
        <div className='col-md-12'>
          <h1 className='text-center'>video player</h1>
          <SwipeableViews index={activeIndex}  onChangeIndex={handleIndexChange}>
            {videos.map((video, index) => (
              <div key={index}>
                <ReactPlayer
              
                  url={video.url} // Replace with the actual video URL
                  playing={index === activeIndex} // Auto-play the current video
                  controls={true} // Show video controls
                  width="100%" // Adjust the width as needed
                  height="auto" // Adjust the height as needed
                />
              </div>
            ))}
          </SwipeableViews>
        </div>
      </div>
    </div>
  )
}

export default Home