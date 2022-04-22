import React from "react";

import "./completedStory.css"

class CompletedStory extends React.Component {
    render() {
        const { story, title } = this.props;

        return (
            <div className="completed-story">
                <div className="completed-story-title">
                    {title}
                </div>
                <div className="completed-story-start">
                    {story.start}
                </div>
                <div className="completed-story-contribution">
                    {story.contributions.map((obj, i) => {
                        return (
                            <span key={i} className={obj.username}>
                                {obj.sentence + " "}
                            </span>
                        )
                        })
                    }
                </div> 
            </div>
        )

    }
    
    


}

export default CompletedStory;