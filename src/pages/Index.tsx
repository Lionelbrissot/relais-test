import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, MapPin, Truck, Shield, CreditCard, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/7dc2245d-80fd-4739-a021-d96e5e56b9e2.png" 
                alt="RELAIS NC Logo" 
                className="h-12 w-auto"
              />
              <h1 className="text-2xl font-bold">RELAIS NC</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link to="/envoyer" className="hover:text-secondary transition-colors">
                Envoyer un colis
              </Link>
              <Link to="/suivi" className="hover:text-secondary transition-colors">
                Suivi
              </Link>
              <Link to="/point-relais" className="hover:text-secondary transition-colors">
                Point Relais
              </Link>
              <Link to="/livreur" className="hover:text-secondary transition-colors">
                Livreur
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Livraison de colis en Nouvelle-Calédonie
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Service de livraison simple et sécurisé pour particuliers et professionnels. 
            Déposez vos colis dans nos points relais et suivez leur acheminement en temps réel.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link to="/envoyer">Envoyer un colis</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <Link to="/suivi">Suivre un colis</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Comment ça marche ?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Package className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>1. Déposez votre colis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Renseignez les informations de votre envoi, générez le lien de paiement 
                  et déposez votre colis dans un point relais après paiement de l'acheteur.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>2. Collecte et transport</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Nos livreurs collectent votre colis et l'acheminent vers le point relais 
                  de destination. Vous recevez des notifications à chaque étape.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>3. Livraison</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Le destinataire est notifié de l'arrivée du colis et peut le récupérer 
                  dans le point relais. L'argent est alors transféré au vendeur.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Nos tarifs</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Particuliers</CardTitle>
                <CardDescription>Pour vos achats occasionnels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-4">500 F</div>
                <p className="text-muted-foreground mb-4">Frais fixe par envoi</p>
                <ul className="space-y-2 text-sm">
                  <li>✓ Livraison en point relais</li>
                  <li>✓ Suivi en temps réel</li>
                  <li>✓ Paiement sécurisé EPAYnc</li>
                  <li>✓ Notifications par email</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Professionnels</CardTitle>
                <CardDescription>Tarifs dégressifs selon le volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-4">Dégressif</div>
                <p className="text-muted-foreground mb-4">Selon volume mensuel</p>
                <ul className="space-y-2 text-sm">
                  <li>✓ Tableau de bord dédié</li>
                  <li>✓ Facturation mensuelle</li>
                  <li>✓ Suivi de tous vos envois</li>
                  <li>✓ Support prioritaire</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">Prêt à commencer ?</h3>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Rejoignez déjà des centaines d'utilisateurs qui nous font confiance
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <Link to="/envoyer">Envoyer mon premier colis</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">RELAIS NC</h4>
              <p className="text-muted-foreground text-sm">
                Service de livraison de colis en Nouvelle-Calédonie
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/envoyer" className="hover:text-primary">Envoyer un colis</Link></li>
                <li><Link to="/suivi" className="hover:text-primary">Suivi de colis</Link></li>
                <li><Link to="/point-relais" className="hover:text-primary">Points relais</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Aide</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
                <li><a href="#" className="hover:text-primary">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Paiement sécurisé</h5>
              <div className="flex items-center space-x-2">
                <CreditCard className="h-6 w-6 text-primary" />
                <span className="text-sm text-muted-foreground">EPAYnc</span>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 RELAIS NC. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;