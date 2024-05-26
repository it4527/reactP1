import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Modal, Box } from '@mui/material';
import '../components/Faculty.css'; // Adjust this path if necessary



/**
 * Represents the Faculty section of the website.
 * Displays a list of faculty members fetched from a JSON file.
 * Each faculty member is shown in a card that can be clicked to open a modal with more details.
 */
const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    // Fetches faculty data on component mount.
    axios.get(`${process.env.PUBLIC_URL}/faculty.json`)
      .then((response) => {
        setFaculty(response.data.faculty);
      })
      .catch((error) => {
        console.error('There was an error fetching the faculty data:', error);
      });
  }, []);


  /**
   * Handles opening the modal with details of the selected faculty member.
   * @param {Object} member The faculty member object to display in the modal.
   */

  const handleOpenModal = (member) => {
    setSelectedMember(member);
    setOpenModal(true);
  };


  //***Handles closing the modal... */
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div>
      <h1 className="facultyh1">Faculty Members</h1>
      <div className="faculty-container">
        {faculty.map((member, index) => (
          <Card key={index} className="card-margin" onClick={() => handleOpenModal(member)}>
            <CardContent>
              <div style={{ textAlign: 'center' }}>
                <img src={member.imagePath} alt={member.name} style={{ width: '100px', height: 'auto', cursor: 'pointer' }} />
              </div>
              <Typography variant="h5" component="div">
                {member.name}
              </Typography>
              <Typography variant="body2">
                {member.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      {/*/Here we implement the Modal - interactive opening the information from the image*/}
      {selectedMember && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal-style">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedMember.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {selectedMember.title}
            </Typography>
            <Typography>Email: {selectedMember.email}</Typography>
            <Typography>Website: {selectedMember.website}</Typography>
            <Typography>Phone: {selectedMember.phone}</Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Faculty;
