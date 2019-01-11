import React, {Component} from 'react';
import '../styles/Header.css';



class Header extends Component {

    render () {

        return (
            <div className="header">
                <h1 className="text-center title">Toronto Waste Lookup</h1>
            </div>
        );
    }
      
}

export default Header;