import React, { Component } from 'react'
import NavBar from '../components/Navbar/Navbar';
import LogIn from './LogIn';
class Home extends Component {
    render() {
        return(
            <>
             <div>
                <NavBar />
                homepage
             </div>
             <div>
                 {/* <LogIn /> */}
             </div>
            </>
        );
    }
}

export default Home;