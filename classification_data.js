/**
 * ENTOMASTER – classification_data.js
 * Base de données centrale complète contenant toutes les espèces du site
 */
window.speciesData = [
    {
        id: "ceutorhynchus_assimilis", name: "Ceutorhynchus assimilis", author: "(Paykull, 1792)",
        order: "Coléoptères", family: "Curculionidae", cultures: "Chou, Colza, Navet, Crucifères", category: "maraicheres",
        description: "Charançon des siliques des crucifères. Les adultes attaquent les tiges et boutons floraux.",
        image: "images/ceutorhynchus_assimilis.jpg",
        management: "Rotation de culture longue (4 ans), travail du sol après récolte, piégeage chromatique jaune.",
        beneficials: "Trichomalus perfectus (Hyménoptère parasitoïde)."
    },
    {
        id: "ceutorhynchus_picitarsis", name: "Ceutorhynchus picitarsis", author: "Gyllenhal, 1837",
        order: "Coléoptères", family: "Curculionidae", cultures: "Colza, Chou, Crucifères maraîchères", category: "maraicheres",
        description: "Charançon du bourgeon terminal. Les larves minent les pétioles en automne et hiver.",
        image: "images/ceutorhynchus_picitarsis.jpg",
        management: "Semis précoce pour favoriser la vigueur de la plante, maintien de bandes enherbées.",
        beneficials: "Micro-hyménoptères de la famille des Braconidae."
    },
    {
        id: "capnodis_tenebrionis", name: "Capnodis tenebrionis", author: "(Linnaeus, 1758)",
        order: "Coléoptères", family: "Buprestidae", cultures: "Rosacées fruitières (Pêcher, Prunier)", category: "arboriculture",
        description: "Bupreste des arbres fruitiers. Les larves creusent des galeries sous l'écorce au niveau du collet.",
        image: "images/capnodis_tenebrionis.jpg",
        management: "Arrosage adéquat, pose de barrières physiques au sol (bâches), lutte biologique.",
        beneficials: "Nématodes entomopathogènes (Steinernema carpocapsae)."
    },
    {
        id: "rhynchophorus_ferrugineus", name: "Rhynchophorus ferrugineus", author: "(Olivier, 1791)",
        order: "Coléoptères", family: "Dryophthoridae", cultures: "Palmier dattier, Palmier des Canaries", category: "ornementales",
        description: "Charançon rouge du palmier. Larves foreuses extrêmement destructrices.",
        image: "images/rhynchophorus_ferrugineus.jpg",
        management: "Élimination des palmes infestées, application de glu protectrice, traitement à base de champignons.",
        beneficials: "Beauveria bassiana (Champignon entomopathogène)."
    },
    {
        id: "tuta_absoluta", name: "Tuta absoluta", author: "(Meyrick, 1917)",
        order: "Lépidoptères", family: "Gelechiidae", cultures: "Solanacées (Tomate, Pomme de terre)", category: "maraicheres",
        description: "Mineuse de la tomate. Les chenilles forent des galeries transparentes dans les feuilles et fruits.",
        image: "images/tuta_absoluta.jpg",
        management: "Piégeage de masse aux phéromones sexuelles, pose de filets anti-insectes, confusion sexuelle.",
        beneficials: "Macrolophus pygmaeus et Nesidiocoris tenuis (Punaises prédatrices)."
    },
    {
        id: "prays_oleae", name: "Prays oleae", author: "(Bernard, 1788)",
        order: "Lépidoptères", family: "Praydidae", cultures: "Olivier", category: "arboriculture",
        description: "Teigne de l'olivier. Attaque successivement les feuilles, les fleurs et les fruits.",
        image: "images/prays_oleae.jpg",
        management: "Traitements biologiques à base de Bacillus thuringiensis au moment de la floraison.",
        beneficials: "Chrysoperla carnea (Chrysope prédatrice d'œufs)."
    },
    {
        id: "ceratitis_capitata", name: "Ceratitis capitata", author: "(Wiedemann, 1824)",
        order: "Diptères", family: "Tephritidae", cultures: "Agrumes, Pêcher, Abricotier", category: "arboriculture",
        description: "Mouche méditerranéenne des fruits. Les larves se développent dans la pulpe.",
        image: "images/ceratitis_capitata.jpg",
        management: "Technique de l'insecte stérile (TIS), ramassage systématique des fruits tombés, piégeage de masse.",
        beneficials: "Opius concolor (Hyménoptère parasitoïde)."
    },
    {
        id: "bactrocera_oleae", name: "Bactrocera oleae", author: "(Rossi, 1790)",
        order: "Diptères", family: "Tephritidae", cultures: "Olivier", category: "arboriculture",
        description: "Mouche de l'olive. Larve monophage se nourrissant exclusivement de la pulpe des olives.",
        image: "images/bactrocera_oleae.jpg",
        management: "Application de barrières minérales (kaolin), pièges de capture massives (McPhail).",
        beneficials: "Psyttalia concolor et Lasioptera berlesiana."
    },
    {
        id: "frankliniella_occidentalis", name: "Frankliniella occidentalis", author: "(Pergande, 1895)",
        order: "Thysanoptères", family: "Thripidae", cultures: "Poivron, Tomate, Rosier", category: "maraicheres",
        description: "Thrips californien. Pique les cellules végétales provoquant des taches argentées.",
        image: "images/frankliniella_occidentalis.jpg",
        management: "Panneaux englués bleus pour détection, maintien d'une humidité relative élevée sous serre.",
        beneficials: "Amblyseius swirskii (Acarien prédateur) et Orius laevigatus."
    },
    {
        id: "aphis_gossypii", name: "Aphis gossypii", author: "Glover, 1877",
        order: "Hémiptères", family: "Aphididae", cultures: "Cucurbitacées, Coton, Agrumes", category: "maraicheres",
        description: "Puceron du coton et du melon. Colonise le revers des feuilles, sécrète du miellat.",
        image: "images/aphis_gossypii.jpg",
        management: "Utilisation de paillage plastique réfléchissant, élimination des mauvaises herbes hôtes.",
        beneficials: "Aphidius colemani (Guêpe parasitoïde) et Coccinella septempunctata."
    },
    {
        id: "dociostaurus_maroccanus", name: "Dociostaurus maroccanus", author: "(Thunberg, 1815)",
        order: "Orthoptères", family: "Acrididae", cultures: "Blé, Orge, Prairies", category: "grandes-cultures",
        description: "Criquet marocain. Insecte ravageur grégarisable capable de former des essaims immenses.",
        image: "images/dociostaurus_maroccanus.jpg",
        management: "Surveillance hivernale des aires de ponte, labour profond des foyers d'infestation.",
        beneficials: "Stomorhina lunata (Mouche prédatrice des œufs)."
    }
];
