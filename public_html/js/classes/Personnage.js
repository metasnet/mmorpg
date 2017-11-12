var DIRECTION = {
	"BAS"    : 0,
	"GAUCHE" : 1,
	"DROITE" : 2,
	"HAUT"   : 3
}
var DUREE_ANIMATION = 2;
var DUREE_DEPLACEMENT = 1;
this.etatAnimation = -1;
var frame = 0;
function Personnage(url, x, y, direction) {
	this.x = x; // (en cases)
	this.y = y; // (en cases)
	this.direction = direction;
	
	// Chargement de l'image dans l'attribut image
	this.image = new Image();
	this.image.referenceDuPerso = this;
	this.image.onload = function() {
		if(!this.complete) 
			throw "Erreur de chargement du sprite nommé \"" + url + "\".";
		
		// Taille du personnage
		this.referenceDuPerso.largeur = this.width / 4;
		this.referenceDuPerso.hauteur = this.height / 4;
	}
	this.image.src = "sprites/" + url;
}

Personnage.prototype.dessinerPersonnage = function(context) {
 // Numéro de l'image à prendre pour l'animation
var decalageX = 0, decalageY = 0; // Décalage à appliquer à la position du personnage

	// On calcule l'image (frame) de l'animation à afficher
	if(frame > 3) {
		frame %= 4;
	}
	
	

/*
 * Si aucune des deux conditions n'est vraie, c'est qu'on est immobile, 
 * donc il nous suffit de garder les valeurs 0 pour les variables 
 * frame, decalageX et decalageY
 */


	context.drawImage(
	this.image, 
	this.largeur * frame
, this.direction * this.hauteur, // Point d'origine du rectangle source à prendre dans notre image
	this.largeur, this.hauteur, // Taille du rectangle source (c'est la taille du personnage)
	        // Point de destination (dépend de la taille du personnage)
(this.x * 32) - (this.largeur / 2) + 16, (this.y * 32) - this.hauteur + 24, // Point de destination (dépend de la taille du personnage)
	this.largeur, this.hauteur // Taille du rectangle destination (c'est la taille du personnage)
        

);

}

Personnage.prototype.getCoordonneesAdjacentes = function(direction)  {
	var coord = {'x' : this.x, 'y' : this.y};
	switch(direction) {
		case DIRECTION.BAS : 
			coord.y = coord.y + 0.25;
                        frame++;
			break;
		case DIRECTION.GAUCHE : 
			coord.x = coord.x - 0.25;
                        frame++;
			break;
		case DIRECTION.DROITE : 
			coord.x = coord.x + 0.25;
                        frame++;
			break;
		case DIRECTION.HAUT : 
			coord.y = coord.y - 0.25;
                        frame++;
			break;
	}
	return coord;
}
	
Personnage.prototype.deplacer = function(direction, map) {
    // On ne peut pas se déplacer si un mouvement est déjà en cours !
	// On change la direction du personnage
	this.direction = direction;
		
	// On vérifie que la case demandée est bien située dans la carte
	var prochaineCase = this.getCoordonneesAdjacentes(direction);
	if(prochaineCase.x < 0 || prochaineCase.y < 0 || prochaineCase.x >= map.getLargeur() || prochaineCase.y >= map.getHauteur()) {
		// On retourne un booléen indiquant que le déplacement ne s'est pas fait, 
		// Ça ne coute pas cher et ca peut toujours servir
		return false;
	}
		// On commence l'animation
        this.etatAnimation = 1;

	// On effectue le déplacement
	this.x = prochaineCase.x;
	this.y = prochaineCase.y;
		
	return true;
}

