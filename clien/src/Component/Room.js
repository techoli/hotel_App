import React, { useState } from 'react'
import Homescreen from '../screens/Homescreen'
import { Modal, Button, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function Room({ room,checkin,checkout }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className='row shadow ' data-aos = 'fade-up'>
            <div className='col-md-4'>
                <img src={room.imageurls[0]} className='smalling' />
            </div>
            <div className='col-md-7'>
                <h1>{room.name}</h1>
                <b>
                    <p>Maxcount is: {room.maxcount} </p>
                    <p>phone number: {room.phonenumber} </p>
                    <p>Type: {room.type} </p>
                </b>
                <div style={{ float: 'right' }}>

                    {(checkin && checkout) && (
                        <Link to = {`/book/${room._id}/${checkin}/${checkout}`}>
                        <button className='btn btn-primary m-2'>Book now</button>                   
                        </Link>
                    )}
                   
                    <button className='btn btn-primary' onClick={handleShow}>View Details</button>
                </div>


            </div>
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        {room.imageurls.map(url=>{
                            return <Carousel.Item>
                            <img
                              className="d-block w-100 bigimg"
                              src={url}
                              
                            />
                            
                          </Carousel.Item>
                        })}

                    </Carousel>
                    {room.description}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default Room