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
import PDF from "../../images/packinglist.pdf";
import travel from "../../images/traveling.jpeg";
import RouteCard from "../RouteCard";
// import donde from "../images/dondeLogo.png";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.timeline = new TimelineMax({ paused: true });
  }

  componentDidMount() {
    this.timeline
      .from(this.card, 0.4, {
        display: "none",
        y: -50,
        autoAlpha: 0,
        delay: 0.25,
        ease: Power1.easeIn,
      })
      .from(this.card1, 0.2, {
        y: -50,
        autoAlpha: 0,
        ease: Power1.easeInOut,
      })
      .from(this.card2, 0.2, {
        y: -50,
        autoAlpha: 0,
        ease: Power1.easeInOut,
      })
      .from(this.card3, 0.2, {
        y: -50,
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

  buildNewTrip = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="bg">
        <div className="container">
        
          {/* new homepage setUp */}
          <div className="row">
            <div className="card-wrapper" ref={(div) => (this.card = div)}>
              <Card
                style={{
                  backgroundImage: `url(${travel})`,
                  backgroundSize: "cover",
                  position: "relative",
                }}
              >
                <h1> ¿dondé? </h1>
                <hr />
                <p>
                  dondé (dohn-deh) </p>
                <p>
                  Welcome! Let us help you take the hard work of planning Trips out of your hands!
                  Our site helps optimize your travel itinerary to let you
                  make the most out of your trip!
                </p>
                <Link to="/profile">
                  <button
                    className="btn btn-warning"
                    onClick={(e) => this.changePage(e, "/profile")}
                  >
                    {" "}
                    View Trips{" "}
                  </button>{" "}
                </Link>
              </Card>
            </div>
          </div>
          <div className="row">
            <div className="col" ref={(card1) => (this.card1 = card1)}>
              {" "}
              <RouteCard
                title="Start Trip"
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1908&q=80"
                text="Wanting to go on a well deserved VACATION, but have no idea where to even start? Let us help you out."
              >
                <Link to="/budget">
                  <button
                    className="btn btn-warning mt-3"
                    onClick={(e) => this.changePage(e, "/budget")}
                  >
                    <h3> Start Trip </h3>
                  </button>
                </Link>
              </RouteCard>{" "}
            </div>
            <div className="col" ref={(card2) => (this.card2 = card2)}>
              {" "}
              <RouteCard
                title="Packing List"
                src="https://images.unsplash.com/photo-1479888230021-c24f136d849f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"
                text="Ever finding yourself under-packing and forgetting the most important items for your trip? Let us help you out."
              >
                <Link to="/home">
                  <button
                    className="btn btn-warning mt-3"
                    onClick={(e) => window.open(PDF)}
                  >
                    <h3> Print Packing List </h3>
                  </button>
                </Link>
              </RouteCard>{" "}
            </div>
            <div className="col" ref={(card3) => (this.card3 = card3)}>
              {" "}
              <RouteCard
                title="Itinerary"
                src="https://images.unsplash.com/photo-1515847049296-a281d6401047?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
                text="It is hard to keep track of the time when you are having fun, need help staying organized? Let us help you out."
              >
                <Link to="/itinerary">
                  <button
                    className="btn btn-warning mt-3 justify-content-center"
                    onClick={(e) => this.changePage(e, "/itinerary")}
                  >
                    <h3> View Itinerary </h3>
                  </button>
                </Link>
              </RouteCard>{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
