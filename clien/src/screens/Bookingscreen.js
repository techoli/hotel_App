import React, { useState, useEffect } from 'react';
import axios from "axios";
import Room from '../Component/Room';
import { useParams, matchPath } from 'react-router-dom'
import Loader from '../Component/Loader';
import Error from '../Component/Error';
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2'


function Bookingscreen() {
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    const [room, setroom] = useState();
    const [totalamount, settotalamount] = useState()
    const { roomid } = useParams();
    const { checkin } = useParams();
    const { checkout } = useParams();
    const fd = moment(checkin, 'DD-MM-YYYY')
    const td = moment(checkout, 'DD-MM-YYYY')
    const totaldays = moment.duration(td.diff(fd)).asDays() + 1


    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true)
                const data = (await axios.post("/api/rooms/getroomsbyid", { roomid: roomid })).data;
                setroom(data);
                settotalamount(totaldays * data.rentperday)
                console.log("data>>>>" + data);
                setloading(false);
            } catch (error) {
                seterror(true);
                setloading(false);

            }
        }
        fetchData();



    }, [])

    // async function bookroom() {
    //     const bookingDetals = {
    //         room,
    //         userid: JSON.parse(localStorage.getItem('currentuser')).userid,
    //         checkin,
    //         checkout,
    //         totalamount,
    //         totaldays
    //     }

    //     try {
    //         const res = await axios.post('/api/booking/bookroom', bookingDetals).data
    //     } catch (error) {

    //     }
    // }

    async function onToken(token) {
        //console.log(JSON.stringify(token))
        console.log(token)
        const bookingDetals = {
            room,
            userid: JSON.parse(localStorage.getItem('currentuser')).userid,
            checkin,
            checkout,
            totalamount,
            totaldays,
            token
        }

        try {
            setloading(true)
            const res = await axios.post('/api/booking/bookroom', bookingDetals).data
            setloading(false)
            Swal.fire('Congratulations', 'Your room booked successfully', 'success').then(res => {
                window.location.href = '/bookings'
            })
        } catch (error) {
            setloading(false)
            Swal.fire('Oops', 'Something went wrong', 'error')

        }
    }



    return (
        <div className='m-5'>
            {loading ? (<Loader />) : room ? (<div>
                <div className="row justify-content-center mt-5 shadow  " data-aos = 'flip-left'>
                    <div className="col-md-6">
                        <h1>{room.name}</h1>
                        <img src={room.imageurls[1]} className="bigimg" />


                    </div>
                    <div className="col-md-6">
                        <div style={{ textAlign: 'right' }}>
                            <h1>Booking Details</h1>
                            <hr />
                            <b>
                                <p>Name: {JSON.parse(localStorage.getItem('currentuser')).name} </p>
                                <p>From Date: {checkin}</p>
                                <p>To Date: {checkout}</p>
                                <p>Maxcount: {room.maxcount} </p>
                            </b>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <h1>Amount</h1>
                            <hr />
                            <b>
                                <p>Total Days: {totaldays}</p>
                                <p>Rent per day: {room.rentperday}</p>
                                <p>Total Amount: {totalamount}</p>
                            </b>
                        </div>
                        <div style={{ float: 'right' }}>

                            <StripeCheckout

                                token={onToken}
                                amount={totalamount * 100}
                                currency='USD'
                                stripeKey="pk_test_51LBPQCFhDUXuUphX0yEKdBomFVYRI538hPduAfPGCw2iWG7i4YFntnNSf01IBwk18IC3LSARHmjYKOF1pefmPqxX00It6kmkzs"

                            >
                                <button className='btn btn-primary m-2'>Pay now</button>
                            </StripeCheckout>

                        </div>

                    </div>
                </div>
            </div>) : (<Error />)}
        </div>
    )
}

export default Bookingscreen