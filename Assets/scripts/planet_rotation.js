#pragma strict
public var rotationSpeed_x:float;
public var rotationSpeed_y:float;
public var rotationSpeed_z:float;
function Start () {

}

function FixedUpdate () {
transform.Rotate(rotationSpeed_x,rotationSpeed_y,rotationSpeed_z);
}