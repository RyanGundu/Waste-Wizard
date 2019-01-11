import React, { Component } from 'react';
import './App.css';
import Result from './components/Result';
import Search from './components/Search';
import Header from './components/Header';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faSearch } from '@fortawesome/free-solid-svg-icons';


library.add(faStar, faSearch);

class App extends Component {

  constructor () {
    super();
    this.state = {
      data:[], //stores the response data
      favourites: [], //stores the checked data
      favouritesMap: new Set(), //used to check favourites
      searchValue: 'egg' //value in search bar
    }
    this.onSearch = this.onSearch.bind(this);
    this.onStar = this.onStar.bind(this);
  }

  /* Called on search click */
  onSearch () {
    axios.get('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=10')
    .then(response => {this.setState({data: this.filterData(response.data)})}).catch((err) => console.log(err));
  }

  /* Filters data using search value and keywords */
  filterData (data) {
  
    return data.filter(obj => {
        let keywords = obj.keywords.split(/[ ,]+/);
        if (this.state.favouritesMap.has(obj.title)) obj.isChecked = true;
        else obj.isChecked = false;
        let includes = keywords.includes(this.state.searchValue)
        if (includes) obj.id = obj.title; //add unique id to each (title)
    
        return includes;
    });
  }

  /* When favoriting or unfavoriting */
  onStar (id) {

    let index = this.getIndex(id, this.state.data);
    let newData = this.state.data.map(o => Object.assign({}, o));
    let newFavourites = this.state.favourites.map(o => Object.assign({}, o));

    if (newData[index].isChecked) { 
      //remove from favourites
      console.log('rmv');
      this.removeFav(newData[index].title);
      newFavourites = this.state.favourites.filter((obj => obj.id !== id));
      
    } else {
      //add to favourites
      console.log('add');
      this.addFav(newData[index].title);
      newFavourites.push(newData[index]);
    }
  
    newData[index].isChecked = !newData[index].isChecked;
    this.setState({favourites: newFavourites });
    this.setState({data: newData });
  }

  getIndex (id, array) {
    for (let i = 0; i < array.length; ++i)
      if (this.state.data[i].id === id) return i;
  }

  /* Add fav to map */
  addFav(item) {
    this.setState(({ favouritesMap }) => ({
      favouritesMap: new Set(favouritesMap.add(item))
    }));
  }

  /* Remove fav from map */
  removeFav(item) {
    this.setState(({ favouritesMap }) => {
      const newFavouritesMap = new Set(favouritesMap);
      newFavouritesMap.delete(item);
      return {
        favouritesMap: newFavouritesMap
      };
    });
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <button onClick={this.onSearch}>click me</button>
        <Search/>
        <Result data={this.state.data} onStar={this.onStar}/>
        <h1>FAVOURITES</h1>
        <Result data={this.state.favourites} onStar={this.onStar}/>
      </div>
    );
  }
}

export default App;
