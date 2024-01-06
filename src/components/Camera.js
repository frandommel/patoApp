import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useRef } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";

import AudioPatoDefinitivo  from "../assets/AudioPatoDefinitivo.mp3";
import soundExito from "../assets/fotoConExito.mp3";
import camera from "../assets/camera.mp3"

/*const videoConstraints = {
  width: 750,
  height: 1334,
  facingMode: "enviroment",
};*/

const Camera = ({ buttonRef }) => {
  const webRef = useRef(null);
  const [isButtonDisable, setIsButtonDisable] = useState(false);

  useEffect(() => {
    if(!isButtonDisable){
      window.addEventListener('click', capturePhoto);

      return () => {
        window.removeEventListener('click', capturePhoto);
      };
    }
  });

  const uploadImage = (image) => {
    if (image === null) return;
    const imgRef = ref(storage, `images/${image.lastModified}`);
    uploadBytes(imgRef, image);
  };
  function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const capturePhoto = React.useCallback(
    async (e) => {
      let img;
      new Audio(AudioPatoDefinitivo).play();
      setIsButtonDisable(true);
      setTimeout(() =>{
        img = dataURLtoFile(webRef.current.getScreenshot(), "image.png")
        new Audio(camera).play()
       
      },18000);
      setTimeout(() =>{
        uploadImage(img)
      }, 25000);
      
      setTimeout(() => new Audio(soundExito).play(), 19000);

      setTimeout(() =>{
        setIsButtonDisable(false)
      }, 37000);
    },
    [webRef]
  );

  return (
    <>
      <Webcam
        ref={webRef}
        audio={false}
        screenshotFormat="image/png"
       // videoConstraints={videoConstraints}
        mirrored={true}
        screenshotQuality={1}
      />
    </>
  );
};

export default Camera;
