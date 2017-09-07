import React, { Component } from 'react';
import "isomorphic-fetch";
import FruitBasket from './FruitBasket';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      filters: [],
      currentFilter: null,
      fruit: []
    }
  }

  componentWillMount() {
    this.fetchFilters();
    this.fetchFruits();
  }

  fetchFruits() {
    fetch('/api/fruit')
      .then(response => response.json())
      .then(fruit => this.setState({ fruit }));
  }

  fetchFilters = () => {
    fetch('/api/fruit_types')
      .then(response => response.json())
      .then(filters => this.setState({ filters }));
  }

  handleFilterChange = event => {
    console.log('new filter: ', event.target.value);
    this.setState({ currentFilter: event.target.value });
  }

  render(){
    return(
      <FruitBasket
        updateFilterCallback={this.handleFilterChange}
        currentFilter={this.state.currentFilter}
        filters={this.state.filters}
        fruit={this.state.fruit}
      />
    )
  }
}

export default App;
