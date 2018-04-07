import React, {Component} from 'react';


class Breed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showImage: false
        }
    }

    onClick = (e) => {
        e.preventDefault();
        const image = !this.state.showImage;
        this.setState({showImage: image});
        if (image) {
            let splitBreed = this.props.breed.split(" ");
            let url = "https://dog.ceo/api/breed/";
            url += splitBreed.pop();
            if (splitBreed.length > 0)
                url += "/" + splitBreed.pop();
            url += "/images/random";
            fetch(url).then(
                results => results.json()).then(data => {
                this.setState({image: data.message});
            });
        }
    };

    render() {
        const imageTag = this.state.showImage ? (
            <img src={this.state.image} alt="Loading..." />) : null;
        const visible = this.props.displayed ? (
            <a href="#" className="list-group-item list-group-item-action" onClick={this.onClick}>
                {this.props.breed}
                <div>{imageTag}</div>
            </a>) : (<span></span>);
        return visible
    }
}

export default Breed;
