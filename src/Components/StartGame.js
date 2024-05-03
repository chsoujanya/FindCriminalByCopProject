import React, { useState } from "react";
import SelectCityByCop from "./SelectCityByCop";
import SelectVehicleByCop from "./SelectVehicleByCop";

// Import criminal and cop images
import criminalImg from './Images/criminal.jpg';
import cop1Img from './Images/cop1.jpg';
import cop2Img from './Images/cop2.jpg';
import cop3Img from './Images/cop3.jpg';
import cities from '../data/cities';
import vehicles from '../data/vehicles';


const StartGame = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [cops, setCops] = useState([]);
    const [step, setStep] = useState(0);
    const [criminalDetails, setCriminalDetails] = useState(null);
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedVehicles, setSelectedVehicles] = useState([]);
    const [criminalCaught, setCriminalCaught] = useState(false);
    const [caughtByCop, setCaughtByCop] = useState(null); // State to hold the cop who caught the criminal
    const [criminalCaughtCity, setCriminalCaughtCity] = useState(null); // State to hold the criminal's city

    const generateCriminalDetails = () => {
        const randomCityIndex = Math.floor(Math.random() * cities.length);
        const randomCity = cities[randomCityIndex];
        const distance = randomCity.distance;
        const criminalDetails = {
            criminalCity: randomCity.name,
            distance: distance
        }
        console.log(criminalDetails);
        return criminalDetails;
    };
    

    const handleStartGame = async () => {
        try {
            const response = generateCriminalDetails();
            setCriminalDetails(response);
            const initialCops = [];
            for (let i = 0; i < 3; i++) {
                initialCops.push({
                    id: i + 1,
                    name: `Cop ${i + 1}`,
                    city: null,
                    vehicle: null
                });
            }
            setCops(initialCops);
            setGameStarted(true);
            setSelectedCities([]);
            setStep(1);
        } catch(error) {
            console.log('Error starting the game');
        }
    };

    const handleCitySelect = (copId, city) => {
        setSelectedCities(prevCities => [...prevCities, city]);
        setCops(prevCops => prevCops.map(cop =>
            cop.id === copId ? { ...cop, city } : cop
        ));
    };

    const handleVehicleSelect = (copId, vehicle) => {
        setSelectedVehicles(prevVehicles => [...prevVehicles, vehicle]);
        setCops(prevCops => prevCops.map(cop =>
            cop.id === copId ? { ...cop, vehicle } : cop
        ));
    };


    const generateResult = (cops, criminalDetails) => {
        const criminalDistance = criminalDetails.distance;
        const criminalCity = criminalDetails.criminalCity;
        let caughtByCop = null;
        let criminalCaughtCity = null;
    
        for(const cop of cops) {
            const copCity = cop.city;
            const copVehicle = cop.vehicle;
            const copVehicleRange = vehicles.find(vehicle => vehicle.kind === copVehicle)?.range;
            const copCityDistance = cities.find(city => city.name === copCity)?.distance;
    
            if (!copCityDistance || !copVehicleRange) 
            {
                console.log("Invalid cop data:", cop);
                continue; // Skip to the next cop
            }
    
            console.log("********************")
            console.log("Cop: " + cop.name);
            console.log("Cop city: " + copCity);
            console.log("Cop city distance: " + copCityDistance);
            console.log("Cop vehicle range: " + copVehicleRange);
            console.log("Criminal distance: " + criminalDistance);
            console.log("Criminal city: " + criminalCity);
            console.log("**********************")
    
            if(criminalCity === copCity && copVehicleRange >= criminalDistance * 2) {
                caughtByCop = cop.name;
                criminalCaughtCity = criminalCity; // Record the criminal's city
                break; // Exit the loop if the criminal is caught
            }
        }
    
        if (caughtByCop) 
        {
            return { caughtByCop, criminalCaughtCity };
        } 
        else 
        {
            return { caughtByCop: null, criminalCaughtCity: null };
        }
    };

    const handleNextStep = async () => {
        if (step === 1 && selectedCities.length === 3) {
            setStep(2);
        }
        else if(step === 2 && selectedVehicles.length === 3) {
            try {
                const response = generateResult(cops, criminalDetails);
                setCriminalCaught(true);
                setCaughtByCop(response.caughtByCop); // Update the cop who caught the criminal
                setCriminalCaughtCity(response.criminalCaughtCity); // Update the criminal's city
                setStep(3);
            } catch (error) {
                console.log('Error checking if the criminal is caught');
            }
        }
    };

    return (
        
        <div className="container-fluid" style={{ backgroundColor: '#E0E0E0', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
            {!gameStarted && (
                <button className="btn btn-primary" style = {{ height: '80px', width: '500px', fontSize: '50px'}} onClick={handleStartGame}>
                    Catch the criminal
                </button>
            )}
            {gameStarted && step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {cops.map(cop => (
                        <React.Fragment key={cop.id}>
                            <h4>{cop.name}'s City Selection</h4>
                            <SelectCityByCop cop={cop} onCitySelect={handleCitySelect} selectedCities={selectedCities} />
                        </React.Fragment>
                    ))}
                    <button className="btn btn-primary" onClick={handleNextStep} disabled={selectedCities.length !== 3}>Next</button>
                </div>
            )}
            {gameStarted && step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {cops.map(cop => (
                        <React.Fragment key={cop.id}>
                            <h4>{cop.name}'s Vehicle Selection</h4>
                            <SelectVehicleByCop cop={cop} onVehicleSelect={handleVehicleSelect} selectedVehicles={selectedVehicles} />
                        </React.Fragment>
                    ))}
                    <button className="btn btn-primary" onClick={handleNextStep} disabled={selectedVehicles.length !== 3}>Next</button>
                </div>
            )}
            {gameStarted && step === 3 && (
    <div style={{ textAlign: 'center' }}>
        
        {criminalCaught && caughtByCop && criminalCaughtCity ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <p style={{ fontSize: '20px', marginBottom: '10px' }}>The criminal is caught by {caughtByCop}</p>
                <p style={{ fontSize: '20px', marginBottom: '30px' }}>And the criminal is caught in {criminalCaughtCity}</p>
                {/* Display criminal image */}
                <img src={criminalImg} alt="Criminal" className="img-fluid" style={{ width: '150px', height: '150px', marginBottom: '30px' }} />
                {/* Display cop image */}
                <img src={getImgByCop(caughtByCop)} alt="Cop" className="img-fluid" style={{ width: '150px', height: '150px', marginTop: '30px' }} />
            </div>
        ) : (
            <h1>The criminal is not caught.</h1>
        )}
    </div>
)}


        </div>


    );
}

// Function to get cop image based on the cop's name
const getImgByCop = (copName) => {
    switch (copName) {
        case 'Cop 1':
            return cop1Img;
        case 'Cop 2':
            return cop2Img;
        case 'Cop 3':
            return cop3Img;
        default:
            return null;
    }
}

export default StartGame;
