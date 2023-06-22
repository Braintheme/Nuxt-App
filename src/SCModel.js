import { Engine, Scene, FreeCamera, Vector3, MeshBuilder,PBRMaterial, StandardMaterial, Color3, Color4, HemisphericLight, ArcRotateCamera, SceneLoader, DefaultRenderingPipeline } from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

let options = {
	camera: {
		alpha: 1.4163,
		beta: 1.3639,
		radius: 0.8,
		animation: {
			radius: 0.66,
		}
	}
}

const isSafariBrowser = () => {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

const set_active_camera = (scene) => {
    scene.activeCamera.alpha = options.camera.alpha;
    scene.activeCamera.beta = options.camera.beta;
    scene.activeCamera.radius = options.camera.radius;
    // scene.activeCamera.inputs.clear();
}

const add_render_pipeline = (scene, camera) => {
    const pipeline = new DefaultRenderingPipeline("DefaultRenderingPipeline", true, scene, [camera]);
    pipeline.imageProcessingEnabled = true;
    pipeline.imageProcessing.contrast = 1.2;
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

const createScene = (canvas) => {
	const engine = new Engine(canvas);
	const scene = new Scene(engine);
	// const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
	const camera = new ArcRotateCamera("Camera", 0.1398812670441306, 1.1040610890616789, 0.694160393391321, new Vector3(0.019400767982006073, 0.9397223591804504, -0.07945270836353302), scene);
	camera.setPosition(new Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    camera.minZ = 0.1;
	scene.clearColor = new Color4(0, 0, 0, 0);

	SceneLoader.ImportMesh("", "3d/", "Monetka_gltf.glb", scene, function (meshes) {

		// scene.createDefaultCameraOrLight(true, true, true);
		scene.createDefaultEnvironment({
			createSkybox: false,
			createGround: false
		});
		add_render_pipeline(scene, camera);
		set_active_camera(scene);
		const mesh = meshes[0];
		mesh.computeBonesUsingShaders = false;

	});

	engine.runRenderLoop(() => {
		scene.render();
	});
};

export { createScene };