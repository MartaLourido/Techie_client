import React from 'react';

class Search extends React.Component {
  state = {
    input: '' // 5. state will change based on sequence and will be used to add it dinamically to the input
  };

  // method to run filter function pased from previous component on any input change
  handleSearch = event => {
    const { value } = event.target; // 2. value indicates the current input from target
    this.props.filterEvent(value); // 3. run filter function (passed from props) with current value

    // 4. update state
    this.setState({
      input: value
    });
  };

  render() {
    return (
      <div>
        <input
          type='text'
          className='input'
          onChange={this.handleSearch} // 1. run function on input change
          placeholder='search a event'
          value={this.state.input} // 6. current value changes dinamically based on state
        />
      </div>
    );
  }
}

export default Search;