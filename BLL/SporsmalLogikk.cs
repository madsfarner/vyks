using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VYKS.Model;
using VYKS.DAL;
using System.Diagnostics;

namespace VYKS.BLL
{
    public class SporsmalLogikk
    {
        public bool settInnInnsendt(SporsmalInnDTO sporsmal)
        {
            var spmDAL = new SporsmalDAL();
            var katDal = new KategoriDAL();
            var kat = katDal.finn(sporsmal.KategoriId);
            var nyttSpm = new Sporsmal()
            {
                Tittel = sporsmal.Tittel,
                Beskrivelse = sporsmal.Beskrivelse,
                Kategori = kat,
                Svar = null,
                PoengPluss = 0,
                PoengMinus = 0
            };
            return spmDAL.settInn(nyttSpm);
        }
        public List<SporsmalDTO> hentFraKategori (int katId)
        {
            var spmDAL = new SporsmalDAL();
            var etSpm = spmDAL.finn(1);
            var alleSporsmal = spmDAL.hentAlle();
            List<Sporsmal> valgtSporsmal = new List<Sporsmal>();
            foreach(Sporsmal s in alleSporsmal)
            {
                if(s.Kategori.Id == katId && s.Svar != null)
                {
                    valgtSporsmal.Add(s);
                }
            }
            return tilDTO(valgtSporsmal);
        }
        public bool sporsmalPoeng(int id, bool positiv)
        {
            var spmDAL = new SporsmalDAL();
            var sporsmal = spmDAL.finn(id);
            if(positiv)
            {
                sporsmal.PoengPluss++;
            } else
            {
                sporsmal.PoengMinus++;
            }
            return spmDAL.endre(sporsmal);
        }
        public List<SporsmalDTO> sokEtterSporsmal (string tekst)
        {
            var spmDAL = new SporsmalDAL();
            var katDAL = new KategoriDAL();
            var kategorier = katDAL.hentAlle();
            List<Kategori> admKat = new List<Kategori>();
            foreach(Kategori k in kategorier)
            {
                if (k.HevetTilgang) admKat.Add(k);
            }
            var alleSporsmal = spmDAL.sok(tekst);
            List<Sporsmal> utSpm = new List<Sporsmal>();
            foreach (Sporsmal s in alleSporsmal)
            {
                var erAdminSpm = false;
                foreach( Kategori k in admKat)
                {
                    if (s.Kategori.Id == k.Id) erAdminSpm = true;
                }
                if (!erAdminSpm) utSpm.Add(s);
            }
            return tilDTO(utSpm);
        }

        public Sporsmal finn(int id)
        {
            var spmDAL = new SporsmalDAL();
            return spmDAL.finn(id);
        }

        private List<SporsmalDTO> tilDTO(List<Sporsmal> innSpm)
        {
            if (innSpm == null) return null;
            List<SporsmalDTO> utSpm = new List<SporsmalDTO>();
            foreach (var s in innSpm)
            {
                utSpm.Add(new SporsmalDTO()
                {
                    Id = s.Id,
                    Tittel = s.Tittel,
                    Beskrivelse = s.Beskrivelse,
                    Svar = s.Svar,
                    PoengPluss = s.PoengPluss,
                    PoengMinus = s.PoengMinus,
                    Kategori = new KategoriDTO()
                    {
                        Id = s.Kategori.Id,
                        Navn = s.Kategori.Navn,
                        Beskrivelse = s.Kategori.Beskrivelse
                    }
                });
            }
            return utSpm;
        }
    }
}
