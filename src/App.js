import React, { Component } from 'react';
import './App.css';
import Result from './components/Result';
import Search from './components/Search';
import Header from './components/Header';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faStar, faSearch);

class App extends Component {

  constructor () {
    super();
    this.state = {
      data:[], //stores the response data
      favourites: [], //stores the starred data
      favouritesMap: new Set(), //used to check existing favourites on reload
    }
  }

  /* Sets data after filtering http get request */
  setData = (filteredData) => this.setState({data: filteredData})

  /* clears results view */
  clearData = () => this.setState({data: []})

  /* When favoriting or unfavoriting */
  onStar = (id) => {
    let index = this.getIndex(id, this.state.data);
    if (index === -1) {
      this.removeFavourite(id);
      return;
    }

    let newData = this.state.data.map(o => Object.assign({}, o));

    if (newData[index].isChecked) { 
      this.removeFavourite(id);
    } else {
      this.addFavourite(id,newData,index);
    }
    newData[index].isChecked = !newData[index].isChecked;
    this.setState({data: newData });
  }

  /* Removes from favourite array */
  removeFavourite(id) {
    this.removeFav(id);
    let newFavourites = this.state.favourites.filter((obj => obj.id !== id));
    this.setState({favourites: newFavourites });
  }

  /* Adds to favourite array */
  addFavourite(id,newData,index) {
    this.addFav(id);
    let newFavourites = this.state.favourites.map(o => Object.assign({}, o));
    newFavourites.push(newData[index]);
    this.setState({favourites: newFavourites});
  }

  /* returns the index of object with given id */
  getIndex (id, array) {
    for (let i = 0; i < array.length; ++i)
      if (array[i].id === id) return i;
    return -1;
  }

  /* Add favourite to map */
  addFav(item) {
    this.setState(({ favouritesMap }) => ({
      favouritesMap: new Set(favouritesMap.add(item))
    }));
  }

  /* Remove favourite from map */
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
        <Search setData={this.setData} clearData={this.clearData} favouritesMap={this.state.favouritesMap}/>
        <div className="search-results">
          <h1 hidden={!this.state.noResults}>No Search Results.</h1>
          <Result data={this.state.data} onStar={this.onStar}/>
        </div>
        <div className="favourites">
          <h1>Favourites</h1>
          <Result data={this.state.favourites} onStar={this.onStar}/>
        </div>
      </div>
    );
  }
}

export default App;
