// src/components/DateFilter.js
import React, { useState } from 'react';
import { DatePicker, Button } from 'antd';
import '../styles/dateFilter.css';

const DateFilter = ({ onFilter }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleFilterClick = () => {
        // Call the parent component's filter function
        if (onFilter) {
            onFilter(selectedDate);
        }
    };

    return (
        <div className="date-filter">
            <DatePicker className="picker" onChange={handleDateChange} />
            <Button className="filter-button" type="primary" onClick={handleFilterClick}>
                Filter Records
            </Button>
        </div>
    );
};

export default DateFilter;
