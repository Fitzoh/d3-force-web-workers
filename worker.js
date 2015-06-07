importScripts("http://d3js.org/d3.v3.min.js")

var onmessage = function(msg){
    //create the force layout in worker thread, does not need dom access
    var force = d3.layout.force()
        .charge(-120)
        .linkDistance(30)
        .size([msg.data.width, msg.data.height]);

    d3.json("miserables.json", function(error, graph) {
        force.nodes(graph.nodes)
             .links(graph.links)
             .start();

        //on each tick send graph to main thread for rendering
        force.on("tick", function(){
            postMessage(graph)
        })
    });
}
