import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Package, Scan, CheckCircle, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";


const PointRelais = () => {
  const [searchCode, setSearchCode] = useState("");
  
  // Données simulées
  const colisEnAttente = [
    {
      id: "RNC12345678",
      expediteur: "Jean Dupont",
      destinataire: "Marie Martin",
      description: "Vêtements",
      poids: "1.2 kg",
      dateDepot: "2024-01-15 14:20",
      status: "depose"
    },
    {
      id: "RNC87654321",
      expediteur: "Pierre Bernard",
      destinataire: "Sophie Leroy",
      description: "Livre",
      poids: "0.5 kg",
      dateDepot: "2024-01-15 16:45",
      status: "depose"
    }
  ];

  const colisARecevoir = [
    {
      id: "RNC11223344",
      expediteur: "Alice Moreau",
      destinataire: "Paul Durand",
      description: "Accessoires",
      poids: "0.8 kg",
      dateArrivee: "2024-01-16 11:30",
      status: "arrive"
    }
  ];

  const handleValidateDeposit = (colisId: string) => {
    toast(`✅ Dépôt validé : Le colis ${colisId} a été validé pour collecte`);
  };

  const handleValidateReceipt = (colisId: string) => {
    toast(`📦 Réception validée : Le colis ${colisId} est prêt pour récupération`);
  };

  const handlePackagePickup = (colisId: string) => {
    toast(`📬 Remise effectuée : Le colis ${colisId} a été remis au destinataire`);
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
            <h1 className="text-xl font-bold">Interface Point Relais</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="deposer" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="deposer">Dépôts</TabsTrigger>
            <TabsTrigger value="recevoir">Réceptions</TabsTrigger>
            <TabsTrigger value="recherche">Recherche</TabsTrigger>
          </TabsList>

          {/* Onglet Dépôts */}
          <TabsContent value="deposer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Colis en attente de collecte</span>
                </CardTitle>
                <CardDescription>
                  Validez la réception des colis déposés par les expéditeurs
                </CardDescription>
              </CardHeader>
              <CardContent>
                {colisEnAttente.length > 0 ? (
                  <div className="space-y-4">
                    {colisEnAttente.map((colis) => (
                      <Card key={colis.id} className="border-l-4 border-l-yellow-400">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{colis.id}</Badge>
                                <Badge className="bg-yellow-100 text-yellow-800">
                                  <Clock className="h-3 w-3 mr-1" />
                                  En attente
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <Label className="text-muted-foreground">Expéditeur</Label>
                                  <p>{colis.expediteur}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Destinataire</Label>
                                  <p>{colis.destinataire}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Description</Label>
                                  <p>{colis.description}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Poids</Label>
                                  <p>{colis.poids}</p>
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Déposé le {new Date(colis.dateDepot).toLocaleDateString('fr-FR', {
                                  day: 'numeric',
                                  month: 'long',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                            <Button 
                              onClick={() => handleValidateDeposit(colis.id)}
                              size="sm"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Valider le dépôt
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Aucun colis en attente de validation</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Réceptions */}
          <TabsContent value="recevoir" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Colis arrivés</span>
                </CardTitle>
                <CardDescription>
                  Validez la réception des colis livrés par les livreurs
                </CardDescription>
              </CardHeader>
              <CardContent>
                {colisARecevoir.length > 0 ? (
                  <div className="space-y-4">
                    {colisARecevoir.map((colis) => (
                      <Card key={colis.id} className="border-l-4 border-l-green-400">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{colis.id}</Badge>
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Arrivé
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <Label className="text-muted-foreground">Expéditeur</Label>
                                  <p>{colis.expediteur}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Destinataire</Label>
                                  <p>{colis.destinataire}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Description</Label>
                                  <p>{colis.description}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Poids</Label>
                                  <p>{colis.poids}</p>
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Arrivé le {new Date(colis.dateArrivee).toLocaleDateString('fr-FR', {
                                  day: 'numeric',
                                  month: 'long',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <Button 
                                onClick={() => handleValidateReceipt(colis.id)}
                                size="sm"
                                variant="outline"
                              >
                                Valider réception
                              </Button>
                              <Button 
                                onClick={() => handlePackagePickup(colis.id)}
                                size="sm"
                              >
                                Remise client
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Aucun colis en attente de réception</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Recherche */}
          <TabsContent value="recherche" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Scan className="h-5 w-5" />
                  <span>Rechercher un colis</span>
                </CardTitle>
                <CardDescription>
                  Recherchez un colis par son numéro de suivi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="searchCode">Numéro de suivi</Label>
                  <Input
                    id="searchCode"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    placeholder="Ex: RNC12345678"
                  />
                </div>
                <Button className="w-full">
                  <Scan className="h-4 w-4 mr-2" />
                  Rechercher
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PointRelais;