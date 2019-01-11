import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Button  } from 'react-bootstrap';
import '../styles/Search.css';


class Search extends Component {

    render () {

        return (
            <div className="search">
                <Row>
                    <Col xs={10}><input type="text" className="searchBar form-control"/></Col>
                    <Col xs={2}><Button className="searchBtn"><FontAwesomeIcon className="icon" icon="search" /></Button></Col>
                </Row>
            </div>
        );
    }
      
}

export default Search;

