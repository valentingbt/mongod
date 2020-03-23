// Créer une collection sport
db.createCollection("sports");

//Ajouter des sports avec 3 fields
db.sports.insert([{ name: "tennis", nb_player: 2, object_used: "raquet" }, { name: "football", nb_player: 11, object_used: "ball" }]);

// Ajouter deux nouveaux field "title" et "require_teams" avec apsert
db.sports.update({name:"tennis"}, {title:"tennis",require_teams:false}, {upsert:true})
db.sports.update({name:"football"}, {title:"football",require_teams:true}, {upsert:true})

// Ajouter un field "minimum_player" aux sports qui ont besoin d'une équipe
db.sports.update({require_teams:true}, {minimum_player:1},{upsert:true})

// Augmenter de 10 tous les joeurs
db.sports.update({}, {minimum_player:$inc:10});

// Insérer un field "teams" à tous les documents 
db.sports.update({}, {teams:[]}, {upsert:true})

// Insérer des joueurs
db.sports.update({require_teams:true}, {teams:["Paul", "Valentin","Camille"]});

// Mettre les joeurs titulaires ou pas
db.sports.update({require_teams: true}, {$push: { $each: titulaire: true}})