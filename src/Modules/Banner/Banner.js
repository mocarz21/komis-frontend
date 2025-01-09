import Carousel from 'react-bootstrap/Carousel';
import ImagoOne from './1.jpg';
import ImagoTwo from './2.jpg';
import ImagoThere from './3.jpg';
import './Banner.scss'

export const Banner = () => {

  return (
    <Carousel>
      <Carousel.Item>
        <img src={ImagoOne} className='d-block w-100' text="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={ImagoTwo} text="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={ImagoThere}  text="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};