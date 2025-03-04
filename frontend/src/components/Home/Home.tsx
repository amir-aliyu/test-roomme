import React, { FC, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import test from 'node:test';

const BACKEND_URL = "goldfish-app-ah94n.ondigitalocean.app";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [plants, setPlants] = useState<any[]>([]); // Adjusted for TypeScript
  const [uuid, setUuid] = useState<string>(''); // Added for TypeScript
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlant, setEditingPlant] = useState<{ _id: string; name: string; type: string; wateringTime: string, image: string } | null>(null);
  const path = window.location.pathname;
  const isReadOnly = !(path === '/' || path.endsWith('/dashboard'));
  const readOnlyUUID = path.split('/').pop() || '';
  const [friendName, setFriendName] = useState("My");
  const displayNotification = (message: string, type: "success" | "error" | "info") => {
    toast[type](message, {position: 'bottom-right'});
  };


  // Function to convert an image to base64 encoding
  // (This could be moved to the server side so we can use jimp to resize the image before converting it to base64)
  const imageToBase64 = async (image: File) => {
    // Return a promise that resolves with the base64 string
    return new Promise<string>((resolve, reject) => {
      // Create a new FileReader
      const reader = new FileReader();
      // Set the onload event handler
      reader.onload = () => {
        // Resolve the promise with the result
        resolve((reader.result as string).substring(22)); // Remove the data URL prefix (data:image/png;base64,)
      };
      // Set the onerror event handler
      reader.onerror = () => {
        // Reject the promise with an error
        reject(new Error('Failed to read image file'));
      };
      // Read the image file as a data URL
      reader.readAsDataURL(image);
    });
  };

  // Function to handle file selection
  const handleFileSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Get the selected file
    const file = event.target.files?.[0];
    if (file) {
      try {
        // Convert the file to base64
        const base64 = await imageToBase64(file);
        console.log(base64);
      } catch (error: any) {
        console.error('Error converting image:', error);
      }
    }
  };

  const deletePlant = async (plantId: string) => {
    try {
      const response = await fetch(`/api/plants/${plantId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        displayNotification('Plant deleted successfully!', 'success');
      } else {
        throw new Error(data.message || 'Failed to delete plant');
      }
    } catch (error: any) {
      displayNotification('Error deleting plant', 'error');
    }
  };

  // Function to open modal for adding a new plant
  const handleAddPlantClick = () => {
    setEditingPlant(null); // Ensure no plant data is set for adding
    setIsModalOpen(true);
  };

  // function to update the watering streak

  // Function to open modal for editing an existing plant
const handleEditPlantClick = async (plantId: string) => {
  try {
    const response = await fetch(`/api/plants/${plantId}`);
    const data = await response.json();
    if (response.ok) {
      setEditingPlant(data); // Set the current plant data to edit
      setIsModalOpen(true);
    } else {
      throw new Error(data.message || 'Failed to fetch plant details');
    }
  } catch (error: any) {
    displayNotification('Error fetching plant details', 'error');
  }
};

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to submit the form data

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mt-4 fw-bold">{friendName} Plants</h1>
        {isReadOnly && (
          <div className="text-end mt-4">
            <a href="/dashboard" className="btn btn-primary">Go Back to Dashboard</a>
          </div>
        )}
      </div>
    {/* Plant List */}
    <div className="card mt-4 shadow">
      <div className="card-header fw-bold d-flex align-items-center bg-primary text-white">
        <p className="m-0 fs-3">Plant List</p>
        {/* {!uuid &&  */}
          <button
            className="btn btn-error"
            onClick={() => {
                window.location.href = "/login";
            }}
          >
            You aren't logged in! Click here to log in or register.
          </button>
        {/* } */}
        {/* {!isReadOnly && uuid && <button onClick={handleAddPlantClick} className="btn btn-light ms-auto text-dark">Add Plant</button>} */}
      </div>
      <div className="card-body" style={{ backgroundColor: 'rgba(110, 187, 164, 0.4)' }}>
        <ul id="plantsList" className="list-group">
          {/* Header Row */}
          <li className="list-group-item bg-light">
            <div className="row">
              <div className="col fw-bold fs-5">Name</div>
              <div className="col fw-bold fs-5">Type</div>
              <div className="col fw-bold fs-5">Watering Days</div>
              <div className="col fw-bold fs-5">Watering Streak</div>
              {!isReadOnly && <div className="col fw-bold fs-5 text-end">Actions</div>}
              {isReadOnly && <div className="col fw-bold fs-5 text-end"></div>}
              {/* <div className="col fw-bold fs-5 text-end">Actions</div> Right-aligned header */}
            </div>
          </li>
          ))
        </ul>
      </div>
    </div>

    {/* Plant Form Modal */}

    </div>
  );
};

export default Home;
