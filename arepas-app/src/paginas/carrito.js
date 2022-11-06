import React, { Component, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { log } from "../actions/actions";
import { shopitem } from "../actions/actions";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Container, Form, Card, Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import "../App.css";

const cookies = new Cookies();

function Carrito(props) {
  const dispatch = new useDispatch();

  let id = cookies.get("id");
  let Email = cookies.get("Email");
  let Password = cookies.get("Email");
  let FirstName = cookies.get("FirstName");
  let LastName = cookies.get("LastName");
  let BirthofDate = cookies.get("BirthofDate");
  let RegisterDate = cookies.get("RegisterDate");
  let Address = cookies.get("Address");
  let PhoneNumber = cookies.get("PhoneNumber");

  let xd = useSelector((state) => state.car.fetchedSpendings);

  const [myArray, updateMyArray] = useState([]);

  const GetItem = async (id) => {
    await axios
      .get(`http://localhost:3000/arepas?id=${id}`)
      .then((response) => {
        updateMyArray((arr) => [...arr, ...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(
      log(
        id,
        Email,
        Password,
        FirstName,
        LastName,
        BirthofDate,
        RegisterDate,
        Address,
        PhoneNumber
      )
    );
    for (let i = 0; i < xd.length; i++) {
      GetItem(xd[i]);
    }
  }, []);

  if (xd.length > 0) {
    console.log(myArray);
    return (
      <Row xs={3} md={3} className="g-4">
        {myArray.map((item) => (
          <Col key={item.id} >
            <Container>
              <Card>
                <Card.Img variant="top" className="img-thumbnail" />

                <Card.Body className="description">
                  <Card.Title>{item.Name}</Card.Title>
                  <Card.Text>{item.Description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button
                    className="left"
                    variant="outline-success"
                    onClick={() => dispatch(shopitem(item.id))}
                  >
                    Ordenar por ${item.Price}!!
                  </Button>
                </Card.Footer>
              </Card>
            </Container>
          </Col>
        ))}
      </Row>
    );
  } else if (xd.length === 0) {
    return <h1 className="letrica text-white">carrito vacio</h1>;
  }
}

export default Carrito;