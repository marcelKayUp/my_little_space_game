#pragma strict
public var playerPrefab:GameObject;
 public var blueMat:Material;
 public var cyanMat:Material;
 public var greenMat:Material;
 public var greyMat:Material;
 public var redMat:Material;
 public var whiteMat:Material;
 public var yellowMat:Material;
 public var mainCam:Transform;
 
var playerName:String[];
var playerPosition:Vector3[];
var currentDestination:String[];
var playerColor:String[];
var engineUpgrade:int[];
var cargoUpgrade:int[];
var playerMoney:int[];
var isHuman:int[];

var contractStart:String[];
var contractEnd:String[];
var goods:int[];
var pay:int[];
var specialRule:int[];
var isAcceptedBy:int[];
var isLoaded:int[];

var contractQuantity:int;
var playerCount:int;
var round:int;
var date:String;
var activePlayer:int;

var menueHandler:game_menue_handler;
var pathf:pathfinding;
var angle:float;

function InitiateGame () {
	

	var lineThickness:float=0.05;
	contractQuantity = PlayerPrefs.GetInt("0_contractQuantity");
	//lade Vertragsdaten
	/*
	for(var q : int=0; q< contractQuantity;q++){
	AddContract(PlayerPrefs.GetString("0_"+q+"_contractStart") ,PlayerPrefs.GetString("0_"+q+"_contractEnd") ,PlayerPrefs.GetInt("0_"+q+"_goods"), PlayerPrefs.GetInt("0_"+q+"_pay"), PlayerPrefs.GetInt("0_"+q+"_specialRule"), PlayerPrefs.GetInt("0_"+q+"_acceptedContract"),PlayerPrefs.GetInt("0_"+q+"_isLoaded"));
	}	
	*/

	//lade spielerbezogene Daten
	playerCount = PlayerPrefs.GetInt("0_playerCount");
	playerName = new String[playerCount];
 	playerPosition = new Vector3[playerCount];
 	playerColor = new String[playerCount];
 	engineUpgrade = new int[playerCount];
 	cargoUpgrade = new int[playerCount];
 	playerMoney = new int[playerCount];
 	isHuman = new int[playerCount];
 	currentDestination = new String[playerCount];
	for(var m : int = 0; m < PlayerPrefs.GetInt("0_playerCount")  ; m++){
   				//lade Namen
				playerName[m] = PlayerPrefs.GetString("0_playerName_"+m);
				//lade Positionen
				playerPosition[m].x =  PlayerPrefs.GetFloat("0_position_x_"+m);
				playerPosition[m].y = PlayerPrefs.GetFloat("0_position_y_"+m);
				playerPosition[m].z = PlayerPrefs.GetFloat("0_position_z_"+m);
				//lade Spielerfarbe
				playerColor[m] = PlayerPrefs.GetString("0_playerColor_"+m);
				//lade Upgrades
				cargoUpgrade[m] = PlayerPrefs.GetInt("0_cargoUpgrade_"+m);
				engineUpgrade[m] = PlayerPrefs.GetInt("0_engineUpgrade_"+m);
				//lade Geld
				playerMoney[m] = PlayerPrefs.GetInt("0_playerMoney_"+m);
				//lade "Mensch/Computer"; 0=Computer, 1=Mensch
				isHuman[m] = PlayerPrefs.GetInt("0_isHuman_"+m);
				currentDestination[m] = PlayerPrefs.GetString("0_currentDestination_"+m);
			}
					
	round = PlayerPrefs.GetInt("0_round");
	//setze Datum und Exist
	date = PlayerPrefs.GetString("0_date");
	
	
	//erschaffe Spielfiguren
 	for(var v : int = 0; v < playerCount ; v++){
		var player = Instantiate(playerPrefab,playerPosition[v], Quaternion.identity);
		var tmpDirection = (GameObject.Find(currentDestination[v]).transform.position - player.transform.position);
		angle = Mathf.Atan2(tmpDirection.y,tmpDirection.x)*Mathf.Rad2Deg;
		player.gameObject.transform.rotation = Quaternion.Euler(Vector3(0,0, angle));
		player.name= "Player_"+v;
		var line = player.gameObject.AddComponent(LineRenderer);
		line.material = new Material(Shader.Find("Mobile/Particles/Additive"));
		line.SetWidth(lineThickness,lineThickness);
		line.SetVertexCount(2);
		line.renderer.enabled = true;
		switch (playerColor[v]){
			case "blue":
				line.SetColors(Color.blue, Color.blue);
				player.renderer.material = blueMat;
				break;
			case "cyan":
				line.SetColors(Color.cyan, Color.cyan);
				player.renderer.material = cyanMat;
				break;
			case "grey":
				line.SetColors(Color.grey, Color.grey);
				player.renderer.material = greyMat;
				break;
			case "green":
				line.SetColors(Color.green, Color.green);
				player.renderer.material = greenMat;
				break;
			case "red":
				line.SetColors(Color.red, Color.red);
				player.renderer.material = redMat;
				break;
			case "white":
				line.SetColors(Color.white, Color.white);
				player.renderer.material = whiteMat;
				break;
			case "yellow":
				line.SetColors(Color.yellow, Color.yellow);
				player.renderer.material = yellowMat;
				break;
		}
		line.SetPosition(0,player.transform.position);
		line.SetPosition(1,GameObject.Find(currentDestination[v]).transform.position);
		
	}
	//SaveGame(0);
	
	contractQuantity=0;
	AddContract("earth","venus",3, 2000, 0, 7,7);
	AddContract("earth","jupiter",1, 1250, 0, 7,7);
	AddContract("earth","mercury",2, 950, 0, 7,7);
	AddContract("earth","saturn",12, 13450, 0, 7,7);
	AddContract("venus","mars",3, 900, 0, 7,7);
	activePlayer=1;
	
}


function AddContract(cs:String,ce:String,cg:int, cp:int, cr:int, cc:int,cl:int){
	// erstelle temporäre Arrays
	var tempStart = new Array(contractStart);
	var tempEnd = new Array(contractEnd);
 	var tempGoods = new Array(goods);
 	var tempPay = new Array(pay);
 	var tempSpecial = new Array (specialRule);
 	var tempAccepted = new Array (isAcceptedBy);
 	var tempLoaded = new Array (isLoaded);
 	
 	// Werte ins temporäre Array schreiben
 	tempStart.Push(cs);
 	tempEnd.Push(ce);
 	tempGoods.Push(cg);
 	tempPay.Push(cp);
 	tempSpecial.Push(cr);
 	tempAccepted.Push(cc);
 	tempLoaded.Push(cl);
 	
 	//Anzahl der Verträge erhöhen
 	contractQuantity+=1;
 	//alte Arrays mit neuer größe initialisieren
 	contractStart= new String[contractQuantity];
 	contractEnd= new String[contractQuantity];
 	goods= new int[contractQuantity];
 	pay= new int[contractQuantity];
 	specialRule= new int[contractQuantity];
 	isAcceptedBy= new int[contractQuantity];
 	isLoaded= new int[contractQuantity];
 	
 	//temporäre Arrays in neu initialisierte Arrays schreiben
 	contractStart= tempStart;
 	contractEnd= tempEnd;
 	goods= tempGoods;
 	pay= tempPay;
 	specialRule= tempSpecial;
 	isAcceptedBy= tempAccepted;
 	isLoaded= tempLoaded;	

}

function RemoveContract(id:int){
	// erstelle temporäre Arrays
	var tempStart = new Array(contractStart);
	var tempEnd = new Array(contractEnd);
 	var tempGoods = new Array(goods);
 	var tempPay = new Array(pay);
 	var tempSpecial = new Array (specialRule);
 	var tempAccepted = new Array (isAcceptedBy);
 	var tempLoaded = new Array (isLoaded);
 	
 	// Wert entfernen
 	tempStart.RemoveAt(id);
 	tempEnd.RemoveAt(id);;
 	tempGoods.RemoveAt(id);
 	tempPay.RemoveAt(id);
 	tempSpecial.RemoveAt(id);
 	tempAccepted.RemoveAt(id);
 	tempLoaded.RemoveAt(id);
 	
 	// Anzahl der Arrays reduzieren
 	contractQuantity-=1;
 	
 	//alte Arrays mit neuer größe initialisieren
 	contractStart= new String[contractQuantity];
 	contractEnd= new String[contractQuantity];
 	goods= new int[contractQuantity];
 	pay= new int[contractQuantity];
 	specialRule= new int[contractQuantity];
 	isAcceptedBy= new int[contractQuantity];
 	isLoaded= new int[contractQuantity];
 	
 	//temporäre Arrays in neu initialisierte Arrays schreiben
 	contractStart= tempStart;
 	contractEnd= tempEnd;
 	goods= tempGoods;
 	pay= tempPay;
 	specialRule= tempSpecial;
 	isAcceptedBy= tempAccepted;
 	isLoaded= tempLoaded;	
}






function GetContract(id:int){
	//erstelle Daten-Array des Vertrags
	var returnValue = new Array();
	returnValue.Push(contractStart[id]);
	returnValue.Push(contractEnd[id]);
	returnValue.Push(goods[id]);
	returnValue.Push(pay[id]);
	returnValue.Push(specialRule[id]);
	returnValue.Push(isAcceptedBy[id]);
	returnValue.Push(isLoaded[id]);
	//Rückgabe des Arrays
	return(returnValue);
}

function GetContract(planet:String){
	var returnValue = new Array();
	for(var j:int = 0; j< contractQuantity; j++){
		if(contractStart[j] == planet){
			returnValue.push(j);
		}
	}
	return(returnValue);

}




function ContractComplied(id:int, playerID:int){
	//Geld geben und so
	var money:int=GetContract(id)[3];
	playerMoney[playerID]+=money;
	RemoveContract(id);
}

function SetNewDestination(playerID:int, target:String){
	/*
	line.SetColors(lineColor,lineColor);
	//zu testzwecken
	if(reachedAim!=true){
		MoveShip(middlePoint);
		if((transform.position-middlePoint.position).sqrMagnitude<=1){
			transform.parent = middlePoint.transform;
			transform.localPosition = Vector3(1,0,0);
			reachedAim=true;
		}
	}
	line.SetPosition(0,startPoint.position);
	line.SetPosition(1,middlePoint.position);
	line.SetPosition(2,endPoint.position);
	print(transform.parent.ToString);
*/
}


function MoveShip(playerID:int, nextPoint:Transform, speed:float){



	//rotation zum Ziel
	var targetDirection= nextPoint.position - transform.position;
	var newDirection= Vector3.RotateTowards(transform.forward, targetDirection, 5, 0.0);
	transform.rotation = Quaternion.LookRotation(newDirection);
	
	//bewegung zum Ziel
	transform.Translate(Vector3.forward * speed);

}


function NextRound(){
//raumschiffbewegung berechnen
//neue routen anzeigen
//ereignisse ausführen
//evtl KI aktionen

//ende der Runde anzeiger + rundenanzahl anzeigen
	//nächster Spieler
	if(activePlayer == playerCount-1){
		activePlayer=0;
	}
	else{
		activePlayer+=1;
	}
	mainCam.transform.position.x = GameObject.Find("Player_"+activePlayer).transform.position.x;
	mainCam.transform.position.y = GameObject.Find("Player_"+activePlayer).transform.position.y;
	menueHandler.SetFoucs("free");	
}


function SaveGame(id:int){

	PlayerPrefs.SetInt(id+"_contractQuantity", contractQuantity);
	//speicher Vertragsdaten
	for(var q : int = 0; q< contractQuantity;q++){
				PlayerPrefs.SetString(id+"_"+q+"_contractStart",contractStart[q]);
				PlayerPrefs.SetString(id+"_"+q+"_contractEnd",contractEnd[q]);
				PlayerPrefs.SetInt(id+"_"+q+"_goods",goods[q]);
				PlayerPrefs.SetInt(id+"_"+q+"_pay",pay[q]);
				PlayerPrefs.SetInt(id+"_"+q+"_specialRule",specialRule[q]);
				PlayerPrefs.SetInt(id+"_"+q+"_isAcceptedBy",isAcceptedBy[q]);
				PlayerPrefs.SetInt(id+"_"+q+"_isLoaded",isLoaded[q]);
			}	

	PlayerPrefs.SetInt(id+"_playerCount", PlayerPrefs.GetInt("0_playerCount"));
	for(var m : int = 0; m < playerCount; m++){
   				//speicher Namen
				PlayerPrefs.SetString(id+"_playerName_"+m, playerName[m]);
				//speicher Positionen
				PlayerPrefs.SetFloat(id+"_position_x_"+m, playerPosition[m].x);
				PlayerPrefs.SetFloat(id+"_position_y_"+m, playerPosition[m].y);
				PlayerPrefs.SetFloat(id+"_position_z_"+m, playerPosition[m].z);
				//speicher Spielerfarbe
				PlayerPrefs.SetString(id+"_playerColor_"+m,playerColor[m]);
				//speicher Upgrades
				PlayerPrefs.SetInt(id+"_cargoUpgrade_"+m,cargoUpgrade[m]);
				PlayerPrefs.SetInt(id+"_engineUpgrade_"+m,engineUpgrade[m]);
				//speicher Geld
				PlayerPrefs.SetInt(id+"_playerMoney_"+m,playerMoney[m]);
				//speicher "Mensch/Computer"; 0=Computer, 1=Mensch
				PlayerPrefs.SetInt(id+"_isHuman_"+m,isHuman[m]);
				PlayerPrefs.SetString(id+"_currentDestination_"+m,currentDestination[m]);
			}
				
	//setze Datum, Runde und Exist
	date="T: "+ System.DateTime.Now.ToString("hh:mm") + "; D: " + System.DateTime.Now.ToString("MM/dd/yy");
	
	PlayerPrefs.SetInt(id+"_round", round);
	PlayerPrefs.SetString(id+"_date", date);
	PlayerPrefs.SetInt(id+"_exists", 1);
}


function LoadGame(id:int){


	contractQuantity = PlayerPrefs.GetInt(id+"_contractQuantity");
	
	//lade Vertragsdaten
	for(var q : int=0; q< contractQuantity;q++){
		AddContract(PlayerPrefs.GetString(id+"_"+q+"_contractStart") ,PlayerPrefs.GetString(id+"_"+q+"_contractEnd") ,PlayerPrefs.GetInt(id+"_"+q+"_goods"), PlayerPrefs.GetInt(id+"_"+q+"_pay"), PlayerPrefs.GetInt(id+"_"+q+"_specialRule"), PlayerPrefs.GetInt(id+"_"+q+"_acceptedContract"),PlayerPrefs.GetInt(id+"_"+q+"_isLoaded"));
		}	

	//lade spielerbezogene Daten
	playerCount = PlayerPrefs.GetInt(id+"_playerCount");
	
	playerName = new String[playerCount];
 	playerPosition = new Vector3[playerCount];
 	playerColor = new String[playerCount];
 	engineUpgrade = new int[playerCount];
 	cargoUpgrade = new int[playerCount];
 	playerMoney = new int[playerCount];
 	isHuman = new int[playerCount];
 	currentDestination = new String[playerCount];
 	
	for(var m : int = 0; m < PlayerPrefs.GetInt((id)+"_playerCount")  ; m++){
   					//lade Namen
					playerName[m] = PlayerPrefs.GetString(id+"_playerName_"+m);
					//lade Positionen
					playerPosition[m].x =  PlayerPrefs.GetFloat((id)+"_position_x_"+m);
					playerPosition[m].y = PlayerPrefs.GetFloat((id)+"_position_y_"+m);
					playerPosition[m].z = PlayerPrefs.GetFloat((id)+"_position_z_"+m);
					//lade Spielerfarbe
					playerColor[m] = PlayerPrefs.GetString(id+"_playerColor_"+m);
					//lade Upgrades
					cargoUpgrade[m] = PlayerPrefs.GetInt(id+"_cargoUpgrade_"+m);
					engineUpgrade[m] = PlayerPrefs.GetInt(id+"_engineUpgrade_"+m);
					//lade Geld
					playerMoney[m] = PlayerPrefs.GetInt(id+"_playerMoney_"+m);
					//lade "Mensch/Computer"; 0=Computer, 1=Mensch
					isHuman[m] = PlayerPrefs.GetInt(id+"_isHuman_"+m);
					currentDestination[m] = PlayerPrefs.GetString(id+"_currentDestination_"+m);
				}
					
	round = PlayerPrefs.GetInt(id+"_round");
	//setze Datum und Exist
	date = PlayerPrefs.GetString((id)+"_date");
	SaveGame(0);
	Application.LoadLevel(1);
}
