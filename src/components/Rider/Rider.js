import React from 'react';
import { useHistory } from 'react-router-dom';
import './Rider.css';

const Rider = ({ rider }) => {
    const history = useHistory();
    const handleRider = (riderType) => {
        history.push(`/book/${riderType}`);
    }
    return (
        <div className="mt-2 ml-2 rider-card">
            <div className="card" onClick={() => handleRider(rider.riderType)} style={{ width: '15rem' }}>
                <img  className="card-img-top p-5" src={rider.imgUrl} alt="Card image cap" />
                <div className="card-body">
                    <h3 className="text-center rider-name">{rider.title}</h3>
                </div>
            </div>
        </div>
    );
};

export default Rider;
