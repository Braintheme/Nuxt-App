<template>
    <canvas id="canvasScene" ref="bjsCanvas" width="600" height="600" />
</template>

<style>

#canvasScene {
    width: 100%;
    height: 50vh;
}

</style>
  
<script>
import { ref, onMounted } from "@vue/runtime-core";
import {createScene} from  "~/src/SCModel.js";

export default {
    name: "BabylonScene",
    setup() {
        const bjsCanvas = ref(null);

        onMounted(() => {
            if (bjsCanvas.value) {
                createScene(bjsCanvas.value);
            }
        });

        return {
            bjsCanvas,
        };
    },
};
</script>