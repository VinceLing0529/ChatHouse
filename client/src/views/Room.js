import Create from "../components/Create";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "@reach/router";
import io from 'socket.io-client';
import Message from "../components/Message";
export default props => {
    const [room,setRoom] = useState({});
    const [socket] = useState(() => io(':8000'));
    const [userName, setUserName] = useState("");
    const [hasName, setHasName] = useState(false);
    const [currMessage, setCurrMessage] = useState("");
    const [message,setMessages] = useState();
    

//   useEffect( () => {
//     socket.on('msg', (userName,msg) => 
        
//         setMessages(sentMsg => {
//             return [...sentMsg, {user:userName, msg: msg}];
//         }
        
//         )
//         )
       
//     }, []);

socket.on('msg', function (userName, msg) {
    
    console.log(userName)
    console.log(msg)  
  });


    const onSubmitHandler = e => {
        e.preventDefault();
        socket.send(currMessage);
        setCurrMessage("");
        console.log(message);
    };

    const onNameSubmitHandler = e => {
        e.preventDefault();
        socket.on('connect', function () {
            socket.emit('join', userName,props.id);
          });
         
            setHasName(true);
    };
    


    useEffect(() => {
        axios.get("http://localhost:8000/api/room/" + props.id)
            .then(res => setRoom(res.data))
    }, [])


    const renderContent = () => {
        if (hasName === false) {
            return(
                <div>
                    <form onSubmit={onNameSubmitHandler}>
                        <label>Name: </label>
                        <input type="text" onChange={(e) => {
                            setUserName(e.target.value);
                            }}/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            );
        } else {
    return (
        <div>
            <div>
            Room: {room.name} 
            YourName: <span id="userName"> {userName}</span> 
            </div>
       

        <div id="msglog">
        {/* {message.map( (message, idx) => {
                        return(
                                <Message key={idx} message={message} user={userName}/>
                        );
         } )} */}
        </div>
        <form onSubmit={onSubmitHandler}>
        <textarea name="message" id="messageInput"   onChange={ (e) => setCurrMessage(e.target.value) } value={currMessage}></textarea>
        <br/>
        <button>Send Message</button>
        </form>

        <Link to = {"/"} ><button >Leave room</button></Link>

        </div>

            
    )
}};
return(
    <div>
        {renderContent()}
    </div>
);
    }