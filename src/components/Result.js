import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';
import '../styles/Result.css';
import ReactHtmlParser from 'react-html-parser';

class Result extends Component {

    render () {
        
        const results = this.props.data.map(result => {

                        const html = ReactHtmlParser(ReactHtmlParser(result.body));
                        return (<Row className="result" key={result.id}>
                                    <Col className="heading" md={6}><FontAwesomeIcon className="star" style={{color: result.isChecked ? "#478F5C" : "grey"}} icon="star" onClick={()=> this.props.onStar(result.id)} />{result.title}</Col>
                                    <Col className="description" md={6}>{html}</Col>
                                </Row>)
                        });
        return (
            <div className="results">{results}</div>
        );
    }
      
}

export default Result;