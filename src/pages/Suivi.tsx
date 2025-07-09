import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Package, MapPin, Truck, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Suivi = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [tracking, setTracking] = useState<any>(null);

  const handleSearch = () => {
    // Simulation de données de suivi
    const mockTracking = {
      id: "RNC" + Math.random().toString(36).substr(2, 8).toUpperCase(),
      status: "en_transit",
      expediteur: "Jean Dupont",
      destinataire: "Marie Martin",
      pointRelaisOrigine: "Nouméa Centre - Rue de l'Alma",
      pointRelaisDestination: "Mont-Dore - Zone Commerciale",
      valeur: "3500 F",
      poids: "1.2 kg",
      description: "Vêtements",
      dateCreation: "2024-01-15 10:30",
      etapes: [
        {
          status: "cree",
          date: "2024-01-15 10:30",
          description: "Envoi créé",
          icon: Package,
          completed: true
        },
        {
          status: "paye",
          date: "2024-01-15 11:45",
          description: "Paiement effectué par l'acheteur",
          icon: CheckCircle,
          completed: true
        },
        {
          status: "depose",
          date: "2024-01-15 14:20",
          description: "Colis déposé au point relais de départ",
          icon: MapPin,
          completed: true
        },
        {
          status: "collecte",
          date: "2024-01-16 09:15",
          description: "Colis collecté par le livreur",
          icon: Truck,
          completed: true
        },
        {
          status: "en_transit",
          date: "2024-01-16 09:30",
          description: "Colis en cours de transport",
          icon: Truck,
          completed: true,
          current: true
        },
        {
          status: "arrive",
          date: "",
          description: "Colis arrivé au point relais de destination",
          icon: MapPin,
          completed: false
        },
        {
          status: "livre",
          date: "",
          description: "Colis récupéré par le destinataire",
          icon: CheckCircle,
          completed: false
        }
      ]
    };
    setTracking(mockTracking);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "cree": return "bg-gray-100 text-gray-800";
      case "paye": return "bg-blue-100 text-blue-800";
      case "depose": return "bg-yellow-100 text-yellow-800";
      case "collecte": return "bg-orange-100 text-orange-800";
      case "en_transit": return "bg-primary/20 text-primary";
      case "arrive": return "bg-green-100 text-green-800";
      case "livre": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "cree": return "Créé";
      case "paye": return "Payé";
      case "depose": return "Déposé";
      case "collecte": return "Collecté";
      case "en_transit": return "En transit";
      case "arrive": return "Arrivé";
      case "livre": return "Livré";
      default: return status;
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
            <h1 className="text-xl font-bold">Suivi de colis</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Recherche */}
        <Card className="max-w-md mx-auto mb-8">
          <CardHeader className="text-center">
            <Search className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>Suivre votre colis</CardTitle>
            <CardDescription>
              Entrez votre numéro de suivi pour connaître l'état de votre envoi
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="tracking">Numéro de suivi</Label>
              <Input
                id="tracking"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Ex: RNC12345678"
              />
            </div>
            <Button onClick={handleSearch} className="w-full">
              <Search className="h-4 w-4 mr-2" />
              Rechercher
            </Button>
          </CardContent>
        </Card>

        {/* Résultats de suivi */}
        {tracking && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Informations générales */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Colis {tracking.id}</CardTitle>
                    <CardDescription>
                      De {tracking.expediteur} vers {tracking.destinataire}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(tracking.status)}>
                    {getStatusText(tracking.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Point de départ</Label>
                    <p className="text-sm">{tracking.pointRelaisOrigine}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Point de destination</Label>
                    <p className="text-sm">{tracking.pointRelaisDestination}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Valeur</Label>
                    <p className="text-sm">{tracking.valeur}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Poids</Label>
                    <p className="text-sm">{tracking.poids}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                  <p className="text-sm">{tracking.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Historique du transport</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tracking.etapes.map((etape: any, index: number) => {
                    const Icon = etape.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`p-2 rounded-full ${
                          etape.completed 
                            ? etape.current 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className={`font-medium ${
                                etape.current ? "text-primary" : etape.completed ? "text-foreground" : "text-muted-foreground"
                              }`}>
                                {etape.description}
                              </p>
                              {etape.date && (
                                <p className="text-sm text-muted-foreground">
                                  {new Date(etape.date).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                              )}
                            </div>
                            {etape.current && (
                              <Badge variant="outline" className="text-primary border-primary">
                                En cours
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1">
                    Recevoir des notifications
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Contacter le support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Suivi;