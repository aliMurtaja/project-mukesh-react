import React from "react";
import "./styles.scss";

export default () => {
  return (
    <div>
      {/* slider_area_start */}
      <div className="slider_area">
        <div className="single_slider  d-flex align-items-center slider_bg_1">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-xl-8">
                <div className="slider_text text-center justify-content-center">
                  <p>For Personal &amp; Business</p>
                  <h3>Global Logistic Service For Business</h3>
                  <a className="boxed-btn3" href="service.html">
                    Our Services
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* slider_area_end */}
      <div className="transportaion_area">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="single_transport">
                <div className="icon">
                  <img
                    src={`${process.env.PUBLIC_URL}/theme/img/svg_icon/airplane.png`}
                    alt=""
                  />
                </div>
                <h3>Transportation</h3>
                <p>
                  Esteem spirit temper too say adieus who direct esteem. It look
                  estee luckily or picture placing drawing.
                </p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="single_transport">
                <div className="icon">
                  <img
                    src={`${process.env.PUBLIC_URL}/theme/img/svg_icon/live.png`}
                    alt=""
                  />
                </div>
                <h3>Live Monitoring</h3>
                <p>
                  Esteem spirit temper too say adieus who direct esteem. It look
                  estee luckily or picture placing drawing.
                </p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="single_transport">
                <div className="icon">
                  <img
                    src={`${process.env.PUBLIC_URL}/theme/img/svg_icon/world.png`}
                    alt=""
                  />
                </div>
                <h3>Worldwide Service</h3>
                <p>
                  Esteem spirit temper too say adieus who direct esteem. It look
                  estee luckily or picture placing drawing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="service_area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="section_title mb-50 text-center">
                <h3>Services We Offer</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="service_active owl-carousel">
                <div className="single_service">
                  <div className="thumb">
                    <img
                      src={`${process.env.PUBLIC_URL}/theme/img/service/1.png`}
                      alt=""
                    />
                  </div>
                  <div className="service_info">
                    <h3>
                      <a href="service_details.html">Ocean Freight</a>
                    </h3>
                    <p>
                      Esteem spirit temper too say adieus who direct esteem.
                    </p>
                  </div>
                </div>
                <div className="single_service">
                  <div className="thumb">
                    <img
                      src={`${process.env.PUBLIC_URL}/theme/img/service/2.png`}
                      alt=""
                    />
                  </div>
                  <div className="service_info">
                    <h3>
                      <a href="service_details.html">Land Transport</a>
                    </h3>
                    <p>
                      Esteem spirit temper too say adieus who direct esteem.
                    </p>
                  </div>
                </div>
                <div className="single_service">
                  <div className="thumb">
                    <img
                      src={`${process.env.PUBLIC_URL}/theme/img/service/3.png`}
                      alt=""
                    />
                  </div>
                  <div className="service_info">
                    <h3>
                      <a href="service_details.html">Air Freight</a>
                    </h3>
                    <p>
                      Esteem spirit temper too say adieus who direct esteem.
                    </p>
                  </div>
                </div>
                <div className="single_service">
                  <div className="thumb">
                    <img
                      src={`${process.env.PUBLIC_URL}/theme/img/service/1.png`}
                      alt=""
                    />
                  </div>
                  <div className="service_info">
                    <h3>
                      <a href="service_details.html">Ocean Freight</a>
                    </h3>
                    <p>
                      Esteem spirit temper too say adieus who direct esteem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* contact_action_area  */}
      <div className="contact_action_area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-7 col-md-6">
              <div className="action_heading">
                <h3>100% secure and safe</h3>
                <p>
                  Esteem spirit temper too say adieus who direct esteem. It look
                  estee luckily or picture placing drawing.
                </p>
              </div>
            </div>
            <div className="col-xl-5 col-md-6">
              <div className="call_add_action">
                <a href="/" className="boxed-btn3">
                  +10 123 457 356
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /contact_action_area  */}
      {/* chose_area  */}
      <div className="chose_area ">
        <div className="container">
          <div className="features_main_wrap">
            <div className="row  align-items-center">
              <div className="col-xl-5 col-lg-5 col-md-6">
                <div className="about_image">
                  <img
                    src={`${process.env.PUBLIC_URL}/theme/img/about/about.png`}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="features_info">
                  <h3>Why Choose Us?</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit sed
                    do eiusmod tempor incididunt.
                  </p>
                  <ul>
                    <li> Apartments frequently or motionless. </li>
                    <li>
                      {" "}
                      Duis aute irure dolor in reprehenderit in voluptate.{" "}
                    </li>
                    <li> Voluptatem quia voluptas sit aspernatur.</li>
                  </ul>
                  <div className="about_btn">
                    <a className="boxed-btn3-line" href="about.html">
                      About Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*/ chose_area  */}
      {/* counter_area  */}
      <div className="counter_area">
        <div className="container">
          <div className="offcan_bg">
            <div className="row">
              <div className="col-xl-3 col-md-3">
                <div className="single_counter text-center">
                  <h3>
                    {" "}
                    <span className="counter">42</span> <span>+</span>{" "}
                  </h3>
                  <p>Countries Covered</p>
                </div>
              </div>
              <div className="col-xl-3 col-md-3">
                <div className="single_counter text-center">
                  <h3>
                    {" "}
                    <span className="counter">97</span> <span>+</span>{" "}
                  </h3>
                  <p>Business Success</p>
                </div>
              </div>
              <div className="col-xl-3 col-md-3">
                <div className="single_counter text-center">
                  <h3>
                    {" "}
                    <span className="counter">2342</span>
                  </h3>
                  <p>Happy Client</p>
                </div>
              </div>
              <div className="col-xl-3 col-md-3">
                <div className="single_counter text-center">
                  <h3>
                    {" "}
                    <span className="counter">3245</span>
                  </h3>
                  <p>Business Done</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /counter_area  */}
      {/* testimonial_area  */}
      <div className="testimonial_area">
        <div className="container">
          <div className="row">
            <div className="col-xl-7">
              <div className="testmonial_active owl-carousel">
                <div className="single_carousel">
                  <div className="single_testmonial text-center">
                    <div className="quote">
                      <img
                        src={`${process.env.PUBLIC_URL}/theme/img/svg_icon/quote.svg`}
                        alt=""
                      />
                    </div>
                    <p>
                      Donec imperdiet congue orci consequat mattis. Donec rutrum
                      porttitor sollicitudin. Pellentesque id dolor tempor
                      sapien feugiat ultrices.
                    </p>
                    <div className="testmonial_author">
                      <div className="thumb">
                        <img
                          src={`${process.env.PUBLIC_URL}/theme/img/case/testmonial.png`}
                          alt=""
                        />
                      </div>
                      <h3>Robert Thomson</h3>
                      <span>Business Owner</span>
                    </div>
                  </div>
                </div>
                <div className="single_carousel">
                  <div className="single_testmonial text-center">
                    <div className="quote">
                      <img
                        src={`${process.env.PUBLIC_URL}/theme/img/svg_icon/quote.svg`}
                        alt=""
                      />
                    </div>
                    <p>
                      Donec imperdiet congue orci consequat mattis. Donec rutrum
                      porttitor sollicitudin. Pellentesque id dolor tempor
                      sapien feugiat ultrices.
                    </p>
                    <div className="testmonial_author">
                      <div className="thumb">
                        <img
                          src={`${process.env.PUBLIC_URL}/theme/img/case/testmonial.png`}
                          alt=""
                        />
                      </div>
                      <h3>Robert Thomson</h3>
                      <span>Business Owner</span>
                    </div>
                  </div>
                </div>
                <div className="single_carousel">
                  <div className="single_testmonial text-center">
                    <div className="quote">
                      <img
                        src={`${process.env.PUBLIC_URL}/theme/img/svg_icon/quote.svg`}
                        alt=""
                      />
                    </div>
                    <p>
                      Donec imperdiet congue orci consequat mattis. Donec rutrum
                      porttitor sollicitudin. Pellentesque id dolor tempor
                      sapien feugiat ultrices.
                    </p>
                    <div className="testmonial_author">
                      <div className="thumb">
                        <img
                          src={`${process.env.PUBLIC_URL}/theme/img/case/testmonial.png`}
                          alt=""
                        />
                      </div>
                      <h3>Robert Thomson</h3>
                      <span>Business Owner</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /testimonial_area  */}
      {/* Estimate_area start  */}
      <div className="Estimate_area overlay">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-5">
              <div className="Estimate_info">
                <h3>Get free Estimate</h3>
                <p>
                  Esteem spirit temper too say adieus who direct esteem. It look
                  estee luckily or picture placing.
                </p>
                <a href="/" className="boxed-btn3">
                  +10 672 457 356
                </a>
              </div>
            </div>
            <div className="col-xl-8 col-lg-8 col-md-7">
              <div className="form">
                <form action="#">
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="input_field">
                        <input type="text" placeholder="Your name" />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input_field">
                        <input type="email" placeholder="Email" />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="input_field">
                        <textarea placeholder="Message" defaultValue={""} />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="input_field">
                        <button className="boxed-btn3-line" type="submit">
                          Get Estimate
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Estimate_area end  */}
      {/* footer start */}
      <footer className="footer">
        <div className="footer_top">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-md-6 col-lg-3">
                <div className="footer_widget">
                  <h3 className="footer_title">Services</h3>
                  <ul>
                    <li>
                      <a href="/">Air Transportation</a>
                    </li>
                    <li>
                      <a href="/">Ocean Freight</a>
                    </li>
                    <li>
                      <a href="/">Ocean Cargo</a>
                    </li>
                    <li>
                      <a href="/">Logistics</a>
                    </li>
                    <li>
                      <a href="/">Warehouse Moving</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-2 col-md-6 col-lg-2">
                <div className="footer_widget">
                  <h3 className="footer_title">Company</h3>
                  <ul>
                    <li>
                      <a href="/">About</a>
                    </li>
                    <li>
                      <a href="/">News</a>
                    </li>
                    <li>
                      <a href="/"> Testimonials</a>
                    </li>
                    <li>
                      <a href="/"> Why Us?</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 col-lg-3">
                <div className="footer_widget">
                  <h3 className="footer_title">Industries</h3>
                  <ul>
                    <li>
                      <a href="/">Chemicals</a>
                    </li>
                    <li>
                      <a href="/">Automotive</a>
                    </li>
                    <li>
                      <a href="/"> Consumer Goods</a>
                    </li>
                    <li>
                      <a href="/">Life Science</a>
                    </li>
                    <li>
                      <a href="/">Foreign Trade</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-md-6 col-lg-4">
                <div className="footer_widget">
                  <h3 className="footer_title">Subscribe</h3>
                  <form action="#" className="newsletter_form">
                    <input type="text" placeholder="Enter your mail" />
                    <button type="submit">Subscribe</button>
                  </form>
                  <p className="newsletter_text">
                    Esteem spirit temper too say adieus who direct esteem
                    esteems luckily.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copy-right_text">
          <div className="container">
            <div className="footer_border" />
            <div className="row">
              <div className="col-xl-12">
                <p className="copy_right text-center">SwiftPac</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/*/ footer end  */}
    </div>
  );
};
