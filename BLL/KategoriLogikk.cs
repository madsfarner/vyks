using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VYKS.Model;
using VYKS.DAL;

namespace VYKS.BLL
{
    public class KategoriLogikk
    {
        public List<KategoriDTO> hentAlleDTO(bool erAdmin)
        {
            var KatDAL = new KategoriDAL();
            var kat =  KatDAL.hentAlle();
            List<KategoriDTO> visiningsKat = new List<KategoriDTO>();
            foreach(var k in kat)
            {
                if((!k.HevetTilgang) || ( k.HevetTilgang && erAdmin))
                {
                    visiningsKat.Add(new KategoriDTO()
                    {
                        Id = k.Id,
                        Navn = k.Navn,
                        Beskrivelse = k.Beskrivelse
                    });
                }
            }
            return visiningsKat;
        }

        public Kategori finn(int id)
        {
            var katDAL = new KategoriDAL();
            return katDAL.finn(id);
        }
    }
}
