import Create from "../components/Create";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "@reach/router";
import io from 'socket.io-client';
import Message from "../components/SendMessage";
export default props => {
    const [room,setRoom] = useState({});
    const [userName, setUserName] = useState("");
    const [hasName, setHasName] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const [currMessage, setCurrMessage] = useState("");
    const [message,setMessages] = useState();
    

    useEffect(() => {
        axios.get("http://localhost:8000/api/message/" + props.id)
            .then(res =>{
            setMessages(res.data);
            setLoaded(true);
        })
    }, [])


    const onNameSubmitHandler = e => {
        e.preventDefault();
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
        {loaded&&message.map((messages, idx)=>{
                return (    
                <p>{messages.name} : {messages.message}</p>
                
                               
                )
                
            })}
        </div>
        
        <Message user = {userName} id = {props.id}/>


        </div>

            
    )
}};
return(
    <div>
        {renderContent()}
    </div>
);
    }