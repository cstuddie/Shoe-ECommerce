import React, { useState } from 'react';

// Receives simulated user info and handlers from App.js route setup
function ProfilePage({ userName, userRole, onProfileUpdate, onDeleteAccount }) {

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(userName); // Local state for edit form

  const handleEditToggle = () => {
    setNewName(userName); // Reset edit field if cancelled
    setIsEditing(!isEditing);
  }

  const handleUpdateSubmit = (e) => {
     e.preventDefault();
     onProfileUpdate(newName); // Call simulation handler from App.js
     setIsEditing(false); // Close edit form
  }

  const handleDeleteClick = () => {
      onDeleteAccount(); // Call simulation handler from App.js
      // Navigation away will happen within App.js's handler (via handleLogout)
  }


  return (
    <div className="container">
      <h2>My Profile</h2>
      <div>
        <p><strong>Welcome, {userName}!</strong></p>
        <p>Your Role: {userRole}</p>
        {/* Add more simulated profile details here if needed */}
      </div>

      <hr style={{ margin: '20px 0' }}/>

      {/* --- Simulated Profile Editing --- */}
      <div>
        <h3>Edit Profile (Simulation)</h3>
        {!isEditing ? (
          <div>
             <p>Current Name: {userName}</p>
             <button onClick={handleEditToggle} style={{ padding: '8px 12px', cursor: 'pointer', marginRight: '10px'}}>Edit Name</button>
          </div>
        ) : (
          <form onSubmit={handleUpdateSubmit}>
            <div>
                <label htmlFor='newName'>New Name: </label>
                <input
                    type="text"
                    id="newName"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    style={{ padding: '8px', marginRight: '10px' }}
                 />
            </div>
            <button type="submit" style={{ padding: '8px 12px', cursor: 'pointer', marginRight: '10px', marginTop: '10px'}}>Save Changes</button>
            <button type="button" onClick={handleEditToggle} style={{ padding: '8px 12px', cursor: 'pointer', marginTop: '10px'}}>Cancel</button>
          </form>
        )}
      </div>
       {/* --- End Simulated Profile Editing --- */}

       <hr style={{ margin: '20px 0' }}/>

      {/* --- Simulated Account Deletion --- */}
      <div>
          <h3>Account Actions (Simulation)</h3>
          <button onClick={handleDeleteClick} style={{ padding: '8px 12px', cursor: 'pointer', background: '#dc3545', color: 'white', border:'none' }}>
              Delete My Account
          </button>
      </div>
      {/* --- End Simulated Account Deletion --- */}

    </div>
  );
}

export default ProfilePage;