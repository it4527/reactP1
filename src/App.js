import React from 'react';
import './App.css';
import About from './components/About';
import Faculty from './components/Faculty';
import UngraduatedDegrees from './components/UngraduatedDegrees';
import GraduatedDegrees from './components/GraduatedDegrees';
import CoopTable from './components/CoopTable';
import EmploymentTable from './components/EmploymentTable';

export default class App extends React.Component {

    scrollToSection = (sectionId) => {
        if (sectionId) {
            /// Prevent default anchor link behavior
            const section = document.getElementById(sectionId);
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };


    render() {
        return (
            
            <div className='App'>


                <nav className="navbar">
                    <ul>
                        <li onClick={() => this.scrollToSection('About')}>About</li>
                        <li onClick={() => this.scrollToSection('Faculty')}>Faculty</li>
                        <li onClick={() => this.scrollToSection('UngraduatedDegrees')}>Ungraduated Degrees</li>
                        <li onClick={() => this.scrollToSection('GraduatedDegrees')}>Graduated Degrees</li>
                        <li onClick={() => this.scrollToSection('CoopTable')}>Coop Table</li>
                        <li onClick={() => this.scrollToSection('EmploymentTable')}>Employment Table</li>
                    </ul>
                </nav>

                <section id='About'><About /></section>
                <section id='Faculty'><Faculty /></section>
                <section id='UngraduatedDegrees'><UngraduatedDegrees /></section>
                <section id='GraduatedDegrees'><GraduatedDegrees /></section>
                <section id='CoopTable'><CoopTable /></section>
                <section id='EmploymentTable'><EmploymentTable /></section>



            </div>



        );
    }
}
