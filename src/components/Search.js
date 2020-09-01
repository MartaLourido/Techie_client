import React from 'react';

class Search extends React.Component {
  state = {
    input: '',
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.props.filteredEvent(event.target.value);
    this.setState({
      input: value
    });
  };

  render() {
    return (
      <nav class="navbar navbar-light bg-light justify-content-between">
        <form class="form-inline">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
            className="input"
            type="text"
            placeholder="search a event"
            value={this.state.input}
            onChange={this.handleChange}
          />
          <button class="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>

    );
  }
}

export default Search;