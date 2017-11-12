/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Map(nom) {
	
	// Création de l'objet XmlHttpRequest
	var xhr = new XMLHttpRequest();
// Liste des personnages présents sur le terrain.
        this.personnages = new Array();
        this.sorts = new Array();
	// Chargement du fichier
xhr.open("GET", './maps/' + nom + '.json', false);
xhr.send(null);
if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
	throw new Error("Impossible de charger la carte nommée \"" + nom + "\" (code HTTP : " + xhr.status + ").");
var mapJsonData = xhr.responseText;
// Analyse des données
var mapData = JSON.parse(mapJsonData);
this.tileset = new Tileset(mapData.tileset);
this.terrain = mapData.terrain;



}
// Pour ajouter un sort
Map.prototype.addSort = function(sort) {
	this.sorts.push(sort);
}

// Pour ajouter un personnage
Map.prototype.addPersonnage = function(perso) {
	this.personnages.push(perso);
}


// Pour récupérer la taille (en tiles) de la carte
Map.prototype.getHauteur = function() {
	return this.terrain.length;
}
Map.prototype.getLargeur = function() {
	return this.terrain[0].length;
}

Map.prototype.dessinerMap = function(context) {
	for(var i = 0, l = this.terrain.length ; i < l ; i++) {
		var ligne = this.terrain[i];
		var y = i * 32;
		for(var j = 0, k = ligne.length ; j < k ; j++) {
			this.tileset.dessinerTile(ligne[j], context, j * 32, y);
		}
	}
       
        // Dessin des personnages
for(var i = 0, l = this.personnages.length ; i < l ; i++) {
	this.personnages[i].dessinerPersonnage(context);
}
for(var i = 0, l = this.sorts.length ; i < l ; i++) {
	this.sorts[i].dessinerSort(context);
}
}