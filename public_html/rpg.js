/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var ts = new Tileset("map_tiles.png");
var map = new Map("first_map");
var joueur = new Personnage("character.png", 7, 14, DIRECTION.BAS);
var sort = new Sort("boule de feu");
var inter = 0;
var mouseX = 0;
var mouseY = 0;

window.onload = function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = map.getLargeur() * 32;
    canvas.height = map.getHauteur() * 32;

    map.addPersonnage(joueur);

    setInterval(function () {
        map.dessinerMap(ctx);
    }, 40);

    window.onkeypress = function (event) {
        var e = event || window.event;
         var key = e.which || e.keyCode;
         var ctx = canvas.getContext('2d');
         var sort = new Sort("fireball", map, joueur.x, joueur.y)
         if(key == 49) {
             map.addSort(sort)
         }
    }

}

  // Gestion du clavier
    window.onkeydown = function (event) {
        var e = event || window.event;
        var key = e.which || e.keyCode;
        switch (key) {
            case 38 :
            case 122 :
            case 119 :
            case 90 :
            case 87 : // Flèche haut, z, w, Z, W
                if (inter == 0) {
                    move = setInterval(function () {
                        joueur.deplacer(DIRECTION.HAUT, map);
                    }, 40);
                    inter++;
                }
                break;
            case 40 :
            case 115 :
            case 83 : // Flèche bas, s, S
                if (inter == 0) {
                    move = setInterval(function () {
                        joueur.deplacer(DIRECTION.BAS, map);
                    }, 40);
                    inter++;
                }
                break;
            case 37 :
            case 113 :
            case 97 :
            case 81 :
            case 65 : // Flèche gauche, q, a, Q, A
                if (inter == 0) {
                    move = setInterval(function () {
                        joueur.deplacer(DIRECTION.GAUCHE, map);
                    }, 40);
                    inter++;
                }
                break;
            case 39 :
            case 100 :
            case 68 : // Flèche droite, d, D
                if (inter == 0) {
                    move = setInterval(function () {
                        joueur.deplacer(DIRECTION.DROITE, map);
                    }, 40);
                    inter++;
                }
                break;
            default :
                //alert(key);
                return true;
        }

        window.onkeyup = function (event) {
            clearInterval(move)
            inter = 0;
        }
        
        canvas.addEventListener('mousemove', function(evt) {
           mouseX = evt.clientX
           mouseY = evt.clientY
        })

    }