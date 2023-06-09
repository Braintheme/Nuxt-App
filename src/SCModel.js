import { Engine, Scene, Animation, Vector3, MeshBuilder, PBRMaterial, AssetsManager, StandardMaterial, Color3, Color4, BezierCurveEase, ArcRotateCamera, SceneLoader, DefaultRenderingPipeline } from "@babylonjs/core";
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

const setActiveCamera = (scene) => {
	scene.activeCamera.alpha = options.camera.alpha;
	scene.activeCamera.beta = options.camera.beta;
	scene.activeCamera.radius = options.camera.radius;
	scene.activeCamera.inputs.clear();
}

const addRenderPipelines = (scene, camera) => {
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

const animateCamera = (scene) => {

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

const createPreloader = (scene) => {
	const preloaderMesh = MeshBuilder.CreateBox("preloader", { size: 1 }, scene);
	const preloaderMaterial = new StandardMaterial("preloaderMaterial", scene);
	preloaderMaterial.diffuseColor = new Color3(0, 0, 1);
	preloaderMesh.material = preloaderMaterial;
	preloaderMesh.position = Vector3.Zero();

	const rotationAnimation = new Animation(
		"rotationAnimation",
		"rotation.y",
		30,
		Animation.ANIMATIONTYPE_FLOAT,
		Animation.ANIMATIONLOOPMODE_CYCLE
	);

	const keyFrames = [];

	keyFrames.push({
		frame: 0,
		value: 0
	});

	keyFrames.push({
		frame: 100,
		value: 2 * Math.PI
	});

	rotationAnimation.setKeys(keyFrames);

	preloaderMesh.animations.push(rotationAnimation);

	scene.beginAnimation(preloaderMesh, 0, 100, true);

	return preloaderMesh;
}

const createScene = (canvas) => {
	const engine = new Engine(canvas);
	const scene = new Scene(engine);
	const camera = new ArcRotateCamera(
		"Camera",
		0.1398812670441306,
		1.1040610890616789,
		0.694160393391321,
		new Vector3(0.019400767982006073, 0.9397223591804504, -0.07945270836353302),
		scene
	);

	camera.attachControl(canvas, true);
	camera.minZ = 0.1;
	scene.clearColor = new Color4(0, 0, 0, 0);
	
	const assetsManager = new AssetsManager(scene);
	const preloaderMesh = createPreloader(scene);
	const meshTask = assetsManager.addMeshTask("mesh task", "", "3d/", "Monetka_gltf.glb");

	// Event handler for loading successfully completed task
	meshTask.onSuccess = function (task) {
		preloaderMesh.dispose();

		scene.createDefaultEnvironment({
			createSkybox: false,
			createGround: false
		});

		//Add render post editiong
		addRenderPipelines(scene, camera);

		//Set ArcRotateCamera camera
		setActiveCamera(scene);
	};

	// Start loading resources
	assetsManager.load();

	//Animation active camera
	animateCamera(scene);

	//Render scene
	engine.runRenderLoop(() => {
		scene.render();
	});

	//Render scene on resize
	window.addEventListener("resize", function () {
		engine.resize();
	});
};


export { createScene };