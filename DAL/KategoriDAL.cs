using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VYKS.Model;

namespace VYKS.DAL
{
    public class KategoriDAL
    {
        public List<Kategori> hentAlle()
        {
            using (var db = new Db())
            {
                List<Kategori> kategorier = db.Kategori.ToList();
                return kategorier;
                try
                {
                    
                } catch(Exception e)
                {
                    return null;
                }
            }
        }

        public Kategori finn(int id)
        {
            using (var db = new Db())
            {
                return db.Kategori.FirstOrDefault(k => k.Id == id);
            }
            try
            {

            } catch (Exception e)
            {
                return null;
            }
        }
    }
}
