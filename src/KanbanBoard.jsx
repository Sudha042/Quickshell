import React from 'react';
import TicketCard from './TicketCard';
import Images from './Images';

// Mapping of priority numbers to names
const priorityNames = {
  0: 'Low',
  1: 'Medium',
  2: 'High',
  3: 'Critical',
  4: 'Urgent'
};

// Function to group tickets dynamically based on grouping criteria
const groupTickets = (tickets, grouping) => {
  const groups = {};
  tickets.forEach((ticket) => {
    let groupKey;
    if (grouping === 'user') {
      groupKey = ticket.userName; // Group by userName when grouping by user
    } else {
      groupKey = ticket[grouping]; // Otherwise, group by the selected field (status, priority, etc.)
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(ticket);
  });
  return groups;
};

function KanbanBoard({ tickets, grouping, sorting }) {
  const groupedTickets = groupTickets(tickets, grouping);

  // Sorting logic based on sorting criteria
  Object.keys(groupedTickets).forEach((key) => {
    groupedTickets[key].sort((a, b) => {
      if (sorting === 'priority') {
        return b.priority - a.priority; // Sort by priority descending
      }
      if (sorting === 'title') {
        return a.title.localeCompare(b.title); // Sort by title alphabetically
      }
      return 0;
    });
  });

  return (
    <div className="kanban-board">
      {/* Iterate over the grouped tickets and display them in columns */}
      {Object.keys(groupedTickets).map((groupKey) => (
        <div key={groupKey} className="kanban-column">
          {/* Display priority name if grouping by priority, otherwise use groupKey */}
          <div style={{display:'flex', justifyContent:'space-between'}}>
            {grouping === 'priority' ? priorityNames[groupKey] || 'Unknown' : groupKey}
            <div>
            <img src={Images.Add} alt='' />
            <img src={Images.DotMenu} alt='' />
            </div>
          </div>
          {groupedTickets[groupKey].map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
