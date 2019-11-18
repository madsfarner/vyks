
import { environment } from './environment';
import axios from 'axios';

declare var require: any

var React = require('react');

export default class SporsmalListe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sporsmal: this.props.sporsmal,
            sporsmalStemt: [-1]
        }
        this.erStemt = this.erStemt.bind(this);
    }

    handleVoteClick(id, up) {
        const url = environment.stemUrl + id + (up ? "/opp" : "/ned");
        axios.get(url).then(res => {
            var spm = this.state.sporsmal;
            var index;
            for (var i = 0; i < spm.length; i++) {
                if (spm[i].Id == id) {
                    index = i;
                }
            }
            (up ? spm[index].PoengPluss++ : spm[index].PoengMinus++)
            var spmStemt = this.state.sporsmalStemt;
            spmStemt.push(id);
            this.setState({
                sporsmal: spm,
                sporsmalStemt: spmStemt
            })
            var spmStemtJson = JSON.stringify(spmStemt);
            localStorage.setItem("spmStemtArray", spmStemtJson);
        })
    }

    componentDidMount() {
        const json = localStorage.getItem("spmStemtArray");
        var spmStemtJson = (json == null ? "[-1]" : json);
        const spmStemt = JSON.parse(spmStemtJson);
        console.log("spmStemt: ", spmStemt);
        this.setState({ sporsmalStemt: spmStemt })
    }

    erStemt = spmId => {
        for (var i = 0; i < this.state.sporsmalStemt.length; i++) {
            if (spmId == this.state.sporsmalStemt[i]) return true;
            console.log(spmId + "er blitt stemt på");
        }
        return false;
    }

    render() {
        return (
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
                            {this.erStemt(item.Id) ? (
                                <div className="card-body py-0">
                                    <div className="small m-0">
                                        Du har allerede stemt på dette spørsmålet
                                        </div>
                                </div>
                            ) : (
                                <div className="card-body py-0">
                                    <div className="small m-0">
                                        Hjalp dette svaret deg? Hjelp andre ved å stemme dette svaret opp eller ned:
                                        <button className="small btn btn-success py-0 my-1 px-2" onClick={() => this.handleVoteClick(item.Id, true)}>+</button>
                                        <button className="small btn btn-danger py-0 my-1 px-2" onClick={() => this.handleVoteClick(item.Id, false)}>-</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                ))}
            </div>
        )
    }

}