import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import "./index.css";
import { endpoints } from "../api/endpoints";

// const  BACKEND_API_URL = "https://backend-for-browser-production.up.railway.app"

const SocialAuth = () => {
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("location -------", location)
    const values = queryString.parse(location.search);
    const code = values.code ? values.code : null;
    if (code) {
      onGogglelogin();
    }
  }, []);

  const googleLoginHandler = (code) => {
    // console.log(code);
    let url = `${endpoints.login.google}${code}`;
    // console.log(url);
    return axios.get(url).then((res) => {
        console.log("res from backend", res.data);
        // localStorage.setItem("goggleFirstName", res.data.user.first_name);
        // localStorage.setItem("authTokens", res.data.access);
        // console.log("data", res)
        localStorage.setItem("authTokens", JSON.stringify(res.data));
        navigate("/step4");
        return res.data;
      })
      .catch((err) => {
        console.log("error", err);
        return err;
      });
  };

  const onGogglelogin = async () => {
    googleLoginHandler(location.search);
  };

  return (
    <div className="loading-icon-container">
      <div className="loading-icon">
        <div className="loading-icon__circle loading-icon__circle--first"></div>
        <div className="loading-icon__circle loading-icon__circle--second"></div>
        <div className="loading-icon__circle loading-icon__circle--third"></div>
        <div className="loading-icon__circle loading-icon__circle--fourth"></div>
      </div>
      <small className=" text-center mr-2">Just a moment</small>
    </div>
  );
};

export default SocialAuth;


 // axios.get(`${BACKEND_API_URL}/api/googleUserList/`, {
        //   headers: {
        //     Authorization: `Bearer ${res.data.access}`
        //   }
        // })
        // .then(res => {
        // let users = "";
        // console.log(res.data);
        // for(let x of res.data){
        // users += x + ",";
        // }
        // localStorage.setItem("listUsers",users);
        // console.log("response from new endpoint", res)
        // })
        // .catch(err => {
        //   console.log("error from new endpoint", err)
        // })