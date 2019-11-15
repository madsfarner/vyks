using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VYKS.Model;

namespace VYKS.DAL
{
    public class DbInit : CreateDatabaseIfNotExists<Db>
    {
        protected override void Seed(Db context)
        {
            var katBet = new Kategori
            {
                Navn = "Betaling, refusjon og endring av bestilling",
                Beskrivelse = "Betaling av billett, refusjon ved avbestilling eller når du ikke rakk toget, endre eksisterende bestilling",
                HevetTilgang = false
            };
            var katAvg = new Kategori
            {
                Navn = "Togtider og avganger",
                Beskrivelse = "Når går toget, hvordan vet jeg om toget er forsinket, hvor lang tid bruker toget til dit jeg skal",
                HevetTilgang = false
            };
            var katBag = new Kategori
            {
                Navn = "Bagasje og spesielle behov",
                Beskrivelse = "Hvor mye bagasje kan jeg ta med, hva slags ting har jeg ikke lov til å medbringe, er stasjonene rullestolvennlige",
                HevetTilgang = false
            };
            var katTil = new Kategori
            {
                Navn = "Mat, strøm og tilbud ombord",
                Beskrivelse = "Er det alltid resturant på toget, kan jeg lade telefonen eller datamaskinen min, er det internett ombord, finnes det senger man kan leie",
                HevetTilgang = false
            };
            var katAdm = new Kategori
            {
                Navn = "Administrasjon av løsningen",
                Beskrivelse = "Hvis du har administratortilgang kan du få hjelp med løsningen her",
                HevetTilgang = true
            };
            context.Kategori.Add(katBet);
            context.Kategori.Add(katAvg);
            context.Kategori.Add(katBag);
            context.Kategori.Add(katTil);
            context.Kategori.Add(katAdm);


            context.Sporsmal.Add(new Sporsmal
            {
                Tittel = "Hvordan kan jeg betale billetten?",
                Beskrivelse = "Når jeg bruker nettsiden til å bestille billett dukker det aldri noe måte å betale billetten på. Hvordan kan jeg gjøre dette?",
                Svar = "Billetten blir kun reservert når du bestiller den på nett, betalingen må skje med kredittkort eller kontakt på toget",
                PoengPluss = 47,
                PoengMinus = 2,
                Kategori = katBet,
            });
            context.Sporsmal.Add(new Sporsmal
            {
                Tittel = "Kan jeg endre billetten jeg har reservert?",
                Beskrivelse = "Etter jeg har bestilt billett på nettet og mottatt bekreftelsen, kan jeg endre billetten min?",
                Svar = "Nei, billetten du bestiller på nett er kun en reservasjon, hvis du ønsker å forandre tiden, bare bestill en ny billett. Den gamle reservasjonen blir slettet når du ikke betaler den på toget",
                PoengPluss = 23,
                PoengMinus = 7,
                Kategori = katBet,
            });
            context.Sporsmal.Add(new Sporsmal
            {
                Tittel = "Refusjon",
                Beskrivelse = "Kan jeg få refusjon hvis jeg ikke rekker toget?",
                Svar = "Du betaler ikke for billetten før du er på toget, så det er ikke behov for en refusjon i utgangspunktet",
                PoengPluss = 24,
                PoengMinus = 11,
                Kategori = katBet,
            });
            context.Sporsmal.Add(new Sporsmal
            {
                Tittel = "Hvordan kan jeg betale billetten på toget?",
                Beskrivelse = null,
                Svar = "Konduktøren på toget kan ta kort og kontakt",
                PoengPluss = 59,
                PoengMinus = 16,
                Kategori = katBet,
            });
            context.Sporsmal.Add(new Sporsmal
            {
                Tittel = "Kan jeg bestille billett for en fremtidig dag?",
                Beskrivelse = "Jeg får ingen datovelger på nettsiden under bestillingen. Vil det si at den kun gjelder for dagen idag?",
                Svar = null,
                PoengPluss = 0,
                PoengMinus = 0,
                Kategori = katBet,
            });
            context.Sporsmal.Add(new Sporsmal
            {
                Tittel = "Når kan jeg se hvilken tid toget går?",
                Beskrivelse = "Etter bestillingen er gjennomført, hvordan ser jeg hvilken tid jeg har valgt?",
                Svar = "Du skal motta en epost etter gjennomført bestilling med alle detaljer",
                PoengPluss = 9,
                PoengMinus = 1,
                Kategori = katAvg,
            });
            context.Sporsmal.Add(new Sporsmal
            {
                Tittel = "Hvordan vet jeg om toget er forsinket eller innstilt?",
                Beskrivelse = "Eposten kan vel ikke oppdateres om det skulle bli forandringer?",
                Svar = "Blir toget innstilt vil du motta en epost som varsling, hvis toget er forsinket vil du se det på informasjonstavlene på stasjonen, evt sjekk vy.no for oppdatert informasjon",
                PoengPluss = 13,
                PoengMinus = 4,
                Kategori = katAvg,
            });
            context.Sporsmal.Add(new Sporsmal
            {
                Tittel = "Hvor mye bagasje kan jeg medbringe på toget?",
                Beskrivelse = "",
                Svar = "Det er ingen fysisk begrensning på størrelse, vekt eller antall, men du må selv kunne bære bagasjen inn på toget uten å skape forsinkelser",
                PoengPluss = 21,
                PoengMinus = 3,
                Kategori = katBag,
            });
            context.Sporsmal.Add(new Sporsmal
            {
                Tittel = "Hvordan vet jeg om stasjonene er rullestoltilpasset?",
                Beskrivelse = "Jeg bruker rullestol og trenger å vite om jeg kan komme meg på og av toget",
                Svar = "Alle tog er utstyrt med ramper for rullestolbrukere og konduktøren vil hjelpe deg omrbord. På vy.no kan du se hvilke stasjoner som er rullestolvennlige.",
                PoengPluss = 6,
                PoengMinus = 0,
                Kategori = katBag,
            });
            context.Sporsmal.Add(new Sporsmal
            {
                Tittel = "Har togene resturant eller en butikk ombord?",
                Beskrivelse = "",
                Svar = "Alle regionstog har en resturantvogn med enkel servering og snacks",
                PoengPluss = 40,
                PoengMinus = 5,
                Kategori = katTil,
            }); context.Sporsmal.Add(new Sporsmal
            {
                Tittel = "Kan jeg lade datamaskinen min ombord?",
                Beskrivelse = "Laptoppen min trenger strøm og jeg vil gjerne benytte meg av den på togturen",
                Svar = "Alle stoler har strømuttak under stolen.",
                PoengPluss = 17,
                PoengMinus = 3,
                Kategori = katTil,
            });
            context.Sporsmal.Add(new Sporsmal
            {
                Tittel = "Hvordan kan jeg forandre avgangstid for et tog?",
                Beskrivelse = "disse spørsmålene vil faktisk aldri bli vist siden det ikke finnes noen innloggingsfunksjon enda",
                Svar = "disse spørsmålene vil faktisk aldri bli vist siden det ikke finnes noen innloggingsfunksjon enda",
                PoengPluss = 0,
                PoengMinus = 0,
                Kategori = katAdm,
            });
            base.Seed(context);
        }
    }
}
