import React, { useState, useEffect } from 'react'
import Navbar from './../Template/Navbar'
import Footer from './../Template/Footer'
import { Pagination } from "swiper";
import { Link } from "react-router-dom";
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago';
import en from 'javascript-time-ago/locale/en.json'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Helmet from "react-helmet";

const Profile = () => {
    TimeAgo.setDefaultLocale(en.locale)
    TimeAgo.addLocale(en)
    const { slug } = useParams();
    const userid = sessionStorage.getItem('userid')
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [post, Setpost] = useState('')
    const [data, Setdata] = useState('');
    const [urlpath, SetUrlpath] = useState();
    const navigate = useNavigate();

    const [seotitle, Setseotitle] = useState();
    const [seodescription, Setseodescription] = useState();
    const [seoimage, Setseoimage] = useState();
    const [seokeywords, Setseokeywords] = useState();

    const getpost = () => {
        fetch(`https://api.pinkspot.cc/api/v1/postad/getpostadby_single_slug`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ slug: slug })
            })
            .then(response => {
                return response.json()
            }).then(data => {
                Setpost(data?.data);
                Setseotitle(data?.data?.metatitle);
                Setseodescription(data?.data?.metadescription);
                Setseoimage(data?.data?.image1);
                Setseokeywords(data?.data?.keywords);
            })
    }
    const getdata = () => {
        fetch(`https://api.pinkspot.cc/api/v1/postad/getallpostad_sort_desc`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ limit: "12" })
        })
            .then(response => {
                return response.json()
            }).then(data => {
                Setdata(data)
            })
    }
    const getreport = () => {
        fetch(`https://api.pinkspot.cc/api/v1/postad/reportpostad`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userid: userid, postadid: post?._id })
        })
            .then(response => {
                return response.json()
            }).then(data => {

                window.alert(data.message);
            })
    }
    const sendmessage = (id) => {
        if (!userid || userid === '') {
            alert('Please Login To Send Message');
            navigate('/login');
            return;
        }

        fetch(`https://api.pinkspot.cc/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ senderId: userid, receiverId: id })
        })
            .then(response => {
                return response.json()
            }).then(data => {

                window.alert("send message successfully");
            })
    }
    useEffect(() => {
        getpost()
        window.scrollTo({ behavior: 'smooth', top: 0 })
    }, [slug])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        getdata()
        const fullPath = window.location.href;
        SetUrlpath(fullPath);
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const onscroll = () => {
        window.scrollTo({ behavior: 'smooth', top: 0 })
    }


    return (
        <>
            <Helmet>
                <title>{seotitle}</title>
                <meta name="description" content={seodescription} />
                <meta name="keywords" content={seokeywords} />
                <meta name="author" content="pink spot" />
                <meta property="og:title" content={seotitle} />
                <meta property="og:description" content={seodescription} />
                <meta property="og:image" content={seoimage} />
                <meta property="og:url" content={urlpath} />
            </Helmet>
            <Navbar />

            <div className='container'>
                <div className='row'>
                    <div className='col-md-8'>
                        <Swiper
                            style={{
                                "--swiper-navigation-color": "#fff",
                                "--swiper-pagination-color": "#fff",
                            }}
                            loop={true}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2 mx--12"
                        >
                            {post.image1 !== "" && <SwiperSlide>
                                <img className='slider-small' src={post.image1} loading="lazy" alt="sgdg" />
                            </SwiperSlide>}
                            {post.image2 !== "" && <SwiperSlide>
                                <img className='slider-small' src={post.image2} loading="lazy" alt="sgdg" />
                            </SwiperSlide>}
                            {post.image3 !== "" && <SwiperSlide>
                                <img className='slider-small' src={post.image3} loading="lazy" alt="sgdg" />
                            </SwiperSlide>}
                            {post.image4 !== "" && <SwiperSlide>
                                <img className='slider-small' src={post.image4} loading="lazy" alt="sgdg" />
                            </SwiperSlide>}
                            {post.image5 !== "" && <SwiperSlide>
                                <img className='slider-small' src={post.image5} loading="lazy" alt="sgdg" />
                            </SwiperSlide>}
                            {post.image6 !== "" && <SwiperSlide>
                                <img className='slider-small' src={post.image6} loading="lazy" alt="sgdg" />
                            </SwiperSlide>}
                            {post.image7 !== "" && <SwiperSlide>
                                <img className='slider-small' src={post.image7} loading="lazy" alt="sgdg" />
                            </SwiperSlide>}
                            {post.image8 !== "" && <SwiperSlide>
                                <img className='slider-small' src={post.image8} loading="lazy" alt="sgdg" />
                            </SwiperSlide>}
                            {post.image9 !== "" && <SwiperSlide>
                                <img className='slider-small' src={post.image9} loading="lazy" alt="sgdg" />
                            </SwiperSlide>}
                            {post.image10 !== "" && <SwiperSlide>
                                <img className='slider-small' src={post.image10} loading="lazy" alt="sgdg" />
                            </SwiperSlide>}
                            {post.image11 !== "" && <SwiperSlide>
                                <img className='slider-small' src={post.image11} loading="lazy" alt="sgdg" />
                            </SwiperSlide>}
                            {post.image12 !== "" && <SwiperSlide>
                                <img className='slider-small' src={post.image12} loading="lazy" alt="sgdg" />
                            </SwiperSlide>}
                            {post.image13 !== "" && <SwiperSlide>
                                <img className='slider-small' src={post.image13} loading="lazy" alt="sgdg" />
                            </SwiperSlide>}
                            {post.image14 !== "" && <SwiperSlide>
                                <img className='slider-small' src={post.image14} loading="lazy" alt="sgdg" />
                            </SwiperSlide>}
                            {post.image15 !== "" && <SwiperSlide>
                                <img className='slider-small' src={post.image15} loading="lazy" alt="sgdg" />
                            </SwiperSlide>}
                            {post.image16 !== "" && <SwiperSlide>
                                <img className='slider-small' src={post.image16} loading="lazy" alt="sgdg" />
                            </SwiperSlide>}
                            {post.image17 !== "" && <SwiperSlide>
                                <img className='slider-small' src={post.image17} loading="lazy" alt="sgdg" />
                            </SwiperSlide>}
                            {post.image18 !== "" && <SwiperSlide>
                                <img className='slider-small' src={post.image18} loading="lazy" alt="sgdg" />
                            </SwiperSlide>}
                            {post.image19 !== "" && <SwiperSlide>
                                <img className='slider-small' src={post.image19} loading="lazy" alt="sgdg" />
                            </SwiperSlide>}
                            {post.image20 !== "" && <SwiperSlide>
                                <img className='slider-small' src={post.image20} loading="lazy" alt="sgdg" />
                            </SwiperSlide>}
                        </Swiper>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            loop={true}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper"
                        >
                            {post.image1 !== "" && <SwiperSlide>
                                <img className='slider-box' src={post.image1} loading="lazy" alt="sgdg" style={{ background: '#e7e7e7' }} />
                            </SwiperSlide>}
                            {post.image2 !== "" && <SwiperSlide>
                                <img className='slider-box' src={post.image2} loading="lazy" alt="sgdg" style={{ background: '#e7e7e7' }} />
                            </SwiperSlide>}
                            {post.image3 !== "" && <SwiperSlide>
                                <img className='slider-box' src={post.image3} loading="lazy" alt="sgdg" style={{ background: '#e7e7e7' }} />
                            </SwiperSlide>}
                            {post.image4 !== "" && <SwiperSlide>
                                <img className='slider-box' src={post.image4} loading="lazy" alt="sgdg" style={{ background: '#e7e7e7' }} />
                            </SwiperSlide>}
                            {post.image5 !== "" && <SwiperSlide>
                                <img className='slider-box' src={post.image5} loading="lazy" alt="sgdg" style={{ background: '#e7e7e7' }} />
                            </SwiperSlide>}
                            {post.image6 !== "" && <SwiperSlide>
                                <img className='slider-box' src={post.image6} loading="lazy" alt="sgdg" style={{ background: '#e7e7e7' }} />
                            </SwiperSlide>}
                            {post.image7 !== "" && <SwiperSlide>
                                <img className='slider-box' src={post.image7} loading="lazy" alt="sgdg" style={{ background: '#e7e7e7' }} />
                            </SwiperSlide>}
                            {post.image8 !== "" && <SwiperSlide>
                                <img className='slider-box' src={post.image8} loading="lazy" alt="sgdg" style={{ background: '#e7e7e7' }} />
                            </SwiperSlide>}
                            {post.image9 !== "" && <SwiperSlide>
                                <img className='slider-box' src={post.image9} loading="lazy" alt="sgdg" style={{ background: '#e7e7e7' }} />
                            </SwiperSlide>}
                            {post.image10 !== "" && <SwiperSlide>
                                <img className='slider-box' src={post.image10} loading="lazy" alt="sgdg" style={{ background: '#e7e7e7' }} />
                            </SwiperSlide>}
                            {post.image11 !== "" && <SwiperSlide>
                                <img className='slider-box' src={post.image11} loading="lazy" alt="sgdg" style={{ background: '#e7e7e7' }} />
                            </SwiperSlide>}
                            {post.image12 !== "" && <SwiperSlide>
                                <img className='slider-box' src={post.image12} loading="lazy" alt="sgdg" style={{ background: '#e7e7e7' }} />
                            </SwiperSlide>}
                            {post.image13 !== "" && <SwiperSlide>
                                <img className='slider-box' src={post.image13} loading="lazy" alt="sgdg" style={{ background: '#e7e7e7' }} />
                            </SwiperSlide>}
                            {post.image14 !== "" && <SwiperSlide>
                                <img className='slider-box' src={post.image14} loading="lazy" alt="sgdg" style={{ background: '#e7e7e7' }} />
                            </SwiperSlide>}
                            {post.image15 !== "" && <SwiperSlide>
                                <img className='slider-box' src={post.image15} loading="lazy" alt="sgdg" style={{ background: '#e7e7e7' }} />
                            </SwiperSlide>}
                            {post.image16 !== "" && <SwiperSlide>
                                <img className='slider-box' src={post.image16} loading="lazy" alt="sgdg" style={{ background: '#e7e7e7' }} />
                            </SwiperSlide>}
                            {post.image17 !== "" && <SwiperSlide>
                                <img className='slider-box' src={post.image17} loading="lazy" alt="sgdg" style={{ background: '#e7e7e7' }} />
                            </SwiperSlide>}
                            {post.image18 !== "" && <SwiperSlide>
                                <img className='slider-box' src={post.image18} loading="lazy" alt="sgdg" style={{ background: '#e7e7e7' }} />
                            </SwiperSlide>}
                            {post.image19 !== "" && <SwiperSlide>
                                <img className='slider-box' src={post.image19} loading="lazy" alt="sgdg" style={{ background: '#e7e7e7' }} />
                            </SwiperSlide>}
                            {post.image20 !== "" && <SwiperSlide>
                                <img className='slider-box' src={post.image20} loading="lazy" alt="sgdg" style={{ background: '#e7e7e7' }} />
                            </SwiperSlide>}
                        </Swiper>

                        <div className='profile-text-box'>
                            <div className='profile-text'>
                                <h4>{post.title}</h4>
                                <p></p>
                                <p>{post.description}</p>
                            </div>
                            <div>
                                <button className='btn'><img src={require("../img/eye.png")} alt="sgdg" /> {post?.numViews} visits</button>
                                <button className='btn' onClick={() => getreport()}><img src={require("../img/flag.png")} alt="sgdg" />Report Add</button>
                            </div>
                        </div>
                    </div>


                    <div className='col-md-4'>
                        <div className="profile-text-box row">
                            <div className='profile-text col-12'>
                                {post.name && <div> {post.name && <h6>Name </h6>} <h5>{post.name} </h5></div>}
                                {post.age && <div>{post.age && <h6>Age </h6>}<h5>{post.age} </h5></div>}
                                {<div> {post.availability && <h6>Availability </h6>}<h5>{post.availability} </h5></div>}
                                {post.height && <div> {post.height && <h6>Height </h6>}<h5>{post.height}</h5></div>}
                                {post.availability && <div>{post.haircolour && <h6>Hair Colour </h6>}<h5>{post.haircolour}</h5></div>}
                                {post.eyecolour && <div>{post.eyecolour && <h6>Eye Colour </h6>}<h5>{post.eyecolour}</h5></div>}
                                {post.type && <div>{post.type && <h6>type </h6>}<h5>{post.type}</h5></div>}
                                {post.email && <div>{post.email && <h6>email </h6>}<h5>{post.email}</h5></div>}
                                {post.listedby && <div>{post.listedby && <h6>listedby </h6>}<h5>{post.listedby}</h5></div>}
                                {post.bedroom && <div>{post.bedroom && <h6>bedroom </h6>}<h5>{post.bedroom}</h5></div>}
                                {post.totalfloors && <div>{post.totalfloors && <h6>totalfloors </h6>}<h5>{post.totalfloors}</h5></div>}
                                {post.facing && <div>{post.facing && <h6>facing </h6>}<h5>{post.facing}</h5></div>}
                                {post.superbuiltuparea && <div>{post.superbuiltuparea && <h6>superbuiltuparea </h6>}<h5>{post.superbuiltuparea}</h5></div>}
                                {post.price && <div>{post.price && <h6>Hourly Rate $</h6>}<h5>{post.price}</h5></div>}
                                {post.floorno && <div>{post.floorno && <h6>floorno </h6>}<h5>{post.floorno}</h5></div>}
                                {post.projectname && <div>{post.projectname && <h6>projectname </h6>}<h5>{post.projectname}</h5></div>}
                                {post.city && <div>{post.city && <h6>City </h6>}<h5 className='text-capitalize'>{post.city} </h5></div>}
                                {post.ethicity && <div>{post.ethicity && <h6>Ethnicity </h6>}<h5 className='text-capitalize'>{post.ethicity}</h5></div>}
                                {post.weight && <div> {post.weight && <h6>Weight </h6>}<h5>{post.weight}</h5></div>}
                                {post.bodystatus && <div> {post.bodystatus && <h6>Body Stats </h6>}<h5>{post.bodystatus}</h5></div>}
                                {post.bathroom && <div>{post.bathroom && <h6>bathroom</h6>}<h5>{post.bathroom}</h5></div>}
                                {post.phone && <div>{post.phone && <h6>Contact Number </h6>}<h5>{post.phone}</h5></div>}
                                {post.carpetarea && <div>{post.carpetarea && <h6>carpetarea</h6>}<h5>{post.carpetarea}</h5></div>}
                                {post.furnishing && <div>{post.furnishing && <h6>furnishing </h6>}<h5>{post.furnishing}</h5></div>}
                                {post.carparking && <div>{post.carparking && <h6>carparking</h6>}<h5>{post.carparking}</h5></div>}
                                {post.constructionstatus && <div>{post.constructionstatus && <h6>construction </h6>}<h5>{post.constructionstatus}</h5></div>}
                                {post.maintenance && <div>{post.maintenance && <h6>maintenance </h6>}<h5>{post.maintenance}</h5></div>}
                            </div>
                        </div>

                        <div className='m-5'>
                            <div>
                                <h6>Posted {post.createdAt && (<ReactTimeAgo date={new Date(post.createdAt)} locale="en-US" />)}</h6>
                            </div>
                            <div className='profile-sider'>
                                <h6>Contact {post?.name}</h6>
                                <p>Hello, I saw your ad on Pinkspot, and I am hoping to hear back from you.</p>
                                {post?.chatSendbyuser?.includes(userid) ? 'Already Connected' : (<button className='btn' onClick={() => sendmessage(post?.postbyuserid?._id)}>SEND</button>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='recent'>
                <h6>Recent Ads by Other Users</h6>
                <div className='recent-pic'>
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {data?.data?.map((val, index) => {
                            return (
                                <SwiperSlide><Link key={index} to={`/profile/${val?.city.split(" ").join("-")}/${val?.slug}`} onClick={onscroll}><img src={val.image1} alt="sgdg" /></Link></SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Profile