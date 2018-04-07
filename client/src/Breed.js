import React, {Component} from 'react';


class Breed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showImage: false
        }
    }

    onClick = (e) => {
        const image = !this.state.showImage;
        this.setState({showImage: image});
        e.preventDefault();
    };

    render() {
        const imageTag = this.state.showImage ? (
            <img src="https://dog.ceo/api/img/affenpinscher/n02110627_12819.jpg"></img>) : null;
        return (
            <a href="#" className="list-group-item list-group-item-action" onClick={this.onClick}>
                {this.props.breed}
                <div>{imageTag}</div>
            </a>
        )
    }
}

export default Breed;
