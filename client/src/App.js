import React, {Component} from 'react';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            dogs: []
        }
    }

    componentDidMount () {
        fetch('http://localhost:5000/northwest-1f72b/us-central1/app').then(
            results => results.json()).then(data => {
                let dogs = [];
                data.forEach(dog => {dogs.push(<div key={dog}>{dog}</div>)});
                this.setState({dogs: dogs});
        });
    }

    render() {
        return (
            <div className="App">
                {this.state.dogs}
            </div>
        );
    }
}

export default App;
