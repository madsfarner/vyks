declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
var { Route } = require('react-router-dom');
var { BrowserRoute } = require('react-router-dom');
//import Kategorier from "./kategorier";
//import Test from "./test";
//var Kategorier = require('./kategorier');

export class Hello extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome to React!!</h1>
                
            </div>

        );
    }
}

export class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
            </div>

        );
    }
}


/*export class App extends React.Component {
    render() {
        return (
            <div>
                <h1>app page</h1>
                <BrowserRoute>
                    <Route exact path="/kat" component={Kategorier} />
                    <Route exact path="/test" component={Test} />
                </BrowserRoute>
             </div>
        );
    }
}*/

ReactDOM.render(<Hello />, document.getElementById('root'));