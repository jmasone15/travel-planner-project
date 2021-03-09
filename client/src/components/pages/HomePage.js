import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import AuthContext from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import Card from "../Card";
import { Link } from "react-router-dom";
import { TimelineMax, Power1 } from "gsap/all";
import * as faIcons from "react-icons/fa";
import * as mdIcons from "react-icons/md";
import * as riIcons from "react-icons/ri";
import "./home.css";
// import bgTan from "../images/bgTan.png";
// import donde from "../images/dondeLogo.png";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.timeline = new TimelineMax({ paused: true });
  }

  componentDidMount() {
    this.timeline
      .from(this.card, 0.3, {
        display: "none",
        y: -25,
        autoAlpha: 0,
        delay: 0.25,
        ease: Power1.easeIn,
      })
      .from(this.card1, 0.1, {
        y: -25,
        autoAlpha: 0,
        ease: Power1.easeInOut,
      })
      .from(this.card2, 0.1, {
        y: -25,
        autoAlpha: 0,
        ease: Power1.easeInOut,
      })
      .from(this.card3, 0.1, {
        y: 25,
        autoAlpha: 0,
        ease: Power1.easeInOut,
      })
      .from(this.card4, 0.1, {
        y: 25,
        autoAlpha: 0,
        ease: Power1.easeInOut,
      })
      .from(this.pack, 0.1, {
        y: 25,
        autoAlpha: 0,
        ease: Power1.easeInOut,
      });
    this.timeline.play();
  }
  changePage = (e, destination) => {
    e.preventDefault();
    this.timeline.reverse();
    const timelineDuration = this.timeline.duration() * 1000;
    setTimeout(() => {
      window.location = destination;
    }, timelineDuration);
  };

  render() {
    return (
      <div className="bg">
        <div className="container">
          <div className="row">
            <div className="col">
              <div
                ref={(div) => (this.card = div)}
                className="card shadow p-3 mb-5 bg-white rounded"
              // style={{backgroundImage: `url(${bgTan})`}}
              >
                <div className="card-body">
                  <h1 className="text-center font">¿dondé?</h1>
                  <Card style={{ backgroundColor: "#E0E1CC" }}>
                    <p className="p">
                      To take the hard work of planning trip out of your hands!
                      Our site helps optimize your travel itinerary to let you
                      make the most out of your trip!
                    </p>
                  </Card>
                </div>
              </div>
              {/* <div ref={(pack) => (this.pack = pack)}>
                <Card>
                  <mdIcons.MdCardTravel style={{ fontSize: 100 }} />
                  <Link to="/packinglist">
                    <button
                      className="btn btn-warning mt-1"
                      onClick={(e) => this.changePage(e, "/packinglist")}
                    >
                      <h3 style={{ fontFamily: "[adobe-caslon-pro, serif]" }}>
                        {" "}
                        ¿packinglist?
                      </h3>
                    </button>
                  </Link>
                </Card>
              </div> */}
            </div>
            <div className="col">
              <div className="row">
                <div ref={(card1) => (this.card1 = card1)} className="col mb-3">
                  <Card>
                    <faIcons.FaRoute style={{ fontSize: 100 }} />

                    <Link to="/donde">
                      <button
                        className="btn btn-warning mt-3"
                        onClick={(e) => this.changePage(e, "/donde")}
                      >
                        <h3 style={{ fontFamily: "[adobe-caslon-pro, serif]" }}>
                          {" "}
                          ¿dondé?
                        </h3>
                      </button>
                    </Link>
                  </Card>
                </div>
                <div ref={(card2) => (this.card2 = card2)} className="col mt-">
                  <Card>
                    <faIcons.FaFileInvoiceDollar style={{ fontSize: 100 }} />

                    <Link to="/budget">
                      <button className="btn btn-warning mt-3">
                        <h3> ¿budget?</h3>
                      </button>
                    </Link>
                  </Card>
                </div>
              </div>

              <div className="row mt-3">
                <div ref={(card3) => (this.card3 = card3)} className="col mb-3">
                  <Card>
                    <mdIcons.MdCardTravel style={{ fontSize: 100 }} />
                    <Link>
                      <button
                        className="btn btn-warning mt-1"
                        href="../../images/packinglist.pdf"
                        onClick={(e) => this.changePage(e, "/packinglist")}
                      >
                        <h3 style={{ fontFamily: "[adobe-caslon-pro, serif]" }}>
                          {" "}
                        ¿packinglist?
                      </h3>
                      </button>
                    </Link>
                  </Card>
                </div>
                <div ref={(card4) => (this.card4 = card4)} className="col mt-">
                  <Card>
                    <Link to="/lodging">
                      <riIcons.RiPagesLine
                        className="text-dark"
                        style={{ fontSize: 100 }}
                      />
                      <button className="btn btn-warning mt-3">
                        <h3> ¿itinerary?</h3>
                      </button>
                    </Link>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
