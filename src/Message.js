import React ,{forwardRef} from 'react'
import {Card,CardContent,Typography} from '@material-ui/core';
import './Message.css';

const  Message = forwardRef ((props,ref) => {
    const isUser = props.typedUser === props.username;
    return (
        <div ref={ref}  className={`message ${isUser && `message__user`}`}>
            <Card className={isUser ? "message__userCard":"message__guestCard"}>
               <CardContent>
                  <Typography
                    color="white"
                    variant="h5"
                    component="h2">
                    {!isUser && `${props.username || "Unknown User" }: `} {props.message}
                </Typography>

                </CardContent>
             </Card>
        </div>
    )
})

export default Message
