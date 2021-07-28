import React from 'react';

const Message = props => {
    const msg = props.message.msg;
    const msgSender = props.message.user;
    const userName = props.user;


    return(
        <div>
            <h1>{msgSender}</h1>
            <p>{msg}</p>
        </div>
    );
}

export default Message;