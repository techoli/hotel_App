import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Tabs } from 'antd';
import Loader from '../Component/Loader';
import Error from '../Component/Error';
import Swal from 'sweetalert2'
import { Divider, Tag } from 'antd';
const { TabPane } = Tabs;



function Profilescreen() {
    const userdetail = JSON.parse(localStorage.getItem('currentuser'))

    useEffect(() => {
        if (!userdetail) {
            window.location.href = '/login'
        }


    }, [])



    return (
        <div>
            <div className='ml-3'>
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="My Profile" key="1">
                        <div className='row'>
                            <div className='col-md-4 ml-3 shadow'>
                                <p><b>Name:</b> {userdetail.name} </p>
                                <p><b>Email:</b> {userdetail.email} </p>

                            </div>

                        </div>
                    </TabPane>
                    <TabPane tab="My Bookings" key="2">
                        <Mybookings />


                    </TabPane>

                </Tabs>

            </div>
        </div>
    )
}
export default Profilescreen

export function Mybookings() {
    const userdetails = JSON.parse(localStorage.getItem('currentuser'))
    const [bookingdet, setbookingdet] = useState([]);
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(false)
    //const [rooms, setrooms] = useState([])



    useEffect(() => {

        const fetchData = async () => {
            try {
                setloading(true)
                const data = await (await axios.post('/api/booking/mybookings', { userid: userdetails.userid })).data
                setbookingdet(data);
                setloading(false)
                console.log(data)


            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(true)

            }
        }
        fetchData()


    }, [])

    async function cancelbooking(bookingid, roomid) {
        try {
            setloading(true)
            const res = await axios.post('/api/booking/cancel', {bookingid, roomid}).data
            console.log(res)
            setloading(false)
            Swal.fire('Congratulations', 'Your room booking has been canceeled successfully', 'success').then(res => {
                window.location.href = '/bookings'
            })
        } catch (error) {
            console.log(error);
            setloading(false)
            seterror(true)
            Swal.fire('Oops', 'Something went wrong', 'error')

        }

    }


    return (
        <div>

            <div className='row'>
                <div className='col-md-5'>
                    {loading && (<Loader />)}
                    {bookingdet && (bookingdet.map(books => {
                        return (
                            <div className='shadow'>
                                <p>{books.room}</p>
                                <p>BookingID: {books._id}</p>
                                <p>TransactionID: {books.transactionid}</p>
                                <p>Check In: {books.fromdate}</p>
                                <p>Check Out: {books.todate}</p>
                                <p>Amount: {books.totalamount}</p>
                                <p>Status: {books.status == 'cancel' ? (<Tag color="error">Cancelled</Tag>): (<Tag color="success">Confirmed</Tag>)}</p>


                                {books.status == 'booked' && (<div className='text-right'>

                                    <button className='btn btn-primary' onClick={() => cancelbooking(books._id, books.roomid)}>Cancel Booking</button>
                                </div>)}




                            </div>)
                    }))}

                </div>


            </div>


        </div>



    )


}

