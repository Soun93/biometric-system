import { useEffect, useRef, useState } from "react";
import '../../styles/CameraPage.css';

export function CameraPage() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);
  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    })
    .then(stream => {
      let video = videoRef.current;
      video.srcObject = stream;
      video.play();
    })
    .catch (error => {
      console.error(error);
    })
  }

  useEffect(() => { getVideo(); }, [videoRef])
  return (
    <>
      <div className="camera-page-container">

        <div className="camera">
          <video ref={videoRef}></video>
          <button>SNAP!</button>
        </div>
        <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
          <canvas ref={photoRef}></canvas>
          <button>CLOSE!</button>
        </div>
      </div>
    </>
  );
}

export default CameraPage;