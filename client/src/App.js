import React, {Component} from 'react';
import './App.css';
import Breed from './Breed';

class App extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
        fetch('/api/list').then(
            results => results.json()).then(data => {
                let displayed = data.map(dog => (<Breed breed={dog}/>));
            this.setState({all_dogs: data, displayed: displayed});
        });
    }

    filterChange = (evt) => {
        let displayed = this.state.all_dogs.filter(dog => dog.includes(evt.target.value)).map(
            dog => (<li className={"list-group-item"} key={dog}>{dog}</li>));
        this.setState({displayed: displayed});
    };

    render() {
        return (
            <div className="container-fluid">
                <form onSubmit={e => e.preventDefault()} action="#">
                    <div className="form-group">
                        <label htmlFor="filter">Filter list by:</label>
                        <input className="form-control" onChange={this.filterChange} type="text" id="filter"></input>
                    </div>
                </form>
                <div className="list-group">
                    {this.state.displayed}
                </div>
            </div>
        );
    }
}

export default App;
