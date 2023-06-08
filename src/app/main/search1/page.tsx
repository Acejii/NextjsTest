'use client'

import axiosInstance from '@/axios/axiosInstance';
import React from 'react';

const getLocations = async () => {
    const { data } = await axiosInstance.get('/locations');
    return data;
};

const Search1 = async () => {
    const locations = await getLocations();
    return (
        <div>
            {locations.length}
            {locations.map((location: any) => (
                <div key={location}>{location}</div>
            ))}
        </div>
    );
};

export default Search1;
