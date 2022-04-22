import React from "react";

import "./appName.css";

class AppName extends React.Component {

    render() {
        return (
            <div className="app-name">
                <p className="app-name-name">
                    {(this.props.text) ? this.props.text : "Tall Tales"}
                </p>
                {/* If this.props.showTagline === true, then show the tagline */}
                {this.props.showTagline && 
                    <p className="app-name-tag">
                        {"<EVERYONE HAS A STORY TO TELL>"}
                    </p>
                }
            </div>
        ); 
    }
}

export default AppName;
