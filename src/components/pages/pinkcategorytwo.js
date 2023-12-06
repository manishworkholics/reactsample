import React, { useState, useEffect } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Cardskeleton from "../Template/Cardskeleton";
import Navbar from "./../Template/Navbar";
import Footer from "./../Template/Footer";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Helmet from "react-helmet";



const Category = () => {
  const { category } = useParams();
  const [catid, Setcatid] = useState();
  const [province, Setprovince] = useState("");
  const [ethicity, Setethicity] = useState("");
  const [isloading, setIsloading] = useState(true);
  let citylocal = sessionStorage.getItem("city");
  if (citylocal === null || "") {
    citylocal = "City Of Toronto";
  }
  let provincelocal = sessionStorage.getItem("province");
  if (provincelocal === null || "") {
    provincelocal = "Ontario";
  }
  const [data, Setdata] = useState("");
  const [subcategory, Setsubcategory] = useState("");
  const [post, Setpost] = useState("");
  const [complet_cat_data, setcomplet_cat_data] = useState("");
  const [filters, setFilters] = useState({ categoryid: catid, subcategoryid: "", city: citylocal, ethicity: "", isVerified: "", });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFilters({ ...filters, [name]: value });
  };

  const getidbycategory = () => {
    fetch(
      `https://api.pinkspot.cc/api/v1/category/getCatageryIdBySlug/${category}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        Setcatid(data?.catgoryid);
        setcomplet_cat_data(data?.categoryFound);
      });
  };

  useEffect(() => {
    getidbycategory();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getsubcategory = () => {
    fetch(`https://api.pinkspot.cc/api/v1/category/getsubcategorybycatid/${catid}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        Setsubcategory(data);
      });
  };
  const getpost = () => {
    fetch(`https://api.pinkspot.cc/api/v1/postad/getpostadby_category_id/${catid}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        Setpost(data);
        setIsloading(false);
      });
  };
  const clear = () => {
    sessionStorage.setItem("city", "");
    sessionStorage.setItem("province", "");
    getpost();
  };

  const getfilterpost = async () => {
    const { subcategoryid, city, ethicity, isVerified } = filters;
    sessionStorage.setItem("city", city);
    const data = fetch("https://api.pinkspot.cc/api/v1/filter/getPostAdByCategoryfilter",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ categoryid: catid, subcategoryid: subcategoryid, city: city, ethicity: ethicity, isVerified: isVerified, }),
      }
    );
    const response = await data;
    const res = await response.json();
    Setpost(res);
    setIsloading(false);
  };

  const getethnicity = () => {
    fetch(`https://api.pinkspot.cc/api/v1/getall-ethnicity`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        Setethicity(data);
      });
  };

  const getprovince = () => {
    fetch(`https://api.pinkspot.cc/api/v1/getallprovince`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        Setprovince(data);
      });
  };

  const getcity = (e) => {
    const id = e.target.value;
    sessionStorage.setItem("province", id);
    fetch(`https://api.pinkspot.cc/api/v1/getallcity/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        Setdata(data);
      });
  };

  useEffect(() => {
    getprovince();
    getfilterpost();
    getsubcategory();
    getethnicity();
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, [catid]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Navbar />
      <Helmet>
        <title>{complet_cat_data?.seotitle}</title>
        <meta name="description" content={complet_cat_data?.seodescription} />
        <meta name="keywords" content={complet_cat_data?.seokeyword} />
        <meta name="author" content="PINK SPOT" />
        <meta property="og:title" content={complet_cat_data?.seotitle} />
        <meta property="og:description" content={complet_cat_data?.seodescription} />
        <meta property="og:image" content={complet_cat_data?.seoimageurl} />
        <meta property="og:url" content={`https://pinkspot.cc/${category}`} />
      </Helmet>

      <div className="container mt-2 mobile">
        <div className="row">
          <div className="col-6 col-md-2">
            <select className="form-select filter-btn" onChange={getcity}>
              {provincelocal === "" ? (<option>Province</option>) : (<option>{provincelocal}</option>)}
              {province?.data?.map((val, index) => {
                return (
                  <option key={index} value={val._id} selected={provincelocal === val._id ? "selected" : null} >  {val.name} </option>
                );
              })}
            </select>
          </div>
          <div className="col-6 col-md-2">
            <button className="sub-cat-btn" onClick={getfilterpost}> Search </button>
          </div>
          <div className="col-6 col-md-2">
            <select className="form-select filter-btn" name="city" onChange={handleChange}  >
              {citylocal === "" ? (<option>City</option>) : (<option>{citylocal}</option>)}
              {data?.data?.map((val, index) => {
                return (
                  <option key={index} value={val.name}>
                    {val.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-6 col-md-2">
            <button className="sub-cat-btn" onClick={clear} style={{ background: "#F6ACCA" }} >  Clear  </button>
          </div>
          <div className="col-6 col-md-2">
            <select className="form-select  filter-btn" name="subcategoryid" onChange={handleChange} >
              <option>Sub-Category</option>
              {subcategory.data?.map((val, index) => {
                return (
                  <option key={index} value={val._id}>
                    {val.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-6 col-md-2">
            <select className="form-select filter-btn" name="isVerified" onChange={handleChange} >
              <option>Verified</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="col-6 col-md-2">
            <select className="form-select filter-btn" name="ethicity" onChange={handleChange} >
              <option>Ethnicity</option>
              {ethicity?.data?.map((val, index) => {
                return (
                  <option key={index} value={val.name}>
                    {val.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      <div className="container mt-2 moniter">
        <div className="row">
          <div className="row filter-box">
            <div className="col-md-3">
              <select className="form-select  filter-btn" name="subcategoryid" onChange={handleChange} >
                <option>Sub-Category </option>
                {subcategory.data?.map((val, index) => {
                  return (
                    <option key={index} value={val._id}>
                      {val.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-select filter-btn" name="ethicity" onChange={handleChange}  >
                <option>Ethnicity</option>
                {ethicity?.data?.map((val, index) => {
                  return (
                    <option key={index} value={val.name}>
                      {val.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-select filter-btn" name="isVerified" onChange={handleChange} >
                <option>Verified</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-select filter-btn" onChange={getcity}>
                {provincelocal === "" ? (<option>Province</option>) : (<option>{provincelocal}</option>)}
                {province?.data?.map((val, index) => {
                  return (
                    <option key={index} value={val._id} selected={provincelocal === val._id ? "selected" : null}  > {val.name} </option>
                  );
                })}
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-select filter-btn" name="city" onChange={handleChange} >
                {citylocal === "" ? (<option>City</option>) : (<option>{citylocal}</option>)}
                {data?.data?.map((val, index) => {
                  return (
                    <option key={index} value={val.name}>  {val.name} </option>
                  );
                })}
              </select>
            </div>
            <div className="col-md-2">
              <button className="sub-cat-btn" onClick={getfilterpost} style={{ background: "#643E79", color: "white" }} >  Search  </button>
            </div>
            <div className="col-md-2">
              <button className="sub-cat-btn" onClick={clear} style={{ background: "#F6ACCA" }}  >  Clear  </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container box-detail" style={{ minHeight: "100vh" }}>
        <div className="row d-none-desktop">
          {
            post.data?.map((val, index) => {
              return (
                <div className="col-md-3">
                  <Link to={`/profile/${val?.city.split(" ").join("-")}/${val?.slug}`} state={{ data: val }} className="categeory-card" id={index}  >
                    <div className="img-box"> <img src={val.image1} alt="sgdg" /> </div>
                    <div className="card-text">
                      <h6>{val.title}</h6>
                      <span className="text-capitalize">City: {val.city}</span>
                      <br /> <span>Name: {val.name}</span> <br />
                      <span>Age: {val.age}</span> <br />
                      <span className="text-capitalize"> Ethnicity: {val.ethicity} </span>
                      <br />
                      <br />
                      {/* {val.isVerified !== false ? (<button className="btn"> <img className="verified-logo" src={require("../img/verified.png")} alt="sgdg" /> Verified </button>) : ("")} */}
                    </div>
                  </Link>
                </div>
              );
            })
          }
        </div>

        <div className="d-none-mobile row">
          <SkeletonTheme >
            {isloading ? (
              <>
                <Cardskeleton />
                <Cardskeleton />
                <Cardskeleton />
                <Cardskeleton />
                <Cardskeleton />
                <Cardskeleton />
                <Cardskeleton />
                <Cardskeleton />
              </>
            ) : (
              <>
                {post.data?.map((val, index) => {
                  return (
                    <div className="col-md-3"> <Link to={`/profile/${val?.city.split(" ").join("-")}/${val?.slug}`} state={{ data: val }} id={index} >
                      <div className="card mb-4">
                        <div className="card-box">
                          <div className="card-img"> <img src={val.image1} className="card-img-top" alt="..." />
                          </div>
                          <div className="card-content">
                            <h3 className="per-name">{val.name}</h3>
                            <h4 className="per-ethnicity">{val.ethicity}</h4>
                            <h4 className="per-age">Age :{val.age}</h4>
                            <h5 className="per-city"> <span> <img src={require("../img/locatn.png")} alt="" /> </span>{" "} {val.city}  </h5>
                            <h4 className="per-descriptn"> {val.title}</h4>
                          </div>
                        </div>
                      </div>
                    </Link>
                    </div>
                  );
                })}
              </>
            )}
          </SkeletonTheme>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Category;
