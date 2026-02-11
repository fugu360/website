import { motion } from "framer-motion";
import { User } from "lucide-react";

const aboutImages = [
  {
    src: "/assets/about me/WhatsApp Image 2026-02-10 at 19.20.22 (1).jpeg",
    alt: "Über mich Foto 1",
  },
  {
    src: "/assets/about me/WhatsApp Image 2026-02-10 at 19.20.22.jpeg",
    alt: "Über mich Foto 2",
  },
  {
    src: "/assets/about me/WhatsApp Image 2026-02-10 at 19.21.06.jpeg",
    alt: "Über mich Foto 3",
  },
  {
    src: "/assets/about me/WhatsApp Image 2026-02-10 at 19.22.02.jpeg",
    alt: "Über mich Foto 4",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <User size={20} className="text-accent" />
          <p className="text-accent font-medium text-sm tracking-widest uppercase">Über mich</p>
        </div>
        <h2 className="section-title">
          <span className="gold-underline">Wer ich bin</span>
        </h2>
        <p className="section-subtitle">Kurzprofil</p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Ich schätze die kleinen Dinge: richtig gutes Essen, ein intensives Sporttraining
              oder eine Schachpartie, die Konzentration bis zum letzten Zug fordert.
            </p>
            <p>
              Am meisten Energie geben mir gemeinsame Erlebnisse. Spontan etwas unternehmen,
              zusammen essen gehen oder einfach Zeit mit Freunden verbringen. Die Kombination
              aus Bewegung, analytischem Denken und Gemeinschaft ist für mich der ideale Ausgleich.
            </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {aboutImages.map((image, index) => (
                <div
                  key={image.src}
                  className="overflow-hidden rounded-xl border border-border bg-card"
                >
                  <img
                    src={encodeURI(image.src)}
                    alt={image.alt}
                    className={`h-full w-full object-cover aspect-[4/3] ${index === 0 ? "object-[50%_20%]" : "object-center"}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 space-y-4 self-start">
            <h3 className="font-semibold text-foreground">Kurzprofil</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex justify-between">
                <span>Standort</span>
                <span className="text-foreground font-medium">Bern</span>
              </li>
              <li className="flex justify-between">
                <span>Studium</span>
                <span className="text-foreground font-medium">MSc Financial Management</span>
              </li>
              <li className="flex justify-between">
                <span>Status</span>
                <span className="text-accent font-medium">Offen für Angebote</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
