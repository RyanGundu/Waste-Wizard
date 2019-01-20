import React, {Component} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../components/Loader';
import { Row, Col, Button, FormGroup, FormControl  } from 'react-bootstrap';
import '../styles/Search.css';


class Search extends Component {

    constructor() {
        super();
        this.state = {
            searchKey: '',
            isLoading: false,
            message: ''
        }

        this.onSearch = this.onSearch.bind(this);
    }

    /* Clears data on backspace and sets search value */
    searchVal = (e) => {
        this.setState({searchKey: e.target.value});
        if (e.target.value === '') {
            this.setState({message:''});
            this.props.clearData();
        }
    }

    /* Fires on search */
    handleSearch = (e) => {
        e.preventDefault(); 
        if (this.state.searchKey !== '') 
            this.onSearch();
    }

    /* get request for data */
    async onSearch () {
        this.props.clearData();
        this.setState({message: '', isLoading: true});
        try {
            let response = await axios.get('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
            let filteredData = this.filterData(response.data);
            if (filteredData.length === 0) this.setState({message: 'No Search Results.'});
            this.props.setData(filteredData);
        } catch (error) {
            this.props.setData([]);
            this.setState({message: 'Oops, there seems to be a proplem. Please check your connection.'});
        } finally {
            this.setState({isLoading: false});
        }
    }

    /* returns filtered data based on search keywords */
    filterData = (data) => {
        return data.filter(obj => {
            let searchWords = this.state.searchKey.replace(",", "").split(" ");
            if (this.props.favouritesMap.has(obj.title)) obj.isChecked = true;
            else obj.isChecked = false;

            for (let key of searchWords) {
                if (key.length > 0 && obj.keywords.includes(key.toLowerCase())) {
                    obj.id = obj.title //add unique id to each (title)
                    return true; // search value found
                }
            }
            return false; //filter out, search value not found
        });
    }

    render () {

        return (
            <div className="search">
                <Row>
                    <form onSubmit={this.handleSearch}>
                    <Col xsHidden md={1}></Col>
                    <Col xs={9}>
                        <FormGroup bsSize="large">
                            <FormControl type="text" placeholder="Search" className="searchBar" onChange={this.searchVal}/>
                        </FormGroup>
                    </Col>
                    <Col xs={2}><Button onClick={this.handleSearch} bsSize="large" className="searchBtn"><FontAwesomeIcon className="icon fa-flip-horizontal" icon="search" /></Button></Col>
                    </form>
                </Row>
                <div hidden={!this.state.isLoading}><Loader/></div>
                <p className="text-center">{this.state.message}</p>
            </div>
        );
    }
      
}

export default Search;

