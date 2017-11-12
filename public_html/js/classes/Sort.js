/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
   var x;
     var y;
     
function Sort(nom, map, jx, jy) {
    console.log(joueur)
    x = jx*32 +5
    y = jy*32
   setTimeout(function(){
       map.sorts.shift()
   }, 2000);
}

 Sort.prototype.dessinerSort = function(ctx) {
        ctx.beginPath();
        
ctx.arc(x,y,50,0,2*Math.PI);
ctx.stroke();
x++;
y++;
    }