import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Package, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast"


const Envoyer = () => {
  const [userType, setUserType] = useState<"particulier" | "professionnel" | "">("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    expediteurNom: "",
    expediteurEmail: "",
    expediteurTel: "",
    destinataireNom: "",
    destinataireEmail: "",
    destinataireTel: "",
    pointRelaisOrigine: "",
    pointRelaisDestination: "",
    poids: "",
    valeurColis: "",
    description: "",
    entreprise: "",
    siret: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generatePaymentLink = () => {
    // Simulation de génération de lien de paiement
    const paymentId = Math.random().toString(36).substr(2, 9);
    const paymentLink = `https://epaync.nc/pay/${paymentId}`;
    
    toast("Lien de paiement généré !\nEnvoyez ce lien à l'acheteur : " + paymentLink);
    
    setStep(3);
  };

  const pointsRelais = [
    "Nouméa Centre - Rue de l'Alma",
    "Nouméa Sud - Quartier Latin",
    "Dumbéa - Centre Commercial",
    "Mont-Dore - Zone Commerciale",
    "Païta - Centre-ville",
    "Koné - Place du Marché",
    "Voh - Mairie",
    "Pouembout - Poste"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Link>
            </Button>
            <h1 className="text-xl font-bold">Envoyer un colis</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {step === 1 && (
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <Package className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Type de compte</CardTitle>
              <CardDescription>
                Sélectionnez votre type de compte pour calculer les frais d'envoi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={userType}
                onValueChange={(value: "particulier" | "professionnel") => setUserType(value)}
>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="particulier" id="particulier" />
                  <Label htmlFor="particulier" className="flex-1 cursor-pointer">
                    <div>
                      <div className="font-medium">Particulier</div>
                      <div className="text-sm text-muted-foreground">
                        Tarif fixe : 500 F par envoi
                      </div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="professionnel" id="professionnel" />
                  <Label htmlFor="professionnel" className="flex-1 cursor-pointer">
                    <div>
                      <div className="font-medium">Professionnel</div>
                      <div className="text-sm text-muted-foreground">
                        Tarifs dégressifs selon le volume
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
              <Button 
                className="w-full mt-6" 
                onClick={() => setStep(2)}
                disabled={!userType}
              >
                Continuer
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Informations d'envoi</CardTitle>
                <CardDescription>
                  Remplissez les informations pour créer votre envoi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {userType === "professionnel" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="entreprise">Nom de l'entreprise</Label>
                      <Input
                        id="entreprise"
                        value={formData.entreprise}
                        onChange={(e) => handleInputChange("entreprise", e.target.value)}
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                    <div>
                      <Label htmlFor="siret">SIRET</Label>
                      <Input
                        id="siret"
                        value={formData.siret}
                        onChange={(e) => handleInputChange("siret", e.target.value)}
                        placeholder="Numéro SIRET"
                      />
                    </div>
                  </div>
                )}

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Expéditeur (Vendeur)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="expediteurNom">Nom complet</Label>
                      <Input
                        id="expediteurNom"
                        value={formData.expediteurNom}
                        onChange={(e) => handleInputChange("expediteurNom", e.target.value)}
                        placeholder="Nom et prénom"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expediteurEmail">Email</Label>
                      <Input
                        id="expediteurEmail"
                        type="email"
                        value={formData.expediteurEmail}
                        onChange={(e) => handleInputChange("expediteurEmail", e.target.value)}
                        placeholder="email@exemple.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expediteurTel">Téléphone</Label>
                      <Input
                        id="expediteurTel"
                        value={formData.expediteurTel}
                        onChange={(e) => handleInputChange("expediteurTel", e.target.value)}
                        placeholder="XX.XX.XX"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Destinataire (Acheteur)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="destinataireNom">Nom complet</Label>
                      <Input
                        id="destinataireNom"
                        value={formData.destinataireNom}
                        onChange={(e) => handleInputChange("destinataireNom", e.target.value)}
                        placeholder="Nom et prénom"
                      />
                    </div>
                    <div>
                      <Label htmlFor="destinataireEmail">Email</Label>
                      <Input
                        id="destinataireEmail"
                        type="email"
                        value={formData.destinataireEmail}
                        onChange={(e) => handleInputChange("destinataireEmail", e.target.value)}
                        placeholder="email@exemple.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="destinataireTel">Téléphone</Label>
                      <Input
                        id="destinataireTel"
                        value={formData.destinataireTel}
                        onChange={(e) => handleInputChange("destinataireTel", e.target.value)}
                        placeholder="XX.XX.XX"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Points relais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pointRelaisOrigine">Point relais de dépôt</Label>
                      <select
                        id="pointRelaisOrigine"
                        className="w-full p-2 border rounded-md"
                        value={formData.pointRelaisOrigine}
                        onChange={(e) => handleInputChange("pointRelaisOrigine", e.target.value)}
                      >
                        <option value="">Sélectionnez un point relais</option>
                        {pointsRelais.map((point, index) => (
                          <option key={index} value={point}>{point}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="pointRelaisDestination">Point relais de réception</Label>
                      <select
                        id="pointRelaisDestination"
                        className="w-full p-2 border rounded-md"
                        value={formData.pointRelaisDestination}
                        onChange={(e) => handleInputChange("pointRelaisDestination", e.target.value)}
                      >
                        <option value="">Sélectionnez un point relais</option>
                        {pointsRelais.map((point, index) => (
                          <option key={index} value={point}>{point}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Informations du colis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="poids">Poids approximatif (kg)</Label>
                      <Input
                        id="poids"
                        type="number"
                        value={formData.poids}
                        onChange={(e) => handleInputChange("poids", e.target.value)}
                        placeholder="Ex: 2.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="valeurColis">Valeur du colis (F CFP)</Label>
                      <Input
                        id="valeurColis"
                        type="number"
                        value={formData.valeurColis}
                        onChange={(e) => handleInputChange("valeurColis", e.target.value)}
                        placeholder="Ex: 5000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Ex: Vêtements"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Frais d'envoi:</span>
                    <span className="text-xl font-bold text-primary">
                      {userType === "particulier" ? "500 F" : "À calculer"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Frais payés par le vendeur, déduits du montant final
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Retour
                  </Button>
                  <Button onClick={generatePaymentLink} className="flex-1">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Générer le lien de paiement
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 3 && (
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Lien de paiement créé</CardTitle>
              <CardDescription>
                Envoyez ce lien à l'acheteur pour qu'il puisse payer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <Label className="text-sm font-medium">Lien de paiement:</Label>
                <div className="text-sm font-mono bg-background p-2 rounded mt-1 break-all">
                  https://epaync.nc/pay/{Math.random().toString(36).substr(2, 9)}
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Important :</strong> Le colis ne peut être déposé qu'après le paiement de l'acheteur.
                  Vous recevrez un email de confirmation une fois le paiement effectué.
                </p>
              </div>

              <div className="space-y-2">
                <Button className="w-full">
                  Copier le lien
                </Button>
                <Button variant="outline" className="w-full">
                  Envoyer par email
                </Button>
              </div>

              <Button asChild variant="ghost" className="w-full">
                <Link to="/suivi">Suivre mes envois</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Envoyer;