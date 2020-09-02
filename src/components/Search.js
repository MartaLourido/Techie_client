// import React from 'react';

// class Search extends React.Component {
//   state = {
//     input: '',
//   };

//   handleChange = (event) => {
//     const { value } = event.target;
//     this.props.filteredEvent(event.target.value);
//     this.setState({
//       input: value
//     });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const { name, date, place, topics, numberOfPeople, city, image, description } = this.state;
//     axios.post(`${API_URL}/event/search`, { name: name, date: date, place: place, topics: topics, numberOfPeople: numberOfPeople, city: city, image: image, description: description }, { withCredentials: true })
//         .then(res => {
//             this.props.history.push('/events')
//         })

// }


//   render() {
//     return (
//       <nav class="navbar navbar-light bg-light justify-content-between">
//         <form onSubmit={this.handleSubmit} class="form-inline">
//           <input class="form-control mr-sm-2" type="search" placeholder="search" aria-label="search"
//             className="input"
//             value={this.state.input}
//             onChange={this.handleChange}
//           />
//           <button class="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
//         </form>
//       </nav>

//     );
//   }
// }

// export default Search;