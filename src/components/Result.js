import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';
import '../styles/Result.css';
// import ReactHtmlParser from 'react-html-parser';


class Result extends Component {

    render () {
        const results = this.props.data.map(result => {
                        return (<Row className="result" key={result.id}>
                                    <Col md={6}><FontAwesomeIcon style={{color: result.isChecked ? "#478F5C" : "grey"}} icon="star" onClick={()=> this.props.onStar(result.id)} />{result.title}</Col>
                                    <Col md={6} dangerouslySetInnerHTML={{__html: result.body}} />
                                </Row>)
                        });
        return (
            <div>{results}</div>
        );
    }
      
}

export default Result;