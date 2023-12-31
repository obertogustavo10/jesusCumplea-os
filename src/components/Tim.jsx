import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Container, Carousel, Form } from "react-bootstrap";
import "../App.css";
import Granaderos from "../assets/granaderos.jpg";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { addProduct } from "../firebase/api";
import Tim4 from "../assets/katy2.jpg";
import Tim1 from "../assets/katy3.jpg";
import Tim2 from "../assets/katy4.jpg";
import Tim3 from "../assets/katy5.jpg";
import Tim5 from "../assets/katy6.jpg";
import { Howl, Howler } from "howler";
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";
const Tim = () => {
  const initialState = {
    nombre: "",
    confirmo: false,
    mensaje: "",
    noConfirmo: false,
  };
  const [state, setState] = useState(initialState);
  const [index, setIndex] = useState(0);
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [play, setPlay] = useState(false);
  const [flag, setFlag] = useState(true);

  const sound = useRef(null);

  // countDown
  let interval = useRef();
  const updateCountdown = () => {
    const targetDate = new Date("Dec 19, 2023 15:00:00").getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const timeDifference = targetDate - now;

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      if (timeDifference < 0) {
        //stop our timer
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };
  useEffect(() => {
    setTimeout(() => {
      setFlag(false);
    }, 3000);
  }, []);

  useEffect(() => {
    updateCountdown();
    return () => {
      clearInterval(interval.current);
    };
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handlePlay = () => {
    sound.current = new Howl({
      src: ["mp3/happy.mp3"],
      autoplay: false, // Reemplaza 'ruta-de-tu-musica.mp3' con la ruta de tu música
    });
    sound.current.play();
    setPlay(true);
  };
  const handlePause = () => {
    if (sound.current) {
      sound.current.stop();
      setPlay(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checked && !checked1) {
      toast("Ups debes presionar: Si! confirmo o No puedo:( para continuar", {
        type: "error",
        autoClose: 2000,
      });
    } else {
      state.confirmo = checked;
      state.noConfirmo = checked1;
      const collectionName = "cumpleJesus";
      await addProduct(state, collectionName);
      toast("Confirmación enviada", {
        type: "success",
        autoClose: 2000,
      });
      setState(initialState)
    }
  };

  return (
    <>
      {play ? (
        <div
          onClick={handlePause}
          style={{
            position: "fixed",
            bottom: 10,
            left: 10,
            backgroundColor: "#252525",
            padding: "5px",
            borderRadius: 50,
            zIndex: 100,
          }}
        >
          <AiOutlinePauseCircle color="#fff" size={30} />
        </div>
      ) : (
        <div
          onClick={handlePlay}
          style={{
            position: "fixed",
            bottom: 10,
            left: 10,
            backgroundColor: "#252525",
            padding: "5px",
            borderRadius: 50,
            zIndex: 100,
          }}
        >
          <AiOutlinePlayCircle color="#fff" size={30} />
        </div>
      )}
      {flag ? (
        <p
          style={{
            position: "fixed",
            bottom: 2,
            left: 70,
            backgroundColor: "#CBFBFA",
            padding: "5px",
            color: "#252525",
            borderRadius: 50,
            zIndex: 100,
          }}
        >
          Dale play la musica!
        </p>
      ) : (
        false
      )}
      <ToastContainer />
      <div onClick={() => sound.play()} className="background-image" />
      <Container style={{ padding: "30px" }}>
        <Row>
          <Col xs={12} md={12} lg={12} style={{ textAlign: "center" }}>
            <h4 style={{ fontSize: "30px", marginBottom: "20px" }}>
              ¡ Es un dia especial !
            </h4>

            <p style={{ fontSize: "20px", textAlign: "justify" }}>
              Hola, soy Jesus Adrian y quiero contarte un poco sobre mi. Soy un niño muy
              risueño y me encantan muchisimo jugar, también disfruto mucho bailar,
              los juegos imaginativos. He
              disfrutado cada día de estos 4 años aprendiendo muy rápido
              habilidades y nuevos juegos, siempre rodeado de mucho amor y de la
              compañía maravillosa de mi papi y mami. Soy un niño muy feliz y
              afortunado y por eso quiero celebrar contigo mis 4 añitos.
            </p>
            <h4>
              No olvides traer tu sonrisa y tu espíritu festivo. ¡Esperamos
              verte en la fiesta!
            </h4>
          </Col>
        </Row>
      </Container>
      <Carousel /* activeIndex={index} onSelect={handleSelect} */ fade>
        <Carousel.Item>
          <img className="d-block w-100" src={Tim4} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img className="d-block w-100" src={Tim1} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={Tim2} alt="Third slide" />
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={Tim3} alt="Third slide" />
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={Tim5} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
      <Container style={{ padding: "30px", background: "#CBFBFA" }}>
        <Row style={{ padding: "30px", background: "#fff" }}>
          <Col xs={12} md={12} lg={12} style={{ textAlign: "center" }}>
           
            <h4
              style={{
                fontSize: "20px",
                marginBottom: "10px",
                marginTop: "30px",
              }}
            >
              Fecha y hora
            </h4>
            <p
              style={{
                fontSize: "18px",
                marginBottom: "20px",
                background: "#EAEAEA",
                borderRadius: "10px",
              }}
            >
              {" "}
              19 de Diciembre/ 3:00 pm
            </p>
            <h4 style={{ fontSize: "20px", marginBottom: "10px" }}>
              Ubicación
            </h4>
            <p
              style={{
                fontSize: "18px",
                marginBottom: "20px",
                background: "#EAEAEA",
                borderRadius: "10px",
              }}
            >
              Bohio
            </p>
          </Col>
        </Row>
      </Container>
      <Container style={{ padding: "30px", background: "#CBFBFA" }}>
        <Row style={{ padding: "30px" }}>
          <h4
            style={{
              textAlign: "center",
              color: "#252525",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            ¿Cuanto falta?
          </h4>
          <Col
            xs={3}
            md={3}
            lg={3}
            style={{
              textAlign: "center",

              fontSize: "40px",
              fontWeight: "600",
              fontFamily: "Montserrat, Sans-serif",
            }}
          >
            {timerDays}
            <p style={{ fontSize: "14px", fontWeight: "300" }}>DÍAS</p>
          </Col>
          <Col
            xs={3}
            md={3}
            lg={3}
            style={{
              textAlign: "center",

              fontSize: "40px",
              fontWeight: "600",
              fontFamily: "Montserrat, Sans-serif",
            }}
          >
            {timerHours}
            <p style={{ fontSize: "14px", fontWeight: "300" }}>HRS</p>
          </Col>
          <Col
            xs={3}
            md={3}
            lg={3}
            style={{
              textAlign: "center",

              fontSize: "40px",
              fontWeight: "600",
              fontFamily: "Montserrat, Sans-serif",
            }}
          >
            {timerMinutes}
            <p style={{ fontSize: "14px", fontWeight: "300" }}>MIN</p>
          </Col>
          <Col
            xs={3}
            md={3}
            lg={3}
            style={{
              textAlign: "center",

              fontSize: "40px",
              fontWeight: "600",
              fontFamily: "Montserrat, Sans-serif",
            }}
          >
            {timerSeconds}
            <p style={{ fontSize: "14px", fontWeight: "300" }}>SEG</p>
          </Col>
        </Row>
      </Container>
      <Container className="border-div">
        <Row style={{ padding: "30px", background: "#fff" }}>
          <Col xs={12} md={12} lg={12} style={{ textAlign: "center" }}>
            <h4 style={{ fontSize: "20px", marginBottom: "10px" }}>
              IMPORTANTE
            </h4>
            <p style={{ fontSize: "20px", marginBottom: "20px" }}>
              Confirmar asistencia{" "}
            </p>
            <Form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <Form.Check
                  onChange={(e) => {
                    setChecked(e.target.checked);
                    setChecked1(false);
                  }}
                  type="radio"
                  label="Si! Confirmo"
                  id="radio"
                  name="confirmo"
                  checked={checked}
                />
                <Form.Check
                  onChange={(e) => {
                    setChecked1(e.target.checked);
                    setChecked(false);
                  }}
                  type="radio"
                  label="No puedo :("
                  id="radio"
                  name="noConfirmo"
                  checked={checked1}
                />
              </div>
              <Form.Control
                onChange={handleChange}
                name="mensaje"
                checke
                value={state.mensaje}
                style={{ marginBottom: "20px" }}
                placeholder="Ingrese algún dato importante..."
                as="textarea"
                rows={5}
              />

              <Form.Control
                onChange={handleChange}
                required
                type="text"
                name="nombre"
                placeholder="Nombre de adulto o niño :D"
                value={state.nombre}
                style={{ marginBottom: "20px" }}
              />
              <button className="button" type="submit">
                Confirmar
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Tim;
