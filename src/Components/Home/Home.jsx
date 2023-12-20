import { Link } from "react-router-dom";
import img1 from "../../assest/images/group-diverse-people-having-business-meeting 2.png";
import fine from "../../assest/images/fineLogo.png";
import fayum from "../../assest/images/fayum gas.png";
import redBull from "../../assest/images/Red Bull.png";
import air from "../../assest/images/airaraia.png";
import arab from "../../assest/images/arab afrian investment management.png"
import lastImg from "../../assest/images/successfulHands.png"
import BlogCard from "./BlogCard";
import Counter from "./Counter";
import './Home.css'

import OurService from "./OurService";
import ExploreBlogs from "../Blogs/ExploreBlogs";
import { Button, Col, Container, Row } from "react-bootstrap";
import MainSection from "./MainSection"
import OurValues from "./OurValues";

const Home = () => {
  return (
    <div style={{ fontFamily: 'ZCOOL XiaoWei, sans-serif' }}>
      <MainSection />
      {/* ------- */}
      <div className="container-our-value w-100">
        <div className="rate-our-values m-auto d-flex justify-content-around mb-5 border-secondary-subtle rounded-4">
          <div className="rate-one text-lg-center">
            <Counter endValue={30} name={"Years of Experience"} />
            <Counter endValue={50} name={"Clients in Egypt"} />
            <Counter endValue={100} name={"Assignment in all Sectors"} />
          </div>
        </div>
        <OurValues />
      </div>

      <section className="our-services">
        <h1 className="fs-1 text-lg-center py-5 text-our-services">OUR SERVICES</h1>
        <Container>
          <Row xs={1} md={3} className="g-4">
            <OurService title="Tax Services & Consultations" num='01' />
            <OurService title="Auditing & Assurance" num='02' />
            <OurService title="Bookkeeping" num='03' />
            <OurService title="Investment & Incorporation" num='04' />
            <OurService title="Social Insurance" num='05' />
            <OurService title="Training Workshops" num='06' />
          </Row>
          <div className="text-center py-3">
            <Link to="/contact" className="btn btn-primary text-decoration-none rounded-pill px-5 my-3" style={{ fontSize: "26px" }}>Contact Us</Link>
          </div>
        </Container>
      </section>

      <section className="sponserd">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} sm={4}>
              <h2 className="fs-2" style={{ fontSize: "50px" }}>OUR CLIENTS</h2>
            </Col>
            <Col xs={6} sm={2} md={1}>
              <img className="img-fluid mt-3 mb-3" src={fine} alt="fineLogo" />
            </Col>
            <Col xs={6} sm={2} md={1}>
              <img className="img-fluid mb-3" src={arab} alt="arab afrian" />
            </Col>
            <Col xs={6} sm={2} md={1}>
              <img className="img-fluid" src={redBull} alt="Red Bull" />
            </Col>
            <Col xs={6} sm={2} md={1}>
              <img className="img-fluid" src={fayum} alt="fayum gas" />
            </Col>
            <Col xs={6} sm={2} md={1}>
              <img className="img-fluid" src={air} alt="airaraia" />
            </Col>
          </Row>
        </Container>
      </section>
      <ExploreBlogs />
      {/* <div className="container">
        <section className="our-latest-blogs mt-5">
          <h1 className="fs-1">Explore our Latest Blogs</h1>
          <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
            <BlogCard />
            <BlogCard />
            <BlogCard />

          </div>
          <div className="mt-3" style={{ float: "right" }}>
            <Link to="/allblog" className="text-decoration-none fs-5 text-dark">View All <i class="fas fa-chevron-right"></i></Link>
          </div>
        </section>
        <section className="question mb-5" style={{ marginTop: "11rem" }}>
          <div className="container-question">
            <div className="card bg-dark text-white rounded-5">
              <img src={lastImg} className="card-img" alt="..." />
              <div className="card-img-overlay">
                <ul className="d-flex justify-content-around mt-3">
                  <li><h1 className="card-text-question  mt-lg-4">Have AQuestion?Let's Have A TalkTogether</h1></li>
                  <li><input className="btn btn-primary btn-question m-auto mt-lg-5 rounded-4 w-auto pe-5 ps-5 p-2 fs-5 " type="submit" value="Contact Us" /></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div> */}
    </div >
  );
}

export default Home;