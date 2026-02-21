
// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";

runOnStartup(async runtime =>
{
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.
	
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime)
{
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial
	// instances are created and available to use here.
	
	runtime.addEventListener("tick", () => Tick(runtime));
}

let CanTeleport = true;

function Tick(runtime)
{
	const keyboard = runtime.keyboard;
	const player = runtime.objects.player_hitbox.getFirstInstance();
	const mouse = runtime.mouse;
//	const dt = runtime.dt;
	const mouseX = mouse.getMouseX();
	const mouseY = mouse.getMouseY();
	
	if (keyboard.isKeyDown("KeyT") && CanTeleport)
	{
		player.x = mouseX;
		player.y = mouseY;
		CanTeleport = false;

	
	}
	if (!keyboard.isKeyDown("KeyT"))
	{
		CanTeleport = true;
	
	}
	if (keyboard.isKeyDown("KeyO"))
	{
		runtime.goToLayout("level7");
	
	}
	
	// Code to run every tick
}
