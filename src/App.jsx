import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const App = () => {
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('Argentina');
  const [weather, setWeather] = useState(null);

  const handleConsult = async () => {
    try {
      const apiKey = '80ad140fc5f4f5c12f8f34a2c12ee19d'; 
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location},${country}&appid=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Error al consultar el clima',
      });
      setWeather(null);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center mb-4">Consulta del Clima</h1>
          <div className="form-group">
            <label htmlFor="location">Ubicación:</label>
            <input
              type="text"
              id="location"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Escribe la ubicación"
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">País:</label>
            <select
              id="country"
              className="form-control"
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
          <button className="btn btn-primary btn-block" onClick={handleConsult}>
            Consultar Clima
          </button>
          {weather && (
            <div className="mt-4">
              <h2>Información del Clima</h2>
              <p>Ubicación: {weather.name}</p>
              <p>Temperatura: {weather.main.temp}°C</p>
              <p>Descripción: {weather.weather[0].description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
