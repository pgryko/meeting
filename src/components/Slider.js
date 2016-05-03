import React from 'react'
import Slider from 'react-slick'

export default class SimpleSlider extends React.Component{
  render () {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
        <div><h3>5</h3></div>
        <div><h3>6</h3></div>
      </Slider>
    );
  }
};

// export default class Contacts extends React.Component {
//   render() {
//     return <div>
//       {/* <!-- Intro Full Width Slider --> */}
//       <section class="master-slider fw-slider content-slider ms-skin-default space-bottom" id="intro-slider">
//         <div class="ms-slide" style={{"background-image": "url(img/intro/slider/bg.jpg)"}}>
//           <div class="container padding-top-3x padding-bottom-3x">
//             <div class="row padding-top-3x padding-bottom-2x">
//               <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 text-center">
//                 <h1 class="text-light">Advanced Multi-Purpose Technology Template</h1>
//                 <h4 class="text-light text-thin">Nucleus incorporates both great presentational landing pages and components for building full-featured website.</h4>
//                 <div class="padding-top">
//                   <a href="#" class="btn btn-primary waves-effect waves-light">Purchase Now</a>
//                   <a href="#demos" class="btn btn-ghost btn-light waves-effect scroll-to" data-offset-top="55">View Demos</a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>{/*<!-- .ms-slide -->*/}
//       </section>{/*<!-- .master-slider.ms-skin-default -->*/}
//     </div>
//   }
// }
