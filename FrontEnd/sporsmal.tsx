import { environment } from "./environment";
import axios from "axios";
import SporsmalListe from "./sporsmalListe";

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
        const url = environment.spmUrl + id + "/sporsmal";
        axios.get(url).then(res => {
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
                        <SporsmalListe sporsmal={this.state.sporsmal} />
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