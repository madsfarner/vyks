declare var require: any

var React = require('react');
var { Link } = require('react-router-dom');

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sokeTekst: "",
            submitted: false
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { sokeTekst } = this.state;
        if (!sokeTekst) {
            return;
        }

    }

    handleChange = e => {
        const tekst = e.target.value;
        this.setState({ sokeTekst: tekst });
    }


    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg">

                        <div >
                            <Link to="/">
                                <img className="img-fluid float-left" src="./assets/vylogo.jpg" style={{ height: "100px" }} />
                            </Link>
                        </div>

                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">FAQ - Spørsmål</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/nyttSporsmal" className="nav-link">Nytt Spørsmål</Link>
                            </li>
                        </ul>

                        <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
                            <input
                                className="form-control mr-sm-2"
                                type="search"
                                placeholder="Søketekst"
                                aria-label="Søk"
                                onChange={this.handleChange}
                                invalid={this.submitted && !this.sokeTekst}
                            />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Søk</button>
                        </form>


                    </nav>
                </div>
            </div>
        );
    }
}