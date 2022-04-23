import { useCallback, useEffect, useReducer, useState } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Phone from "../components/Phone";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Helmet } from "react-helmet-async";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import Button from "react-bootstrap/esm/Button";
import Rating from "../components/Rating";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getError } from "../utils";
import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const PhonesScreen = () => {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });

  const [filtered, setFiltered] = useState([]);
  const [activeBrand, setActiveBrand] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/phones");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Search Products</title>
      </Helmet>
    
    <Filter
        products={products}
        setFiltered={setFiltered}
        activeBrand={activeBrand}
        setActiveBrand={setActiveBrand}
      />

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.map((product) => (
            <Col key={product.title} sm={6} md={4} lg={3} className="mb-3">
              <Phone product={product}></Phone>
            </Col>
          ))}
        </>
      )}
    </div>
  );
};

export default PhonesScreen;
