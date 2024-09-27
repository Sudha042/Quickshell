import React from 'react';
import Images from './Images'; // Import the Images object

// Mock user data to match `userId` with user names
const users = {
  'usr-1': 'Anoop Sharma',
  'usr-2': 'Yogesh',
  'usr-3': 'Shankar Kumar',
  'usr-4': 'Ramesh',
  'usr-5': 'Suresh'
};

// Function to generate random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Mapping priority levels to images
const priorityImageMapping = {
  0: Images.LowPriority,      // Low priority image
  1: Images.MediumPriority,   // Medium priority image
  2: Images.HighPriority,     // High priority image
  3: Images.UrgentPriClr,     // Urgent priority color image
  4: Images.Nopriority        // No priority image  
};


// DotMenu,
// Add,
// Backlog,
// Cancelled,
// Display,
// Done,
// Down,
// HighPriority,
// LowPriority,
// MediumPriority,
// Inprogres,
// Nopriority,
// UrgentPriClr,
// UrgentPriGry,
// Todo

// Mapping status values to images
const statusImageMapping = {
  'Todo': Images.Todo,          // To-do status image
  'In progress': Images.Inprogres,  // In progress status image
  'Backlog': Images.Backlog,     // Backlog status image
  'Done': Images.Done,           // Done status image
  'Cancelled': Images.Cancelled  // Cancelled status image
};

function TicketCard({ ticket }) {
  // Get the user's name from the user data
  const userName = users[ticket.userId] || 'User';
  const firstLetter = userName.charAt(0); // Get the first letter of the user's name
  const randomColor = getRandomColor(); // Generate a random color for the avatar

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id" style={{color:'0, 0, 0, 0.285'}}>{ticket.id}</span>
        {/* Replace the user-avatar image with a colored circle showing the first letter of the user */}
        <div 
          className="user-avatar-circle" 
          style={{ backgroundColor: randomColor }}
        >
          {firstLetter}
        </div>
      </div>
      <h3>
        {/* Display status image in front of the title */}
        <img 
          src={statusImageMapping[ticket.status] || Images.Display} 
          alt={`Status ${ticket.status}`} 
          className="status-icon" 
        />
        {ticket.title}
      </h3>
      <div className="ticket-footer">
        <span className="priority-indicator">
          {/* Display the corresponding priority image */}
          <img 
            src={priorityImageMapping[ticket.priority] || Images.Nopriority} 
            alt={`Priority ${ticket.priority}`} 
            className="priority-icon"
          />
        
        </span>
        <span className="feature-label">{ticket.tag}</span>
      </div>
    </div>
  );
}

export default TicketCard;
