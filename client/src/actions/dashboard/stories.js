export const nextStory = (story, user, page) => {
    // Gets passed in array of users from database

    const stories = user.stories;
    let newStory;

    if (story === stories.length - 1) {
        newStory = 0
    }

    else {
        newStory = story + 1;
    }

    page.setState({
        story: newStory
    })
}

export const prevStory = (story, user, page) => {
    // Gets passed in array of users from database

    const stories = user.stories;
    let newStory;

    if (story === 0) {
        newStory = stories.length - 1;
    }

    else {
        newStory = story - 1;
    }

    page.setState({
        story: newStory
    })
}