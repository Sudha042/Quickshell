import React, { useState, useEffect } from 'react';
import KanbanBoard from './KanbanBoard';
import './Componant.css';
import Images from './Images';


function App() {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState('status'); // Default grouping
  const [sorting, setSorting] = useState('priority'); // Default sorting
  const [dropdown, setDropdown] = useState(false);

  // Fetch tickets and users from the API when the component mounts
  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => {
        const mergedTickets = data.tickets.map((ticket) => {
          const user = data.users.find((user) => user.id === ticket.userId);
          return { ...ticket, userName: user?.name || 'Unknown User' };
        });
        setTickets(mergedTickets);
      });
  }, []);

  // Handlers for Grouping and Sorting
  const handleGroupingChange = (e) => {
    setGrouping(e.target.value);
    setDropdown(!dropdown);
  };

  const handleDropdownChange = () => {
    setDropdown(!dropdown);
  };

  const handleSortingChange = (e) => {
    setSorting(e.target.value);
    setDropdown(!dropdown);
  };

  return (
    <div className="App">
      <header className="dropdown-container">
        <div>
          {/* <button onClick={handleDropdownChange}>Display</button> */}
          <button className="dropdown-button" onClick={handleDropdownChange}>
          <img src={Images.Display} alt="Display Icon" className="icon" />
          Display
          <img
            src={Images.Down}
            alt="Down Arrow Icon"
            className="down-icon"
          />
        </button>
          {dropdown && (
            <div className="dropdown">
             {/* style={{ position: 'absolute', backgroundColor: 'white' */}
              <div className="dropdown-row">
                <div className="dropdown-grouping">
                  <label>Grouping</label>
                  <select value={grouping} onChange={handleGroupingChange}>
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
                <div className="dropdown-ordering">
                  <label>Sorting</label>
                  <select value={sorting} onChange={handleSortingChange}>
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Kanban Board Component */}
      <KanbanBoard tickets={tickets} grouping={grouping} sorting={sorting} />
    </div>
  );
}

export default App;
