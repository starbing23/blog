<template>
    <div class="profile">
        <div class="profile-content">
            <div>
                <img src="../img/profile-header.png" alt="profile-header" height="200px">
            </div>
            <div class="head">
                <img src="../img/head.jpg" alt="head" height="128px">
            </div>
            <div class="profile-basic profile-basic-margin">
                <h3>{{name}}</h3>
                <h5>{{position}} in {{company}}</h5>
                <div class="profile-basic-3">
                    <icon name="mobile" scale="1.5"></icon><span>&nbsp {{phone}}</span>
                    <icon name="envelope-o" scale="1.3"></icon><span>&nbsp {{email}}</span>
                    <icon name="map-marker" scale="1.4"></icon><span>&nbsp {{address}}</span>
                </div>
                <div class="profile-block">
                    <p class="summary">{{summary}}</p>
                </div>
            </div>
        </div>
        <div class="profile-content">
            <div class="profile-basic">
                <h4 class="text-left">Skills</h4>
            </div>
            <div class="profile-skill-thumb">
                <div id="sequence"></div>
                <div id="chart">
                    <div id="explanation" style="visibility: hidden;">
                        <span id="level"></span><br/>
                        <span id="percentage"></span><br/>
                        <span id="explanationText"></span>
                    </div>
                </div>
                <div id="sidebar">
                    <input type="checkbox" id="togglelegend"> Legend<br/>
                    <div id="legend" style="visibility: hidden;"></div>
                </div>
            </div>
        </div>
        <div class="profile-content">
            <div class="profile-basic text-left">
                <h4>Experiences</h4><br>
                <div v-for="ex of experiences" class="profile-experiences">
                    <h6><strong>{{ex.company}}</strong></h6>
                    <span>{{ex.date}}</span>
                    <span>{{ex.position}}</span>
                    <ul>
                        <li v-for="responsibility of ex.responsibility">
                            {{responsibility}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="profile-content">
            <div class="profile-basic text-left">
                <h4>Education</h4><br>
                <div v-for="education of education">
                    <span>{{education.date}}</span>
                    <span>{{education.university}}</span>
                    <span class="float-right">{{education.degree}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */

import * as d3 from '../../d3/d3.min.js'
import ProfileData from './ProfileData.js'

export default {
  name: 'vue-line-chart',
  data () {
    return {
        name:'Bin Wu',
        position:'Front-end Developer',
        company: 'Axxess',
        phone: '(814)-232-0159',
        email: 'starbing23@gmail.com',
        address: 'Dallas, TX',
        summary: `“Bin is a very talented and dedicated young man with high learning skills and enormous potentials” - The Vice President of Blackboard`,
        experiences: ProfileData.experiences,
        education: ProfileData.education,
    }
  },
  mounted () {
    this.calculatePath()
  },
  methods: {
    calculatePath () {
      // Dimensions of sunburst.
      var width = 350
      var height = 350
      var radius = Math.min(width, height) / 2

      // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
      var b = {
        w: 75, h: 30, s: 3, t: 10
      }

      // Mapping of step names to colors.
      var colors = ProfileData.ExColor;

        // Total size of all segments; we set this later, after loading the data.
        var totalSize = 0; 
        var svg = d3.select("#chart").append("svg:svg")
            .attr("width", width)
            .attr("height", height);
        
        var vis = svg.append("svg:g")
            .attr("id", "container")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        
        var shadow = svg.append("svg:g")
            .attr("id", "shadow")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        
        var partition = d3.partition()
            .size([2 * Math.PI, radius * radius]);

        var arc = d3.arc()
            .startAngle(function(d) { return d.x0; })
            .endAngle(function(d) { return d.x1; })
            .innerRadius(function(d) { return Math.sqrt(d.y0); })
            .outerRadius(function(d) { return Math.sqrt(d.y1); });

        var csv = ProfileData.Ex;
        var json = buildHierarchy(csv);
        createVisualization(json);
        removeShadow(shadow);

        function removeShadow(shadow) {
            var tau = 2 * Math.PI;
            var arc = d3.arc()
                .innerRadius(0)
                .outerRadius(240)
                .startAngle(tau);
            
            var g = shadow;
            var foreground = g.append("path")
                .datum({endAngle: 0})
                .style("fill", "white")
                .attr("d", arc);

            foreground.transition()
                .duration(1000)
                .attrTween("d", arcTween(tau));
            function arcTween(newAngle) {
                return function(d) {
                    var interpolate = d3.interpolate(d.endAngle, newAngle);
                    return function(t) {
                    d.endAngle = interpolate(t);
                    return arc(d);
                    }
                }
            }
        };

        // Main function to draw and set up the visualization, once we have the data.
        function createVisualization(json) {
        // Basic setup of page elements.
        //initializeBreadcrumbTrail();
        //drawLegend();
        //d3.select("#togglelegend").on("click", toggleLegend);

        // Bounding circle underneath the sunburst, to make it easier to detect
        // when the mouse leaves the parent g.
        vis.append("svg:circle")
            .attr("r", radius)
            .style("opacity", 0);

        // Turn the data into a d3 hierarchy and calculate the sums.
        var root = d3.hierarchy(json)
            .sum(function(d) { return d.size; })
            .sort(function(a, b) { return b.value - a.value; });

        // For efficiency, filter nodes to keep only those large enough to see.
        var nodes = partition(root).descendants()
            .filter(function(d) {
                return (d.x1 - d.x0 > 0.005); // 0.005 radians = 0.29 degrees
            });

        var path = vis.data([json]).selectAll("path")
            .data(nodes)
            .enter().append("svg:path")
            .attr("display", function(d) { return d.depth ? null : "none"; })
            .attr("d", arc)
            .attr("fill-rule", "evenodd")
            .style("fill", function(d) { return colors[d.data.name]; })
            .style("opacity", 1)
            .on("mouseover", mouseover);
        
        // Add the mouseleave handler to the bounding circle.
        d3.select("#container").on("mouseleave", mouseleave);

        // Get total size of the tree = value of root node from partition.
        totalSize = path.datum().value;
        };

        // Fade all but the current sequence, and show it in the breadcrumb trail.
        function mouseover(d) {
        var percentageString = d.value + " points";
        var explanationText = d.data.name;
        var level = "Total";
        if(!d.children) {
            if(d.value <= 3) {
                level = "Familiar";
            }else if(d.value <=6) {
                level = "Good";
            }else {
                level = "Expert";
            }
        };
        d3.select("#level")
            .text(level);
        d3.select("#explanationText")
            .text(explanationText);
        d3.select("#percentage")
            .text(percentageString);
        d3.select("#explanation")
            .style("visibility", "");

        var sequenceArray = d.ancestors().reverse();
        sequenceArray.shift(); // remove root node from the array

        updateBreadcrumbs(sequenceArray, percentageString);

        // Fade all the segments.
        d3.selectAll("#chart path")
            .style("opacity", 0.3);

        // Then highlight only those that are an ancestor of the current segment.
        vis.selectAll("#chart path")
            .filter(function(node) {
                        return (sequenceArray.indexOf(node) >= 0);
                    })
            .style("opacity", 1);
        }

        // Restore everything to full opacity when moving off the visualization.
        function mouseleave(d) {
        console.log(d)
        // Hide the breadcrumb trail
        // d3.select("#trail")
        //     .style("visibility", "hidden");

        // Deactivate all segments during transition.
        d3.selectAll("path").on("mouseover", null);

        // Transition each segment to full opacity and then reactivate it.
        d3.selectAll("path")
            .transition()
            //.duration(500)
            .style("opacity", 1)
            .on("end", function() {
                    d3.select(this).on("mouseover", mouseover);
                    });

        d3.select("#explanation")
            .style("visibility", "hidden");
        }

        function initializeBreadcrumbTrail() {
        // Add the svg area.
        var trail = d3.select("#sequence").append("svg:svg")
            .attr("width", width)
            .attr("height", 50)
            .attr("id", "trail");
        // Add the label at the end, for the percentage.
        trail.append("svg:text")
            .attr("id", "endlabel")
            .style("fill", "#000");
        }

        // Generate a string that describes the points of a breadcrumb polygon.
        function breadcrumbPoints(d, i) {
        var points = [];
        points.push("0,0");
        points.push(b.w + ",0");
        points.push(b.w + b.t + "," + (b.h / 2));
        points.push(b.w + "," + b.h);
        points.push("0," + b.h);
        if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
            points.push(b.t + "," + (b.h / 2));
        }
        return points.join(" ");
        }

        // Update the breadcrumb trail to show the current sequence and percentage.
        function updateBreadcrumbs(nodeArray, percentageString) {

        // Data join; key function combines name and depth (= position in sequence).
        var trail = d3.select("#trail")
            .selectAll("g")
            .data(nodeArray, function(d) { return d.data.name + d.depth; });

        // Remove exiting nodes.
        trail.exit().remove();
        //console.log(trail);
        // Add breadcrumb and label for entering nodes.
        var entering = trail.enter().append("svg:g");

        entering.append("svg:polygon")
            .attr("points", breadcrumbPoints)
            .style("fill", function(d) { return colors[d.data.name]; });

        entering.append("svg:text")
            .attr("x", (b.w + b.t) / 2)
            .attr("y", b.h / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .text(function(d) { return d.data.name; });

        // Merge enter and update selections; set position for all nodes.
        entering.merge(trail).attr("transform", function(d, i) {
            return "translate(" + i * (b.w + b.s) + ", 0)";
        });

        // Now move and update the percentage at the end.
        d3.select("#trail").select("#endlabel")
            .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
            .attr("y", b.h / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .text(percentageString);

        // Make the breadcrumb trail visible, if it's hidden.
        d3.select("#trail")
            .style("visibility", "");

        }

        function drawLegend() {

        // Dimensions of legend item: width, height, spacing, radius of rounded rect.
        var li = {
            w: 75, h: 30, s: 3, r: 3
        };

        var legend = d3.select("#legend").append("svg:svg")
            .attr("width", li.w)
            .attr("height", d3.keys(colors).length * (li.h + li.s));

        var g = legend.selectAll("g")
            .data(d3.entries(colors))
            .enter().append("svg:g")
            .attr("transform", function(d, i) {
                    return "translate(0," + i * (li.h + li.s) + ")";
                });

        g.append("svg:rect")
            .attr("rx", li.r)
            .attr("ry", li.r)
            .attr("width", li.w)
            .attr("height", li.h)
            .style("fill", function(d) { return d.value; });

        g.append("svg:text")
            .attr("x", li.w / 2)
            .attr("y", li.h / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .text(function(d) { return d.key; });
        }

        function toggleLegend() {
        var legend = d3.select("#legend");
        if (legend.style("visibility") == "hidden") {
            legend.style("visibility", "");
        } else {
            legend.style("visibility", "hidden");
        }
        }

        // Take a 2-column CSV and transform it into a hierarchical structure suitable
        // for a partition layout. The first column is a sequence of step names, from
        // root to leaf, separated by hyphens. The second column is a count of how 
        // often that sequence occurred.
        function buildHierarchy(csv) {
        var root = {"name": "root", "children": []};
        for (var i = 0; i < csv.length; i++) {
            var sequence = csv[i][0];
            var size = +csv[i][1];
            if (isNaN(size)) { // e.g. if this is a header row
            continue;
            }
            var parts = sequence.split("-");
            var currentNode = root;
            for (var j = 0; j < parts.length; j++) {
            var children = currentNode["children"];
            var nodeName = parts[j];
            var childNode;
            if (j + 1 < parts.length) {
        // Not yet at the end of the sequence; move down the tree.
            var foundChild = false;
            for (var k = 0; k < children.length; k++) {
            if (children[k]["name"] == nodeName) {
                childNode = children[k];
                foundChild = true;
                break;
            }
            }
        // If we don't already have a child node for this branch, create it.
            if (!foundChild) {
            childNode = {"name": nodeName, "children": []};
            children.push(childNode);
            }
            currentNode = childNode;
            } else {
            // Reached the end of the sequence; create a leaf node.
            childNode = {"name": nodeName, "size": size};
            children.push(childNode);
            }
            }
        }
        return root;
        };
    }
  }
}
</script>
<style lang="scss">
.profile {
    width:100%;
    min-height: calc(100% - 72px);
    background: #f5f5f5;
    overflow: auto;

    .profile-content {
        width:800px;
        background: white;
        overflow: hidden;
        margin: 30px auto;
        box-shadow: 0 0 0 1px rgba(0,0,0,.1), 0 2px 3px rgba(0,0,0,.2);

        .head {
            width:128px;
            height: 128px;
            background-clip: content-box;
            background-color: rgba(243,246,248,.94);
            border: 4px solid #fff;
            box-shadow: inset 0 1.5px 3px 0 rgba(0,0,0,.15), 0 1.5px 3px 0 rgba(0,0,0,.15);
            box-sizing: content-box;
            margin: auto;
            position: relative;
            border-radius: 50%;
            overflow: hidden;
            top:-64px;
        }

        .profile-basic-margin {
            margin-top: -80px;
        }

        .profile-basic {
            margin-bottom: 30px;
            padding: 30px 30px 0 20px;
            color:rgba(0,0,0,.7);
            font-size: 15px;
            margin-bottom: 20px;

            svg {
                vertical-align: top;
            }

            span {
                vertical-align: top;
                padding-right: 15px;
            }

            .float-right {
                float:right;
            }
        }

        .profile-skill-thumb {

            #sequence {
                display: none;

                text {
                    font-weight: 600;
                    fill: #fff;
                }
            }

            #sidebar {
                display: none;
            }

            #chart {
                position: relative;

                path {
                    stroke: #fff;
                }

                svg {
                    position: relative;
                    z-index: 99;
                }

                #explanation {
                    position: absolute;
                    top: calc(50% - 55px);
                    left: calc(50% - 70px);
                    width: 140px;
                    text-align: center;
                    color: #666;
                }
            }
        }

        .profile-block {
            margin-top: 30px;
            padding-top: 10px;
            border-top: 1px solid #cdcfd2;

            .summary {
                color: rgba(0,0,0,.55);
            }
        }
    }
}

#legend {
  padding: 10px 0 0 3px;
}

#percentage {
  font-size: 2em;
}

#test {
    width:400px;
    height:400px;
    float:left;
}
</style>

