import React from "react";
import axios from 'axios';
import loading from './gears.gif'; // Ensure the loading gif's path is correct relative to this file
import '../components/About.css';

/**
 * Represents the About section of the website.
 * This component fetches and displays the About content, including title, description, and a quote,
 * from a JSON file. It also displays a looping video background.
 */


class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            about: {},
            loaded: false,
        };
    }


    /**
     * Fetches the About section content from a local JSON file upon component mounting.
     * Updates the component's state with the fetched data.
     */

    componentDidMount() {
        // /Fetch the local JSON file from the public directory
        axios.get(`${process.env.PUBLIC_URL}/about.json`)
            .then((response) => {
                this.setState({ about: response.data, loaded: true });
            })
            .catch(() => {
                console.log('Something went wrong while fetching the local JSON file...')
            });
    }

    render() {
        const { about, loaded } = this.state;
        // Conditional rendering based on the loaded state to display a loading indicator or the content.
        let content;
        if (!loaded) {
            content = <div><img src={loading} alt='Loading'></img></div>
        } else {
            content = (
                <div>
                    <h3 className="titleColor">{about.title}</h3>
                    <p className="descriptionColor">{about.description}</p>
                    <div className='quote'>
                        <p className="quoteColor">{about.quote}</p>
                        <p className="quoteAuthorColor">{about.quoteAuthor}</p>
                    </div>
                </div>
            );
        }

        //return About header, and rochester 
        return (
            <div className="about">
                <h1 className="ab">iSchool @RIT</h1>
                {content}
                <video className="rochester-video" src={`${process.env.PUBLIC_URL}/media/rit_video.mp4`} autoPlay loop muted playsInline>
                    Your browser does not support the video tag.
                </video>

            </div>
        );
    }

}

export default About;
