import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import '../components/UnderGrad.css';



/**
 * Component displaying undergraduate degrees.
 * Fetches and displays undergraduate degree information from a JSON file. Each degree is listed in a card format,
 * with a button to open a dialog containing more details and available concentrations.
 */

const UndergraduateDegrees = () => {
  const [undergraduateDegrees, setUndergraduateDegrees] = useState([]);
  const [open, setOpen] = useState(false);//manage the dialog open/close
  const [selectDegree, setSelectDegree] = useState({});

  // Fetches undergraduate degree data on component mount
  useEffect(() => {
    axios.get(`${process.env.PUBLIC_URL}/undergraduate.json`)
      .then((response) => {
        setUndergraduateDegrees(response.data.undergraduate);
      })
      .catch((error) => {
        console.error('There was an error fetching the undergraduate degrees data:', error);
      });
  }, []);


  //Opening the detail dialog for the selected degree
  const handleClickOpen = (degree) => {
    setSelectDegree(degree);
    setOpen(true);
  };


  //Closing the detail dialog 
  const handleClose = () => {
    setOpen(false)
  };



  // Renders the undergraduate degrees and the detail dialog
  return (
    <div>
      <h1 className='un'>Undergraduate Degrees</h1>
      <div className="degrees-container">

        {undergraduateDegrees.map((degree, index) => (
          <Card key={index} className="degree-card">
            <CardContent>
              <Typography variant="h5" component="div">
                {degree.title}
              </Typography>
              <Typography variant="body2">
                {degree.description}
              </Typography>
              <Button onClick={() => handleClickOpen(degree)}>Learn More</Button>
            </CardContent>
          </Card>


        ))}

      </div>

      {/* /Dialog component for displaying degree details */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectDegree.title}</DialogTitle>
        <DialogContent>

          <DialogContentText>
            {selectDegree.title}
            {selectDegree.description}
            <br />
            Concentrations: {selectDegree.concentrations?.join(', ')}
          </DialogContentText>
          {selectDegree.imagePath && (
            <img src={selectDegree.imagePath} alt={selectDegree.title} style={{ width: '100%', marginTop: '20px' }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div >


  );
};

export default UndergraduateDegrees;
