import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const NotFound = () => (
  <>
    <SEO title="Page Not Found · MAM Industries" description="The page you're looking for doesn't exist." path="/404" />
    <section className="container py-32 text-center">
      <div className="font-sora font-bold text-7xl md:text-9xl text-accent">404</div>
      <h1 className="h-display text-3xl md:text-4xl text-primary mt-3">Page not found</h1>
      <p className="text-muted-foreground mt-3 max-w-md mx-auto">The page you tried to reach isn't available. Head back to safety.</p>
      <Link to="/" className="inline-flex items-center gap-2 mt-8 bg-accent text-accent-foreground px-6 py-3 rounded-md font-semibold text-sm">
        Back to home
      </Link>
    </section>
  </>
);
export default NotFound;
