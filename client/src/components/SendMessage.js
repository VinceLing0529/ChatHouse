import React, { useState } from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';
export default  props => {
    const [name, setName] = useState(props.user); 
    const [message, setMessage] = useState("");
    const [roomId, setRoomId] = useState(props.id);
    const [errors,setErrors] = useState(null);
    const onSubmitHandler = e => {
        e.preventDefault();
        const newMessage = {
            name:name,
            roomId:roomId,
            message:message
          };
      
          axios
          .post("http://localhost:8000/api/message", newMessage)
          .then((res) => {
            navigate("/room/" + props.id);
        })
          .catch((err) => {
            console.log(err);
            setErrors(err.response?.data?.errors);
          });
      };
    


    return (
        <div>

        <form onSubmit={(e) => { onSubmitHandler(e);}}>            
       

                <textarea name="message" id="messageInput" onChange={(e)=>setMessage(e.target.value)}></textarea>
                <br/>
            <input type="submit" value="Send Message"/>
        </form>
        </div>
    )
}