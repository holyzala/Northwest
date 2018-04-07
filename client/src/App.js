import React, {Component} from 'react';
import './App.css';
import Breed from './Breed';

class App extends Component {
    constructor() {
        super();
        this.state = {
            all_dogs: []

        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/list').then(
            results => results.json()).then(data => {
            let allDogs = data.map(dog => ({dog: dog, displayed: true}));
            this.setState({all_dogs: allDogs});
        });
    }

    filterChange = (evt) => {
        const new_dogs = this.state.all_dogs.map(dog => {
            console.log(dog);
            return dog.dog.includes(evt.target.value) ?
                {dog: dog.dog, displayed: true} : {dog: dog.dog, displayed: false}
        });
        this.setState({all_dogs: new_dogs});
    };

    render() {
        const dogs = this.state.all_dogs.map(dog => (<Breed breed={dog.dog} displayed={dog.displayed}/>));
        return (
            <div className="container-fluid">
                <form onSubmit={e => e.preventDefault()} action="#">
                    <div className="form-group">
                        <label htmlFor="filter">Filter list by:</label>
                        <input className="form-control" onChange={this.filterChange} type="text" id="filter"></input>
                    </div>
                </form>
                <div className="list-group">
                    {dogs}
                </div>
            </div>
        );
    }
}

export default App;
