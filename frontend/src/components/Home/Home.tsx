import React, { FC } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import test from 'node:test';

// const BACKEND_URL = "goldfish-app-ah94n.ondigitalocean.app";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const path = window.location.pathname;
  const isReadOnly = !(path === '/' || path.endsWith('/dashboard'));


  // Function to convert an image to base64 encoding
  // (This could be moved to the server side so we can use jimp to resize the image before converting it to base64)
  // Function to submit the form data

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
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
