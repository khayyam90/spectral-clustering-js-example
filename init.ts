import { GraphRenderer } from "./GraphRenderer";
import { Graph, SpectralClustering } from "spectral-clustering-js";


let graph: Graph = null;
let graphRenderer: GraphRenderer = null;
let canvas: HTMLCanvasElement = null;

const colors = ["red", "blue", "green", "orange", "yellow", "pink", "brown", "navy"];


/**
 * When the page is loaded, we plug all the event listeners
 */
window.onload = function(){
    canvas = <HTMLCanvasElement>(document.getElementById("zone"));
    graph = new Graph();
    graph.generateRandom([800, 800], 100,6);

    (<HTMLSpanElement>document.getElementById("sizeLabel")).innerText = "100";

    const slider = <HTMLInputElement>(document.getElementById("graphSize"));
    slider.addEventListener("change", onSliderChange);

    const runBtn = <HTMLButtonElement>(document.getElementById("runClustering"));
    runBtn.addEventListener("click", onRun);

    graphRenderer = new GraphRenderer(graph, canvas);
    graphRenderer.draw(colors);
};

function onSliderChange(){
    const slider = <HTMLInputElement>(document.getElementById("graphSize"));
    const size = Number.parseInt(slider.value);

    graph = new Graph();
    graph.generateRandom([800, 800], size,6);

    (<HTMLSpanElement>document.getElementById("sizeLabel")).innerText = ""+size;

    graphRenderer = new GraphRenderer(graph, canvas);
    graphRenderer.draw(colors);
}

function onRun(){
    const s = new SpectralClustering(graph);
    s.compute();

    graphRenderer.draw(colors);
}
