// src/components/BudgetEntry.js
import React from 'react';

const BudgetEntry = ({ entry }) => {
    return (
        <li>
            <div>Date: {entry.date}</div>
            <div>Transaction: {entry.transaction}</div>
            <div>Price: {entry.price}</div>
            {/* Edit and Delete buttons */}
        </li>
    );
};

export default BudgetEntry;
