export const CarouselItems = ({ isActive, selectedImage }) => {

  const itemStyle = {
    opacity: isActive ? '1' : '0.5'
  };

  return (
    <>
      <span className="carousel-item" onClick={selectedImage} style={itemStyle}></span>
    </>
  );
}
