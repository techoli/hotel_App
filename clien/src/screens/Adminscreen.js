import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Tabs, Button, Modal } from 'antd';
import Loader from '../Component/Loader';
import Error from '../Component/Error';
import Updateroom from '../Component/Updateroom';

const { TabPane } = Tabs;

function Adminscreen() {

  const userdetail = JSON.parse(localStorage.getItem('currentuser'))

  useEffect(() => {
    if (!userdetail) {
      window.location.href = '/login'
    }


  }, [])

  return (
    <div>
      <center><h1 className='mt-3'>Admin Page</h1></center>
      <div className='ml-3 mr-3 shadow'>
        <Tabs defaultActiveKey="1" >
          <TabPane tab="Bookings" key="1">
            <Allbookings />
          </TabPane>
          <TabPane tab="Rooms" key="2">
            <Allrooms />

          </TabPane>
          <TabPane tab="Add Room" key="3">
            <Addrooms />

          </TabPane>
          <TabPane tab="Users" key="4">
            <Allusers />

          </TabPane>

        </Tabs>

      </div></div>
  )
}

export default Adminscreen

export function Allbookings() {
  const [books, setbooks] = useState([])
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        const thebookings = await (await axios.get("api/booking/allbookings")).data
        //console.log(thebookings)
        setbooks(thebookings)
        setloading(false)
      } catch (error) {
        setloading(false)
        seterror(true)

      }



    }
    fetchData()


  }, [])



  return (
    <div className='row'>
      <div className='col-md-12'>
        <table className='table table-bordered table-dark shadow'>
          <thead className='shadow'>
            <tr><th>Booking Id</th>
              <th>User ID</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th></tr>

          </thead>
          <tbody>
            {books.length && (books.map(book => {
              return (
                <tr>
                  <td>{book._id}</td>
                  <td>{book.userid}</td>
                  <td>{book.room}</td>
                  <td>{book.fromdate}</td>
                  <td>{book.todate}</td>
                  <td>{book.status}</td>
                </tr>
              )
            }))}
          </tbody>

        </table>


      </div>
    </div >
  )
}

export function Allrooms() {
  const [rums, setrums] = useState([])
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState(false)
  const [show, setShow] = useState(false)
  const [roomname, setroomname] = useState('')
  const [roomid, setroomid] = useState('')
  const [roomphonenumber, setroomphonenumber] = useState('')
  const [roomdet, setroomdet] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        const therooms = await (await axios.get("/api/rooms/getallrooms")).data
        //console.log(therooms)
        setrums(therooms)
        setloading(false)
      } catch (error) {
        setloading(false)
        seterror(true)
      }
    }
    fetchData()


  }, [])

  async function showids(id) {
    //const [roomdet, setroomdet] = useState([])

    console.log(id)


  }
  const showModal = async (id) => {
    console.log(id)

    try {

      const roomdetails = await (await axios.post("/api/rooms/getroomsbyid", { roomid: id })).data
      console.log("roomdetails" + JSON.stringify(roomdetails))
      setroomdet(roomdetails)
      setroomid(roomdet._id)
      setroomname(roomdet.name)
      setroomphonenumber(roomdet.phonenumber)



    } catch (error) {

      seterror(true)
    }
    setIsModalVisible(true);



  };
  const handleOk = () => {
    setIsModalVisible(false);

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className='row'>
      <div className='col-md-12'>
        <table className='table table-bordered table-dark shadow'>
          <thead className='shadow'>
            <tr><th>Room Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent per Day</th>
              <th>Max count</th>
              <th>Phone Number</th>
              <th>Operation</th>
            </tr>

          </thead>
          <tbody>
            {rums.length && (rums.map(rum => {
              return (
                <tr>
                  <td>{rum._id}</td>
                  <td>{rum.name}</td>
                  <td>{rum.type}</td>
                  <td>{rum.rentperday}</td>
                  <td>{rum.maxcount}</td>
                  <td>{rum.phonenumber}</td>
                  <td><button class="bt" onClick={() => { showModal(rum._id) }}>Update</button></td>

                  <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

                    <input type="text" className="form-control mt-2" value={roomid} readonly />
                    <input type="text" className="form-control mt-2" value={roomname} onChange={(e) => { setroomname(e.target.value) }} />
                    <input type="text" className="form-control mt-2" value={roomphonenumber} onChange={(e) => { setroomphonenumber(e.target.value) }} />

                  </Modal>

                </tr>




              )

            }))}
          </tbody>

        </table>


      </div>


    </div >
  )
}

export function Addrooms() {
  const [name, setname] = useState();
  const [maxcount, setmaxcount] = useState();
  const [phonenumber, setphonenumber] = useState();
  const [rentperday, setrentperday] = useState();
  const [imageurl1, setimageurls1] = useState();
  const [imageurl2, setimageurls2] = useState();
  const [imageurl3, setimageurls3] = useState();
  //const [imageurls, setimageurls] = useState([]);
  const [description, setdescription] = useState();
  const [type, settype] = useState();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);



  async function addroomapi() {
    const imageurls = [];
    imageurls.push(imageurl1)
    imageurls.push(imageurl2)
    imageurls.push(imageurl3)
    console.log(imageurls)

    const roomapi = {
      name,
      maxcount,
      phonenumber,
      rentperday,
      imageurls,
      description,
      type
    }
    try {
      setloading(true)
      const resultapi = (await axios.post("/api/rooms/createroom", roomapi)).data
      setloading(false)
      setname('')
      setmaxcount('')
      setphonenumber('')
      setrentperday('')
      setimageurls1('')
      setimageurls2('')
      setimageurls3('')
      setdescription('')
      settype('')
    } catch (error) {
      setloading(false)
      seterror(true)

    }
  }
  return (
    <div className='row justify-content-center'>
      

      {loading && (<Loader />)}
          {error && (<Error message = 'Sorry an error occured'/>)}

        <div className='col-md-4 '>
          
          <input type="text" className="form-control mt-2" placeholder="Room Name" value={name} onChange={(e) => { setname(e.target.value) }} />
          <input type="text" className="form-control mt-2" placeholder="Maxcount" value={maxcount} onChange={(e) => { setmaxcount(e.target.value) }} />
          <input type="text" className="form-control mt-2" placeholder="Phone Number" value={phonenumber} onChange={(e) => { setphonenumber(e.target.value) }} />
          <input type="text" className="form-control mt-2" placeholder="Rent Per Day" value={rentperday} onChange={(e) => { setrentperday(e.target.value) }} />
          <input type="text" className="form-control mt-2" placeholder="Image URL 1" value={imageurl1} onChange={(e) => { setimageurls1(e.target.value) }} />
          

        </div>
        <div className='col-md-4 '>
          
        
          <input type="text" className="form-control mt-2" placeholder="Image URL 2" value={imageurl2} onChange={(e) => { setimageurls2(e.target.value) }} />
          <input type="text" className="form-control mt-2" placeholder="Image URL 3" value={imageurl3} onChange={(e) => { setimageurls3(e.target.value) }} />
          <input type="text" className="form-control mt-2" placeholder="Description" value={description} onChange={(e) => { setdescription(e.target.value) }} />
          <input type="text" className="form-control mt-2" placeholder="Type" value={type} onChange={(e) => { settype(e.target.value) }} />
          <button className='btn btn-primary mt-3' style={{float:"right"}} onClick={addroomapi}>Create Room</button>

        </div>
      

    </div>
  )
}
export function Allusers() {
  const [users, setusers] = useState([])
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        const theusers = await (await axios.get("api/users/allusers")).data
        console.log(theusers)
        setusers(theusers)
        setloading(false)
      } catch (error) {
        setloading(false)
        seterror(true)

      }



    }
    fetchData()


  }, [])


  return (
    <div className='row'>
      <div className='col-md-12 '>
        <table className='table table-bordered table-dark shadow '>
          <thead className='shadow'>
            <tr><th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>

          </thead>
          <tbody>
            {users.length && (users.map(user => {
              return (
                <tr>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Yes" : "No"}</td>
                </tr>
              )
            }))}
          </tbody>

        </table>


      </div>
    </div >
  )

}