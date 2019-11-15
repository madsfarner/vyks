using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VYKS.Model;

namespace VYKS.DAL
{
    public class Db : DbContext
    {
        public Db() : base("name=Db")
        {
            Database.SetInitializer(new DbInit());
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }

        public virtual DbSet<Kategori> Kategori { get; set; }
        public virtual DbSet<Sporsmal> Sporsmal { get; set; }

    }
}
