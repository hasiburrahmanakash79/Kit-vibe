import { Link } from "react-router-dom";
import { Shirt } from "lucide-react";
import Button from "../../components/common/Button";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-black/5 flex items-center justify-center mx-auto mb-6">
        <Shirt size={32} className="text-ink/30" />
      </div>
      <p className="font-mono text-xs uppercase tracking-widest text-pitch-dark mb-3">404</p>
      <h1 className="font-display text-3xl md:text-4xl tracking-wide">Looks like this kit is out of stock.</h1>
      <p className="text-ink/50 text-sm mt-4">The page you're looking for doesn't exist or has moved.</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
        <Button as={Link} to="/">Go Home</Button>
        <Button as={Link} to="/shop" variant="outline">Browse Jerseys</Button>
      </div>
    </div>
  );
}
