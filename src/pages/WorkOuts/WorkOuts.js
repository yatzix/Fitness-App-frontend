import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WorkOutItems from '../WorkOutItems/WorkOutItems';

export default function WorkOuts() {
    return (
        <>
        <h1>View your workout:</h1>
        <WorkOutItems />
        </>
    )
}