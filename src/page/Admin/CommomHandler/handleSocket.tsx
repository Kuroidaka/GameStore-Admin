import { io } from "socket.io-client";

var socket = io("http://localhost:8888/");
export const socketHandler = {
    sendFeedBack : (type: string) => {
        socket.emit("sendFeedback", type)
    },

    requireNotify: () => {
        socket.on("getData",()=>{})
    }
}