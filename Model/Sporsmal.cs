using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace VYKS.Model
{
    public class Sporsmal
    {
        public int Id { get; set; }
        public string Tittel { get; set; }
        public string Beskrivelse { get; set; }
        public string Svar { get; set; }
        public int PoengPluss { get; set; }
        public int PoengMinus { get; set; }
        public virtual Kategori Kategori { get; set; }
    }

    public class SporsmalInnDTO
    {
        [Required(ErrorMessage = "Tittel for spørsmålet må oppgis")]
        public string Tittel { get; set; }
        public string Beskrivelse { get; set; }
        [Required(ErrorMessage = "En kategori for spørsmålet må oppgis")]
        public int KategoriId { get; set; }
    }

    public class SporsmalDTO
    {
        public int Id { get; set; }
        public string Tittel { get; set; }
        public string Beskrivelse { get; set; }
        public string Svar { get; set; }
        public int PoengPluss { get; set; }
        public int PoengMinus { get; set; }
        public virtual KategoriDTO Kategori { get; set; }
    }
}
