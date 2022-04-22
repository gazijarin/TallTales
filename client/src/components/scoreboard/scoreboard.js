import React from "react";

import "./scoreboard.css";

class Scoreboard extends React.Component {
    state = {
        click: null
    }

    render() {

        const { users } = this.props;

        // CSS that highlights a user's contributions
        const highlight = (username) => {
            // Highlight user's contributions
            const contributions = document.getElementsByClassName(username);
                for(let c of contributions) {
                    c.style.fontWeight = 'bold';
                    c.style.color = 'white';
            }
            // Highlight scoreboard container
            const container = document.getElementById(username);
            container.style.backgroundColor = 'rgba(255, 255, 255, 0.382)';

        }

        // CSS that unhighlights a user's contributions
        const unhighlight = (username) => {
            // Unhighlight user's contributions
            const contributions = document.getElementsByClassName(username);
                for(let c of contributions) {
                    c.style.fontWeight = '';
                    c.style.color = '#808080';
            }
            // Unhighlight scoreboard container
            const container = document.getElementById(username);
            container.style.backgroundColor = 'transparent';
        }

        const handleOnHover = (username) => {
            if(this.state.click === null) {
                highlight(username);
            }
            if(this.state.click !== username) {
                // Highlight scoreboard container
                const container = document.getElementById(username);
                container.style.backgroundColor = 'rgba(255, 255, 255, 0.382)';
            }
        };

        const handleOffHover = (username) => {
            if(this.state.click === null) {
                unhighlight(username);            
            }
            if(this.state.click !== username) {
                // Unhighlight scoreboard container
                const container = document.getElementById(username);
                container.style.backgroundColor = 'transparent';
            }
        }

        const handleClick = (username) => {
            if(this.state.click === username) {
                unhighlight(username);            
                this.setState({ click: null });
            }
            else if(this.state.click === null) {
                highlight(username);
                this.setState({ click: username});
            }
            else {
                unhighlight(this.state.click);
                highlight(username);
                this.setState({ click: username });
            }
        }
 
        return (
            <div className="scoreboard-players">
                {users.map((e, i) => {
                    return (
                        <div key={i} className="player-container" id={e.username} 
                                    onMouseEnter={() => handleOnHover(e.username)}
                                    onMouseLeave={() => handleOffHover(e.username)}
                                    onClick={() => handleClick(e.username)}>
                            <img src={require("../../assets/images/" + e.icon)} alt="img"></img>
                            <div className="player-info">
                                <div className="player-info-name">
                                    {e.username}
                                </div>
                                <div className="player-info-score">
                                    Score: {e.score}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Scoreboard;