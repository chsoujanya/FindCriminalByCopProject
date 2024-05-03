// SelectVehicleByCop.jsx
import React, { useState } from 'react';

const SelectVehicleByCop = ({ cop, onVehicleSelect, selectedVehicles }) => {
    const [selectVehicle, setSeVehicle] = useState(null);


  const handleVehicleSelect = (vehicle) => {

    if(cop.vehicle != null)
    {
        alert("Cop has already selected the vehicle");
        return;
    }

    if( selectedVehicles.includes(vehicle))
    {
        alert("This vehicle is already selected by another cop");
        return;
    }
    setSeVehicle(vehicle);
    onVehicleSelect(cop.id, vehicle);
    console.log("Selected vehicles:", [...selectedVehicles, vehicle]); // Log the selected cities
    cop.vehicle = vehicle;
    console.log("Cops Details:", cop);
  };

  const vehicles = [
    {name: "EV Bike 1", image: 'EVBike1'},
    {name : "EV Bike 2", image: 'EVBike2'},
    {name: "EV Car", image: 'EVCar'},
    {name: "EV SUV", image: 'EVSUV'}

  ]

  return (
    // <div>
    //   {/* <h2>{cop.name}'s Vehicle Selection</h2> */}
    //   <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "1vh" }}>
    //     {vehicles.map(vehicle => (
    //       <div key={vehicle.name} style={{ margin: '10px', textAlign: 'center' }}>
    //         <img
    //           src={require(`./Images/` + vehicle.image + `.jpg`)}
    //           alt={vehicle.name}
    //           style={{ width: 100, height: 100, cursor: 'pointer', border: selectVehicle === vehicle.name ? '2px solid blue' : '2px solid transparent' }}
    //           onClick={() => handleVehicleSelect(vehicle.name)}
    //         />
    //         <p style={{ marginTop: '5px' }}>{vehicle.name}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>








<div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "1vh" }}>
      <div>
        {/* <h4>{cop.name}'s City Selection</h4> */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {vehicles.map(vehicle => (
            <div key={vehicle.name} style={{ margin: '10px', textAlign: 'center' }}>
              <img
                src={require(`./Images/` + vehicle.image + `.jpg`)}
                alt={vehicle.name}
                style={{ width: '100px', height: '100px', cursor: 'pointer', border: selectVehicle === vehicle.name ? '2px solid blue' : '2px solid transparent' }}
                onClick={() => handleVehicleSelect(vehicle.name)}
              />
              <p style={{ marginTop: '5px' }}>{vehicle.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>





  );
};

export default SelectVehicleByCop;
