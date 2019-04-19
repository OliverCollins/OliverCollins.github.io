/* ScreePlot */

function changeSVGBgColor(element){
    screePlot.changeSVGBgColor(element.value);
}

function showAxes(element){
    screePlot.showAxes(element.checked);
}

function showAxesLabels(element){
    screePlot.showAxesLabels(element.checked);
}

function showGridlines(element){
    screePlot.showGridlines(element.checked);
}

function changeNoOfGridlines(element){
    screePlot.changeNoOfGridlines(element.value);
}

function changeNodeTextColor(element){
    screePlot.changeNodeTextColor(element.value);
}

function changeBarFill(element){
    screePlot.changeBarFill(element.value);
}

function changeBarStroke(element){
    screePlot.changeBarStroke(element.value);
}

function changeBarStrokeWidth(element){
    screePlot.changeBarStrokeWidth(element.value);
}

function changeSelBarFill(element){
    screePlot.changeSelBarFill(element.value);
}

function changeSelBarStroke(element){
    screePlot.changeSelBarStroke(element.value);
}

function changeSelBarStrokeWidth(element){
    screePlot.changeSelBarStrokeWidth(element.value);
}

function changeCircleFill(element){
    screePlot.changeCircleFill(element.value);
}

function changeCircleStroke(element){
    screePlot.changeCircleStroke(element.value);
}

function changeCircleStrokeWidth(element){
    screePlot.changeCircleStrokeWidth(element.value);
}

function changeSelCircleFill(element){
    screePlot.changeSelCircleFill(element.value);
}

function changeSelCircleStroke(element){
    screePlot.changeSelCircleStroke(element.value);
}

function changeSelCircleStrokeWidth(element){
    screePlot.changeSelCircleStrokeWidth(element.value);
}

function changeLineStrokeWidth(element){
    screePlot.changeLineStrokeWidth(element.value);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var screePlotCSSOptions = {
    domElement: "#screePlot",
    width: $('#screePlot').parent().width(),
    height: 350,
    margin:{top: 20,right: 20,bottom: 20,left: 35},
    showGridlines:true,
    noOfGridlines:10,
    showAxes:false,
    svgBackground:'#FFFFFF',
    barFill:'#3498db',
    barStroke:'#FFFFFF',
    barStrokeWidth:0,
    selBarFill:'#2ECC71',
    selBarStroke:'#FFFFFF',
    selBarStrokeWidth:0,
    circleFill:'#3498db',
    circleStroke:'#FFFFFF',
    circleStrokeWidth:1,
    selCircleFill:'#2ECC71',
    selCircleStroke:'#FFFFFF',
    selCircleStrokeWidth:1,
    lineStrokeWidth:2,
    filterLineStrokeWidth:2,
    nodeTextColor:"#ffff00"
};

var screePlotDataOptions = {
    factorSelected:3
}

var screePlotData = [
      {
        "factor": '10',
        "eigenvalue": 40,
        "cumulative_eigenvalue":60
      },
      {
        "factor": '100',
        "eigenvalue": 25,
        "cumulative_eigenvalue":75
      },
      {
        "factor": '1000',
        "eigenvalue": 16.8,
        "cumulative_eigenvalue":81.2
      },
      {
        "factor": '10000',
        "eigenvalue": 12.29,
        "cumulative_eigenvalue":87.71
      },
      {
        "factor": '100000',
        "eigenvalue": 9.592,
        "cumulative_eigenvalue":90.408
      },
      {
        "factor": '1000000',
        "eigenvalue": 7.8498,
        "cumulative_eigenvalue":92.1502
      },
      {
        "factor": '10000000',
        "eigenvalue": 6.64579,
        "cumulative_eigenvalue":93.35421
      },
      {
        "factor": '100000000',
        "eigenvalue": 5.761455,
        "cumulative_eigenvalue":94.238545
      }
    ];

var screePlot = new ScreePlot(screePlotCSSOptions);
screePlot.initialize();
screePlot.render(screePlotData,screePlotDataOptions);

function refreshData(){
    screePlotData = [];
    no_of_factors = getRandomInt(3,25)
    var randomNo=60;
    for(var i=0; i < no_of_factors; i++){
        screePlotData.push({factor:i+1, eigenvalue:randomNo-Math.sqrt(i*70), cumulative_eigenvalue:randomNo+Math.sqrt(i*70)});
    }

    screePlotDataOptions.factorSelected = 3;
    screePlot.render(screePlotData,screePlotDataOptions);
}






/* TREE MAP */

// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
  width = 445 - margin.left - margin.right,
  height = 445 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Read data
d3.csv('https://raw.githubusercontent.com/OliverCollins/OliverCollins.github.io/master/src/csv/treedata.csv', function(data) {

  // stratify the data: reformatting for d3.js
  var root = d3.stratify()
    .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
    (data);
  root.sum(function(d) { return +d.value })   // Compute the numeric value for each entity

  // Then d3.treemap computes the position of each element of the hierarchy
  // The coordinates are added to the root object above
  d3.treemap()
    .size([width, height])
    .padding(4)
    (root)

console.log(root.leaves())
  // use this information to add rectangles:
  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .style("fill", "#69b3a2");

  // and to add the text labels
  svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
      .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
      .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
      .text(function(d){ return d.data.name})
      .attr("font-size", "15px")
      .attr("fill", "white")
})
