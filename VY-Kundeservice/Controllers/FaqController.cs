using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VYKS.Model;
using VYKS.BLL;
using System.Diagnostics;
using System.Web.Http.Cors;

namespace VY_Kundeservice.Controllers
{

    [EnableCors(origins: "http://localhost:1337", headers: "*", methods: "*")]
    [RoutePrefix("api/kategori")]
    public class KategoriController : ApiController
    {

        [Route("")]
        [HttpGet]
        public IEnumerable<KategoriDTO> hentKategorier()
        {
            var KatLogikk = new KategoriLogikk();
            var erAdmin = false; //Innlogging og administrasjonstilgang ikke implementert
            return KatLogikk.hentAlleDTO(erAdmin);
        }


        [Route("{katId}/sporsmal")]
        [HttpGet]
        public HttpResponseMessage hentSporsmalFraKategori (int katId)
        {
            var spmLogikk = new SporsmalLogikk();
            var erAdmin = false; //Innlogging og administrasjonstilgang ikke implementert
            var katLogikk = new KategoriLogikk();
            var kreverAdmin = katLogikk.finn(katId).HevetTilgang;
            if (kreverAdmin && !erAdmin) return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Du trenger admin-tilgang for å hente spørsmål fra denne kategorien");
            // [TODO] sjekke om katId er innenfor lovlig verdi?
            return Request.CreateResponse(HttpStatusCode.OK, spmLogikk.hentFraKategori(katId));
        }
    }


    [EnableCors(origins: "http://localhost:1337", headers: "*", methods: "*")]
    [RoutePrefix("api/sporsmal")]
    public class SporsmalController : ApiController
    {

        [Route("{id}/opp")]
        [HttpGet]
        public HttpResponseMessage stemOpp(int id)
        {
            var spmLogikk = new SporsmalLogikk();
            if (spmLogikk.sporsmalPoeng(id, true))
            {
                return new HttpResponseMessage(HttpStatusCode.OK);
            } else
            {
                if (spmLogikk.finn(id) == null) return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Fant ikke spørsmål med oppgitt ID");
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Problem med forespørsel");
            }
        }


        [Route("{id}/ned")]
        [HttpGet]
        public HttpResponseMessage stemNed(int id)
        {
            var spmLogikk = new SporsmalLogikk();
            if (spmLogikk.sporsmalPoeng(id, false))
            {
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            else
            {
                if (spmLogikk.finn(id) == null) return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Fant ikke spørsmål med oppgitt ID");
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Problem med forespørsel");
            }
        }


        [Route("sok/{tekst}")]
        [HttpGet]
        public HttpResponseMessage sok(string tekst)
        {
            var spmLogikk = new SporsmalLogikk();
            return Request.CreateResponse(HttpStatusCode.OK, spmLogikk.sokEtterSporsmal(tekst));
        }


        [Route("")]
        [HttpPost]
        public HttpResponseMessage settInn(SporsmalInnDTO sporsmal)
        {
            var spmLogikk = new SporsmalLogikk();
            Debug.WriteLine("spmPost", sporsmal);
            if (ModelState.IsValid)
            {
                if (spmLogikk.settInnInnsendt(sporsmal)) return new HttpResponseMessage(HttpStatusCode.OK);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Noe har gått galt");
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

    }
}
