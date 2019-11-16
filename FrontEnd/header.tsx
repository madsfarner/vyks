declare var require: any

var React = require('react');
var { Link, withRouter } = require('react-router-dom');

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sokeTekst: "",
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        const { sokeTekst } = this.state;
        const sokUrl = "/sok/tekst=" + sokeTekst;
        this.props.history.push(sokUrl);
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
                                invalid="true"
                            />
                            <button
                                className="btn btn-outline-secondary my-2 my-sm-0" type="submit">Søk</button>
                        </form>


                    </nav>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);