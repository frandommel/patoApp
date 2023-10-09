import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useRef } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";

import soundPato from "../assets/audioBienvenida.mp3";
import soundExito from "../assets/fotoConExito.mp3";
import camera from "../assets/camera.mp3"
import logro from "../assets/logro.wav.mp3";
import bienvenidosS from "../assets/bienvenidosSonido.ogg";

const videoConstraints = {
  width: 250,
  height: 350,
  facingMode: "enviroment",
};

const Camera = ({ buttonRef }) => {
  const webRef = useRef(null);
  const [isButtonDisable, setIsButtonDisable] = useState(false);

  useEffect(() => {
    buttonRef.current.focus();
  });
  useEffect(() => {
    //new Audio(bienvenidosS).play();
    //new Audio(logro).play();
  }, []);

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
      const img = dataURLtoFile(webRef.current.getScreenshot(), "image.png");

      new Audio(soundPato).play();
      setIsButtonDisable(true);
      setTimeout(() => uploadImage(img), 11500);
      setTimeout(() => new Audio(camera).play(), 11500);
      setTimeout(() => setIsButtonDisable(false), 20000);
      setTimeout(() => webRef.current.getScreenshot(), 15000);
      setTimeout(() => new Audio(soundExito).play(), 12500);
    },
    [webRef]
  );

  return (
    <>
      <Webcam
        ref={webRef}
        audio={false}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
        mirrored={true}
        screenshotQuality={1}
      />
      <button disabled={isButtonDisable} onClick={capturePhoto} ref={buttonRef}>
        click here
      </button>
    </>
  );
};

export default Camera;
