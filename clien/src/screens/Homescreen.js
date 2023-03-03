import React, { useState, useEffect } from 'react'
import axios from "axios";
import Room from '../Component/Room';
import Loader from '../Component/Loader';
import Error from '../Component/Error';
import 'antd/dist/antd.css'
import moment from 'moment';
import { DatePicker, Space } from 'antd';
import AOS from 'aos'
import 'aos/dist/aos.css';

AOS.init(
    
);
const { RangePicker } = DatePicker;
function Homescreen() {

  const [rooms, setrooms] = useState([])
  const [loading, setloading] = useState()
  const [error, seterror] = useState(false)
  const [checkin, setcheckin] = useState();
  const [checkout, setcheckout] = useState();
  const [duplicateroom, setduplicateroom] = useState();
  const [searchkey, setsearchkey] = useState('')
  const [type, settype] = useState('all')



  useEffect(() => {
    const fetchData = async () => {
      try {

        setloading(true)
        const data = await (await axios.get('/api/rooms/getallrooms')).data;
        console.log(data)
        //console.log(fetchData())
        setrooms(data)
        setduplicateroom(data)
        setloading(false)

      } catch (error) {
        seterror(true)


      }

    }
    fetchData()

  }, [])

  function filterbydate(dates) {

    setcheckin(moment(dates[0]).format('DD-MM-YYYY'))
    setcheckout(moment(dates[1]).format('DD-MM-YYYY'))

    var temproom = []
    var availability = false

    for (const room of duplicateroom) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {

          if (!moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(booking.fromdate, booking.todate) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(booking.fromdate, booking.todate)) {
            if (moment(dates[0]).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[0]).format("DD-MM-YYYY") !== booking.todate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.todate) {
              availability = true

            }


          }


        }
      }
      if (availability == true || room.currentbookings.length == 0) {
        temproom.push(room)
        console.log("temproom: " + JSON.stringify(temproom))
        setrooms(temproom)
        //console.log("emmaroomsbbol: "+availability)
        console.log("emmarooms: " + JSON.stringify(rooms))
      }
    }

  }
  function filterBysearch() {

    const filtersearch = duplicateroom.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))

    setrooms(filtersearch)
  }
  function filterBytype(e) {
    settype(e)
    if (e !== 'all') {
      const filtersearch = duplicateroom.filter(room => room.type.toLowerCase() == e.toLowerCase())
      setrooms(filtersearch)
    }else{
      setrooms(duplicateroom)
    }


  }

  return (
    <div className='container'>
      <div className='row mt-5 shadow' data-aos = 'fade-up'>
        <div className='col-md-3'>
          <RangePicker format='DD-MM-YYYY' onChange={filterbydate} />
        </div>
        <div className='col-md-5'>
          <input className='form-control' placeholder='Search Rooms' type='text'
            value={searchkey} onChange={(e) => { setsearchkey(e.target.value) }} onKeyUp={filterBysearch} />

        </div>
        <div className='col-md-3'>
          <select className='form-control' onChange={(e) => { filterBytype(e.target.value) }}>
            <option value='all'>All</option>
            <option value='delux'>Delux</option>
            <option value='non-delux'>Non-Delux</option>
          </select>

        </div>
      </div>

      <div className='row justify-content-center mt-5' >
        {loading ? (<Loader />) : (rooms.map(room => {
          return <div className='col-md-9 mt-3'>
            <Room room={room} checkin={checkin} checkout={checkout} />
          </div>
        }))}
      </div>
    </div>
  )
}

export default Homescreen