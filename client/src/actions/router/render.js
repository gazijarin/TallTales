import { socket } from "../sockets/socket";

export const route = (app) => {
    const page = app.state.page;
    return page;
}

export const backButtonHandler = (app, history) => {
    history.listen((loc, action) => {
        if (action === 'POP') {
            // Checks if user is currently in a game page
            if (app.state.page === "inputStage" || app.state.page === "voteStage" || app.state.page === "leaderboard" || app.state.page === "lobby") {
                socket.disconnect(); // Disconnects user from game and sends them back to dashboard

                app.setState({
                    page: "dashboard"
                });
                socket.connect(); // Reconnects user to socket once in dashboard so they can join more games
            }

            // Checks if user currently in dashboard
            // if (app.state.page === "dashboard") {
            //     // logout
            //     socket.disconnect();
            //     app.setState({
            //         currUser: null,
            //         page: "login"
            //     });
            // }

            else {
                // Gets new url
                const url = window.location.href.split("/").pop();
                app.setState({
                    page: url
                });
            }
        }
    })
}