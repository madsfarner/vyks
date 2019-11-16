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

export class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Header />
                    <Switch>
                        <Route exact path="/nyttSporsmal">
                            <NyttSporsmal />
                        </Route>
                        <Route exact path="/sok/:tekst">
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
//}

ReactDOM.render(<App />, document.getElementById('root'));