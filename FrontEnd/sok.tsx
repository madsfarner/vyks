declare var require: any

var React = require('react');
import { withRouter } from 'react-router-dom';
import axios from "axios";
import { environment } from "./environment";

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
                    <div className="accordion" id="accordionSporsmal">    

                        {this.state.sporsmal.map((item, index) => (
                            <div className="card" key={index}>
                                <div className="card-header py-0" id={'heading' + index}>
                                    <h2 className="mb-0">
                                        <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target={'#collapse' + index} aria-expanded="false" aria-controls={'collapse' + index}>
                                            <span className="badge badge-success p-2 mr-0"> <i className="fas fa-thumbs-up"></i>  {item.PoengPluss}</span>
                                            <span className="badge badge-danger p-2 mr-3"> <i className="fas fa-thumbs-down"></i>  {item.PoengMinus}</span>
                                            <b className="text-muted"># {(index + 1)}</b> - {item.Tittel}
                                        </button>
                                    </h2>
                                </div>

                                <div id={'collapse' + index} className="collapse" aria-labelledby={'heading' + index} data-parent="#accordionSporsmal">
                                    {!(item.Beskrivelse == null || item.Beskrivelse === "") && (
                                        <div className="card-body border-bottom">
                                            <b className="text-muted">Spørsmål: </b>{item.Beskrivelse}
                                        </div>
                                    )}
                                    <div className="card-body">
                                        {item.Svar == null ? 'Dette spørsmålet har ikke blitt oppdatert med et svar enda' : (<span><b className="text-muted">Svar: </b> {item.Svar}</span>)}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                )}
                {(sporsmal != null && sporsmal.length == 0) && (
                    <h3> Søket ga ingen resultater. Du kan sende inn et nytt spørsmål ved å trykk "Nytt Spørsmål"</h3>    
                )}


            </div>

        );
    }
}

export default withRouter(Sok);