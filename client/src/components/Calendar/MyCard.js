import { React, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Tab, Row, Col, Container, ListGroup } from "react-bootstrap";
import Attraction from "./Attraction";
import "../../css/searchForm.css"

function MyCard(props) {

    const [newActivity, setNewActivity] = useState({});

    useEffect(() => {

    }, [props.activitiesArray])


    async function handleBtnClick(name, location, address, photo_reference) {
        await setNewActivity({ name, location, address, photo_reference, id: uuidv4() })
        setActs();
    }

    async function setActs() {
        await props.setActivitiesArray([...props.activitiesArray, newActivity])
    }
    return (
        // style={{ width: "auto", height: "750px", overflowY: "scroll" }}
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link">
            <Row>
                <Col sm={3}>
                    <ListGroup style={{ overflowY: "scroll", width: "auto", height: "750px" }}>
                        {props.data.map((place, index) => (
                            <ListGroup.Item action key={index} href={`#link${place.name}`}>
                                {place.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        {props.data.map((place, index) => (
                            <Tab.Pane eventKey={`#link${place.name}`} key={index}>
                                <Container>
                                    <Row>
                                        <Col>
                                            <Attraction
                                                title={place.name}
                                                img={place.photos}
                                                rating={place.rating}
                                                userRatings={place.user_ratings_total}
                                                address={place.formatted_address}
                                                id={index}
                                                btnClick={handleBtnClick}
                                                geo={place.geometry.location}
                                            />
                                        </Col>
                                    </Row>
                                </Container>
                            </Tab.Pane>
                        ))}
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container >
    )
}

export default MyCard;