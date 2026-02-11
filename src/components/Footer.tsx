const Footer = () => {
  return (
    <footer className="bg-primary border-t border-primary-foreground/10">
      <div className="mx-auto max-w-5xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-primary-foreground/40 text-sm">
          © {new Date().getFullYear()} Benjamin Oehrli.
        </p>
        <p className="text-primary-foreground/40 text-sm">Bern</p>
      </div>
    </footer>
  );
};

export default Footer;
