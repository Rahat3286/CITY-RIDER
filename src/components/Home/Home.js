import React from 'react';
import Rider from '../Rider/Rider';
import './Home.css';

const Home = () => {
    
    const riders = [
        {
            title: 'Bike',
            imgUrl:'https://i.ibb.co/P9J3Wp6/bike.png',
            riderType: 'bike'
        },
        {
            title: 'Car',
            imgUrl:'https://i.ibb.co/RY5XtV4/car.png',
            riderType: 'car'
        },
        {
            title: 'Bus',
            imgUrl:'https://i.ibb.co/smv96pM/bus.png',
            riderType: 'bus'
        },
        {
            title: 'Train',
            imgUrl:'https://i.ibb.co/rFpJkbC/train.png',
            riderType: 'train'
        }
    ]

    return (
        <div className="container row m-5 justify-content-center">
            {
                riders.map(rider=><Rider key={rider.riderType} rider={rider}></Rider>)
            }
        </div>
    );
};

export default Home;