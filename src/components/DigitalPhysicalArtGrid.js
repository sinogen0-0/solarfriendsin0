import React from 'react';
import BaseGrid from './BaseGrid';
import digitalPhysicalArtData from '../data/digitalPhysicalArt';

const DigitalPhysicalArtGrid = ({ onBack }) => {
    return <BaseGrid data={digitalPhysicalArtData} onBack={onBack} />;
};

export default DigitalPhysicalArtGrid;
