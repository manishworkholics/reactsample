import React, { useState } from 'react';
import axios from 'axios';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const Crop = () => {
    const [imageOne, setImageOne] = useState([]);
    const [data, setdata] = useState();
    var _a = useState(""), image = _a[0], setImage = _a[1];
    var _b = useState(), cropper = _b[0], setCropper = _b[1];
    var _c = useState(), cropData = _c[0], setCropData = _c[1];

    const fileCreationFromURL = (inputURI) => {
        console.log(inputURI);
        if (inputURI !== '') {
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
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };


    var getCropData = function () {
        if (typeof cropper !== "undefined") {
            setCropData(cropper.getCroppedCanvas().toDataURL());
            setdata(cropper.cropBoxData);
        }
    };

    const handleImage = (cropData) => {
        if (cropData) {
            setImg({
                src: (cropData),
                alt: cropData.name,
            });
        }

        var file = fileCreationFromURL(cropData);
        const myurl = `http://206.189.130.102:4000/api/v1/admin/imageUpload_Use/imageUpload`;
        var bodyFormData = new FormData();
        bodyFormData.append('file', file);
        axios({
            method: 'post',
            url: myurl,
            data: bodyFormData,
        })
            .then((result) => {
                setImageOne(imageOne => [...imageOne,
                {
                    data: {
                        url: result?.data?.url,
                        top: data.top + "px",
                        left: data.left + "px",
                        height: data.height * 100 / data.maxHeight + "%",
                        width: data.width * 100 / data.maxWidth + "%",
                    }

                    // data: {
                    //     url: result?.data?.url,
                    //     top: data.top * 100 / data.maxTop - 10 + "%",
                    //     left: data.left * 100 / data.maxLeft + "%",
                    //     height: data.height * 100 / data.maxHeight + "%",
                    //     width: data.width * 100 / data.maxWidth + "%",
                    // }
                }
                ]);

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const resetone = () => {
        setImage(null);
        const imageOne = document.getElementById('imageOne');
        if (imageOne) {
            imageOne.value = null;
        }
        setImg({
            src: ('/assets/images/no-image.png'),
            alt: null,
        });
    };
    const [{ alt, src }, setImg] = useState({
        src: '/assets/images/no-image.png',
        alt: '',
    });

    console.log(imageOne)
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2'>
                        <label className="form-label">Image 1</label>
                        <input id="imageOne" type="file" className="form-control" onChange={onChange} />
                    </div>
                    <div className="col-md-10">
                        {image && <>
                            <Cropper
                                zoomTo={0.5}
                                initialAspectRatio={1}
                                preview=".img-preview"
                                src={image}
                                viewMode={1}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={false}
                                responsive={true}
                                autoCropArea={1}
                                checkOrientation={false}
                                onInitialized={(instance) => {
                                    setCropper(instance);
                                }}
                                guides={true}
                            />
                            <div className="cropimgbtn">
                                <button className="btn btn-primary " type='button' onClick={getCropData}>Crop Image</button>
                                <button className="btn btn-primary mr-2" type='button' onClick={() => handleImage(cropData)}>  Upload Image</button>
                            </div>
                        </>
                        }
                    </div>
                    <div className='row'>
                        {imageOne?.map((val) => {
                            return (
                                <div className="col-md-2 my-5">
                                    <div className="tba-input-file-preview">
                                        <img
                                            src={val?.data?.url}
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Crop