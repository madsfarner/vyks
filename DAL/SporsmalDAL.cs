using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VYKS.Model;
using System.Data.Entity;
using System.Diagnostics;

namespace VYKS.DAL
{
    public class SporsmalDAL
    {
        public List<Sporsmal> hentAlle()
        {
            using (var db = new Db())
            {
                List<Sporsmal> sporsmal = db.Sporsmal.Include(s => s.Kategori).ToList();
                return sporsmal;
                try
                {
                    
                } catch (Exception e)
                {
                    return null;
                }
            }
        }

        public Sporsmal finn(int id)
        {
            using (var db = new Db())
            {
                return db.Sporsmal.Include(s => s.Kategori).FirstOrDefault(p => p.Id == id);
                try
                {
                    
                } catch (Exception e)
                {
                    return null;
                }
            }
        }

        public bool endre(Sporsmal sporsmal)
        {
            using (var db = new Db())
            {
                var endreObjekt = db.Sporsmal.Find(sporsmal.Id);
                endreObjekt.PoengMinus = sporsmal.PoengMinus;
                endreObjekt.PoengPluss = sporsmal.PoengPluss;
                endreObjekt.Svar = sporsmal.Svar;
                endreObjekt.Tittel = sporsmal.Tittel;
                endreObjekt.Beskrivelse = sporsmal.Beskrivelse;
                db.SaveChanges();
                return true;
                try
                {
                    
                } catch (Exception e)
                {
                    return false;
                }
            }
        }

        public bool settInn(Sporsmal sporsmal)
        {
            using (var db = new Db())
            {
                sporsmal.Kategori = db.Kategori.First(k => k.Id == sporsmal.Kategori.Id);
                db.Sporsmal.Add(sporsmal);
                db.SaveChanges();
                return true;
                try
                {
                    
                } catch (Exception e)
                {
                    return false;
                }
            }
        }

        public List<Sporsmal> sok(string tekst)
        {
            using (var db = new Db())
            {
                Debug.WriteLine("Tekst: " + tekst);
                var ord = tekst.Split(' ');
                Debug.WriteLine("Array: " + ord.Length);
                var sporsmal = db.Sporsmal.Include(s => s.Kategori).Where(data => ord.Any(x => data.Beskrivelse.Contains(x)) || ord.Any(x => data.Tittel.Contains(x)));
                Debug.WriteLine("Query: " + sporsmal.Count());
                return sporsmal.ToList();
                try
                {
                    
                } catch (Exception e)
                {
                    return null;
                }
            }
        }

        
    }
}
