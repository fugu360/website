import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const aboutImages = [
  "/assets/about me/WhatsApp Image 2026-02-10 at 19.20.22.jpeg",
  "/assets/about me/WhatsApp Image 2026-02-10 at 19.21.06.jpeg",
  "/assets/about me/WhatsApp Image 2026-02-10 at 19.22.02.jpeg",
  "/assets/about me/WhatsApp Image 2026-02-10 at 19.20.22 (1).jpeg",
];

const AboutSection = () => {
  const { lang } = useLanguage();
  const copy = {
    de: {
      eyebrow: "Über mich",
      title: "Wer ich bin",
      subtitle: "Kurzprofil",
      paragraphOne:
        "Ich schätze die kleinen Dinge: richtig gutes Essen, ein intensives Sporttraining oder eine Schachpartie, die Konzentration bis zum letzten Zug fordert.",
      paragraphTwo:
        "Am meisten Energie geben mir gemeinsame Erlebnisse. Spontan etwas unternehmen, zusammen essen gehen oder einfach Zeit mit Freunden verbringen. Die Kombination aus Bewegung, analytischem Denken und Gemeinschaft ist für mich der ideale Ausgleich.",
      profileTitle: "Kurzprofil",
      locationLabel: "Standort",
      studyLabel: "Studium",
      statusLabel: "Status",
      locationValue: "Bern",
      studyValue: "MSc Financial Management",
      statusValue: "Offen für Angebote",
      imageAltPrefix: "Über mich Foto",
    },
    en: {
      eyebrow: "About",
      title: "Who I am",
      subtitle: "Profile",
      paragraphOne:
        "I appreciate the small things: great food, an intense workout, or a chess game that demands focus until the final move.",
      paragraphTwo:
        "Shared experiences give me the most energy. Spontaneous plans, grabbing a meal together, or simply spending time with friends. The mix of movement, analytical thinking, and community is my ideal balance.",
      profileTitle: "Profile",
      locationLabel: "Location",
      studyLabel: "Study",
      statusLabel: "Status",
      locationValue: "Bern",
      studyValue: "MSc Financial Management",
      statusValue: "Open to opportunities",
      imageAltPrefix: "About me photo",
    },
  };
  const text = copy[lang];

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
          <p className="text-accent font-medium text-sm tracking-widest uppercase">{text.eyebrow}</p>
        </div>
        <h2 className="section-title">
          <span className="gold-underline">{text.title}</span>
        </h2>
        <p className="section-subtitle">{text.subtitle}</p>

        <div className="grid md:grid-cols-3 gap-8 -mt-3">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{text.paragraphOne}</p>
              <p>{text.paragraphTwo}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {aboutImages.map((image, index) => (
                <div
                  key={image}
                  className="overflow-hidden rounded-xl border border-border bg-card"
                >
                  <img
                    src={encodeURI(image)}
                    alt={`${text.imageAltPrefix} ${index + 1}`}
                    className={`h-full w-full object-cover aspect-[4/3] ${image.includes("19.20.22 (1).jpeg") ? "object-[50%_20%]" : "object-center"}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 space-y-4 self-start">
            <h3 className="font-semibold text-foreground">{text.profileTitle}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex justify-between">
                <span>{text.locationLabel}</span>
                <span className="text-foreground font-medium">{text.locationValue}</span>
              </li>
              <li className="flex justify-between">
                <span>{text.studyLabel}</span>
                <span className="text-foreground font-medium">{text.studyValue}</span>
              </li>
              <li className="flex justify-between">
                <span>{text.statusLabel}</span>
                <span className="text-accent font-medium">{text.statusValue}</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
