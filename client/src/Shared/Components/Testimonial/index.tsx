import React from "react";

interface TestimonialProps {
  img: string;
  name: string;
  location: string;
  text: string;
}
const Testimonial: React.FC<TestimonialProps> = ({
  img,
  name,
  location,
  text,
}) => {
  return (
    <div className='slide'>
      <div className='testimonial'>
        <h5 className='testimonial__header'>{text}</h5>
        <blockquote className='testimonial__text'>{text}</blockquote>
        <address className='testimonial__author'>
          <img src={img} alt={name} className='testimonial__photo' />
          <h6 className='testimonial__name'>{name}</h6>
          <p className='testimonial__location'>{location}</p>
        </address>
      </div>
    </div>
  );
};

export default Testimonial;
