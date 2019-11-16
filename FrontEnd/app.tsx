declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Header from "./header";
import Sporsmal from "./sporsmal";
import Sok from "./sok";
import NyttSporsmal from "./nyttSporsmal";

export class Hello extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Header />
                    <Switch>
                        <Route path="/nyttSporsmal">
                            <NyttSporsmal />
                        </Route>
                        <Route path="/sok">
                            <Sok />
                        </Route>
                        <Route path="/">
                            <Sporsmal />
                        </Route>
                    </Switch>
                </div>
            </Router>
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
export class About extends React.Component {
    render() {
        return (
            <div>
                <h1>About</h1>
            </div>

        );
    }
}
export class Users extends React.Component {
    render() {
        return (
            <div>
                <h1>Users</h1>
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