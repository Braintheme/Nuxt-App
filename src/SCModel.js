import { Engine, Scene, Animation, Vector3, MeshBuilder, PBRMaterial, StandardMaterial, Color3, Color4, BezierCurveEase, ArcRotateCamera, SceneLoader, DefaultRenderingPipeline } from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

const options = {
	camera: {
		alpha: 1.5707,
		beta: 1.5707,
		radius: 178,
	}
}

const isSafariBrowser = () => {
	return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

const set_active_camera = (scene) => {
	scene.activeCamera.alpha = options.camera.alpha;
	scene.activeCamera.beta = options.camera.beta;
	scene.activeCamera.radius = options.camera.radius;
	scene.activeCamera.inputs.clear();
}

const add_render_pipeline = (scene, camera) => {
	const pipeline = new DefaultRenderingPipeline("DefaultRenderingPipeline", true, scene, [camera]);
	pipeline.imageProcessingEnabled = true;
	pipeline.imageProcessing.contrast = 1.3;
	pipeline.imageProcessing.exposure = 1;
	if (!isSafariBrowser()) {
		pipeline.samples = 5;
		pipeline.bloomEnabled = true;
		pipeline.fxaaEnabled = false;
		pipeline.bloomThreshold = 0.060;
		pipeline.bloomWeight = 0.10;
		pipeline.bloomKernel = 24;
		pipeline.bloomScale = 0.500;
	}

}

const animate_camera = (scene) => {

	const bezierEase = new BezierCurveEase(0.46, 0.03, 0.52, 0.96);
	
	//Radius animation
	const radiusAnimation = new Animation("camRadius", "radius", 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE)
	const keys1 = [{
		frame: 0,
		value: options.camera.radius
	}, {
		frame: 50,
		value: options.camera.radius / 1.5
	}, {
		frame: 100,
		value: options.camera.radius
	}]
	radiusAnimation.setKeys(keys1)
	radiusAnimation.setEasingFunction(bezierEase);

	//Alpha animation
	const alphaAnimation = new Animation("camAlpha", "alpha", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_RELATIVE)
	const keys2 = [{
		frame: 0,
		value: scene.activeCamera.alpha
	},
	{
		frame: 0,
		value: scene.activeCamera.alpha * 5
	}, {
		frame: 100,
		value: -Math.PI
	}]
	
	alphaAnimation.setKeys(keys2)
	// alphaAnimation.setEasingFunction(bezierEase);

	//Beta animation
	const betaAnimation = new Animation("camBeta", "beta", 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE__CYCLE)
	const keys3 = [{
		frame: 0,
		value: scene.activeCamera.beta
	}, {
		frame: 50,
		value: scene.activeCamera.beta
	}, {
		frame: 100,
		value: scene.activeCamera.beta
	}]

	betaAnimation.setKeys(keys3)
	// betaAnimation.setEasingFunction(bezierEase);

	scene.activeCamera.animations.push(radiusAnimation)
	scene.activeCamera.animations.push(alphaAnimation)
	// scene.activeCamera.animations.push(betaAnimation)

	/////
	scene.beginAnimation(
		scene.activeCamera,
		0,
		100,
		true, //loop
		1.2, //speed
		function () {
			//After end animation
		});
}


const createScene = (canvas) => {
	const engine = new Engine(canvas);
	const scene = new Scene(engine);
	const camera = new ArcRotateCamera("Camera", 0.1398812670441306, 1.1040610890616789, 0.694160393391321, new Vector3(0.019400767982006073, 0.9397223591804504, -0.07945270836353302), scene);
	camera.attachControl(canvas, true);
	camera.minZ = 0.1;
	scene.clearColor = new Color4(0, 0, 0, 0);

	SceneLoader.ImportMesh("", "3d/", "Monetka_gltf.glb", scene, function (meshes) {

		scene.createDefaultEnvironment({
			createSkybox: false,
			createGround: false
		});

		//Add render post editiong
		add_render_pipeline(scene, camera);

		//Set ArcRotateCamera camera
		set_active_camera(scene);
		
		// const mesh = meshes[0];
		// mesh.computeBonesUsingShaders = false;
	});

	//Animation active camera
	animate_camera(scene);

	//Render scene
	engine.runRenderLoop(() => {
		scene.render()
	});

	//Render scene on resize
	window.addEventListener("resize", function () {
		engine.resize();
	});
};

export { createScene };