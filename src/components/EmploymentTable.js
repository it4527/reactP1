import React from "react";
import axios from 'axios';
import loading from './gears.gif'; // Ensure this path is correct
import '../components/EmploymentTable.css'; // Assuming this CSS file is in the same directory



/**
 * EmploymentTable Component - Displays a searchable table of employment opportunities.
 * This component fetches employment data from a JSON file and allows users to search through the job listings.
 */
class EmploymentTable extends React.Component {
    constructor(props) {
        super(props);
        // Initializes state with empty jobs array, loading status, and search term
        this.state = {
            jobs: [],
            loaded: false,
            searchTerm: '',
        };
    }


    /**Updates the search term in the state based on user input */
    handleSearch = (event) => {
        this.setState({ searchTerm: event.target.value });
    };


    /**
 * Performs an HTTP GET request to fetch employment data once the component mounts.
 * Updates the state with the fetched data or logs an error if the fetch fails.
 */
    componentDidMount() {
        axios.get(`${process.env.PUBLIC_URL}/employmentTable.json`)
            .then((response) => {
                this.setState({ jobs: response.data.employmentTable.professionalEmploymentInformation, loaded: true });
            })
            .catch((error) => {
                console.error('Error fetching employment data:', error);
            });
    }

    render() {
        const { loaded, searchTerm } = this.state;
        // Filter jobs based on search term (case insensitive)
        const filteredJobs = this.state.jobs.filter(job =>
            Object.values(job).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

        return (
            <div className="employmentTableContainer">
                <h1>Professional Employment Opportunities</h1>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={this.handleSearch}
                    className="search-input"
                />
                {!loaded ? (
                     // Displays loading animation while data is being fetched
                    <div><img src={loading} alt="Loading" /></div>
                ) : (
                    // Renders the table with filtered job listings
                    <table className="employmentTable">
                        <thead>
                            <tr>
                                <th>Employer</th>
                                <th>Degree</th>
                                <th>City</th>
                                <th>Title</th>
                                <th>Start Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*/ Map each job to a row in the table */}
                            {filteredJobs.map((job, index) => (
                                <tr key={index}>
                                    <td>{job.employer}</td>
                                    <td>{job.degree}</td>
                                    <td>{job.city}</td>
                                    <td>{job.title}</td>
                                    <td>{job.startDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default EmploymentTable;
