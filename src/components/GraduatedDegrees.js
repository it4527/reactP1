import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';
import "../components/GradDegree.css";


/**
 * Component displaying the available graduate degrees and certificates.
 * Fetches data on graduate programs from a local JSON file and displays each degree and certificate
 * in a card format. Utilizes Material UI components for consistent styling.
 */
const GraduateDegrees = () => {
  // State to store the lists of degrees and certificates
  const [graduateDegrees, setGraduateDegrees] = useState([]);
  const [graduateCertificates, setGraduateCertificates] = useState([]);


  // Effect hook to fetch the graduate degrees and certificates data on component mount
  useEffect(() => {
    axios.get(`${process.env.PUBLIC_URL}/graduate.json`)
      .then((response) => {
        // Filtering out degrees and the "graduate advanced certificates" for separate rendering
        const degrees = response.data.graduate.filter(degree => degree.degreeName !== "graduate advanced certificates");
        const certificates = response.data.graduate.find(degree => degree.degreeName === "graduate advanced certificates");
        setGraduateDegrees(degrees);
        if (certificates) {
          setGraduateCertificates(certificates.availableCertificates);
        }
      })
      .catch((error) => {
        console.error('There was an error fetching the graduate degrees data:', error);
      });
  }, []);

  // Render function to display the degrees and certificates
  return (
    <div>
      <h2>Graduate Degrees</h2>
      <div className="degrees-container2">
        {graduateDegrees.map((degree, index) => (
          <Card key={index} className="degree-card">
            <CardContent>
              <Typography variant="h5" component="div">
                {degree.title}
              </Typography>
              <Typography variant="body2">
                {degree.description}
              </Typography>
              {degree.concentrations && (
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Concentrations:
                  </Typography>
                  <ul>
                    {degree.concentrations.map((concentration, idx) => (
                      <li key={idx}>{concentration}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {/*/ Rendering a separate card for certificates if any */}
        {graduateCertificates.length > 0 && (
          <Card className="degree-card">
            <CardContent>
              <Typography variant="h5" component="div">
                Graduate Advanced Certificates
              </Typography>
              {graduateCertificates.map((certificate, idx) => (
                <li className='certificate-list' key={idx}>{certificate}</li>
              ))}


            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GraduateDegrees;