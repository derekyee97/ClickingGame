var timer = 256
var tickRate = 16
var visualRate = 256
var baseMonsterHP=20
var monsterHealth=20
var monsterPoints=0
var baseMonsterPoints=15

var imgCounter=2
var maxImages=15

var bombDamage=100

var resources = {"gold ":0,"pickaxe":1,"sword":1,"warrior":0,"warrior_weapon_level":0,"num_bombs":0}
var costs = {"pickaxe":15,
	     "warrior":60,
	     "miner_pickaxe":15,
	 	 "sword":15,
	 	 "warrior_weapon":40,
	 	 "bomb":100,
	 	 "bomb_upgrade":200}
var growthRate = {"pickaxe":1.25,
		  "warrior":1.30,
	     "miner_pickaxe":1.75,
	 	 "monster_hp":1.35,
	 	 "monsterPoint_rate":1.25,
	 	 "sword":1.20,
	 	 "warrior_weapon":1.30,
	 	 "bomb":1.40}

var increments = [{"input":["warrior","miner_pickaxe"],
		   "output":"gold"}]

// var unlocks = {"pickaxe":{"gold":10},
// 	       "miner":{"gold":100},
// 	       "miner_pickaxe":{"miner":1}}
function hurtMonster(num)
{
	monsterHealth-=num*resources["sword"]
	
	if (monsterHealth<=0)
	{
		updateNewMonsterHealth(baseMonsterHP)
		newMonsterPicture() 
		monsterPoints+=baseMonsterPoints
		baseMonsterPoints=Math.round(baseMonsterPoints*growthRate["monsterPoint_rate"])
		
	}
	updateText()
};
function hurtMonsterWarrior(num)
{
	monsterHealth-=num
	
	if (monsterHealth<=0)
	{
		updateNewMonsterHealth(baseMonsterHP)
		newMonsterPicture() 
		monsterPoints+=baseMonsterPoints
		baseMonsterPoints=Math.round(baseMonsterPoints*growthRate["monsterPoint_rate"])
		
	}
	updateText()
};
function updateNewMonsterHealth(baseHealth)
{
	monsterHealth=Math.round(baseHealth*1.25)
	baseMonsterHP *= growthRate["monster_hp"]
	baseMonsterHP=Math.round(baseMonsterHP*growthRate["monster_hp"])
};

function newMonsterPicture()
{
	if(imgCounter>maxImages)
	{
		imgCounter=1
	}
	else if(imgCounter == 2){
		window.setTimeout("document.getElementById('Bamb').style.visibility='show';", 3000)
	}
	document.getElementById("imgChange").src = "./Images/monster"+imgCounter.toString(10)+".png";
	imgCounter+=1 

};


function upgradeSword(num){
	if(monsterPoints >= costs["sword"])
	{
		resources["sword"]+=num 
		monsterPoints=Math.round(monsterPoints-num*costs["sword"])
		costs["sword"] =Math.round(costs["sword"]*growthRate["sword"])
		updateText()
	}
};


function hireWarrior(num)
{
	if(monsterPoints >= costs["warrior"])
	{
		
		if(!resources["miner_pickaxe"])
		{
			resources["miner_pickaxe"]=1
		}
		resources["warrior"]+=num
		monsterPoints-=costs["warrior"]
		costs["warrior"] = Math.round(costs["warrior"]*growthRate["warrior"])
		if(resources["warrior"]==1)
		{
			resources["warrior_weapon_level"]=1
		}
		updateText()
	}
};
function buyBomb(num)
{
	if(monsterPoints >= costs["bomb"])
	{
		
		if(!resources["miner_pickaxe"])
		{
			resources["miner_pickaxe"]=1
		}
		resources["num_bombs"]+=num
		monsterPoints-=costs["bomb"]
		costs["bomb"] = Math.round(costs["bomb"]*growthRate["bomb"])
		updateText()
	}
};
function releaseBombs(num)
{
	if(resources["num_bombs"]==0)
	{
		
		return 
	}
	else
	{
		
		hurtMonsterWarrior(resources["num_bombs"]*bombDamage)
		resources["num_bombs"]=0
	}
	
};
function upgradeBombDamage(num)
{
	if(monsterPoints >= costs["bomb_upgrade"])
	{
		
		if(!resources["miner_pickaxe"])
		{
			resources["miner_pickaxe"]=1
		}
		bombDamage=Math.round(bombDamage*1.20)
		monsterPoints-=costs["bomb_upgrade"]
		costs["bomb_upgrade"] = Math.round(costs["bomb_upgrade"]*growthRate["bomb"])
		updateText()
	}
};
function upgradeWarriorWeapon(num)
{
	if(resources["warrior"]==0)
	{
		return
	}
	if(monsterPoints >= costs["warrior_weapon"])
	{
		resources["warrior_weapon_level"]+=num
		monsterPoints-=costs["warrior_weapon"]
		costs["warrior_weapon"]=Math.round(costs["warrior"]*growthRate["warrior_weapon"])
	}
	updateText()
};
function updateText()
{
    
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
  		monsterHealth=Math.round(monsterHealth)
  		element.innerHTML = monsterHealth
  	}
  	for (var element of document.getElementsByClassName("monster_points"))
  	{
  		element.innerHTML = monsterPoints
  	}
  	for (var element of document.getElementsByClassName("bomb_damage_text"))
  	{
  		element.innerHTML = bombDamage
  	}




};


window.setInterval(function()
{
    timer += 1000

    for (var increment of increments)
    {
		total = 1
		for (var input of increment["input"])
		{
		    total *= resources[input]
		    
		}
		if (total)
		{
		   
		   if(resources["warrior_weapon_level"]==0)
		   {
		   		hurtMonster(resources["warrior"])
		   } 
		   else
		   {
		   		hurtMonsterWarrior(resources["warrior"]*resources["warrior_weapon_level"])
		   		
		   }
		   		   
		    
		}
	}
    
    if (timer > visualRate)
    {
		timer -= visualRate

		updateText()
    }
  

}, 1000);

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
