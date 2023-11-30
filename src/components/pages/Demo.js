import React, { useState } from 'react';
import axios from 'axios';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";



const Demo = () => {
    const [bannerName, setBannerName] = useState({});
    const [video, setVideo] = useState({});
    const [imageOne, setImageOne] = useState({});
    const [imageTwo, setImageTwo] = useState({});
    const [imageThree, setImageThree] = useState({});
    const [imageFour, setImageFour] = useState({});
    const [imageFive, setImageFive] = useState({});

    var _a = useState(""), cimage = _a[0], setCImage = _a[1];
    var _d = useState(""), dimage = _d[0], setDImage = _d[1];
    var _e = useState(""), eimage = _e[0], setEImage = _e[1];
    var _f = useState(""), fimage = _f[0], setFImage = _f[1];
    var _m = useState(""), mimage = _m[0], setMImage = _m[1];

    var _b = useState(), cropData = _b[0], setCropData = _b[1];
    var _c = useState(), cropper1 = _c[0], setCropper1 = _c[1];

    var _g = useState(), cropDataOne = _g[0], setCropDataOne = _g[1];
    var _h = useState(), cropper2 = _h[0], setCropper2 = _h[1];

    var _i = useState(), cropDataTwo = _i[0], setCropDataTwo = _i[1];
    var _j = useState(), cropper3 = _j[0], setCropper3 = _j[1];

    var _k = useState(), cropDataThree = _k[0], setCropDataThree = _k[1];
    var _l = useState(), cropper4 = _l[0], setCropper4 = _l[1];

    var _n = useState(), cropDataFour = _n[0], setCropDataFour = _n[1];
    var _o = useState(), cropper5 = _o[0], setCropper5 = _o[1];

    var onChange = function (e) {
        e.preventDefault();
        var files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        }
        else if (e.target) {
            files = e.target.files;
        }
        var reader = new FileReader();
        reader.onload = function () {
            setCImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };
    var onChangeOne = function (e) {
        e.preventDefault();
        var files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        }
        else if (e.target) {
            files = e.target.files;
        }
        var reader = new FileReader();
        reader.onload = function () {
            setDImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };
    var onChangeTwo = function (e) {
        e.preventDefault();
        var files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        }
        else if (e.target) {
            files = e.target.files;
        }
        var reader = new FileReader();
        reader.onload = function () {
            setEImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };
    var onChangeThree = function (e) {
        e.preventDefault();
        var files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        }
        else if (e.target) {
            files = e.target.files;
        }
        var reader = new FileReader();
        reader.onload = function () {
            setFImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };
    var onChangeFour = function (e) {
        e.preventDefault();
        var files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        }
        else if (e.target) {
            files = e.target.files;
        }
        var reader = new FileReader();
        reader.onload = function () {
            setMImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    var getCropData = function () {
        if (typeof cropper2 !== "undefined") {
            setCropData(cropper2.getCroppedCanvas().toDataURL());
        }
    };
    var getCropDataOne = function () {
        if (typeof cropper3 !== "undefined") {
            setCropDataOne(cropper3.getCroppedCanvas().toDataURL());
        }
    };
    var getCropDataTwo = function () {
        if (typeof cropper4 !== "undefined") {
            setCropDataTwo(cropper4.getCroppedCanvas().toDataURL());
        }
    };
    var getCropDataThree = function () {
        if (typeof cropper5 !== "undefined") {
            console.log(cropper5.getCroppedCanvas().toDataURL())
            setCropDataThree(cropper5.getCroppedCanvas().toDataURL());
        }
    };
    var getCropDataFour = function () {
        if (typeof cropper1 !== "undefined") {
            console.log(cropper1);
            setCropDataFour(cropper1.getCroppedCanvas().toDataURL());
        }
    };



    const [{ alt, src }, setImg] = useState({
        src: '/assets/images/no-image.png',
        alt: '',
    });
    const [{ altvideo, srcvideo }, setVid] = useState({
        srcvideo: '/assets/images/no-image.png',
        altvideo: '',
    });
    const [{ altOne, srcOne }, setImgOne] = useState({
        srcOne: '/assets/images/no-image.png',
        altOne: '',
    });

    const [{ altTwo, srcTwo }, setImgTwo] = useState({
        srcTwo: '/assets/images/no-image.png',
        altTwo: '',
    });
    const [{ altThree, srcThree }, setImgThree] = useState({
        srcThree: '/assets/images/no-image.png',
        altThree: '',
    });
    const [{ altFour, srcFour }, setImgFour] = useState({
        srcFour: '/assets/images/no-image.png',
        altFour: '',
    });
    const [{ altFive, srcFive }, setImgFive] = useState({
        srcFive: '/assets/images/no-image.png',
        altFive: '',
    });



    const fileCreationFromURL = (inputURI) => {
        console.log(inputURI);
        if (inputURI != '') {
            // mime extension extraction
            let arr = inputURI.split(',');
            let mime = arr[0].match(/:(.*?);/)[1];
            let data = arr[1];

            let dataStr = atob(data);
            let n = dataStr.length;
            let dataArr = new Uint8Array(n);

            while (n--) {
                dataArr[n] = dataStr.charCodeAt(n);
            }
            let file = new File([dataArr], 'output.jpg', { type: mime });
            return file;
        }
        return;
    }

    const handleImg = (cropDataFour) => {
        if (cropDataFour) {
            setImg({
                src: (cropDataFour),
                alt: cropDataFour.name,
            });
        }
        var file = fileCreationFromURL(cropDataFour);
        const myurl = `https://events.teambuildingawards.com:3000/api/upload-img`;
        var bodyFormData = new FormData();
        bodyFormData.append('auth_code', 'Event#Cust$&$Resto#MD');
        bodyFormData.append('image', file);
        axios({
            method: 'post',
            url: myurl,
            data: bodyFormData,
        })
            .then((result) => {
                console.log('Success:=====', result);
                setBannerName(result?.data?.data?.filepath_url);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handlevideo = (e) => {
        if (e.target.files[0]) {
            setVid({
                srcvideo: URL.createObjectURL(e.target.files[0]),
                altvideo: e.target.files[0].name,
            });
        }
        const myurl = `https://events.teambuildingawards.com:3000/api/upload-img`;
        var bodyFormData = new FormData();
        bodyFormData.append('auth_code', 'Event#Cust$&$Resto#MD');
        bodyFormData.append('image', e?.target?.files[0]);
        axios({
            method: 'post',
            url: myurl,
            data: bodyFormData,
        })
            .then((result) => {
                console.log('Success:=====', result);
                setVideo(result?.data?.data?.filepath_url);

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const handleImgOne = (cropData) => {
        if (cropData) {
            setImgOne({
                srcOne: (cropData),
                altOne: cropData.name,
            });
        }
        var file = fileCreationFromURL(cropData);
        const myurl = `https://events.teambuildingawards.com:3000/api/upload-img`;
        var bodyFormData = new FormData();
        bodyFormData.append('auth_code', 'Event#Cust$&$Resto#MD');
        bodyFormData.append('image', file);
        axios({
            method: 'post',
            url: myurl,
            data: bodyFormData,
        })
            .then((result) => {
                console.log('Success:=====', result);
                setImageOne(result?.data?.data?.filepath_url);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const handlethumbnail = (e) => {
        if (e.target.files[0]) {
            setImgFive({
                srcFive: URL.createObjectURL(e.target.files[0]),
                altFive: e.target.files[0].name,
            });
        }
        console.log('PHOTO===>', e?.target?.files[0]);
        const myurl = `https://events.teambuildingawards.com:3000/api/upload-img`;
        var bodyFormData = new FormData();
        bodyFormData.append('auth_code', 'Event#Cust$&$Resto#MD');
        bodyFormData.append('image', e?.target?.files[0]);
        axios({
            method: 'post',
            url: myurl,
            data: bodyFormData,
        })
            .then((result) => {
                console.log('Success:=====', result);
                setImageFive(result?.data?.data?.filepath_url);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const handleImgTwo = (cropDataOne) => {
        if (cropDataOne) {
            setImgTwo({
                srcTwo: (cropDataOne),
                altTwo: cropDataOne.name,
            });
        }
        var file = fileCreationFromURL(cropDataOne);
        const myurl = `https://events.teambuildingawards.com:3000/api/upload-img`;
        var bodyFormData = new FormData();
        bodyFormData.append('auth_code', 'Event#Cust$&$Resto#MD');
        bodyFormData.append('image', file);
        axios({
            method: 'post',
            url: myurl,
            data: bodyFormData,
        })
            .then((result) => {
                console.log('Success:=====', result);
                setImageTwo(result?.data?.data?.filepath_url);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const handleImgThree = (cropDataTwo) => {
        if (cropDataTwo) {
            setImgThree({
                srcThree: (cropDataTwo),
                altThree: cropDataTwo.name,
            });
        }
        var file = fileCreationFromURL(cropDataTwo);
        const myurl = `https://events.teambuildingawards.com:3000/api/upload-img`;
        var bodyFormData = new FormData();
        bodyFormData.append('auth_code', 'Event#Cust$&$Resto#MD');
        bodyFormData.append('image', file);
        axios({
            method: 'post',
            url: myurl,
            data: bodyFormData,
        })
            .then((result) => {
                console.log('Success:=====', result);
                setImageThree(result?.data?.data?.filepath_url);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const handleImgFour = (cropDataThree) => {
        if (cropDataThree) {
            setImgFour({
                srcFour: (cropDataThree),
                altFour: cropDataThree.name,
            });
        }
        var file = fileCreationFromURL(cropDataThree);
        const myurl = `https://events.teambuildingawards.com:3000/api/upload-img`;
        var bodyFormData = new FormData();
        bodyFormData.append('auth_code', 'Event#Cust$&$Resto#MD');
        bodyFormData.append('image', file);
        axios({
            method: 'post',
            url: myurl,
            data: bodyFormData,
        })
            .then((result) => {
                console.log('Success:=====', result);
                setImageFour(result?.data?.data?.filepath_url);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    const reset = () => {
        setMImage(null);
        const image = document.getElementById('main-img');
        if (image) {
            image.value = null;
        }
        setImg({
            src: ('/assets/images/no-image.png'),
            alt: null,
        });
    };

    const resetone = () => {
        setCImage(null);
        const imageOne = document.getElementById('imageOne');
        if (imageOne) {
            imageOne.value = null;
        }
        setImgOne({
            srcOne: ('/assets/images/no-image.png'),
            altOne: null,
        });
    };

    const resettwo = () => {
        setDImage(null);
        const imageTwo = document.getElementById('imageTwo');
        if (imageTwo) {
            imageTwo.value = null;
        }
        setImgTwo({
            srcTwo: ('/assets/images/no-image.png'),
            altTwo: null,
        });
    };

    const resetthree = () => {
        setEImage(null);
        const imageThree = document.getElementById('imageThree');
        if (imageThree) {
            imageThree.value = null;
        }
        setImgThree({
            srcThree: ('/assets/images/no-image.png'),
            altThree: null,
        });
    };

    const resetfour = () => {
        setFImage(null);
        const imageFour = document.getElementById('imageFour');
        if (imageFour) {
            imageFour.value = null;
        }
        setImgFour({
            srcFour: ('/assets/images/no-image.png'),
            altFour: null,
        });
    };

    return (
        <>
            <div className="col-12 col-md-6">
                <label className="form-label">Main Image</label>
                <input id="main-img" type="file" className="form-control" onChange={onChangeFour} />
                {mimage && <>
                    <Cropper
                        style={{ height: 200, width: "100%" }}
                        zoomTo={0.5}
                        initialAspectRatio={1}
                        preview=".img-preview"
                        src={mimage}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false}
                        onInitialized={(instance) => {
                            setCropper1(instance);
                        }}
                        guides={true}
                    />
                    <div className="cropimgbtn">
                        <button className="btn btn-primary " type='button' onClick={getCropDataFour}>Crop Image</button>
                        <button className="btn btn-primary mr-2" type='button' onClick={() => handleImg(cropDataFour)}>  Upload Image</button>
                    </div>
                </>
                }
            </div>
            {src != '/assets/images/no-image.png' ?
                <div className="col-12">
                    <div className="tba-input-file-preview">
                        <img src={src} className="img-fluid" alt="" />
                    </div>
                </div>
                : ''}

            <div className="col-12 col-md-6">
                <div className="">
                    <label className="form-label">Image 2</label>
                    <input id="imageTwo" type="file" className="form-control" onChange={onChangeOne} />
                    {dimage && <>
                        <Cropper
                            style={{ height: 200, width: "100%" }}
                            zoomTo={0.5}
                            initialAspectRatio={1}
                            preview=".img-preview"
                            src={dimage}
                            viewMode={1}
                            minCropBoxHeight={10}
                            minCropBoxWidth={10}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false}
                            onInitialized={(instance) => {
                                setCropper3(instance);
                            }}
                            guides={true}
                        />
                        <div className="cropimgbtn">
                            <button className="btn btn-primary" type='button' onClick={getCropDataOne}>Crop Image</button>
                            <button className="btn btn-primary " type='button' onClick={() => handleImgTwo(cropDataOne)}>  Upload Image</button>
                        </div>
                    </>
                    }
                </div>
                {srcTwo != '/assets/images/no-image.png' ?
                    <div className="col-12">
                        <div className="tba-input-file-preview">
                            <img src={srcTwo} className="img-fluid" alt="" />
                        </div>
                    </div>
                    : ''}
            </div>

            <div className="col-12 col-md-6">
                <div className="">
                    <label className="form-label">Image 3</label>
                    <input id="imageThree" type="file" className="form-control" onChange={onChangeTwo} />
                    {eimage && <>
                        <Cropper
                            style={{ height: 200, width: "100%" }}
                            zoomTo={0.5}
                            initialAspectRatio={1}
                            preview=".img-preview"
                            src={eimage}
                            viewMode={1}
                            minCropBoxHeight={10}
                            minCropBoxWidth={10}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false}
                            onInitialized={(instance) => {
                                setCropper4(instance);
                            }}
                            guides={true}
                        /><div className="cropimgbtn">
                            <button className="btn btn-primary" type='button' onClick={getCropDataTwo}>Crop Image</button>
                            <button className="btn btn-primary" type='button' onClick={() => handleImgThree(cropDataTwo)}>  Upload Image</button>
                        </div>
                    </>
                    }
                </div>
                {srcThree != '/assets/images/no-image.png' ?
                    <div className="col-12">
                        <div className="tba-input-file-preview">
                            <img src={srcThree} className="img-fluid" alt="" />
                        </div>
                    </div>
                    : ''}
            </div>

            <div className="col-12 col-md-6">
                <div className="">
                    <label className="form-label">Image 4</label>
                    <input id="imageFour" type="file" className="form-control" onChange={onChangeThree} />
                    {fimage && <>
                        <Cropper
                            style={{ height: 200, width: "100%" }}
                            zoomTo={0.5}
                            initialAspectRatio={1}
                            preview=".img-preview"
                            src={fimage}
                            viewMode={1}
                            minCropBoxHeight={10}
                            minCropBoxWidth={10}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false}
                            onInitialized={(instance) => {
                                setCropper5(instance);
                            }}
                            guides={true}
                        />
                        <div className="cropimgbtn">
                            <button className="btn btn-primary" type='button' onClick={getCropDataThree}>Crop Image</button>
                            <button className="btn btn-primary" type='button' onClick={() => handleImgFour(cropDataThree)}>  Upload Image</button>
                        </div>
                    </>
                    }
                </div>
                {srcFour != '/assets/images/no-image.png' ?
                    <div className="col-12">
                        <div className="tba-input-file-preview">
                            <img src={srcFour} className="img-fluid" alt="" />
                        </div>
                    </div>
                    : ''}
            </div>
        </>
    )
}

export default Demo