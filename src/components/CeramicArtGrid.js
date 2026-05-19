import React from 'react';
import BaseGrid from './BaseGrid';
import ceramicArtData from '../data/ceramicArt';

const CeramicArtGrid = ({ onBack }) => {
    return <BaseGrid data={ceramicArtData} onBack={onBack} />;
};

export default CeramicArtGrid;
