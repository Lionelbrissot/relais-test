import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Truck, MapPin, Package, CheckCircle, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Livreur = () => {
  const [deliveryCode, setDeliveryCode] = useState("");
  

  // Données simulées
  const colisACollecter = [
    {
      id: "RNC12345678",
      expediteur: "Jean Dupont",
      pointRelais: "Nouméa Centre - Rue de l'Alma",
      adresse: "15 Rue de l'Alma, Nouméa",
      destination: "Mont-Dore - Zone Commerciale",
      poids: "1.2 kg",
      description: "Vêtements",
      dateDepot: "2024-01-15 14:20",
      priorite: "normale"
    },
    {
      id: "RNC87654321",
      expediteur: "Pierre Bernard",
      pointRelais: "Nouméa Centre - Rue de l'Alma",
      adresse: "15 Rue de l'Alma, Nouméa",
      destination: "Païta - Centre-ville",
      poids: "0.5 kg",
      description: "Livre",
      dateDepot: "2024-01-15 16:45",
      priorite: "urgent"
    }
  ];

  const colisEnCours = [
    {
      id: "RNC11223344",
      expediteur: "Alice Moreau",
      pointRelaisOrigine: "Dumbéa - Centre Commercial",
      destination: "Voh - Mairie",
      poids: "0.8 kg",
      description: "Accessoires",
      dateCollecte: "2024-01-16 09:15"
    }
  ];

  const handleStartCollection = (colisId: string) => {
  toast(`📦 Collecte démarrée : Navigation vers le point de collecte du colis ${colisId}`);
};

  const handleConfirmCollection = (colisId: string) => {
  toast(`✅ Collecte confirmée : Le colis ${colisId} a été collecté avec succès`);
};


  const handleConfirmDelivery = (colisId: string) => {
  toast(`📦 Livraison confirmée : Le colis ${colisId} a été livré au point relais de destination`);
};
  const getPriorityColor = (priorite: string) => {
    switch (priorite) {
      case "urgent": return "bg-red-100 text-red-800";
      case "normale": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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
            <h1 className="text-xl font-bold">Interface Livreur</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="collecter" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="collecter">À collecter</TabsTrigger>
            <TabsTrigger value="transport">En transport</TabsTrigger>
            <TabsTrigger value="scanner">Scanner</TabsTrigger>
          </TabsList>

          {/* Onglet À collecter */}
          <TabsContent value="collecter" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Colis à collecter</span>
                </CardTitle>
                <CardDescription>
                  Colis prêts pour collecte dans les points relais
                </CardDescription>
              </CardHeader>
              <CardContent>
                {colisACollecter.length > 0 ? (
                  <div className="space-y-4">
                    {colisACollecter.map((colis) => (
                      <Card key={colis.id} className="border-l-4 border-l-orange-400">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{colis.id}</Badge>
                                <Badge className={getPriorityColor(colis.priorite)}>
                                  {colis.priorite}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <Label className="text-muted-foreground">Expéditeur</Label>
                                  <p>{colis.expediteur}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Description</Label>
                                  <p>{colis.description}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Point de collecte</Label>
                                  <p className="font-medium">{colis.pointRelais}</p>
                                  <p className="text-xs text-muted-foreground">{colis.adresse}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Destination</Label>
                                  <p>{colis.destination}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Poids</Label>
                                  <p>{colis.poids}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Déposé le</Label>
                                  <p className="text-xs">{new Date(colis.dateDepot).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}</p>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2 ml-4">
                              <Button 
                                onClick={() => handleStartCollection(colis.id)}
                                size="sm"
                                variant="outline"
                              >
                                <Navigation className="h-4 w-4 mr-2" />
                                Navigation
                              </Button>
                              <Button 
                                onClick={() => handleConfirmCollection(colis.id)}
                                size="sm"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Collecter
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Aucun colis à collecter</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet En transport */}
          <TabsContent value="transport" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5" />
                  <span>Colis en transport</span>
                </CardTitle>
                <CardDescription>
                  Colis que vous transportez actuellement
                </CardDescription>
              </CardHeader>
              <CardContent>
                {colisEnCours.length > 0 ? (
                  <div className="space-y-4">
                    {colisEnCours.map((colis) => (
                      <Card key={colis.id} className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{colis.id}</Badge>
                                <Badge className="bg-primary/20 text-primary">
                                  <Truck className="h-3 w-3 mr-1" />
                                  En transport
                                </Badge>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <Label className="text-muted-foreground">Expéditeur</Label>
                                  <p>{colis.expediteur}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Description</Label>
                                  <p>{colis.description}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Origine</Label>
                                  <p>{colis.pointRelaisOrigine}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Destination</Label>
                                  <p className="font-medium">{colis.destination}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Poids</Label>
                                  <p>{colis.poids}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Collecté le</Label>
                                  <p className="text-xs">{new Date(colis.dateCollecte).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}</p>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2 ml-4">
                              <Button 
                                onClick={() => handleStartCollection(colis.id)}
                                size="sm"
                                variant="outline"
                              >
                                <Navigation className="h-4 w-4 mr-2" />
                                Navigation
                              </Button>
                              <Button 
                                onClick={() => handleConfirmDelivery(colis.id)}
                                size="sm"
                              >
                                <MapPin className="h-4 w-4 mr-2" />
                                Livrer
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Truck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Aucun colis en transport</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Scanner */}
          <TabsContent value="scanner" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Scanner un colis</span>
                </CardTitle>
                <CardDescription>
                  Saisissez le numéro de colis pour confirmer une action
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="deliveryCode">Numéro de colis</Label>
                  <Input
                    id="deliveryCode"
                    value={deliveryCode}
                    onChange={(e) => setDeliveryCode(e.target.value)}
                    placeholder="Ex: RNC12345678"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline">
                    Confirmer collecte
                  </Button>
                  <Button>
                    Confirmer livraison
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Statistiques du jour */}
            <Card>
              <CardHeader>
                <CardTitle>Statistiques du jour</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted-foreground">Colis collectés</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">8</div>
                    <div className="text-sm text-muted-foreground">Colis livrés</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">4</div>
                    <div className="text-sm text-muted-foreground">En transport</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Livreur;