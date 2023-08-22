// src/components/BudgetEntryList.js
import React from 'react';
import BudgetEntry from './BudgetEntry';

const BudgetEntryList = ({ entries }) => {
    return (
        <div>
            <h3>Budget Entries</h3>
            <ul>
                {entries.map((entry) => (
                    <BudgetEntry key={entry.id} entry={entry} />
                ))}
            </ul>
        </div>
    );
};

export default BudgetEntryList;
