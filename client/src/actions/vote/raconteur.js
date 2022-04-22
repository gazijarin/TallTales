import { socket } from "../sockets/socket";
// const log = console.log

export const findRaconteur = (users) => {
    // log(users);
    for (let i = 0; i < users.length; i++) {
        if (users[i].raconteur === true) {
            return i
        }
    }
    return -1;
}

export const chooseRaconteur = (users) => {
    // log(users);
    let prev = findRaconteur(users);

    if (prev === -1) {
        users[0].raconteur = true;
        
        socket.emit("update-raconteur", {
            raconteur: users[0].username,
            prev: null
        });
    }
    
    else {
        users[prev].raconteur = false;

        // Choose next user to be raconteur
        // If raconteur was last user in array, loop back to front of array
        if (prev === users.length - 1) {
            users[0].raconteur = true;

            socket.emit("update-raconteur", {
                raconteur: users[0].username,
                prev: users[prev].username
            });
        }

        else {
            users[prev + 1].raconteur = true;

            socket.emit("update-raconteur", {
                raconteur: users[prev + 1].username,
                prev: users[prev].username
            });
        }
    }

    return users;
}