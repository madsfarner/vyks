declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Sporsmal from "./sporsmal";
import Sok from "./sok";
import NyttSporsmal from "./nyttSporsmal";

export class Hello extends React.Component {
    render() {
        return (
            <Router>

                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/sok">Søk</Link>
                            </li>
                            <li>
                                <button type="button" class="btn btn-danger">Danger</button>
                                <Link to="/nyttSporsmal">Nytt Spørsmål</Link>
                            </li>
                        </ul>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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