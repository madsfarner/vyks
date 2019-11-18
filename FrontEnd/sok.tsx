declare var require: any

var React = require('react');
import { withRouter } from 'react-router-dom';
import axios from "axios";
import { environment } from "./environment";
import SporsmalListe from "./sporsmalListe";

class Sok extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tekst: "testtekst",
            valid: false,
            submitted: false,
            sporsmal: null
        };
    }

    componentDidMount() {
        this.sjekkSok();
        console.log(this.props);
        //this.sok()
    }

    componentDidUpdate() {
        if (!(this.props.match.params.tekst.substring(6) === this.state.tekst)) {
            this.sjekkSok();
            //this.sok();

        };
        console.log("comp oppdatert");
    }

    sok() {
        console.log("sok(), valid = " + this.state.valid);

    }

    sjekkSok() {
        if (this.props.match.params.tekst === "tekst=") {
            //uten søkefrase
            this.setState({
                valid: false,
                tekst: ""
            })
        } else {
            //med søkefrase
            const tekst = this.props.match.params.tekst;
            const subTekst = tekst.substring(6);
            this.setState({
                tekst: subTekst,
                valid: true
            });
            if (!this.state.submitted) {
                const url = environment.sokUrl + subTekst
                this.setState({ submitted: true })
                axios.get(url).then(res => {
                    console.log(res);
                    this.setState({
                        submitted: false,
                        sporsmal: res.data
                    })
                })
            }
        }
    }


    render() {
        const { valid, tekst, submitted, sporsmal } = this.state;
        return (
            <div>
                <h1> Søk{valid && (<span>: {tekst}</span>)} </h1>
                {!valid && (
                    <div className="alert alert-info">Skriv noe inn i søkefeltet for å søke</div>
                )}
                {submitted && (
                    <div className="row">
                        <div className="pl-5">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        <div className="pl-2 text-left">
                            <h4> Laster inn spørsmål... </h4>
                        </div>

                    </div>
                )
                }
                {!(sporsmal == null || sporsmal.length == 0) && (
                    <SporsmalListe sporsmal={this.state.sporsmal} />
                )}
                {(sporsmal != null && sporsmal.length == 0) && (
                    <h3> Søket ga ingen resultater. Du kan sende inn et nytt spørsmål ved å trykk "Nytt Spørsmål"</h3>    
                )}


            </div>

        );
    }
}

export default withRouter(Sok);