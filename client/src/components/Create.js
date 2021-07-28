import React, { useState } from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';
export default  () => {
    const [name, setName] = useState(""); 
    const [host, setHost] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");

    const [errors, setErrors] = useState(null); 

    const onSubmitHandler = e => {
        e.preventDefault();
        const newRoom = {
            name:name,
            host:host,
            time:time,
            description: description,
          };
      
          axios
          .post("http://localhost:8000/api/room", newRoom)
          .then((res) => {
            navigate("/room/" + res.data._id);
        })
          .catch((err) => {
            console.log(err);
            setErrors(err.response?.data?.errors);
          });
      };
    


    return (
        <div>

        <form onSubmit={(e) => { onSubmitHandler(e);}}>            
        <p>
                <label>Room Name:</label><br/>
                {errors?.name && (<span style={{ color: "red" }}>{errors.name.message}</span>)}
                <input type="text" onChange={(e)=>setName(e.target.value)} />
        

            </p>
            <p>
                <label>Room Host:</label><br/>
                {errors?.host && (<span style={{ color: "red" }}>{errors.host.message}</span>)}

                <input type="text" onChange={(e)=>setHost(e.target.value)} />

            </p>
            <p>
                <label>Room Duration :</label><br/>
                {errors?.time && (<span style={{ color: "red" }}>{errors.time.message}</span>)}
                <input type="radio" id="one_hour" name="time"value="60" onChange={(e)=>setTime(e.target.value)}/>
                <label for="one_hour">1 Hour</label>
                <input type="radio" id="six_hour"name="time" value="360" onChange={(e)=>setTime(e.target.value)}/>
                <label for="six_hour">6 Hours</label>
                <input type="radio" id="1_day"name="time" value="1440" onChange={(e)=>setTime(e.target.value)}/>
                <label for="1_day">1 Day</label>
                
            </p>
            <p>
                <label>Room Description :</label><br/>
                <textarea onChange={(e)=>setDescription(e.target.value)} />
            </p>
            <input type="submit" value="Create Room"/>
        </form>
        </div>
    )
}