var timer = 256
var tickRate = 16
var visualRate = 256
var baseMonsterHP=20
var monsterHealth=20
var monsterPoints=0
var baseMonsterPoints=15
var resources = {"gold ":0,"pickaxe":1}
var costs = {"pickaxe":15,
	     "miner":200,
	     "miner_pickaxe":15}
var growthRate = {"pickaxe":1.25,
		  "miner":1.25,
	     "miner_pickaxe":1.75,
	 	 "monster_hp":1.25,
	 	 "monsterPoint_rate":1.25}

var increments = [{"input":["miner","miner_pickaxe"],
		   "output":"gold"}]

var unlocks = {"pickaxe":{"gold":10},
	       "miner":{"gold":100},
	       "miner_pickaxe":{"miner":1}}
function hurtMonster(num)
{
	monsterHealth-=num
	
	if (monsterHealth<=0)
	{
		updateNewMonsterHealth(baseMonsterHP)
		newMonsterPicture() 
		monsterPoints+=baseMonsterPoints
		baseMonsterPoints *= growthRate["monsterPoint_rate"]
		//costs["base_gold"]=costs["base_gold"]*growthRate["gold_rate"]
	}
	updateText()
};
function updateNewMonsterHealth(baseHealth)
{
	monsterHealth=baseHealth*1.25
	//baseMonsterHP=baseHealth+baseHealth*1.25
	baseMonsterHP *= growthRate["monster_hp"]

};

function newMonsterPicture(){
	if (document.getElementById("imgChange").getAttribute('src') == "./Images/monster1.jpg"){
        document.getElementById("imgChange").src = "./Images/monster2.jpg";
    }
    else if (document.getElementById("imgChange").getAttribute('src') == "./Images/monster2.jpg"){
        document.getElementById("imgChange").src = "./Images/monster3.jpg";
    }
    else if (document.getElementById("imgChange").getAttribute('src') == "./Images/monster3.jpg"){
        document.getElementById("imgChange").src = "./Images/monster4.jpg";
    }
  	else if (document.getElementById("imgChange").getAttribute('src') == "./Images/monster4.jpg"){
        document.getElementById("imgChange").src = "./Images/monster5.jpg";
    }
    else if (document.getElementById("imgChange").getAttribute('src') == "./Images/monster5.jpg"){
        document.getElementById("imgChange").src = "./Images/monster1.jpg";
    }
};

function mineGold(num){
    resources["gold"] += num*resources["pickaxe"]
    updateText()
};

function upgradeMinerPickaxe(num){
    if (resources["gold"] >= costs["miner_pickaxe"]*num){
	resources["miner_pickaxe"] += num
	resources["gold"] -= num*costs["miner_pickaxe"]
	
	costs["miner_pickaxe"] *= growthRate["miner_pickaxe"]
	
	updateText()
    }
};

function upgradePickaxe(num){
    if (resources["gold"] >= costs["pickaxe"]*num){
	resources["pickaxe"] += num
	resources["gold"] -= num*costs["pickaxe"]
	
	costs["pickaxe"] *= growthRate["pickaxe"]
	
	updateText()
    }
};
function hireMiner(num){
    if (resources["gold"] >= costs["miner"]*num){
	if (!resources["miner"]){
	    resources["miner"] = 0
	}
	if (!resources["miner_pickaxe"]){
	    resources["miner_pickaxe"] = 1
	}
	resources["miner"] += num
	resources["gold"] -= num*costs["miner"]
	
	costs["miner"] *= growthRate["miner"]
	
	updateText()

	
    }
};



function updateText()
{
    for (var key in unlocks)
    {
		var unlocked = true
		for (var criterion in unlocks[key])
		{
	    	unlocked = unlocked && resources[criterion] >= unlocks[key][criterion]
		}
		if (unlocked)
		{
	    	for (var element of document.getElementsByClassName("show_"+key))
	    	{		
				element.style.display = "block"
	    	}
		}
    }
    
    for (var key in resources)
    {
		for (var element of document.getElementsByClassName(key))
	 	{
	   		element.innerHTML = resources[key].toFixed(2)
		}
    }
    for (var key in costs)
    {
		for (var element of document.getElementsByClassName(key+"_cost"))
		{
	    element.innerHTML = costs[key].toFixed(2)
		}
    }
  	for (var element of document.getElementsByClassName("monster_health"))
  	{
  		element.innerHTML = monsterHealth
  	}
  	for (var element of document.getElementsByClassName("monster_points"))
  	{
  		element.innerHTML = monsterPoints
  	}
};


window.setInterval(function(){
    timer += tickRate

    
    for (var increment of increments){
	total = 1
	for (var input of increment["input"]){
	    total *= resources[input]
	    
	}
	if (total){
	    console.log(total)
	    resources[increment["output"]] += total/tickRate
	}
    }
    
    if (timer > visualRate){
	timer -= visualRate
	updateText()
    }
  

}, tickRate);

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
};

window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
  var myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains('show')) {
      myDropdown.classList.remove('show');
    }
  }
};
