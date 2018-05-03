import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: 'backend-data',
            reactCategories: 'backend-data',
            reduxCategories: 'backend-data',
            udacityCategories: 'backend-data',
        }
    }

    componentDidMount() {

        const url = "http://localhost:3001" || `${process.env.REACT_APP_BACKEND}`;

        console.log('fetching from url', url + "/categories");
        fetch(url + "/categories", { headers: { 'Authorization': 'whatever-you-want' } })
            .then((res) => { return (res.text()) })
            .then((data) => { this.setState({ categories: data }) });

        console.log('fetching from url', url + "/react/posts");
        fetch(url + "/react/posts", { headers: { 'Authorization': 'whatever-you-want' } })
            .then((res) => { return (res.text()) })
            .then((data) => { this.setState({ reactCategories: data }) });

        console.log('fetching from url', url + "/redux/posts");
        fetch(url + "/redux/posts", { headers: { 'Authorization': 'whatever-you-want' } })
            .then((res) => { return (res.text()) })
            .then((data) => { this.setState({ reduxCategories: data }) });

        console.log('fetching from url', url + "/udacity/posts");
        fetch(url + "/udacity/posts", { headers: { 'Authorization': 'whatever-you-want' } })
            .then((res) => { return (res.text()) })
            .then((data) => { this.setState({ udacityCategories: data }) });

        console.log('attempting to post...', url + "/posts");
        fetch(url + "/posts", {
            method: 'POST',
            headers: { 'Authorization': 'whatever-you-want' },
            body: JSON.stringify({
                id: 'some-unique-id',
                timestamp: Date.now(),
                title: "my test post",
                body: "this is a test posted from my home PC",
                author: "Chaiz man",
                category: "udacity",
            }),
        })
    }

    render() {
    return (
        <div className="App">
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
        </p>
            <p>
                talking to the backend yields these categories DESUUU~~: <br/>
                {this.state.categories}
            </p>
            <p>
                talking to the backend yields these categories DESUUU~~: <br />
                {this.state.reactCategories}
            </p>
            <p>
                talking to the backend yields these categories DESUUU~~: <br />
                {this.state.reduxCategories}
            </p>
            <p>
                talking to the backend yields these categories DESUUU~~: <br />
                {this.state.udacityCategories}
            </p>
        </div>
    );
    }
}

export default App;
