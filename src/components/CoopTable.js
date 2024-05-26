import React from "react";
import axios from 'axios';
import loading from './gears.gif'; // Ensure this path is correct
import '../components/Coop.css';


/**
 * CoopTable Component - Displays a table of cooperative education (coop) opportunities.
 * Fetches coop data from a JSON file and renders it in a tabular format.
 */
class CoopTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coops: [],
            loaded: false,
        };
    }

    /**
    * Fetches coop data from a local JSON file when the component mounts.
    * Sets the fetched data to the state or logs an error if the request fails.
    */

    componentDidMount() {
        axios.get(`${process.env.PUBLIC_URL}/coopTable.json`)
            .then((response) => {
                /// Correctly accessing the nested array based on your JSON structure
                this.setState({ coops: response.data.coopTable.coopInformation, loaded: true });
            })
            .catch((error) => {
                console.log('Something went wrong while fetching the coop data:', error);
            });
    }


    render() {
        const { coops, loaded } = this.state;
        let content;
        if (!loaded) {
            content = <div><img src={loading} alt='Loading' /></div>;
        } else {
            content = (
                //Once data is loaded, displays it in a table format 
                <table className="coopTable">
                    <thead>
                        <tr>
                            <th>Employer</th>
                            <th>Degree</th>
                            <th>City</th>
                            <th>Term</th>
                        </tr>
                    </thead>
                    <tbody>
                          {/* Maps each coop opportunity to a row in the table */}
                        {coops.map((coop, index) => (
                            <tr key={index}>
                                <td data-label="Employer">{coop.employer}</td>
                                <td>{coop.degree}</td>
                                <td>{coop.city}</td>
                                <td>{coop.term}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }

        return (
            <div className="coopTableContainer">
                <h1>Cooperative Education Opportunities</h1>
                {content}
            </div>
        );
    }

}

export default CoopTable;
