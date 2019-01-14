import React, {Component} from 'react';
import '../styles/Loader.css';

class Loader extends Component {

    render () {
        return (
            <div className="loader">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        );
    }
      
}

export default Loader;