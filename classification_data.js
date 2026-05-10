// Classification des espèces par culture
const speciesData = {
    // Cultures Maraîchères
    cruciferes: [
        {
            name: "Ceutorhynchus assimilis",
            author: "(Paykull 1792)",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Chou et autres crucifères",
            icon: "🪲",
            description: "Charançon des crucifères causant des dégâts importants sur les cultures de choux.",
            image: "images/ceutorhynchus_assimilis.jpg"
        },
        {
            name: "Ceutorhynchus picitarsis",
            author: "Gyllenhal 1837",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Crucifères",
            icon: "🪲",
            description: "Charançon spécialisé dans l'attaque des crucifères.",
            image: "images/ceutorhynchus_picitarsis.jpg"
        },
        {
            name: "Ceutorhynchus quadridens",
            author: "(Panzer, 1795)",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Crucifères",
            icon: "🪲",
            description: "Charançon polyphage des crucifères.",
            image: "images/ceutorhynchus_quadridens.jpg"
        },
        {
            name: "Ceutorhynchus napi",
            author: "Gyllenhal 1837",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Colza",
            icon: "🪲",
            description: "Charançon spécialisé dans l'attaque du colza.",
            image: "images/ceutorhynchus_napi.jpg"
        },
        {
            name: "Baris quadraticollis",
            author: "Boheman, 1836",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Colza",
            icon: "🪲",
            description: "Charançon du colza causant des dégâts sur les tiges.",
            image: "images/baris_quadraticollis.jpg"
        },
        {
            name: "Baris coerulescens",
            author: "(Scopoli 1763)",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Colza",
            icon: "🪲",
            description: "Charançon bleu du colza.",
            image: "images/baris_coerulescens.jpg"
        },
        {
            name: "Baris cuprirostris",
            author: "(Fabricius, 1787)",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Colza",
            icon: "🪲",
            description: "Charançon cuivré du colza.",
            image: "images/baris_cuprirostris.jpg"
        },
        {
            name: "Psylliodes chrysocephala",
            author: "(Linnaeus 1758)",
            order: "Coléoptères",
            family: "Chrysomelidae",
            cultures: "Crucifères surtout Colza",
            icon: "🪲",
            description: "Altise des crucifères particulièrement nuisible au colza.",
            image: "images/psylliodes_chrysocephala.jpg"
        },
        {
            name: "Phyllotreta nigripes",
            author: "(Fabricius, 1775)",
            order: "Coléoptères",
            family: "Chrysomelidae",
            cultures: "Crucifères",
            icon: "🪲",
            description: "Altise noire des crucifères.",
            image: "images/phyllotreta_nigripes.jpg"
        },
        {
            name: "Phyllotreta nemorum",
            author: "(Linnaeus 1758)",
            order: "Coléoptères",
            family: "Chrysomelidae",
            cultures: "Crucifères",
            icon: "🪲",
            description: "Altise des bois attaquant les crucifères.",
            image: "images/phyllotreta_nemorum.jpg"
        },
        {
            name: "Brassicogethes aeneus",
            author: "(Fabricius, 1775)",
            order: "Coléoptères",
            family: "Nitidulidae",
            cultures: "Crucifères",
            icon: "🪲",
            description: "Méligèthe du colza, ravageur important des crucifères.",
            image: "images/brassicogethes_aeneus.jpg"
        },
        {
            name: "Brassicogethes viridescens",
            author: "(Fabricius, 1787)",
            order: "Coléoptères",
            family: "Nitidulidae",
            cultures: "Crucifères",
            icon: "🪲",
            description: "Méligèthe vert des crucifères.",
            image: "images/brassicogethes_viridescens.jpg"
        },
        {
            name: "Contarinia nasturtii",
            author: "(Kieffer, 1888)",
            order: "Diptères",
            family: "Cecidomyiidae",
            cultures: "Chou-fleur, Colza",
            icon: "🪰",
            description: "Cécidomyie du chou-fleur et du colza.",
            image: "images/contarinia_nasturtii.jpg"
        },
        {
            name: "Dasineura brassicae",
            author: "(Winnertz, 1853)",
            order: "Diptères",
            family: "Cecidomyiidae",
            cultures: "Colza",
            icon: "🪰",
            description: "Cécidomyie du colza.",
            image: "images/dasineura_brassicae.jpg"
        }
    ],

    solanacees: [
        {
            name: "Phthorimaea operculella",
            author: "(Zeller, 1873)",
            order: "Lépidoptères",
            family: "Gelechiidae",
            cultures: "Solanacées (Pomme de terre)",
            icon: "🦋",
            description: "Teigne de la pomme de terre, ravageur majeur des tubercules.",
            image: "images/phthorimaea_operculella.jpg"
        },
        {
            name: "Tuta absoluta",
            author: "(Meyrick, 1917)",
            order: "Lépidoptères",
            family: "Gelechiidae",
            cultures: "Cultures maraîchères (Tomate)",
            icon: "🦋",
            description: "Mineuse de la tomate, ravageur invasif très destructeur.",
            image: "images/tuta_absoluta.jpg"
        },
        {
            name: "Thrips tabaci",
            author: "Lindemann, 1888",
            order: "Thysanoptères",
            family: "Thripidae",
            cultures: "Solanacées, Liliacées",
            icon: "🦗",
            description: "Thrips de l'oignon, polyphage sur solanacées.",
            image: "images/thrips_tabaci.jpg"
        },
        {
            name: "Empoasca fabae",
            author: "(Harris, 1841)",
            order: "Hémiptères",
            family: "Cicadellidae",
            cultures: "Haricot, pomme de terre, luzerne",
            icon: "🦗",
            description: "Cicadelle de la pomme de terre.",
            image: "images/empoasca_fabae.jpg"
        }
    ],

    cucurbitacees: [
        {
            name: "Epilachna chrysomelina",
            author: "Fabricius 1775",
            order: "Coléoptères",
            family: "Coccinellidae",
            cultures: "Cucurbitacées",
            icon: "🪲",
            description: "Coccinelle phytophage des cucurbitacées.",
            image: "images/epilachna_chrysomelina.jpg"
        },
        {
            name: "Henosepilachna argus",
            author: "Geoffroy, 1762",
            order: "Coléoptères",
            family: "Coccinellidae",
            cultures: "Cucurbitacées",
            icon: "🪲",
            description: "Coccinelle des courges et melons.",
            image: "images/henosepilachna_argus.jpg"
        }
    ],

    legumineuses: [
        {
            name: "Hypera postica",
            author: "(Gyllenhal, 1813)",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Luzerne et autres légumineuses",
            icon: "🪲",
            description: "Charançon de la luzerne.",
            image: "images/hypera_postica.jpg"
        },
        {
            name: "Pachytychius strumarius",
            author: "Gyllenhal, 1836",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Pois cultivé",
            icon: "🪲",
            description: "Charançon du pois.",
            image: "images/pachytychius_strumarius.jpg"
        },
        {
            name: "Sitona lineatus",
            author: "(Linnaeus 1758)",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Légumineuses (surtout le pois)",
            icon: "🪲",
            description: "Sitone du pois, ravageur important des légumineuses.",
            image: "images/sitona_lineatus.jpg"
        },
        {
            name: "Sitona crinitus",
            author: "(Herbst, 1795)",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Légumineuses (surtout petit pois)",
            icon: "🪲",
            description: "Sitone du petit pois.",
            image: "images/sitona_crinitus.jpg"
        },
        {
            name: "Sitona limosus",
            author: "Rossi, 1792",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Légumineuses surtout fève et pois cultivé",
            icon: "🪲",
            description: "Sitone de la fève et du pois.",
            image: "images/sitona_limosus.jpg"
        },
        {
            name: "Lixomorphus algirus",
            author: "(Linnaeus, 1758)",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Fève, composées cultivées",
            icon: "🪲",
            description: "Charançon de la fève.",
            image: "images/lixomorphus_algirus.jpg"
        },
        {
            name: "Colaspidema atrum",
            author: "Olivier, 1790",
            order: "Coléoptères",
            family: "Chrysomelidae",
            cultures: "Luzerne",
            icon: "🪲",
            description: "Chrysomèle de la luzerne.",
            image: "images/colaspidema_atrum.jpg"
        },
        {
            name: "Cydia nigricana",
            author: "(Fabricius, 1794)",
            order: "Lépidoptères",
            family: "Tortricidae",
            cultures: "Légumineuses",
            icon: "🦋",
            description: "Tordeuse du pois.",
            image: "images/cydia_nigricana.jpg"
        },
        {
            name: "Liriomyza cicerina",
            author: "(Rondani, 1875)",
            order: "Diptères",
            family: "Agromyzidae",
            cultures: "Pois-chiche",
            icon: "🪰",
            description: "Mineuse du pois-chiche.",
            image: "images/liriomyza_cicerina.jpg"
        },
        {
            name: "Aphis fabae",
            author: "(Scopoli, 1763)",
            order: "Hémiptères",
            family: "Aphididae",
            cultures: "Polyphage (préférence pour les fabacées)",
            icon: "🦗",
            description: "Puceron noir de la fève.",
            image: "images/aphis_fabae.jpg"
        }
    ],

    betterave: [
        {
            name: "Conorhynchus mendicus",
            author: "(Gyllenhal 1834)",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Betterave à sucre",
            icon: "🪲",
            description: "Charançon de la betterave.",
            image: "images/conorhynchus_mendicus.jpg"
        },
        {
            name: "Lixus juncii",
            author: "Boheman, 1838",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Betterave à sucre",
            icon: "🪲",
            description: "Lixe de la betterave.",
            image: "images/lixus_juncii.jpg"
        },
        {
            name: "Cassida vittata",
            author: "Villers, 1789",
            order: "Coléoptères",
            family: "Chrysomelidae",
            cultures: "Betterave à sucre",
            icon: "🪲",
            description: "Casside de la betterave.",
            image: "images/cassida_vittata.jpg"
        },
        {
            name: "Cassida nebulosa",
            author: "Linnaeus, 1758",
            order: "Coléoptères",
            family: "Chrysomelidae",
            cultures: "Betterave à sucre",
            icon: "🪲",
            description: "Casside nébuleuse de la betterave.",
            image: "images/cassida_nebulosa.jpg"
        },
        {
            name: "Scrobipalpa ocellatella",
            author: "Boyd, 1858",
            order: "Lépidoptères",
            family: "Gelechiidae",
            cultures: "Betterave à sucre",
            icon: "🦋",
            description: "Teigne de la betterave.",
            image: "images/scrobipalpa_ocellatella.jpg"
        },
        {
            name: "Pegomya betae",
            author: "(Curtis, 1847)",
            order: "Diptères",
            family: "Anthomyiidae",
            cultures: "Betterave à sucre",
            icon: "🪰",
            description: "Mouche de la betterave.",
            image: "images/pegomya_betae.jpg"
        },
        {
            name: "Nezara viridula",
            author: "(Linnaeus, 1758)",
            order: "Hémiptères",
            family: "Pentatomidae",
            cultures: "Betterave, cotonnier, maraîchage",
            icon: "🦗",
            description: "Punaise verte puante.",
            image: "images/nezara_viridula.jpg"
        }
    ],

    // Arboriculture Fruitière
    rosacees_noyaux: [
        {
            name: "Capnodis tenebrionis",
            author: "(Linnaeus, 1760)",
            order: "Coléoptères",
            family: "Buprestidae",
            cultures: "Rosacées fruitières à noyaux",
            icon: "🪲",
            description: "Bupreste des arbres fruitiers à noyaux.",
            image: "images/capnodis_tenebrionis.jpg"
        },
        {
            name: "Ruguloscolytus amygdali",
            author: "De Geer",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Arbres fruitiers à noyaux",
            icon: "🪲",
            description: "Scolyte de l'amandier.",
            image: "images/ruguloscolytus_amygdali.jpg"
        },
        {
            name: "Ruguloscolytus mediterraneus",
            author: "(Egg.)",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Arbres fruitiers",
            icon: "🪲",
            description: "Scolyte méditerranéen des arbres fruitiers.",
            image: "images/ruguloscolytus_mediterraneus.jpg"
        },
        {
            name: "Anarsia lineatella",
            author: "Zeller, 1839",
            order: "Lépidoptères",
            family: "Gelechiidae",
            cultures: "Arbres fruitiers (Pêcher)",
            icon: "🦋",
            description: "Petite mineuse du pêcher.",
            image: "images/anarsia_lineatella.jpg"
        },
        {
            name: "Grapholita molesta",
            author: "Busck, 1916",
            order: "Lépidoptères",
            family: "Tortricidae",
            cultures: "Amygdalées, pommacées",
            icon: "🦋",
            description: "Tordeuse orientale du pêcher.",
            image: "images/grapholita_molesta.jpg"
        },
        {
            name: "Saturnia pyri",
            author: "(Denis & Schiffermüller, 1775)",
            order: "Lépidoptères",
            family: "Saturniidae",
            cultures: "Rosacées fruitières",
            icon: "🦋",
            description: "Grand paon de nuit, ravageur des rosacées.",
            image: "images/saturnia_pyri.jpg"
        },
        {
            name: "Aglaope labasi",
            author: "(Oberthür, 1922)",
            order: "Lépidoptères",
            family: "Zygaenidae",
            cultures: "Rosacées fruitières (Amandier, pommier, poirier)",
            icon: "🦋",
            description: "Zygène des rosacées fruitières.",
            image: "images/aglaope_labasi.jpg"
        },
        {
            name: "Myzus persicae",
            author: "(Sulzer, 1776)",
            order: "Hémiptères",
            family: "Aphididae",
            cultures: "Rosacées à noyaux (Pêcher), maraîchage",
            icon: "🦗",
            description: "Puceron vert du pêcher.",
            image: "images/myzus_persicae.jpg"
        },
        {
            name: "Monosteira unicostata",
            author: "(Mulsant & Rey 1852)",
            order: "Hémiptères",
            family: "Tingidae",
            cultures: "Amandier",
            icon: "🦗",
            description: "Tigre de l'amandier.",
            image: "images/monosteira_unicostata.jpg"
        }
    ],

    rosacees_pepins: [
        {
            name: "Cydia pomonella",
            author: "(Linnaeus 1758)",
            order: "Lépidoptères",
            family: "Tortricidae",
            cultures: "Pommes, poires, prunes, etc.",
            icon: "🦋",
            description: "Carpocapse des pommes, ravageur majeur des fruits à pépins.",
            image: "images/cydia_pomonella.jpg"
        },
        {
            name: "Yponomeuta malinella",
            author: "(Zeller, 1838)",
            order: "Lépidoptères",
            family: "Yponomeutidae",
            cultures: "Pommier",
            icon: "🦋",
            description: "Hyponomeute du pommier.",
            image: "images/yponomeuta_malinella.jpg"
        },
        {
            name: "Hoplocampa testudinea",
            author: "(Klug, 1816)",
            order: "Hyménoptères",
            family: "Tenthredinidae",
            cultures: "Pommier",
            icon: "🐝",
            description: "Hoplocampe du pommier.",
            image: "images/hoplocampa_testudinea.jpg"
        },
        {
            name: "Aphis pomi",
            author: "(De Geer, 1773)",
            order: "Hémiptères",
            family: "Aphididae",
            cultures: "Rosacées à pépins (Pommier, poirier, cognassier)",
            icon: "🦗",
            description: "Puceron vert du pommier.",
            image: "images/aphis_pomi.jpg"
        },
        {
            name: "Stephanitis pyri",
            author: "(Fabricius, 1775)",
            order: "Hémiptères",
            family: "Tingidae",
            cultures: "Poiriers, cognassiers, pommiers, châtaignier, et de l'aubépine",
            icon: "🦗",
            description: "Tigre du poirier.",
            image: "images/stephanitis_pyri.jpg"
        }
    ],

    agrumes: [
        {
            name: "Prays citri",
            author: "Millière, 1873",
            order: "Lépidoptères",
            family: "Praydidae",
            cultures: "Citrus",
            icon: "🦋",
            description: "Teigne du citronnier.",
            image: "images/prays_citri.jpg"
        },
        {
            name: "Phyllocnistis citrella",
            author: "(Stainton, 1856)",
            order: "Lépidoptères",
            family: "Gracillariidae",
            cultures: "Citrus",
            icon: "🦋",
            description: "Mineuse des agrumes.",
            image: "images/phyllocnistis_citrella.jpg"
        },
        {
            name: "Aonidiella aurantii",
            author: "(Maskell, 1879)",
            order: "Hémiptères",
            family: "Diaspididae",
            cultures: "Agrumes",
            icon: "🦗",
            description: "Cochenille rouge des agrumes.",
            image: "images/aonidiella_aurantii.jpg"
        },
        {
            name: "Aleurothrixus floccosus",
            author: "(Maskell, 1896)",
            order: "Hémiptères",
            family: "Aleyrodidae",
            cultures: "Agrumes",
            icon: "🦗",
            description: "Aleurode floconneux des agrumes.",
            image: "images/aleurothrixus_floccosus.jpg"
        },
        {
            name: "Pezothrips kellyanus",
            author: "(Bagnall, 1916)",
            order: "Thysanoptères",
            family: "Thripidae",
            cultures: "Agrumes",
            icon: "🦗",
            description: "Thrips des agrumes.",
            image: "images/pezothrips_kellyanus.jpg"
        },
        {
            name: "Scirtothrips sp.",
            author: "",
            order: "Thysanoptères",
            family: "Thripidae",
            cultures: "Citrus et autres",
            icon: "🦗",
            description: "Thrips des citrus.",
            image: "images/scirtothrips_sp.jpg"
        }
    ],

    vigne: [
        {
            name: "Lobesia botrana",
            author: "(Denis & Schiffermüller, 1775)",
            order: "Lépidoptères",
            family: "Tortricidae",
            cultures: "Vigne",
            icon: "🦋",
            description: "Eudémis de la vigne, ravageur majeur de la viticulture.",
            image: "images/lobesia_botrana.jpg"
        },
        {
            name: "Hyles lineata",
            author: "(Fabricius, 1775)",
            order: "Lépidoptères",
            family: "Sphingidae",
            cultures: "Vigne",
            icon: "🦋",
            description: "Sphinx de la vigne.",
            image: "images/hyles_lineata.jpg"
        },
        {
            name: "Empoasca vitis",
            author: "(Göthe, 1875)",
            order: "Hémiptères",
            family: "Cicadellidae",
            cultures: "Conifères, Vigne",
            icon: "🦗",
            description: "Cicadelle de la vigne.",
            image: "images/empoasca_vitis.jpg"
        }
    ],

    fruits_rouges: [
        {
            name: "Drosophila suzukii",
            author: "Matsumura, 1931",
            order: "Diptères",
            family: "Drosophilidae",
            cultures: "Fruits rouges",
            icon: "🪰",
            description: "Drosophile à ailes tachetées, ravageur invasif des fruits rouges.",
            image: "images/drosophila_suzukii.jpg"
        },
        {
            name: "Zaprionus indianus",
            author: "Gupta, 1970",
            order: "Diptères",
            family: "Drosophilidae",
            cultures: "Fruits rouges",
            icon: "🪰",
            description: "Drosophile indienne des fruits rouges.",
            image: "images/zaprionus_indianus.jpg"
        },
        {
            name: "Dasineura oxycoccana",
            author: "Johnson, 1899",
            order: "Diptères",
            family: "Cecidomyiidae",
            cultures: "Myrtillier",
            icon: "🪰",
            description: "Cécidomyie du myrtillier.",
            image: "images/dasineura_oxycoccana.jpg"
        }
    ],

    // Cultures Ornementales
    olivier: [
        {
            name: "Otiorhynchus cribricollis",
            author: "Gyllenhal, 1834",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Olivier, Rosacées fruitières, etc.",
            icon: "🪲",
            description: "Otiorhynque de l'olivier.",
            image: "images/otiorhynchus_cribricollis.jpg"
        },
        {
            name: "Phlocotribus scarabaeoides",
            author: "(Bernard 1788)",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Olivier, Lilas, Troène",
            icon: "🪲",
            description: "Phloeotribus de l'olivier.",
            image: "images/phlocotribus_scarabaeoides.jpg"
        },
        {
            name: "Hylesinus oleiperda",
            author: "(Fabricius, 1792)",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Olivier, Lilas",
            icon: "🪲",
            description: "Hylésine destructeur de l'olivier.",
            image: "images/hylesinus_oleiperda.jpg"
        },
        {
            name: "Mylabris oleae",
            author: "Laporte de Castelnau, 1840",
            order: "Coléoptères",
            family: "Meloidae",
            cultures: "Olivier",
            icon: "🪲",
            description: "Mylabre de l'olivier.",
            image: "images/mylabris_oleae.jpg"
        },
        {
            name: "Zeuzera pyrina",
            author: "(Linnaeus, 1761)",
            order: "Lépidoptères",
            family: "Cossidae",
            cultures: "Arbres fruitiers, Olivier",
            icon: "🦋",
            description: "Zeuzère du poirier, foreur des troncs.",
            image: "images/zeuzera_pyrina.jpg"
        },
        {
            name: "Prays oleae",
            author: "(Bernard, 1788)",
            order: "Lépidoptères",
            family: "Praydidae",
            cultures: "Olivier",
            icon: "🦋",
            description: "Teigne de l'olivier, ravageur spécialisé.",
            image: "images/prays_oleae.jpg"
        },
        {
            name: "Bactrocera oleae",
            author: "(Rossi, 1790)",
            order: "Diptères",
            family: "Tephritidae",
            cultures: "Olivier",
            icon: "🪰",
            description: "Mouche de l'olive, ravageur majeur de l'oléiculture.",
            image: "images/bactrocera_oleae.jpg"
        },
        {
            name: "Resseliella oleisuga",
            author: "(Targioni-Tozzetti 1887)",
            order: "Diptères",
            family: "Cecidomyiidae",
            cultures: "Olivier (écorce de l'olivier)",
            icon: "🪰",
            description: "Cécidomyie de l'écorce de l'olivier.",
            image: "images/resseliella_oleisuga.jpg"
        },
        {
            name: "Euphyllura olivina",
            author: "(Costa, 1839)",
            order: "Hémiptères",
            family: "Liviidae",
            cultures: "Olivier",
            icon: "🦗",
            description: "Psylle de l'olivier.",
            image: "images/euphyllura_olivina.jpg"
        },
        {
            name: "Saissetia oleae",
            author: "(Olivier 1791)",
            order: "Hémiptères",
            family: "Coccidae",
            cultures: "Olivier",
            icon: "🦗",
            description: "Cochenille noire de l'olivier.",
            image: "images/saissetia_oleae.jpg"
        },
        {
            name: "Liothrips oleae",
            author: "(Costa, 1857)",
            order: "Thysanoptères",
            family: "Phlaeothripidae",
            cultures: "Olivier",
            icon: "🦗",
            description: "Thrips de l'olivier.",
            image: "images/liothrips_oleae.jpg"
        }
    ],

    ornementaux: [
        {
            name: "Phlocotribus scarabaeoides",
            author: "(Bernard 1788)",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Olivier, Lilas, Troène",
            icon: "🪲",
            description: "Phloeotribus des arbres ornementaux.",
            image: "images/phlocotribus_scarabaeoides.jpg"
        },
        {
            name: "Hylesinus oleiperda",
            author: "(Fabricius, 1792)",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Olivier, Lilas",
            icon: "🪲",
            description: "Hylésine du lilas.",
            image: "images/hylesinus_oleiperda.jpg"
        }
    ],

    palmiers: [
        {
            name: "Rhynchophorus ferrugineus",
            author: "(Olivier, 1790)",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Palmiers",
            icon: "🪲",
            description: "Charançon rouge des palmiers, ravageur très destructeur.",
            image: "images/rhynchophorus_ferrugineus.jpg"
        }
    ],

    // Grandes Cultures
    cereales: [
        {
            name: "Oulema melanopus",
            author: "(Linnaeus, 1758)",
            order: "Coléoptères",
            family: "Chrysomelidae",
            cultures: "Céréales",
            icon: "🪲",
            description: "Léma des céréales.",
            image: "images/oulema_melanopus.jpg"
        },
        {
            name: "Zabrus tenebrioides",
            author: "(Goeze, 1777)",
            order: "Coléoptères",
            family: "Carabidae",
            cultures: "Céréales",
            icon: "🪲",
            description: "Zabre des céréales.",
            image: "images/zabrus_tenebrioides.jpg"
        },
        {
            name: "Sesamia nonagrioides",
            author: "(Lefebvre, 1827)",
            order: "Lépidoptères",
            family: "Noctuidae",
            cultures: "Céréales (Maïs, Sorgho, etc.)",
            icon: "🦋",
            description: "Sésamie du maïs.",
            image: "images/sesamia_nonagrioides.jpg"
        },
        {
            name: "Mayetiola destructor",
            author: "(Say, 1817)",
            order: "Diptères",
            family: "Cecidomyiidae",
            cultures: "Blé, orge, avoine",
            icon: "🪰",
            description: "Cécidomyie destructrice des céréales.",
            image: "images/mayetiola_destructor.jpg"
        },
        {
            name: "Mayetiola hordei",
            author: "(Kieffer, 1909)",
            order: "Diptères",
            family: "Cecidomyiidae",
            cultures: "Orge",
            icon: "🪰",
            description: "Cécidomyie de l'orge.",
            image: "images/mayetiola_hordei.jpg"
        },
        {
            name: "Mayetiola avenae",
            author: "(Marchal, 1895)",
            order: "Diptères",
            family: "Cecidomyiidae",
            cultures: "Avoine",
            icon: "🪰",
            description: "Cécidomyie de l'avoine.",
            image: "images/mayetiola_avenae.jpg"
        },
        {
            name: "Cephus pygmaeus",
            author: "(Linnaeus, 1767)",
            order: "Hyménoptères",
            family: "Cephidae",
            cultures: "Blé",
            icon: "🐝",
            description: "Cèphe du blé.",
            image: "images/cephus_pygmaeus.jpg"
        },
        {
            name: "Aelia acuminata",
            author: "(Linnaeus, 1758)",
            order: "Hémiptères",
            family: "Pentatomidae",
            cultures: "Céréales",
            icon: "🦗",
            description: "Punaise des céréales.",
            image: "images/aelia_acuminata.jpg"
        },
        {
            name: "Aelia germari",
            author: "(Küster, 1852)",
            order: "Hémiptères",
            family: "Pentatomidae",
            cultures: "Céréales",
            icon: "🦗",
            description: "Punaise de Germar des céréales.",
            image: "images/aelia_germari.jpg"
        },
        {
            name: "Aelia rostrata cognata",
            author: "Fieber, 1868",
            order: "Hémiptères",
            family: "Pentatomidae",
            cultures: "Céréales",
            icon: "🦗",
            description: "Punaise à rostre des céréales.",
            image: "images/aelia_rostrata_cognata.jpg"
        },
        {
            name: "Eurygaster maura",
            author: "(Linnaeus, 1758)",
            order: "Hémiptères",
            family: "Scutelleridae",
            cultures: "Céréales",
            icon: "🦗",
            description: "Eurygastre maure des céréales.",
            image: "images/eurygaster_maura.jpg"
        },
        {
            name: "Eurygaster austriaca",
            author: "(Schrank, 1776)",
            order: "Hémiptères",
            family: "Scutelleridae",
            cultures: "Céréales",
            icon: "🦗",
            description: "Eurygastre autrichien des céréales.",
            image: "images/eurygaster_austriaca.jpg"
        },
        {
            name: "Eurygaster hottentotta",
            author: "(Fabricius, 1775)",
            order: "Hémiptères",
            family: "Scutelleridae",
            cultures: "Céréales",
            icon: "🦗",
            description: "Eurygastre hottentot des céréales.",
            image: "images/eurygaster_hottentotta.jpg"
        }
    ],

    cotonnier: [
        {
            name: "Pectinophora gossypiella",
            author: "Saunders, 1844",
            order: "Lépidoptères",
            family: "Gelechiidae",
            cultures: "Cotonnier",
            icon: "🦋",
            description: "Ver rose du cotonnier.",
            image: "images/pectinophora_gossypiella.jpg"
        },
        {
            name: "Earias insulana",
            author: "(Boisduval, 1833)",
            order: "Lépidoptères",
            family: "Nolidae",
            cultures: "Cotonnier, Hibiscus",
            icon: "🦋",
            description: "Ver rose du cotonnier.",
            image: "images/earias_insulana.jpg"
        },
        {
            name: "Bemisia tabaci",
            author: "(Gennadius, 1889)",
            order: "Hémiptères",
            family: "Aleyrodidae",
            cultures: "Coton, Cultures protégées",
            icon: "🦗",
            description: "Aleurode du tabac.",
            image: "images/bemisia_tabaci.jpg"
        }
    ],

    luzerne: [
        {
            name: "Hypera postica",
            author: "(Gyllenhal, 1813)",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Luzerne et autres légumineuses",
            icon: "🪲",
            description: "Charançon de la luzerne.",
            image: "images/hypera_postica.jpg"
        },
        {
            name: "Colaspidema atrum",
            author: "Olivier, 1790",
            order: "Coléoptères",
            family: "Chrysomelidae",
            cultures: "Luzerne",
            icon: "🪲",
            description: "Chrysomèle de la luzerne.",
            image: "images/colaspidema_atrum.jpg"
        }
    ]
};

// Données pour les espèces polyphages
const polyphageSpecies = [
    {
        name: "Dorysthenes forficatus",
        author: "Villiers, 1946",
        order: "Coléoptères",
        family: "Cerambycidae",
        cultures: "Polyphage",
        icon: "🪲",
        description: "Longicorne polyphage.",
        image: "images/dorysthenes_forficatus.jpg"
    },
    {
        name: "Apate monachus",
        author: "Fabricius, 1775",
        order: "Coléoptères",
        family: "Bostrichidae",
        cultures: "Polyphage surtout arbres fruitiers",
        icon: "🪲",
        description: "Apate moine, foreur polyphage.",
        image: "images/apate_monachus.jpg"
    },
    {
        name: "Agriotes lineatus",
        author: "(Linnaeus, 1767)",
        order: "Coléoptères",
        family: "Elateridae",
        cultures: "Polyphage radicole",
        icon: "🪲",
        description: "Taupin rayé, ravageur racinaire polyphage.",
        image: "images/agriotes_lineatus.jpg"
    },
    {
        name: "Agriotes obscurus",
        author: "(Linnaeus, 1758)",
        order: "Coléoptères",
        family: "Elateridae",
        cultures: "Polyphage radicole",
        icon: "🪲",
        description: "Taupin obscur, ravageur racinaire polyphage.",
        image: "images/agriotes_obscurus.jpg"
    },
    {
        name: "Agriotes sputator",
        author: "(Linnaeus, 1758)",
        order: "Coléoptères",
        family: "Elateridae",
        cultures: "Polyphage radicole",
        icon: "🪲",
        description: "Taupin cracheur, ravageur racinaire polyphage.",
        image: "images/agriotes_sputator.jpg"
    },
    {
        name: "Phyllognathus excavatus",
        author: "(Forster, 1771)",
        order: "Coléoptères",
        family: "Scarabaeidae",
        cultures: "Polyphage radicole",
        icon: "🪲",
        description: "Scarabée polyphage racinaire.",
        image: "images/phyllognathus_excavatus.jpg"
    },
    {
        name: "Tropinota hirta",
        author: "(Poda, 1761)",
        order: "Coléoptères",
        family: "Scarabaeidae",
        cultures: "Polyphage floricole",
        icon: "🪲",
        description: "Cétoine hérissée, polyphage floricole.",
        image: "images/tropinota_hirta.jpg"
    },
    {
        name: "Tropinota squalida",
        author: "(Scopoli, 1763)",
        order: "Coléoptères",
        family: "Scarabaeidae",
        cultures: "Polyphage floricole",
        icon: "🪲",
        description: "Cétoine squalide, polyphage floricole.",
        image: "images/tropinota_squalida.jpg"
    },
    {
        name: "Cossus cossus",
        author: "(Linnaeus, 1758)",
        order: "Lépidoptères",
        family: "Cossidae",
        cultures: "Arbres fruitiers et forestiers",
        icon: "🦋",
        description: "Cossus gâte-bois, foreur des troncs.",
        image: "images/cossus_cossus.jpg"
    },
    {
        name: "Thaumetopoea pityocampa",
        author: "(Denis & Schiffermüller, 1775)",
        order: "Lépidoptères",
        family: "Notodontidae",
        cultures: "Pins, Cèdres",
        icon: "🦋",
        description: "Processionnaire du pin.",
        image: "images/thaumetopoea_pityocampa.jpg"
    },
    {
        name: "Lymantria dispar",
        author: "(Linnaeus, 1758)",
        order: "Lépidoptères",
        family: "Erebidae",
        cultures: "Chêne-liège",
        icon: "🦋",
        description: "Bombyx disparate.",
        image: "images/lymantria_dispar.jpg"
    },
    {
        name: "Ocnogyna baetica",
        author: "(Rambur, [1837])",
        order: "Lépidoptères",
        family: "Erebidae",
        cultures: "Polyphage",
        icon: "🦋",
        description: "Ocnogyne bétique, polyphage.",
        image: "images/ocnogyna_baetica.jpg"
    },
    {
        name: "Agrotis segetum",
        author: "(Denis & Schiffermüller, 1775)",
        order: "Lépidoptères",
        family: "Noctuidae",
        cultures: "Polyphage (Maraîchage)",
        icon: "🦋",
        description: "Noctuelle des moissons.",
        image: "images/agrotis_segetum.jpg"
    },
    {
        name: "Agrotis ipsilon",
        author: "(Hufnagel, 1766)",
        order: "Lépidoptères",
        family: "Noctuidae",
        cultures: "Polyphage (Maraîchage)",
        icon: "🦋",
        description: "Noctuelle baignée.",
        image: "images/agrotis_ipsilon.jpg"
    },
    {
        name: "Agrotis obesa",
        author: "Boisduval, 1829",
        order: "Lépidoptères",
        family: "Noctuidae",
        cultures: "Polyphage (Maraîchage)",
        icon: "🦋",
        description: "Noctuelle obèse.",
        image: "images/agrotis_obesa.jpg"
    },
    {
        name: "Agrotis puta",
        author: "(Hübner, 1803)",
        order: "Lépidoptères",
        family: "Noctuidae",
        cultures: "Polyphage",
        icon: "🦋",
        description: "Noctuelle putative.",
        image: "images/agrotis_puta.jpg"
    },
    {
        name: "Noctua pronuba",
        author: "(Linnaeus, 1758)",
        order: "Lépidoptères",
        family: "Noctuidae",
        cultures: "Polyphage",
        icon: "🦋",
        description: "Noctuelle fiancée.",
        image: "images/noctua_pronuba.jpg"
    },
    {
        name: "Gortyna xanthenes",
        author: "",
        order: "Lépidoptères",
        family: "Noctuidae",
        cultures: "Artichaut",
        icon: "🦋",
        description: "Noctuelle de l'artichaut.",
        image: "images/gortyna_xanthenes.jpg"
    },
    {
        name: "Peridroma saucia",
        author: "(Hübner, 1808)",
        order: "Lépidoptères",
        family: "Noctuidae",
        cultures: "Polyphage",
        icon: "🦋",
        description: "Noctuelle terreuse.",
        image: "images/peridroma_saucia.jpg"
    },
    {
        name: "Spodoptera exigua",
        author: "(Hübner, 1808)",
        order: "Lépidoptères",
        family: "Noctuidae",
        cultures: "Polyphage (Maraîchage)",
        icon: "🦋",
        description: "Légionnaire de la betterave.",
        image: "images/spodoptera_exigua.jpg"
    },
    {
        name: "Spodoptera littoralis",
        author: "(Boisduval, 1833)",
        order: "Lépidoptères",
        family: "Noctuidae",
        cultures: "Polyphage",
        icon: "🦋",
        description: "Ver du cotonnier.",
        image: "images/spodoptera_littoralis.jpg"
    },
    {
        name: "Helicoverpa armigera",
        author: "(Hübner, 1808)",
        order: "Lépidoptères",
        family: "Noctuidae",
        cultures: "Polyphage",
        icon: "🦋",
        description: "Noctuelle de la tomate.",
        image: "images/helicoverpa_armigera.jpg"
    },
    {
        name: "Autographa gamma",
        author: "(Linnaeus, 1758)",
        order: "Lépidoptères",
        family: "Noctuidae",
        cultures: "Polyphage",
        icon: "🦋",
        description: "Noctuelle gamma.",
        image: "images/autographa_gamma.jpg"
    },
    {
        name: "Chrysodeixis chalcites",
        author: "(Esper, 1789)",
        order: "Lépidoptères",
        family: "Noctuidae",
        cultures: "Polyphage",
        icon: "🦋",
        description: "Noctuelle du cuivre.",
        image: "images/chrysodeixis_chalcites.jpg"
    },
    {
        name: "Vanessa cardui",
        author: "(Linnaeus, 1758)",
        order: "Lépidoptères",
        family: "Nymphalidae",
        cultures: "Artichaut",
        icon: "🦋",
        description: "Belle-dame, papillon migrateur.",
        image: "images/vanessa_cardui.jpg"
    },
    {
        name: "Ectomyelois ceratoniae",
        author: "(Zeller, 1839)",
        order: "Lépidoptères",
        family: "Pyralidae",
        cultures: "Caroubes, Dattes, Grenadier, fruits mûrs divers",
        icon: "🦋",
        description: "Pyrale des dattes.",
        image: "images/ectomyelois_ceratoniae.jpg"
    },
    {
        name: "Ceratitis capitata",
        author: "(Wiedemann, 1824)",
        order: "Diptères",
        family: "Tephritidae",
        cultures: "Fruits frais",
        icon: "🪰",
        description: "Mouche méditerranéenne des fruits.",
        image: "images/ceratitis_capitata.jpg"
    },
    {
        name: "Liriomyza trifolii",
        author: "Burgess, 1880",
        order: "Diptères",
        family: "Agromyzidae",
        cultures: "Polyphage",
        icon: "🪰",
        description: "Mineuse américaine polyphage.",
        image: "images/liriomyza_trifolii.jpg"
    },
    {
        name: "Liriomyza bryoniae",
        author: "Kaltenbach",
        order: "Diptères",
        family: "Agromyzidae",
        cultures: "Céleri",
        icon: "🪰",
        description: "Mineuse du céleri.",
        image: "images/liriomyza_bryoniae.jpg"
    },
    {
        name: "Liriomyza huidobrensis",
        author: "(Blanchard, 1926)",
        order: "Diptères",
        family: "Agromyzidae",
        cultures: "Polyphage",
        icon: "🪰",
        description: "Mineuse sud-américaine polyphage.",
        image: "images/liriomyza_huidobrensis.jpg"
    },
    {
        name: "Tapinoma simrothi",
        author: "Krausse, 1911",
        order: "Hyménoptères",
        family: "Formicidae",
        cultures: "Polyphage",
        icon: "🐝",
        description: "Fourmi polyphage.",
        image: "images/tapinoma_simrothi.jpg"
    },
    {
        name: "Metcalfa pruinosa",
        author: "(Say, 1830)",
        order: "Hémiptères",
        family: "Flatidae",
        cultures: "Polyphage (Avocatier)",
        icon: "🦗",
        description: "Métcalfe pruineuse, polyphage.",
        image: "images/metcalfa_pruinosa.jpg"
    },
    {
        name: "Aphis gossypii",
        author: "(Glover, 1877)",
        order: "Hémiptères",
        family: "Aphididae",
        cultures: "Polyphage",
        icon: "🦗",
        description: "Puceron du cotonnier, polyphage.",
        image: "images/aphis_gossypii.jpg"
    },
    {
        name: "Diaspidiotus perniciosus",
        author: "(Comstock, 1881)",
        order: "Hémiptères",
        family: "Diaspididae",
        cultures: "Polyphage",
        icon: "🦗",
        description: "Cochenille de San José, polyphage.",
        image: "images/diaspidiotus_perniciosus.jpg"
    },
    {
        name: "Frankliniella occidentalis",
        author: "(Pergande, 1895)",
        order: "Thysanoptères",
        family: "Thripidae",
        cultures: "Arbres fruitiers, maraîchage, plantes ornementales",
        icon: "🦗",
        description: "Thrips occidental, polyphage.",
        image: "images/frankliniella_occidentalis.jpg"
    },
    {
        name: "Brachycerus algirus",
        author: "Olivier, 1790",
        order: "Coléoptères",
        family: "Curculionidae",
        cultures: "Alliacées surtout Ail et oignon",
        icon: "🪲",
        description: "Brachycère de l'ail et de l'oignon.",
        image: "images/brachycerus_algirus.jpg"
    }
];

// Export des données
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { speciesData, polyphageSpecies };
}

