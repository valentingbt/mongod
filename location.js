
// Créer une collection "places"
db.createCollection("places");

// Créer trois points dans Paris
db.places.insertOne({
    name: "Jardin du Luxembourg",
    "type": "Point",
    "coordinates": [
        2.336139678955078,
        48.84686933903632
    ]
});

db.places.insertOne({
    name: "Cimetière du Montparnasse",
    "type": "Point",
    "coordinates": [
        2.327427864074707,
        48.838848121684194
    ]
});

db.places.insertOne({
    name: "Jardin des plantes",
    "type": "Point",
    "coordinates": [
        2.359786033630371,
        48.84393214092012
    ]
});

// Créer un index pour la base
db.places.createIndex({ location: "2dsphere" })

// Prendre un point aléatoire à l’intérieur de Paris et
// trouver le points le plus proche de celui-ci dans 
// les points de la base.

db.locations.find(
    {
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [
                        2.359786033630371,
                        48.84393214092012
                    ]
                },
            }
        }
    })

// Faire une zone où deux de ces points
// sont inclus et un exclu.

db.places.find({
    geometry: {
        $geoWithin: {
            $geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [
                            2.3163986206054688,
                            48.83647540276501
                        ],
                        [
                            2.350902557373047,
                            48.83647540276501
                        ],
                        [
                            2.350902557373047,
                            48.853646831055556
                        ],
                        [
                            2.3163986206054688,
                            48.853646831055556
                        ],
                        [
                            2.3163986206054688,
                            48.83647540276501
                        ]
                    ],
                ],
            },
        },
    },
})

// A partir d'un point, trouver tous les points
// dans un rayon qui sont dans ce rayon.

db.locations.find(
    {
        location: {
            $nearSphere: {
                $geometry: {
                    type: "Point",
                    coordinates: [
                        2.3452377319335938,
                        48.83941303819501
                    ]
                },
                $minDistance: 0,
                $maxDistance: 2000
            }
        }
    })
