#pragma strict
 public var guiSkin:GUISkin;
 public var planetButtonSkin:GUISkin;
 public var contractsBtn:Texture;
public var mercuryTexture:Texture;
public var venusTexture:Texture;
public var earthTexture:Texture;
public var marsTexture:Texture;
public var jupiterTexture:Texture;
public var saturnTexture:Texture;
public var neptuneTexture:Texture;
public var uranusTexture:Texture;
public var optionBtn:Texture;
public var nextBtn:Texture;
public var okBtn:Texture;
public var cancelBtn:Texture;
public var arrowTex:Texture;
public var missionField:Texture;

public var planetFocus:String;

var width = Screen.width;
var height = Screen.height;
var sideBtnDistance=width/128;
var btnWidth=width/15;
var upperBtnDistance=23*width/384;
var playerNameSpaceHeight=3*width/64;
var playerNameSpaceWidth=29*width/192;
var spaceBetweenNames=width/64;
var playerNameUpperDistance=width/192;




var main:rules;
var contractWindowActive=false;
function Awake () {
main.InitiateGame();

}

//back taste
function OnGUI () {
	if (Input.GetKeyDown(KeyCode.Escape)) {
		if(planetFocus=="free"){
			Application.LoadLevel(0); 
		}
		else{
			planetFocus="free";
		}
	}




width = Screen.width;
height = Screen.height;
sideBtnDistance=width/128;
btnWidth=width/15;
upperBtnDistance=23*width/384;
playerNameSpaceHeight=3*width/64;
playerNameSpaceWidth=29*width/192;
spaceBetweenNames=width/64;
playerNameUpperDistance=width/192;


// Buttonfeld
GUI.skin = planetButtonSkin;
	//Planetenbuttons
		if(GUI.Button(Rect(sideBtnDistance,1.2*upperBtnDistance,btnWidth,btnWidth),mercuryTexture)){
			if(planetFocus=="mercury"){
				planetFocus="free";
				}
			else{
				planetFocus="mercury";
				}
		}	
		if(GUI.Button(Rect(sideBtnDistance,(1.2*upperBtnDistance+(btnWidth)+2),btnWidth,btnWidth),venusTexture)){
			if(planetFocus=="venus"){
				planetFocus="free";
				}
			else{
				planetFocus="venus";
				}
		}
		if(GUI.Button(Rect(sideBtnDistance,1.2*upperBtnDistance+(btnWidth*2)+4,btnWidth,btnWidth),earthTexture)){
			if(planetFocus=="earth"){
				planetFocus="free";
				}
			else{
				planetFocus="earth";
				}
		}
		if(GUI.Button(Rect(sideBtnDistance,1.2*upperBtnDistance+(btnWidth*3)+6,btnWidth,btnWidth),marsTexture)){
			if(planetFocus=="mars"){
				planetFocus="free";
				}
			else{
				planetFocus="mars";
				}
		}
		if(GUI.Button(Rect(Screen.width-(btnWidth+sideBtnDistance),1.2*upperBtnDistance,btnWidth,btnWidth),jupiterTexture)){
			if(planetFocus=="jupiter"){
				planetFocus="free";
				}
			else{
				planetFocus="jupiter";
				}
		}
		if(GUI.Button(Rect(Screen.width-(btnWidth+sideBtnDistance),1.2*upperBtnDistance+(btnWidth)+2,btnWidth,btnWidth),saturnTexture)){
			if(planetFocus=="saturn"){
				planetFocus="free";
				}
			else{
				planetFocus="saturn";
				};
		}
		if(GUI.Button(Rect(Screen.width-(btnWidth+sideBtnDistance),1.2*upperBtnDistance+(btnWidth*2)+4,btnWidth,btnWidth),uranusTexture)){
			if(planetFocus=="uranus"){
				planetFocus="free";
				}
			else{
				planetFocus="uranus";
				}
		}
		if(GUI.Button(Rect(Screen.width-(btnWidth+sideBtnDistance),1.2*upperBtnDistance+(btnWidth*3)+6,btnWidth,btnWidth),neptuneTexture)){
			if(planetFocus=="neptune"){
				planetFocus="free";
				}
			else{
				planetFocus="neptune";
				}
		}
		
	//Optionen & "Next Round"
		if (GUI.Button(Rect(Screen.width-(btnWidth+sideBtnDistance),height-upperBtnDistance-sideBtnDistance,btnWidth,btnWidth), nextBtn)){
		PlayButtonSound();
		main.NextRound();
		}
	
		if (GUI.Button(Rect(sideBtnDistance,height-upperBtnDistance-sideBtnDistance,btnWidth,btnWidth), optionBtn)){
		PlayButtonSound();
		main.SaveGame(6);
		main.SaveGame(0);
		Application.LoadLevel(0);
		}	
		

switch(planetFocus){
	case "mercury":
		ContractWindow("mercury");
		break;
	case "venus":
		ContractWindow("venus");
		break;
	case "earth":
		ContractWindow("earth");
		break;
	case "mars":
		ContractWindow("mars");
		break;
	case "jupiter":
		ContractWindow("jupiter");
		break;
	case "saturn":
		ContractWindow("saturn");
		break;
	case "neptune":
		ContractWindow("neptune");
		break;
	case "uranus":
		ContractWindow("uranus");
		break;
	case "contracts":
		ShowPlayerContracts(main.activePlayer);
		break;
	case "free":

	break;
	default:

	break;
}		
				
						
					
										
												
																
		
		//Spielernamen
		GUI.skin = guiSkin;
/*
guiSkin.label.fontSize=width/64;
	//GUI.TextArea(Rect(20,20,250,50), "Spieleranzahl:" + PlayerPrefs.GetInt("0_playerCount"));
    for(var i : int = 0; i < PlayerPrefs.GetInt("0_playerCount"); i++)
    {
	GUI.Label(Rect(sideBtnDistance+(i*playerNameSpaceWidth+i*spaceBetweenNames),playerNameUpperDistance,playerNameSpaceWidth,playerNameSpaceHeight), PlayerPrefs.GetString("0_playerName_"+i));
    }	
*/	
	guiSkin.label.fontSize=width/48;
	GUI.Label(Rect(sideBtnDistance,playerNameUpperDistance,2*playerNameSpaceWidth,playerNameSpaceHeight), main.playerName[main.activePlayer]);
	GUI.Label(Rect(sideBtnDistance+(2*playerNameSpaceWidth)+spaceBetweenNames,playerNameUpperDistance,2*playerNameSpaceWidth,playerNameSpaceHeight), "$"+main.playerMoney[main.activePlayer]);
	GUI.skin = planetButtonSkin;
	if(GUI.Button(Rect(Screen.width-(btnWidth+sideBtnDistance), playerNameUpperDistance,btnWidth,btnWidth),contractsBtn)){
			if(planetFocus=="contracts"){
				planetFocus="free";
				print("free");
				}
			else{
				planetFocus="contracts";
				print("contracts");
				}
		}
}	
			
	


function ShowPlayerContracts(player:int){
	var width = Screen.width;
	var sideBtnDistance=width/128;
	var btnWidth=width/15;
	var upperBtnDistance=23*width/384;
	var playerNameSpaceWidth=29*width/192;
	var spaceBetweenNames=width/64;
	planetButtonSkin.label.fontSize=width/64;
	var returnValue = new Array();
	for(var k : int = 0; k<main.isAcceptedBy.length; k++){
		if(main.isAcceptedBy[k]==player){
			returnValue.Push(k);
		}
	}
	if (returnValue.length==0){
		planetButtonSkin.label.fontSize=width/24;
		GUI.Label(Rect((1.4)*playerNameSpaceWidth+spaceBetweenNames+(10), 22*sideBtnDistance+upperBtnDistance, 4*playerNameSpaceWidth  ,8*btnWidth),"you don't have any contracts");
	}
	else{
		for(var n : int = 0; n<returnValue.length; n++){
			print(main.contractStart[returnValue[n]]);
			GUI.DrawTexture(Rect((n+1)*playerNameSpaceWidth+spaceBetweenNames+(n*10), sideBtnDistance+upperBtnDistance, playerNameSpaceWidth  ,6*btnWidth-sideBtnDistance),missionField);
			GUI.Label(Rect((n+1.2)*playerNameSpaceWidth+spaceBetweenNames+(n*10), 2*sideBtnDistance+upperBtnDistance, playerNameSpaceWidth  ,6*btnWidth-sideBtnDistance),"from: "+main.contractStart[returnValue[n]]);
			GUI.DrawTexture(Rect((n+1.4)*playerNameSpaceWidth+spaceBetweenNames+(n*10), 6*sideBtnDistance+upperBtnDistance, btnWidth/2, btnWidth/2),arrowTex);
			GUI.Label(Rect((n+1.2)*playerNameSpaceWidth+spaceBetweenNames+(n*10), 12*sideBtnDistance+upperBtnDistance, playerNameSpaceWidth  ,6*btnWidth-sideBtnDistance),"to: "+main.contractEnd[returnValue[n]]);
			GUI.Label(Rect((n+1.1)*playerNameSpaceWidth+spaceBetweenNames+(n*10), 22*sideBtnDistance+upperBtnDistance, playerNameSpaceWidth  ,6*btnWidth-sideBtnDistance),"load: "+main.goods[returnValue[n]]);
			GUI.Label(Rect((n+1.1)*playerNameSpaceWidth+spaceBetweenNames+(n*10), 28*sideBtnDistance+upperBtnDistance, playerNameSpaceWidth  ,6*btnWidth-sideBtnDistance),"reward: $"+main.pay[returnValue[n]]);
			GUI.Label(Rect((n+1.1)*playerNameSpaceWidth+spaceBetweenNames+(n*10), 34*sideBtnDistance+upperBtnDistance, playerNameSpaceWidth  ,6*btnWidth-sideBtnDistance),"special: "+main.specialRule[returnValue[n]]);
		}
	}
}

function ContractWindow(planet:String){
	var width = Screen.width;
	var sideBtnDistance=width/128;
	var btnWidth=width/15;
	var upperBtnDistance=23*width/384;
	var playerNameSpaceWidth=29*width/192;
	var spaceBetweenNames=width/64;
	planetButtonSkin.label.fontSize=width/64;
	var planetsContracts = main.GetContract(planet);
	for(var k:int = 0; k<planetsContracts.length; k++){
		if(main.isAcceptedBy[planetsContracts[k]] > 6){
			GUI.DrawTexture(Rect((k+1)*playerNameSpaceWidth+spaceBetweenNames+(k*10), sideBtnDistance+upperBtnDistance, playerNameSpaceWidth  ,6*btnWidth-sideBtnDistance),missionField);
			GUI.Label(Rect((k+1.2)*playerNameSpaceWidth+spaceBetweenNames+(k*10), 2*sideBtnDistance+upperBtnDistance, playerNameSpaceWidth  ,6*btnWidth-sideBtnDistance),"from: "+main.contractStart[planetsContracts[k]]);
			GUI.DrawTexture(Rect((k+1.4)*playerNameSpaceWidth+spaceBetweenNames+(k*10), 6*sideBtnDistance+upperBtnDistance, btnWidth/2, btnWidth/2),arrowTex);
			GUI.Label(Rect((k+1.2)*playerNameSpaceWidth+spaceBetweenNames+(k*10), 12*sideBtnDistance+upperBtnDistance, playerNameSpaceWidth  ,6*btnWidth-sideBtnDistance),"to: "+main.contractEnd[planetsContracts[k]]);
			GUI.Label(Rect((k+1.1)*playerNameSpaceWidth+spaceBetweenNames+(k*10), 22*sideBtnDistance+upperBtnDistance, playerNameSpaceWidth  ,6*btnWidth-sideBtnDistance),"load: "+main.goods[planetsContracts[k]]);
			GUI.Label(Rect((k+1.1)*playerNameSpaceWidth+spaceBetweenNames+(k*10), 28*sideBtnDistance+upperBtnDistance, playerNameSpaceWidth  ,6*btnWidth-sideBtnDistance),"reward: $"+main.pay[planetsContracts[k]]);
			GUI.Label(Rect((k+1.1)*playerNameSpaceWidth+spaceBetweenNames+(k*10), 34*sideBtnDistance+upperBtnDistance, playerNameSpaceWidth  ,6*btnWidth-sideBtnDistance),"special: "+main.specialRule[planetsContracts[k]]);
			if(GUI.Button(Rect((k+1.5)*playerNameSpaceWidth+spaceBetweenNames-btnWidth/2+(k*10), upperBtnDistance+(btnWidth*5),btnWidth,btnWidth),okBtn)){
				main.isAcceptedBy[planetsContracts[k]]=main.activePlayer;
			}
		}
	}
}

/*
var contractStart:String[];
var contractEnd:String[];
var goods:int[];
var pay:int[];
var specialRule:int[];
var isAcceptedBy:int[];
var isLoaded:int[];
*/



function PlayButtonSound(){
// Sound einfügen
Handheld.Vibrate();
}

function SetFoucs(focus:String){
planetFocus=focus;
}