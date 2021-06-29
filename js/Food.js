class Food{
 constructor(){
   this.lastFed;
   this.foodStock = 0;
   this.milkImage = loadImage('images/Milk.png');
 }
 getFoodStock(){
     var FoodStockRef = database.ref("Food")
     FoodStockRef.on('value', (data)=>{
        foodCount = data.val()
     })

     this.foodStock = foodCount
     return this.foodStock
 }

updateFoodStock(foodS)
{
database.ref('/').update({
Food : foodS
})  
}

deductFood(){

if(foodStock>0){
this.foodStock =this.foodStock- 1

}
}

fedTime(){
    var fedTime = database.ref("LastFed")
    fedTime.on('value', (data)=>{
        this.lastFed = data.val()  
    })
     
}

updateFedTime(){
database.ref('/').update({
LastFed : hour()
})

}

display(){
   
    
var x = 80 , y = 80
imageMode(CENTER)
//mage(this.milkImage, 720,220,70,70)
if(this.foodStock!=0){
for(var i = 0; i< this.foodStock; i++){
    if(i%10 ==0){
        x=80;
        y = y+50
    }
    image(this.milkImage, x,y, 50,50)
    x = x+30;
}

}


}
garden(){
    background(garden, 550, 500)
}
bedroom(){
    background(bedRoom, 550, 500)
}
washroom(){
    background(washRoom, 550, 500)
}
}