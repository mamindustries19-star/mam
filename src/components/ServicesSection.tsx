import { motion } from "framer-motion";

const featuredWorks = [
  {
    icon: "/images/icon-sheet-metal.png",
    title: "Sheet Metal Cutting",
    desc: "Powerful RAYCUS laser source can cut a wide range of metal thicknesses from 0.5 mm to 10.0 mm. With an accuracy of ∓0.03 mm/m and nesting provided by our software, low wastage and maximum efficiency is ensured for your project.",
  },
  {
    icon: "/images/icon-pipe-cutting.png",
    title: "Metal Pipe Cutting",
    desc: "With the advantage of metal pipe cutting service at Quiko, think of endless possibilities in your design. The swift laser head, moving at a speed of 60 m/minute, can cut pipes of diameter up to 150 mm.",
  },
  {
    icon: "/images/icon-marking.png",
    title: "Marking & Engraving",
    desc: "The resolution of 0.001 mm of our machine helps create precise markings and patterns from AutoCAD drawings. Add logos, text, photographs on metal and non-metal surfaces with laser marking and engraving.",
  },
];

const alliedWorks = [
  {
    icon: "/images/icon-bending.png",
    title: "CNC Bending",
    desc: "Bend metal sheets up to 12 mm in thickness with our uncompromising machines.",
  },
  {
    icon: "/images/icon-welding.png",
    title: "Welding",
    desc: "Put together your product with finest welding rods with grinding & polishing with quality and branded abrasives.",
  },
  {
    icon: "/images/icon-powder-coating.png",
    title: "Powder Coating",
    desc: "Extensive 7 tank process of powder coating for aesthetic appeal and protection of the metal product.",
  },
];

const ServiceCard = ({
  item,
  index,
}: {
  item: { icon: string; title: string; desc: string };
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    className="bg-card border border-border p-6 text-center hover:shadow-lg transition-shadow duration-300 group"
  >
    <img
      src={item.icon}
      alt={item.title}
      className="w-20 h-20 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
    />
    <h5 className="font-oswald text-lg font-semibold text-foreground mb-3">
      {item.title}
    </h5>
    <div className="section-separator mx-auto mb-3" />
    <p className="text-muted-foreground font-opensans text-sm leading-relaxed">
      {item.desc}
    </p>
  </motion.div>
);

const ServicesSection = () => {
  return (
    <section id="section-services" className="py-20">
      <div className="container mx-auto px-6">
        {/* Featured Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h4 className="font-oswald text-2xl md:text-3xl font-semibold text-foreground mb-3">
            Featured Works
          </h4>
          <p className="text-muted-foreground font-opensans max-w-xl mx-auto">
            Best-in-class, high performance fibre optic laser cutting and marking services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {featuredWorks.map((item, i) => (
            <ServiceCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Allied Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h4 className="font-oswald text-2xl md:text-3xl font-semibold text-foreground mb-3">
            Allied Works
          </h4>
          <p className="text-muted-foreground font-opensans max-w-xl mx-auto">
            From raw material to semi-finished and finished products under one roof.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {alliedWorks.map((item, i) => (
            <ServiceCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
