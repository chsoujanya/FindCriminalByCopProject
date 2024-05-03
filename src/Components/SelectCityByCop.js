// SelectCityByCop.jsx
import React, { useState } from 'react';

const SelectCityByCop = ({ cop, onCitySelect, selectedCities }) => {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCitySelect = (city) => {
    if (cop.city != null) {
      alert("Cop has already selected the city");
      return;
    }

    if (selectedCities.includes(city)) {
      alert("This city is already selected by another cop");
      return;
    }
    setSelectedCity(city);
    onCitySelect(cop.id, city);
    console.log("Selected Cities:", [...selectedCities, city]); // Log the selected cities
    cop.city = city;
    console.log("Cops Details:", cop);
  };

  const places = [
    { name: 'Yapkashnagar', image: 'Yapkashnagar' },
    { name: 'Lihaspur', image: 'Lihaspur' },
    { name: 'Narmis', image: 'Narmis' },
    { name: 'Shekharvati', image: 'Shekharvati' },
    { name: 'Nuravgram', image: 'Nuravgram' },
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "1vh" }}>
      <div>
        {/* <h4>{cop.name}'s City Selection</h4> */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {places.map(place => (
            <div key={place.name} style={{ margin: '10px', textAlign: 'center' }}>
              <img
                src={require(`./Images/` + place.image + `.jpg`)}
                alt={place.name}
                style={{ width: '100px', height: '100px', cursor: 'pointer', border: selectedCity === place.name ? '2px solid blue' : '2px solid transparent' }}
                onClick={() => handleCitySelect(place.name)}
              />
              <p style={{ marginTop: '5px' }}>{place.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectCityByCop;
