import React from 'react'
import { Link } from 'react-router-dom';
import AOS from 'aos'
import 'aos/dist/aos.css';

AOS.init(
    {duration:2000}
);

function Landingscreen() {
    return (
        <div className='landing justify-content-center'>

            <div className='col-md-9 text-center 'style={{borderRight: '10px solid white'}} >
                <h2 data-aos="zoom-in" style={{color:'white', fontSize: 120}}>Hotels.ng</h2>
                <h1 data-aos="zoom-out" style={{color:'white'}}>The Customer is Boss</h1>

                <Link to = '/homes'> <button className='btn btn-primary btnlanding' style={{backgroundColor: 'white',color: 'black'}}>Get Started</button></Link>

            </div>

        </div>
    )
}

export default Landingscreen