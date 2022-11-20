import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Button, Container, Form, Card, Col } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import { imagesUrl, Orders } from "../conexiones/urls";
import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";
import "../App.css";

function Menu2() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit] = useState(4);
  const [sortFilterValue, setSortFilterValue] = useState("");
  const [operation, setOperation] = useState("");

  useEffect(() => {
    loadUsersData(0, 4, 0);
  }, []);

  const loadUsersData = async (
    start,
    end,
    increase,
    optType = null,
    filterOrSortValue
  ) => {
    switch (optType) {
      case "search":
        setOperation(optType);
        setSortValue("");
        return await axios
          .get(
            `http://localhost:3000/arepas?q=${value}&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
      case "sort":
        setOperation(optType);
        setSortFilterValue(filterOrSortValue);
        return await axios
          .get(
            `http://localhost:3000/arepas?_sort=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
      case "filter":
        setOperation(optType);
        setSortFilterValue(filterOrSortValue);
        return await axios
          .get(
            `http://localhost:3000/arepas?status=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
      default:
        return await axios
          .get(`http://localhost:3000/arepas?_start=${start}&_end=${end}`)
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
    }
  };

  console.log("data", data);

  const handleReset = () => {
    setOperation("");
    setValue("");
    setSortFilterValue("");
    setSortValue("");
    loadUsersData(0, 4, 0);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    loadUsersData(0, 4, 0, "search");
    // return await axios
    //   .get(`http://localhost:5000/users?q=${value}`)
    //   .then((response) => {
    //     setData(response.data);
    //     setValue("");
    //   })
    //   .catch((err) => console.log(err));
  };

  const renderPagination = () => {
    if (data.length < 4 && currentPage === 0) return null;
    if (currentPage === 0) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn onClick={() => loadUsersData(4, 8, 1, operation)}>
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadUsersData(
                  (currentPage - 1) * 4,
                  currentPage * 4,
                  -1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>

          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadUsersData(
                  (currentPage + 1) * 4,
                  (currentPage + 2) * 4,
                  1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadUsersData(
                  (currentPage - 1) * 4,
                  currentPage * 4,
                  -1,
                  operation
                )
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };

  return (
    <Container fluid>
      <h1 className="letrica text-white">!!!Arepas!!!</h1>
      <div className="border-bottom border border-white mx-auto"></div>
      <div className="pt-3">
        <Navbar expand="lg" bg="dark" variant="dark" className="rounded">
          <Container>
            <form
              style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center",
              }}
              className="d-flex input-group w-auto"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search Name ... "
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />

              <MDBBtn type="submit" color="dark">
                Search
              </MDBBtn>
            </form>
          </Container>
        </Navbar>
      </div>
      <Row xs={3} md={3} className="g-4">
        {data.map((item) => (
          <Col key={item.id}>
            <Container>
              <Card>
                <Link to="/Details" state={{ Id: item.id }}>
                  <Card.Img
                    variant="top"
                    src={`${imagesUrl + item.Image}`}
                    className="img-thumbnail"
                  />
                </Link>
                <Card.Body className="description">
                  <Card.Title>{item.Name}</Card.Title>
                  <Card.Text>{item.Description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button className="left" variant="outline-success">
                    Ordenar por ${item.Price}!!
                  </Button>
                </Card.Footer>
              </Card>
            </Container>
          </Col>
        ))}
      </Row>

      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "250px",
          alignContent: "center",
        }}
      >
        {renderPagination()}
      </div>
    </Container>
  );
}

export default Menu2;