import { environment } from "./environment";
import axios from "axios";

declare var require: any

var React = require('react');

export default class Sporsmal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kategorier: null,
            sporsmal: null,
            submitted: false,
            valgtKat: false,
            valgtKategori: null
        }
    }

    componentDidMount() {
        this.hentKat();
    }

    componentDidUpdate() {
        if (this.state.kategorier == null && this.state.submitted == false) this.hentKat();
    }

    hentKat() {
        const url = environment.katUrl;
        this.setState({ submitted: true });
        axios.get(url).then(res => {
            this.setState({
                submitted: false,
                kategorier: res.data
            })
        })
    }

    handleKatClick = id => {
        const { kategorier } = this.state;
        var kat;
        for (var i = 0; i < kategorier.length; i++) {
            if (kategorier[i].Id == id) kat = kategorier[i];
        }
        this.setState({
            valgtKategori: kat,
            valgtKat: true,
            submitted: true
        });
        console.log("ID: " + id + ", valgtKategori: ", kat);
        const url = environment.spmUrl + id + "/sporsmal";
        axios.get(url).then(res => {
            console.log(res.data);
            this.setState({
                submitted: false,
                sporsmal: res.data
            })
        })
    }

    tilbakeTilKat() {
        this.setState({
            valgtKat: false,
            sporsmal: null
        })
    }

    handleVoteClick(id, up) {
        const url = environment.stemUrl + id + (up ? "/opp" : "/ned");
        console.log("URL: " + url);
        axios.get(url).then(res => {
            console.log(res);
            var spm = this.state.sporsmal;
            var sporsmalet;
            var index;
            for (var i = 0; i < spm.length; i++) {
                if (spm[i].Id == id) {
                    sporsmalet = spm[i];
                    index = i;
                }
            }
            (up ? spm[index].PoengPluss++ : spm[index].PoengMinus++)
            this.setState({
                sporsmal: spm
            })
        })
    }


    render() {
        const { kategorier, sporsmal, submitted, valgtKat, valgtKategori } = this.state;
        if (valgtKat) {
            return (
                <div>
                    <button className="btn btn-light border py-1 mb-2" onClick={() => this.tilbakeTilKat()}>
                        Tilbake til kategorier
                    </button>

                    <h4 className="mb-0"> Kategori:  </h4>
                    <h2 className="mb-3"> {valgtKategori.Navn} </h2>
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
                    )}
                    {sporsmal != null && (
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
                                        <div className="card-body border-bottom">
                                            {item.Svar == null ? 'Dette spørsmålet har ikke blitt oppdatert med et svar enda' : (<span><b className="text-muted">Svar: </b> {item.Svar}</span>)}
                                        </div>
                                        <div className="card-body py-0">
                                            <div className="small m-0">
                                                Hjalp dette svaret deg? Hjelp andre ved å stemme dette svaret opp eller ned: 
                                                <button className="small btn btn-success py-0 my-1 px-2" onClick={() => this.handleVoteClick(item.Id, true)}>+</button> 
                                                <button className="small btn btn-danger py-0 my-1 px-2" onClick={() => this.handleVoteClick(item.Id, false)}>-</button> 
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>
                    )}
                    <button className="btn btn-light border py-1 mt-4" onClick={() => this.tilbakeTilKat()}>
                        Tilbake til kategorier
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <h1 className="mb-3"> Kategorier </h1>
                    {submitted && (
                        <div className="row">
                            <div className="pl-5">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            <div className="pl-2 text-left">
                                <h4> Laster inn kategorier... </h4>
                            </div>

                        </div>
                    )}
                    {kategorier != null && (
                        <div>
                            {this.state.kategorier.map((item, index) => (
                                <div key={index} className="card">
                                    <div className="card-body" style={{ cursor: "pointer" }} onClick={() => this.handleKatClick(item.Id)} >
                                        <h5 className="card-title"> {item.Navn} </h5>
                                        <p className="card-text"> {item.Beskrivelse} </p>

                                    </div>
                                </div>

                            ))}
                        </div>
                    )}
                </div>
            );
        }
    }
}