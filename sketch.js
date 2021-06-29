var dog, happyDog, database, foodS, foodStock;

var dogImage, happyDogImage;

var addFood , feed;

var lastfed, fedtime, food;

var state;

function preload()
{
  dogImage = loadImage("images/dogImg.png")
  happyDogImage = loadImage("images/dogImg1.png")
  washRoom = loadImage("images/Wash Room.png")
  garden = loadImage("images/Garden.png")
  bedRoom = loadImage("images/Bed Room.png")
  milkImage = loadImage("images/Milk.png")
}

function readStock(data){
  foodS = data.val()
}

function readStock2(data){
  state = data.val()
  console.log(state)
}

function writeStock(food){
  if (food < 0) {
    food = 0
  }
  else {
    food -= 1
  } 
  database.ref("/").set({
    Food: food
  })
}

function setup() {
  createCanvas(1200, 500);
  database = firebase.database()
  dog = createSprite(600,200,30,30);
  dog.addImage(dogImage);
  dog.scale = 0.3;

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed the dog");
  feed.position(450,70)
  feed.mousePressed(removeFoods);

  addFood = createButton("Add Food");
  addFood.position(550,70)
  addFood.mousePressed(addFoods);

  food1 = new Food();

  gameState=database.ref('gameState');
  gameState.on("value", readStock2);
}


function draw() {  
background(46, 139, 87)

  currentTime = hour()
  if (currentTime === (food1.lastFed + 1)){
    update("play")
    food1.garden()
  }
  else if (currentTime === (food1.lastFed + 2)){
  update("sleeping")
  food1.bedroom()
  }
  else if (currentTime > (food1.lastFed + 3) && currentTime <= (food1.lastFed + 4)){
    update("bathing")
    food1.washroom()
  }
  else{
    update("hungry")
    food1.display()
  }
  textSize(10)
  fill("white")
  stroke(2)
  textSize(15);
  fill("white");
  stroke(5);

if(food1.lastFed >=12){
  text("Last Fed: " + food1.lastFed % 12 + " PM", 150, 60);

}
else if(food1.lastFed === 0){
  text("Last Fed: 12 AM", 150, 60);

}

else {
  text("Last Fed: " + food1.lastFed + " AM", 150, 60);

}

if(state!="hungry"){
  feed.hide();
  addFood.hide(); 
  dog.remove(); 
}
 else
{
  feed.show(); addFood.show();
}

 food1.display()
 drawSprites();
}



function addFoods(){
food1.foodStock++
food1.updateFoodStock(food1.foodStock)
}

function removeFoods(){
  dog.addImage(happyDogImage)
  food1.foodStock--
  food1.updateFoodStock(food1.foodStock)
  
  food1.updateFedTime();
  food1.fedTime();
}

function update(state){
  database.ref('/').update({gameState: state})
}


