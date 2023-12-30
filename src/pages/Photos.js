import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import logo from "../assets/logo.png";
import { storage } from "../firebase";
import { listAll, ref, getDownloadURL } from "firebase/storage";
const Photos = () => {
  const [imageList, setImageList] = useState([]);
  const dataFetchedRef = useRef(false);
  const imageListRef = ref(storage, "images/");
  const getData = () => {
    listAll(imageListRef).then((response) => {
      const splitArray = response.items.slice(-3);
      splitArray.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  };
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getData();
  }, []);
  return (
    <>
      <div className="container">
        <img id="header" src={logo} alt={"screenshot"}></img>
        {imageList.map((img, index) => {
          return (
            <>
            <div key={index} className="container_img">
              <img className="img-pato" src={img} alt={"screenshot"}></img>
              <div className="container_logo">
                <img src={logo} alt={"screenshot"}></img>
              </div>

            </div>
               <a id="redirect_pic" href={img} target="_blank">
                 <i className="bi bi-cloud-download-fill"></i>
               </a>
              </>
          );
        })}
      </div>
    </>
  );
};

export default Photos;
