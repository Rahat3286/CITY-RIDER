import React from 'react';
import { Link, useParams } from 'react-router-dom';
import backgroundImage from '../../images/Map.png';

const Destination = () => {
    const { riderType } = useParams();
    const riderTypeColor={
        fontWeight: 'bolder',
        fontSize:'22px',
        color: 'orange'
    }
    return (
        <div className="container pt-5">
            <div className="row d-flex justify-content-around">
                <div className="col-md-3">
                    <p style={{ fontWeight: 'bolder' }}>You've selected <span style={riderTypeColor}>{riderType}</span> for your journey</p>
                    <p style={{ fontWeight: '900' }}><Link to="/home" style={{ textDecoration: 'none' }}>Change Ride</Link> </p>
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="" style={{ fontWeight: 'bold' }}>Date :</label>
                            <input className="form-control" type="date" name="" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" style={{ fontWeight: 'bold' }}>Pick From</label>
                            <input className="form-control" type="text" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" style={{ fontWeight: 'bold' }}>Pick To</label>
                            <input className="form-control" type="text" />
                        </div>
                    </form>
                </div>
                <div className="col-md-9" style={{ width: '100%' }}>
                    <img style={{ width: '100%', height: '35rem' }} src={backgroundImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Destination;