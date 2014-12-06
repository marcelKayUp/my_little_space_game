#pragma strict

public var sun:GameObject;
public var mercury:GameObject;
public var venus:GameObject;
public var earth:GameObject;
public var mars:GameObject;
public var jupiter:GameObject;
public var saturn:GameObject;
public var uranus:GameObject;
public var neptune:GameObject;

public var cubeSize:float;
public var resolution:int=5;
public var gravFactor:float=1000.0;
public var navigationResolution:float=0.1;
public var navigationGrid:float=1;
private var gravConstant:float=1;
private var gravity:float;
private var g_sun:float=274;
private var g_mercury:float=3.7;
private var g_venus:float=8.87;
private var g_earth:float=9.81;
private var g_mars:float=3.69;
private var g_jupiter:float=24.79;
private var g_saturn:float=10.44;
private var g_neptune:float=11.15;
private var g_uranus:float=8.87;

private var waySum:float;

private var checkedPositions=new Array();
private var count:int;
private var aStarArray=new Array();

private var aStarOpen= new Hashtable();
private var aStarOpenParent= new Hashtable();
private var aStarClosed=new Hashtable();
private var aStarClosedParent= new Hashtable();
private var sortingKeys = new Array();
private var sortingValues = new Array();
private var stepWidth=1/navigationResolution;
private var k=0;

function Start () {
	if(navigationResolution<=0){
		navigationResolution=1;
	}
	if(navigationGrid<=0){
		navigationGrid=1;
	}
AStar(uranus.transform.position, mercury.transform.position);	
}

function Update () {

}

function CalculateWay(start:Vector3, end:Vector3){
	count = 0;
	waySum=0;
	k=0;
	checkedPositions.Clear();
	var startArray = new Array();
	startArray.Add(start);
	checkedPositions.Add(start);
	var velocity:float;
	var deltaStartToEnd=start-end;
	var navArray = startArray.Concat(CalculateNextWayPoint(start, end));
	var theWay= new GameObject("path");
	theWay.transform.position=start;
	var line = theWay.gameObject.AddComponent(LineRenderer);
		line.material = new Material(Shader.Find("Mobile/Particles/Additive"));
		line.SetWidth(1,1);
		line.SetVertexCount(navArray.length);
		line.renderer.enabled = true;
		line.SetColors(Color.blue, Color.blue);
		for(var n:int=0; n < navArray.length; n++){
			line.SetPosition(n, navArray[n]);
		}
	print("Schritte: " + navArray.length);
	print("gepruefte Positionen: "+checkedPositions.length);
	print("Durchlaeufe: " + count);
		
}

function AStar(start:Vector3, end:Vector3){
var stepWidth=1/navigationResolution;
aStarOpen.Clear();
aStarClosed.Clear();
aStarOpenParent.Clear();
aStarClosedParent.Clear();
aStarOpen.Add(start,0);
var currentNode:Vector3;
var distance:float;
print(aStarOpen[start]);
var n=0;
	do{
	n++;
		sortingKeys.Clear();
		sortingValues.Clear();
		// Hashtable sortieren!
		for(key in aStarOpen.Keys){
			sortingValues.Add(aStarOpen[key]);
		}
		sortingValues.Sort();
		for(key in aStarOpen.Keys){
			if(aStarOpen[key]==sortingValues[0]){
				currentNode = key;
				distance = aStarOpen[key];
				aStarOpen.Remove(key);
				break;
			}
		}
		if((end - currentNode).magnitude <= stepWidth){
			print("Pfad gefunden! " + n);
			print(aStarOpenParent.Count);
			aStarOpenParent.Add(end, currentNode);
			DrawPath(start, end, aStarOpenParent);
			return; //hier den Pfad zurückgeben!
		}
		aStarClosed.Add(currentNode, distance);
		PathExpand(currentNode, end, start);
	
	}while(aStarOpen.Count>0);
	print("kein Pfad moeglich! " + n);
	return; // Pfad nicht gefunden
}

function PathExpand(waypoint:Vector3, end:Vector3, start:Vector3){
	for(var x:int=-stepWidth; x<= stepWidth; x+=stepWidth){
		for(var y:int=-stepWidth; y<=stepWidth;y+=stepWidth){
			for(var z:int=-stepWidth;z<=stepWidth;z+=stepWidth){
			var newPoint = waypoint+Vector3(x,y,z);
				if(aStarClosed.ContainsKey(newPoint)){
				}
				else{
					var g_currentWaypoint= (start - waypoint).magnitude;
					var h_distance =(end - newPoint).magnitude;
					var c_distance = (waypoint - newPoint).magnitude;
					if(aStarOpen.ContainsKey(newPoint) && g_currentWaypoint +  c_distance >= (end - newPoint).magnitude){
					 }
					 else{
					 	if(aStarOpenParent.Contains(newPoint)){
					 		aStarOpenParent.Remove(newPoint);
							aStarOpenParent.Add(newPoint, waypoint);
						}
						else{
							aStarOpenParent.Add(newPoint, waypoint);
						}
						if(aStarOpen.ContainsKey(newPoint)){
							aStarOpen.Remove(newPoint);
							aStarOpen.Add(newPoint, (g_currentWaypoint + (c_distance *Mathf.Cos(Vector3.Angle(end-newPoint, end)))+ h_distance));
						}
						else{
							aStarOpen.Add(newPoint, (g_currentWaypoint + (c_distance *Mathf.Cos(Vector3.Angle(end-newPoint, end))) + h_distance));
							
						}
					}
				}
			}
		}
	}



}


function DrawPath(start:Vector3, end:Vector3, path:Hashtable){
	var theWay= new GameObject("path");
	theWay.transform.position=start;
	var line = theWay.gameObject.AddComponent(LineRenderer);
		line.material = new Material(Shader.Find("Mobile/Particles/Additive"));
		line.SetWidth(1,1);
		line.renderer.enabled = true;
		line.SetColors(Color.blue, Color.blue);
		var pathArray = new Array();
		var nextDrawStep = end;
	do{
		pathArray.Add(nextDrawStep);
		nextDrawStep=path[nextDrawStep];
	}
	while(!(nextDrawStep==start));
	line.SetVertexCount(pathArray.length);
	for(var j:int=0; j<pathArray.length;j++){
		line.SetPosition(j, pathArray[j]);
		print(pathArray[j]);
	}
	
}





/*
Version 1 des A*

function AStar(start:Vector3, end: Vector3){
aStarArray.clear();
checkedPositions.Clear();
AStarNextWP(start, end);
	var theWay= new GameObject("path");
	theWay.transform.position=start;
	var line = theWay.gameObject.AddComponent(LineRenderer);
		line.material = new Material(Shader.Find("Mobile/Particles/Additive"));
		line.SetWidth(1,1);
		line.SetVertexCount(aStarArray.length);
		line.renderer.enabled = true;
		line.SetColors(Color.blue, Color.blue);
		for(var n:int=0; n < aStarArray.length; n++){
			line.SetPosition(n, aStarArray[n]);
		}
}
function AStarNextWP (start:Vector3, end:Vector3){
	var stepWidth=1/navigationResolution;
	var nextWP = Vector3.MoveTowards(start, end, stepWidth);
	var colliderTestRay = new Ray(start, nextWP-start); 
	var rayHit : RaycastHit;
	if(!Physics.Raycast(colliderTestRay, rayHit, stepWidth)){
		aStarArray.Add(nextWP);
		
		if((end - nextWP).magnitude <= stepWidth){
			return;
		}
		AStarNextWP(nextWP, end);
	}
	else{
		
		
		
	}
	
}
*/


function CalculateNextWayPoint(wpStart:Vector3, wpEnd:Vector3):Array{
	var stepWidth=1/navigationResolution;
	var wpArray = new Array();
	if((wpStart - wpEnd).magnitude <= stepWidth){
		wpArray.Add(wpEnd);
		return(wpArray);
	}	
	//var isChecked:boolean=false;
	//var gravityFactor = GetGravity(wpEnd); 
	var nextWP = wpStart;
	var currentWP  =new Vector3();
	for(var x:int=-navigationGrid; x<= navigationGrid; x+=stepWidth){
		for(var y:int=-navigationGrid; y<=navigationGrid;y+=stepWidth){
			//for(var z:int=-navigationGrid;z<=navigationGrid;z+=stepWidth){
				var z=0;
				currentWP = wpStart+Vector3(x,y,z);
				count++;
				/*
				for(var q:int=0;q<checkedPositions.length;q++){
					if(checkedPositions[q]==currentWP){
						isChecked=true;
						break;			
					}
					else{
						isChecked=false;
					}
				}
				*/
				//if(!isChecked){
					checkedPositions.Add(currentWP);
					var deltaWay = nextWP - wpEnd;
					var nextGrav = GetGravity(nextWP);
					var currentGrav = GetGravity(currentWP);
					var currentDelta = currentWP - wpEnd;
					if(currentDelta.magnitude + (Mathf.Cos(Vector3.Angle(wpEnd-currentGrav, wpEnd))*currentGrav.magnitude) < deltaWay.magnitude + (Mathf.Cos(Vector3.Angle(wpEnd-nextGrav, wpEnd)) *nextGrav.magnitude)){
						deltaWay = currentDelta;
						nextWP = currentWP;
					//}
				//}
			}
		}
	}
	if(wpStart == nextWP){
		nextWP = Vector3.MoveTowards(wpStart, wpEnd, stepWidth);
		print("keine Optimierung moeglich, an Positions: " + wpStart);
	}
	wpArray.Add(nextWP);
	var returnArray = wpArray.Concat(CalculateNextWayPoint(nextWP, wpEnd));	
	return(returnArray);
}


function GetGravity(point:Vector3){

				var sun_delta_g = point- sun.transform.position;
				var sun_effective_g = (g_sun*gravConstant/Mathf.Pow(sun_delta_g.sqrMagnitude*sun_delta_g.sqrMagnitude, 2));
			
				var mercury_delta_g = point- mercury.transform.position;
				var mercury_effective_g = (g_mercury*gravConstant/Mathf.Pow(mercury_delta_g.sqrMagnitude*mercury_delta_g.sqrMagnitude, 2));
				
				var venus_delta_g = point- venus.transform.position;
				var venus_effective_g = (g_venus*gravConstant/Mathf.Pow(venus_delta_g.sqrMagnitude*venus_delta_g.sqrMagnitude,2));
				
				var earth_delta_g = point- earth.transform.position;
				var earth_effective_g = (g_earth*gravConstant/Mathf.Pow(earth_delta_g.sqrMagnitude*earth_delta_g.sqrMagnitude,2));
				
				var mars_delta_g = point- mars.transform.position;
				var mars_effective_g = (g_mars*gravConstant/Mathf.Pow(mars_delta_g.sqrMagnitude*mars_delta_g.sqrMagnitude,2));
				
				var jupiter_delta_g = point- jupiter.transform.position;
				var jupiter_effective_g = (g_jupiter*gravConstant/Mathf.Pow(jupiter_delta_g.sqrMagnitude*jupiter_delta_g.sqrMagnitude,2));
				
				var saturn_delta_g = point- saturn.transform.position;
				var saturn_effective_g = (g_saturn*gravConstant/Mathf.Pow(saturn_delta_g.sqrMagnitude*saturn_delta_g.sqrMagnitude,2));
				
				var neptune_delta_g = point- neptune.transform.position;
				var neptune_effective_g = (g_neptune*gravConstant/Mathf.Pow(neptune_delta_g.sqrMagnitude*neptune_delta_g.sqrMagnitude,2));
				
				var uranus_delta_g = point- uranus.transform.position;
				var uranus_effective_g = (g_uranus*gravConstant/Mathf.Pow(uranus_delta_g.sqrMagnitude*uranus_delta_g.sqrMagnitude,2));

				var direction : Vector3 = transform.TransformDirection (sun_delta_g) * sun_effective_g*gravFactor + transform.TransformDirection (mercury_delta_g) * mercury_effective_g*gravFactor + transform.TransformDirection (venus_delta_g) * venus_effective_g*gravFactor + transform.TransformDirection (earth_delta_g) * earth_effective_g*gravFactor + transform.TransformDirection (mars_delta_g) * mars_effective_g*gravFactor + transform.TransformDirection (jupiter_delta_g) * jupiter_effective_g*gravFactor + transform.TransformDirection (saturn_delta_g) * saturn_effective_g*gravFactor + transform.TransformDirection (uranus_delta_g) * uranus_effective_g*gravFactor + transform.TransformDirection (neptune_delta_g) * neptune_effective_g*gravFactor;
			
				return(direction);

}







