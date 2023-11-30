import React, { useEffect, useState, useRef } from 'react'
import ReactHlsPlayer from 'react-hls-player';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PreLoader from '../Components/PreLoader';

const Chaptervedio = () => {
    const myRef = useRef(null);
    const executeScroll = () => myRef.current.scrollIntoView();
    const navigate = useNavigate();
    const tokenstring = sessionStorage.getItem('token')
    const usertoken = JSON.parse(tokenstring);
    const { id } = useParams();
    const [users, setUsers] = useState('')
    const [urls, seturls] = useState('')
    const [type, settype] = useState()

    const getuser = () => {

        fetch(`https://mlearningindia.org/learn/api/get_video_by_chapter/${id}`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${usertoken}` // notice the Bearer before your token
            },
        })
            .then(response => {
                return response.json()
            }).then(data => {
                setUsers(data)

            })
    }

    useEffect(() => {
        getuser()
    }, [])

    const data = users.data
    const datas = data?.videos
    const [videourl, setVideoUrl] = useState('');
    const [videotitle, setVideoTitle] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [currentPlayId, setcurrentPlayId] = useState('');

    const changeVideo = (url, id, title, type) => {
        seturls(url)
        settype(type)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${usertoken}`);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Cookie", "XSRF-TOKEN=" + usertoken + "; mLearning_session=" + usertoken);

        var urlencoded = new URLSearchParams();
        urlencoded.append("video_url", url);
        urlencoded.append("video_id", id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        //set video title
        setVideoTitle(title);
        setcurrentPlayId(id);

        setSpinner(true);

        //check video permission
        var requestOptions1 = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        checkPlayRequest(requestOptions, requestOptions1, id);
        executeScroll();
        // console.log(requestOptions1)
    }

    const checkPlayRequest = (requestOptions, requestOptions1, id) => {
        fetch("https://mlearningindia.org/learn/api/play_video_request_new?video_id=" + id, requestOptions1)
            .then(response => response.text())
            .then(result => {
                setSpinner(false);
                if (JSON.parse(result).status == 'true') {
                    getVideoUrl(requestOptions);
                } else if (JSON.parse(result).status == 'false') {
                    alert(JSON.parse(result).message)
                    return;
                }
            })
            .catch(error => console.log('error', error));
    }

    const getVideoUrl = (requestOptions) => {
        fetch("https://mlearningindia.org/learn/api/get_video_url", requestOptions)
            .then(response => response.text())
            .then(result => {
                setVideoUrl(JSON.parse(result).result.play_video_url_new);
                setSpinner(false);
            })
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <section className="bradecum text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Chapter Videos</h2>
                            <ol className='breadcrumb'>
                                <li><Link to={`/exam`}>Exam</Link></li>
                                <li><Link to={`/subject`}>Subjects</Link></li>
                                <li><Link to={`/class`}>Class</Link></li>
                                <li><Link to='#' onClick={() => navigate(-2)}>Units</Link></li>
                                <li><Link to='#' onClick={() => navigate(-1)}>Chapters</Link></li>
                                <li>Chapter Videos</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            {spinner && (
                <PreLoader />
            )}
            <section className="courses pt-2 pb-5">
                <div className="container">
                    <div className='player row pt-5' ref={myRef}>
                        <div className='col-lg-12'>
                            <div className='single_vedio'>
                                {type == 2 ?
                                    <ReactHlsPlayer
                                        src={videourl}
                                        autoPlay={true}
                                        controls={true}
                                        width="100%"
                                        height="auto"
                                    /> :
                                    <iframe src={`https://www.youtube.com/embed/` + urls} width="100%" height="500px"></iframe>
                                }


                            </div>
                        </div>
                        <div className='col-lg-12'>
                            <h6>{videotitle}</h6>
                        </div>
                    </div>
                    <div className="row pt-5">
                        {
                            datas?.map((val, index) => {
                                return (
                                    <>
                                        {
                                            (index == 0) ?
                                                <div className="col-lg-3" key={index}>
                                                    <Link to="javascript:;" onLoad={() => changeVideo(val.url, val.id, val.title, val.url_type)} onClick={() => changeVideo(val.url, val.id, val.title)} className="video_inner">
                                                        <div className="video_list text-center">
                                                            <img src={val.image} alt='vedio' width="100%" />
                                                            <img src={require("../img/play.png")} alt='vedio' className="play" />
                                                            {
                                                                (currentPlayId == val.id) ?
                                                                    <h5 className='activeVideo'>{val.title}</h5>
                                                                    : <h5>{val.title}</h5>
                                                            }
                                                        </div>
                                                    </Link>
                                                </div>
                                                :
                                                (val.url_type != 3) ?
                                                    <div className="col-lg-3" key={index}>
                                                        <Link to="javascript:;" onClick={() => changeVideo(val.url, val.id, val.title, val.url_type)} className="video_inner">
                                                            <div className="video_list text-center">
                                                                <img src={val.image} alt='vedio' width="100%" />
                                                                <img src={require("../img/play.png")} alt='vedio' className="play" />
                                                                {
                                                                    (currentPlayId == val.id) ?
                                                                        <h5 className='activeVideo'>{val.title}</h5>
                                                                        : <h5>{val.title}</h5>
                                                                }
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    : ''
                                        }
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </section >
        </>
    )
}

export default Chaptervedio