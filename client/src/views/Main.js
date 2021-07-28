import Create from "../components/Create";
import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from "axios";
import { Link } from "@reach/router";

export default () => {
    const [room, setRoom] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [search,setSearch] = useState();

    useEffect(()=>{
        axios.get('http://localhost:8000/api/room')
            .then(res=>{
                setRoom(res.data);
                setLoaded(true);
            });
    },[])

    const block ={
        border:"solid",
        padding:"20px",
        margin:"20px",
        display:"inline-block"
    }
    return (
        <div>
            <div>
              Find(Name):<input type="text" onChange={(e)=>setSearch(e.target.value)}/>
              <Link to = {"/search/"+search}><button>Find Room</button></Link>

            <Popup trigger={<button> Create a new room</button>}>
            
            <Create />
        </Popup>
        </div>

        {loaded&&room.map((rooms, idx)=>{
                return (    
                <div style={block}>
                    <h1>{rooms.name}</h1>
                    <p>Room Host:{rooms.host}</p>
                    <p>Room Duration:{rooms.time}</p>
                    <p>Room Description:{rooms.description}</p>
                    <Link to = {"/room/"+rooms._id}><button>Join Room</button></Link>
                </div>
                
                               
                )
                
            })}
        </div>

        
    )
}