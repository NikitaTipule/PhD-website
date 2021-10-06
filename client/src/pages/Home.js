import React, { Component } from 'react'
import NavBar from '../components/Navbar/Navbar';
import MainLogIn from './MainLogin';
class Home extends Component {
    render() {
        return(
            <>
             <div >
                <NavBar />
             </div>
                 <div>
                 <MainLogIn/>
                 </div>
            </>
        );
    }
}

export default Home;