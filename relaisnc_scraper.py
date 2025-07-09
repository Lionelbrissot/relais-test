from playwright.sync_api import sync_playwright
import pandas as pd
from pathlib import Path
import re

def extract_entreprise_details(page, cat_text, sous_text):
    details = {
        "Nom": "", "Téléphone": "", "Email": "",
        "Adresse": "", "Ville": "",
        "Catégorie": cat_text, "Sous-catégorie": sous_text,
        "Site Web": ""
    }
    
    try:
        # Nom
        page.wait_for_selector("h1.sc-beySPh.pBIqf", timeout=5000)
        details["Nom"] = page.inner_text("h1.sc-beySPh.pBIqf")

        # Téléphone
        try:
            tel_elements = page.query_selector_all("a[href^='tel:']")
            for el in tel_elements:
                classe = el.get_attribute("class")
                if classe and "hTnaKr" in classe:
                    tel_text = el.inner_text().strip()
                    numero = re.sub(r"\D", "", tel_text)  # Garde uniquement les chiffres
                    details["Téléphone"] = numero
                    break
        except Exception as e:
            print("⚠️ Erreur extraction téléphone :", e)




        # Email / Lien web
        try:
            email_elements = page.query_selector_all("a[href^='mailto:']")
            for el in email_elements:
                href = el.get_attribute("href")
                if href:
                    email = href.replace("mailto:", "").strip()
                    if "@" in email and "." in email:  # sécurité supplémentaire
                        details["Email"] = email
                        break
        except Exception as e:
            print("⚠️ Erreur extraction email :", e)


        # Adresse et Ville
        try:
            adresse_blocs = page.query_selector_all("div.sc-beySPh.bibPFL")
            lignes = [div.inner_text().strip() for div in adresse_blocs if div.inner_text().strip()]
            
            adresse_complete = "\n".join(lignes)
            details["Adresse"] = adresse_complete

            # Recherche de la ville dans la dernière ligne
            villes_connues = [
                "Nouméa", "Dumbéa", "Mont-Dore", "Païta", "Bourail", "La Foa", "Moindou", "Farino",
                "Sarraméa", "Boulouparis", "Thio", "Yaté", "Canala", "Kouaoua", "Houaïlou",
                "Ponérihouen", "Poindimié", "Touho", "Hienghène", "Kaala-Gomen", "Koumac",
                "Ouégoa", "Pouébo", "Poum", "Koné", "Voh", "Poya", "Lifou",
                "Maré", "Ouvéa", "Belep", "Île des Pins", "Népoui", "Népéou", "Téoudié", "Wé"
            ]

            if lignes:
                for line in reversed(lignes):
                    for ville in villes_connues:
                        if ville.lower() in line.lower():
                            details["Ville"] = ville
                            break
                    if details["Ville"]:
                        break

        except Exception as e:
            print("⚠️ Erreur extraction adresse/ville :", e)

        # Site internet
        try:
            site_elements = page.query_selector_all("a.sc-beySPh.hTnaKr")
            for el in site_elements:
                href = el.get_attribute("href")
                if href and href.startswith("http") and "mailto:" not in href:
                    details["Site Web"] = href.strip()
                    break
        except:
            pass


    except Exception as e:
        print("❌ Erreur extraction infos entreprise :", e)

    return details




def main():
    all_data = []
    failed_clicks = []
    Path("captures").mkdir(exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, slow_mo=50)
        page = browser.new_page()
        page.goto("https://plan.nc", timeout=60000)
        page.wait_for_timeout(2000)

        print("🟩 Ouverture du site réussie. Ouverture du menu Catégories...")
        page.click("button:has-text('Catégories')")
        page.wait_for_timeout(2000)  # Laisse le menu s'ouvrir visuellement

        # Récupération élargie des liens de catégorie n'importe où dans le menu
        cat_elements = page.query_selector_all("a[href^='/categorie/']")

        category_links = []
        for el in cat_elements:
            try:
                label = el.inner_text().strip()
                href = el.get_attribute("href")
                if label and href:
                    category_links.append((label, "https://plan.nc" + href))
            except:
                continue



        category_links = [
            ("Accessoires de mode", "https://plan.nc/accessoires-de-mode/"),
            ("Agencement", "https://plan.nc/agencement/"),
            ("Agriculture", "https://plan.nc/agriculture/"),
            ("Agroalimentaire", "https://plan.nc/agroalimentaire/"),
            ("Ameublement", "https://plan.nc/ameublement/"),
            ("Animation", "https://plan.nc/animation/"),
            ("Animaux", "https://plan.nc/animaux/"),
            ("Architecte", "https://plan.nc/architecte/"),
            ("Association", "https://plan.nc/association/"),
            ("Assurances/Mutuelles", "https://plan.nc/assurances-mutuelles/"),
            ("Audiovisuel/Presse", "https://plan.nc/audiovisuel-presse/"),
            ("Auto/Moto", "https://plan.nc/auto-moto/"),
            ("Banque/Finance", "https://plan.nc/banque-finance/"),
            ("Bateaux", "https://plan.nc/bateaux/"),
            ("Beauté/Soins/Bien-être", "https://plan.nc/beaute-soins-bien-etre/"),
            ("Bureaux d'études", "https://plan.nc/bureaux-detudes/"),
            ("Bâtiment", "https://plan.nc/batiment/"),
            ("Carburants/Pétroliers", "https://plan.nc/carburants-petroliers/"),
            ("Collecte/Traitement des déchets", "https://plan.nc/collecte-traitement-des-dechets/"),
            ("Commerces / Boutiques Divers", "https://plan.nc/commerces-boutiques-divers/"),
            ("Commerces de services", "https://plan.nc/commerces-de-services/"),
            ("Comptabilité", "https://plan.nc/comptabilite/"),
            ("Culture/Sortie/Evènementiels", "https://plan.nc/culture-sortie-evenementiels/"),
            ("Dépannage", "https://plan.nc/depannage/"),
            ("Désinsectisation/Détermitage", "https://plan.nc/desinsectisation-determitage/"),
            ("Emploi", "https://plan.nc/emploi/"),
            ("Energies renouvelables", "https://plan.nc/energies-renouvelables/"),
            ("Ets Scolaires Public et Privé", "https://plan.nc/ets-scolaires-public-et-prive/"),
            ("Fabricant matières premières", "https://plan.nc/fabricant-matieres-premieres/"),
            ("Formation/Ecole", "https://plan.nc/formation-ecole/"),
            ("Garde d'enfants", "https://plan.nc/garde-denfants/"),
            ("Immobilier", "https://plan.nc/immobilier/"),
            ("Import/Export", "https://plan.nc/import-export/"),
            ("Imprimerie/Signalétique", "https://plan.nc/imprimerie-signaletique/"),
            ("Industrie", "https://plan.nc/industrie/"),
            ("Informatique/Bureautique", "https://plan.nc/informatique-bureautique/"),
            ("Internet", "https://plan.nc/internet/"),
            ("Jardin", "https://plan.nc/jardin/"),
            ("Justice", "https://plan.nc/justice/"),
            ("Location", "https://plan.nc/location/"),
            ("Maison", "https://plan.nc/maison/"),
            ("Mode/Prêt à Porter", "https://plan.nc/mode-pret-a-porter/"),
            ("Médecine", "https://plan.nc/medecine/"),
            ("Nettoyage/Laverie", "https://plan.nc/nettoyage-laverie/"),
            ("Outillage/Bricolage", "https://plan.nc/outillage-bricolage/"),
            ("Photographie", "https://plan.nc/photographie/"),
            ("Politique", "https://plan.nc/politique/"),
            ("Pompes funèbres", "https://plan.nc/pompes-funebres/"),
            ("Protection et Sécurité", "https://plan.nc/protection-et-securite/"),
            ("Pêcheries", "https://plan.nc/pecheries/"),
            ("Religion", "https://plan.nc/religion/"),
            ("Rencontres", "https://plan.nc/rencontres/"),
            ("Restaurant/Bar", "https://plan.nc/restaurant-bar/"),
            ("Santé", "https://plan.nc/sante/"),
            ("Services Publics", "https://plan.nc/services-publics/"),
            ("Services aux entreprises", "https://plan.nc/services-aux-entreprises/"),
            ("Services de restauration", "https://plan.nc/services-de-restauration/"),
            ("Services à la personne", "https://plan.nc/services-a-la-personne/"),
            ("Sports/Loisirs", "https://plan.nc/sports-loisirs/"),
            ("Syndicats", "https://plan.nc/syndicats/"),
            ("Tatouages / Piercing", "https://plan.nc/tatouages-piercing/"),
            ("Tourisme", "https://plan.nc/tourisme/"),
            ("Transport", "https://plan.nc/transport/"),
            ("Travaux maritimes", "https://plan.nc/travaux-maritimes/"),
            ("Travaux publics", "https://plan.nc/travaux-publics/"),
            ("Travaux sous marins", "https://plan.nc/travaux-sous-marins/"),
            ("Télécommunication", "https://plan.nc/telecommunication/"),
            ("Vidange/Assainissement", "https://plan.nc/vidange-assainissement/"),
]

        print(f"📌 {len(category_links)} catégories détectées.\n")


        for cat_text, cat_url in category_links:
            try:
                print(f"\n📂 Catégorie : {cat_text}")
                page.goto(cat_url)
                page.wait_for_timeout(2000)

            # Capture après ouverture de la catégorie
                cat_clean = cat_text.lower().replace(" ", "_").replace("/", "-")
                capture_path = f"captures/{cat_clean}.png"
                page.screenshot(path=capture_path, full_page=True)
                print(f"📸 Screenshot enregistré : {capture_path}")

            # 🕒 On attend que les sous-catégories soient chargées
                try:
                
                    page.wait_for_selector("div.sc-beySPh.fXhksb", timeout=8000)
                    sous_categories = page.query_selector_all("div.sc-beySPh.fXhksb")
                    print(f"🔍 {len(sous_categories)} sous-catégorie(s) trouvée(s)")
                except Exception as e:
                    print(f"  ⚠️ Aucune sous-catégorie trouvée, on passe à la suite. ({e})")
                    continue

                if not sous_categories:
                    print("  ⚠️ Aucune sous-catégorie trouvée, on passe à la suite.")
                    continue

                # Pour chaque sous-catégorie, clic et chargement des entreprises
                
                sous_count = len(sous_categories)
                for i in range(sous_count):
                    try:
                        # Revenir à la page de la catégorie pour resélectionner les sous-catégories
                        page.goto(cat_url)
                        page.wait_for_timeout(2000)

                        page.wait_for_selector("div.sc-beySPh.fXhksb", timeout=8000)
                        sous_categories = page.query_selector_all("div.sc-beySPh.fXhksb")

                        if i >= len(sous_categories):
                            print(f"  ⚠️ Index {i} hors limite pour sous-catégorie.")
                            continue

                        sous = sous_categories[i]
                        sous_text = sous.inner_text().strip().replace("\n", " ")
                        if not sous_text:
                            print("  ⚠️ Sous-catégorie sans texte, ignorée.")
                            continue

                        print(f"  🔸 Sous-catégorie (clic bouton) : {sous_text}")
                        sous.click()
                        page.wait_for_timeout(2500)

                        page.mouse.wheel(0, 2000)
                        page.wait_for_timeout(2000)

                        page.wait_for_selector("h1.sc-beySPh.iXycV", timeout=8000)
                        noms_detectes = page.query_selector_all("h1.sc-beySPh.iXycV")
                        print(f"    🏢 Noms d'entreprises détectés : {len(noms_detectes)}")

                        for j in range(len(noms_detectes)):
                            try:
                                page.wait_for_selector("h1.sc-beySPh.iXycV", timeout=8000)
                                noms_entreprises = page.query_selector_all("h1.sc-beySPh.iXycV")

                                if j >= len(noms_entreprises):
                                    print(f"        ⚠️ Index {j} hors limite après rechargement.")
                                    continue

                                h1 = noms_entreprises[j]
                                nom = h1.inner_text().strip()
                                print(f"    ➤ Clic sur : {nom}")

                                try:
                                    h1.scroll_into_view_if_needed()
                                    page.wait_for_timeout(300)
                                    noms_entreprises = page.query_selector_all("h1.sc-beySPh.iXycV")
                                    if j >= len(noms_entreprises):
                                        continue

                                    h1 = noms_entreprises[j]
                                    if h1.is_visible():
                                        h1.click()
                                    else:
                                        continue

                                except Exception as click_err:
                                    print(f"        ⚠️ Erreur lors du clic sur {nom} : {click_err}")
                                    continue

                                page.wait_for_timeout(3000)

                                try:
                                    page.wait_for_selector("h1.sc-beySPh.pBIqf", timeout=8000)
                                    nom_fiche = page.inner_text("h1.sc-beySPh.pBIqf").strip()
                                    if nom_fiche.lower() != nom.lower():
                                        print(f"        ⚠️ Nom différent : attendu '{nom}', trouvé '{nom_fiche}'")
                                        raise Exception("Nom non correspondant")
                                except:
                                    print("        ⚠️ La fiche entreprise ne s’est pas affichée correctement.")
                                    page.go_back()
                                    page.wait_for_timeout(2000)
                                    continue

                                details = extract_entreprise_details(page, cat_text, sous_text)
                                details["Nom"] = nom
                                all_data.append(details)
                                print(f"        ✅ Données extraites pour : {nom}")
                                # Sauvegarde intermédiaire
                                pd.DataFrame(all_data).to_excel("entreprises_plan_nc.xlsx", index=False)


                                page.go_back()
                                page.wait_for_timeout(2000)

                            except Exception as err:
                                print(f"        ❌ Erreur avec {nom} : {err}")
                                failed_clicks.append({"cat": cat_text, "sous": sous_text, "nom": nom})
                                page.go_back()
                                page.wait_for_timeout(1000)


                    except Exception as err:
                        print(f"❌ Erreur sous-catégorie {i} : {err}")
                        continue
  
            except Exception as e:
                print(f"❌ Erreur dans la catégorie {cat_text} : {e}")
                continue
        # Nouvelle approche : cliquer sur les noms d'entreprise (h1)
        try:
            page.wait_for_selector("h1.sc-beySPh.iXycV", timeout=8000)
            noms_entreprises = page.query_selector_all("h1.sc-beySPh.iXycV")
            print(f"    🏢 Noms d'entreprises détectés : {len(noms_entreprises)}")

            for h1 in noms_entreprises:
                try:
                    nom = h1.inner_text().strip()
                    try:
                        print(f"    ➤ Clic sur : {nom}")
                        h1.scroll_into_view_if_needed()
                        h1.click()
                        page.wait_for_timeout(3000)

                        try:
                            page.wait_for_selector("h1.sc-beySPh.pBIqf", timeout=8000)
                            titre = page.query_selector("h1.sc-beySPh.pBIqf").inner_text().strip()
                            print(f"        🔍 Titre détecté sur la fiche : {titre}")
                        except:
                            print("        ⚠️ La fiche entreprise ne s’est pas affichée.")
                            page.go_back()
                            page.wait_for_timeout(2000)
                            continue
                       

                        details = extract_entreprise_details(page, cat_text, sous_text)

                        details["Nom"] = nom
                        all_data.append(details)
                        print(f"        ✅ Données extraites pour : {details.get('Nom', 'Inconnu')}")

                        page.go_back()
                        page.wait_for_timeout(2000)

                    except Exception as err:
                        print(f"        ❌ Erreur lors de l'ouverture d'une fiche entreprise : {err}")
                        page.go_back()
                        page.wait_for_timeout(1000)

                except Exception as err:
                    print(f"  ❌ Erreur chargement noms d'entreprises : {err}")
                    pass
        except Exception as err:
                    print(f"  ❌ Erreur chargement noms d'entreprises : {err}")
                    pass
        if failed_clicks:
            print(f"\n🔁 Re-traitement de {len(failed_clicks)} entreprises échouées...\n")
            for fail in failed_clicks:
                try:
                    cat_text = fail["cat"]
                    sous_text = fail["sous"]
                    entreprise = fail["nom"]
                    cat_url = dict(category_links)[cat_text]

                    # Retourner à la sous-catégorie
                    page.goto(cat_url)
                    page.wait_for_timeout(2000)
                    page.wait_for_selector("div.sc-beySPh.fXhksb", timeout=8000)
                    sous_categories = page.query_selector_all("div.sc-beySPh.fXhksb")

                    for sous in sous_categories:
                        if sous_text.strip().lower() in sous.inner_text().strip().lower():
                            sous.click()
                            page.wait_for_timeout(2500)
                            page.mouse.wheel(0, 2000)
                            page.wait_for_timeout(2000)
                            page.wait_for_selector("h1.sc-beySPh.iXycV", timeout=8000)
                            noms_entreprises = page.query_selector_all("h1.sc-beySPh.iXycV")

                            for h1 in noms_entreprises:
                                nom = h1.inner_text().strip()
                                if nom.lower() == entreprise.lower():
                                    try:
                                        h1.scroll_into_view_if_needed()
                                        page.wait_for_timeout(300)
                                        h1.click()
                                        page.wait_for_timeout(3000)

                                        page.wait_for_selector("h1.sc-beySPh.pBIqf", timeout=8000)
                                        details = extract_entreprise_details(page, cat_text, sous_text)
                                        details["Nom"] = nom
                                        all_data.append(details)
                                        print(f"🔁 ✅ Données extraites au second essai pour : {nom}")
                                        page.go_back()
                                        break
                                    except:
                                        print(f"🔁 ❌ Échec à nouveau pour : {nom}")
                                        page.go_back()
                            break
                except Exception as e:
                    print(f"🔁 ❌ Erreur de reprocessing : {e}")

        browser.close()

        if all_data:
            df = pd.DataFrame(all_data)
            df.to_excel("entreprises_plan_nc.xlsx", index=False)
            print(f"\n✅ Scraping terminé. {len(all_data)} entreprises extraites.")
        else:
            print("⚠️ Aucune entreprise trouvée.")

if __name__ == "__main__":
    main()