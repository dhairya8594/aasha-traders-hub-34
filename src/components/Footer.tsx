const Footer = () => {
  return (
    <footer className="bg-primary border-t border-primary-foreground/10 py-8">
      <div className="container text-center">
        <p className="text-primary-foreground/50 text-sm">
          © {new Date().getFullYear()} Aasha Traders. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
