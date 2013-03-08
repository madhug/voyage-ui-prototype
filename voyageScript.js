	$(document).ready(function(){
		var width = 450;
	    var height = 450;
		var svg = d3.select("#chart").append("svg")
		.attr("class","ui-grid-a");
		var ypos = 20
		d3.json(
          'data.json',
          function(data){
            var force = d3.layout.force()
				.gravity(.05)
				.distance(100)
				.charge(-100)
				.nodes(
					data.data
				)
				.links(
					[
						{"source":1,"target":0,"value":1},
						{"source":2,"target":1,"value":1},
						{"source":0,"target":2,"value":1}
					]
				)
				.size([width,height])
				.linkDistance(75)
				.start();

				var node = svg.selectAll(".node")
								.data(data.data)
								.enter().append("g").attr("class","node")
								.append("image")
								.attr("width",300)
								.attr("height",80)
								.attr("xlink:href",
								function(d) {
									return d.image;
								})
								.call(force.drag);
				
				  var link = svg.selectAll(".link")
								  .data([
										{"source":1,"target":0,"value":1},
										{"source":2,"target":1,"value":1},
										{"source":0,"target":2,"value":1}
									])
								  .enter().append("line")
								  .attr("class", "link")
									  
				force.on("tick", function() {
					node.attr("transform", function(d) 
					{ 
						var x = Math.min(width, d.x);
						var y = Math.min(height, d.y);
						return "translate(" + x + "," + y + ")"; 
					});		  
					
					link.attr("x1", function(d) { return d.source.x; })
							.attr("y1", function(d) { return d.source.y; })
							.attr("x2", function(d) { return d.target.x; })
							.attr("y2", function(d) { return d.target.y; });
				});
			});
		});
		$(function() {
			$('div[data-role="dialog"]').live('pagebeforeshow', function(e, ui) {
				ui.prevPage.addClass("ui-dialog-background ");
			});
			$('div[data-role="dialog"]').live('pagehide', function(e, ui) {
				$(".ui-dialog-background ").removeClass("ui-dialog-background ");
			});
		});