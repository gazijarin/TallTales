import { socket } from "./socket";
// const log = console.log;

export const updateSentence = (users) => {
    socket.emit("update-sentence", {
        room: users[0].room,
        users: users
    })
}