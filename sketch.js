//Create variables here
var  dog, happyDog, database, foodS, foodStock
var feedTime, lastFood
var database
var position



function preload()
{
  //load images here
  dog1 = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(1000, 500);

  database = firebase.database()

  dog = createSprite(500,250,10,10)
  dog.scale = 0.3
  dog.addImage(dog1)

 
  dog2 = database.ref('food').on("value", function(data){
    position = data.val()
    foodObject.updateFoodStock(position)
  })

  foodObject = new Food()

  feed = createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)

  foodstock = database.ref("food").on("value", function(data){
    position = data.val()
    foodObject.updateFoodStock(position)
  })
  
 
}


function draw() {  
  background(46, 139, 87)

  foodObject.display()
  drawSprites();
  //add styles here
  

  fill(255,255,254)
  textSize(15)
  // if(lastFood >12){
  //   text("Last Feed: "+lastFood%12+"PM", 350,30)
  // }
  // else if(lastFood == 0){
  //   text("Last Feed: 12 AM",350,30)
  // }
  // else{
  //   text("Last Feed: "+lastFood+"AM",350,30)
  // }
}




function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }

  database.ref('/').set({
    'food':x
  })
}


function feedDog(){
  dog.addImage(happyDog)
  foodObject.updateFoodStock(foodObject.getFoodStock()-1)
  database.ref('/').update({
   'food':foodObject.getFoodStock(),
   FeedTime:hour ()
 })

}
  function addFoods(){
    
    position++
    database.ref('/').update({
      'food':position
    })
}
