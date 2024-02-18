import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const App = () => {
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("Argentina");
  const [weather, setWeather] = useState(null);

  const handleConsult = async () => {
    try {
      const apiKey = "80ad140fc5f4f5c12f8f34a2c12ee19d";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location},${country}&appid=${apiKey}&lang=es&units=metric`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Error al consultar el clima",
      });
      setWeather(null);
    }
  };

  return (
    <section className="container rounded containerClima mt-5 col-md-4 col-sm-8 col-lg-4 p-4">
      <div className="row">
        <div className="justify-content-center">
          <h1 className="text-center mb-4">Clima en tu zona</h1>
          <div className="form-group my-3 ">
            <label htmlFor="location">Ubicación</label>
            <input
              type="text"
              id="location"
              className="form-control my-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Escribe la ubicación"
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="country">País:</label>
            <select
              id="country"
              className="form-control my-2"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="Argentina">Argentina</option>
              <option value="Argentina">EEUU</option>
              <option value="Argentina">Mexico</option>
              <option value="Argentina">Chile</option>
              <option value="Argentina">España</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className="d-flex justify-content-center my-2">
            <button
              className="btn btn-success btn-block p-3"
              onClick={handleConsult}
            >
              Consultar Clima
            </button>
          </div>
          {weather && (
            <section className="my-4 card bgCardClima p-5 text-center">
              <div className="d-flex justify-content-center row">
                <p className="fw-bold display-7 text-uppercase">{weather.name}</p>
                <p className="fw-bold display-3">{Math.floor(weather.main.temp)}°C</p>
                <p className="text-uppercase">{weather.weather[0].description}</p>
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  );
};

export default App;
