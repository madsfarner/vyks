import { environment } from "./environment";
import axios from "axios";
import SporsmalListe from "./sporsmalListe";

declare var require: any

var React = require('react');

export default class NyttSporsmal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tittel: "",
            beskrivelse: "",
            stikkord: "",
            kategori: null,
            kategorier: null,
            error: "",
            submitted: false,
            sporsmal: null,
            serverSpmOk: false
        }
    }

    hentKat() {
        const url = environment.katUrl;
        this.setState({ submitted: true });
        axios.get(url).then(res => {
            this.setState({
                kategorier: res.data
            })
        })
    }

    handleChange = e => {
        const { id, value } = e.target;
        this.setState({
            [id]: value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        var feilMelding = "";
        if (this.state.kategori == null) feilMelding += "Du må velge kategori! ";
        if (this.state.tittel === "") feilMelding += "Du må skrive inn tittel! ";
        if (this.state.stikkord === "") feilMelding += "Du må skrive inn noen stikkord!";
        this.setState({ error: feilMelding })
        if (feilMelding === "") {
            //Godkjent skjema, sjekk om tilsvarende spørsmål fins
            const url = environment.sokUrl + this.state.stikkord;
            this.setState({ submitted: true });
            axios.get(url).then(res => {
                this.setState({
                    submitted: false,
                    sporsmal: res.data
                })
                if (res.data.length == 0) {
                    console.log("Res data length for tilsvarende spm:", res.data.length)
                    this.sendSporsmal();
                }
            })
        }
    }

    sendSporsmal = () => {
        const url = environment.innUrl;
        const json = JSON.stringify({ Tittel: this.state.tittel, Beskrivelse: this.state.beskrivelse, KategoriId: parseFloat(this.state.kategori) });
        console.log("JSON: ", json)
        axios({
            method: 'post',
            url: url,
            headers: { "Content-Type": "application/json"},
            data: json
        }).then(res => {
            this.setState({ serverSpmOk: true })
        }).catch(error => {
            console.log(error);
        })
    }

    componentDidMount() {
        if(this.state.kategorier == null) this.hentKat();
    }


    render() {
        if (this.state.serverSpmOk) {
            return (
                <div>
                    <h1 className="mt-5"> Nytt Spørsmål </h1>
                    <h5 className="alert alert-success"> Ditt spørsmålet er blitt sendt inn! </h5>
                </div>    
            )
        } else {
            return (
                <div>
                    <h1 className="mt-5"> Nytt Spørsmål </h1>
                    <h5 className="mb-3"> Hvis du ikke finner svaret på ditt spørsmål her på nettsiden, kan du sende inn et nytt her</h5>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Tittel:</label>
                            <input type="text"
                                className="form-control"
                                id="tittel"
                                placeholder="Tittel for ditt spørsmål"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Beskrivelse:</label>
                            <textarea className="form-control" id="beskrivelse" rows="3" onChange={this.handleChange} ></textarea>
                            <small id="beskrivelseHjelp" className="form-text text-muted"> Beskrivelse er ikke krevd, men hvis du trenger mer plass for å utdype spørsmålet kan du gjøre det her</small>
                        </div>
                        <div className="form-group">
                            <label>Kategori:</label>
                            <select className="form-control" defaultValue={'DEFAULT'} id="kategori" onChange={this.handleChange}>
                                <option value="DEFAULT" disabled>Velg en kategori</option>
                                {this.state.kategorier != null && (
                                    this.state.kategorier.map((item, index) => (
                                        <option key={index} data-id={item.id} value={item.Id}>{item.Navn}</option>
                                    ))
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Skriv inn noen få stikkord som beskriver problemet ditt, separer ordene med mellomrom:</label>
                            <input type="text" className="form-control" id="stikkord" placeholder="f.eks.: billett refusjon bestilling" required onChange={this.handleChange} />
                        </div>
                        {this.state.error != "" && (<div className="alert alert-danger">{this.state.error}</div>)}
                        {!(this.state.sporsmal == null || this.state.sporsmal.length == 0) && (
                            <div className="mt-4">
                                <h4>Er du sikker på at ditt spørsmål ikke er blitt sendt inn allerede?</h4>
                                <SporsmalListe sporsmal={this.state.sporsmal} />
                            </div>

                        )}
                        {(this.state.sporsmal == null || this.state.sporsmal.length == 0) && (<button type="submit" className="btn btn-primary mb-5"> Send inn </button>)}
                        {!(this.state.sporsmal == null || this.state.sporsmal.length == 0) && (<div className="mb-5 mt-2"> Jeg finner ikke mitt spørsmål i listen: <button onClick={this.sendSporsmal} className="btn btn-primary">Send inn spørsmålet</button></div>)}
                    </form>
                </div>
            );
        }
    }
}