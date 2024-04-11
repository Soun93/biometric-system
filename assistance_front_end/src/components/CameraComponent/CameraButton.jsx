import '../../styles/CameraButton.css';
import SvgElement from "../CommonComponents/SvgElement";


export const CameraButton = () => {
  const openCamera = () => {
    window.open('http://localhost:5173/camera', '_blank','width=600,height=400');
  }
  return (
    <div onClick={openCamera}>
      <SvgElement svgName='video' svgEvent={openCamera}/>
    </div>
  );
}

export default CameraButton;