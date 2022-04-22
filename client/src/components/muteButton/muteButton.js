import React from "react";
import { handleMute } from "../../actions/audio/muteGame";

import "./muteButton.css";

class MuteButton extends React.Component {
    render() {
        const audioRefs = this.props.audioRefs;

        const handleMute = () => {
            if(this.props.app.state.muted) {
                this.props.app.setState( { muted: false });
                audioRefs.forEach((audioRef) => {
                    audioRef.audioEl.current.muted = false;
                })
                
            }
            else {
                this.props.app.setState( { muted: true });
                audioRefs.forEach((audioRef) => {
                    audioRef.audioEl.current.muted = true;
                })
            }
        }
        
        return (
            <div className="mute-button">
                {(this.props.app.state.muted) ? 
                    <img src={require("../../assets/images/volume_off.png")} alt="volume" onClick={() => handleMute(this.props.app, this.props.audioRef)}></img> :
                    <img src={require("../../assets/images/volume_on.png")} alt="volume" onClick={() => handleMute(this.props.app, this.props.audioRef)}></img>
                } 
            </div>
        )
    }
}

export default MuteButton;