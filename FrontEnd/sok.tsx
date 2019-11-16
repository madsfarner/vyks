declare var require: any

var React = require('react');
import { withRouter } from 'react-router-dom';

class Sok extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tekst: "testtekst",
            valid: false
        };
    }

    componentDidMount() {
        this.sjekkSok();
        console.log(this.props);
    }

    componentDidUpdate() {
        if (!(this.props.match.params.tekst.substring(6) === this.state.tekst)) {
            this.sjekkSok();
            
        };
        console.log("comp oppdatert");
    }

    sjekkSok() {
        if (this.props.match.params.tekst === "tekst=") {
            //uten søkefrase
            this.setState({
                valid: false,
                tekst: ""
            })
            console.log("uten søkefrase")
        } else {
            //med søkefrase
            const tekst = this.props.match.params.tekst;
            const subTekst = tekst.substring(6);
            this.setState({
                tekst: subTekst,
                valid: true
            });
            console.log("med søkefrase" + subTekst)
        }
    }


    render() {
        const { valid, tekst } = this.state;
        return (
            <div>
                <h1> Søk{valid && (<span>: {tekst}</span>) } </h1>
                {!valid && (
                    <div className="alert alert-info">Skriv noe inn i søkefeltet for å søke</div>
                )}
               
                

            </div>

        );
    }
}

export default withRouter(Sok);