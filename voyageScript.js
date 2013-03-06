	$(document).ready(function(){
		var svg = d3.select("#chart").append("svg").attr("width",screen.width).attr("height",screen.height);
		var ypos = 20
		d3.json(
          'data.json',
          function(data){
            var force = d3.layout.force()
				.charge(-10)
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
				.size([screen.width,screen.height])
				.linkDistance(75)
				.start();
				
				var node = svg.selectAll(".node")
								.data(data.data)
								.enter().append("g").attr("class","node")
								.append("text")
								.text(function(d) {
									return d.identity;
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
					link.attr("x1", function(d) { return d.source.x; })
						.attr("y1", function(d) { return d.source.y; })
						.attr("x2", function(d) { return d.target.x; })
						.attr("y2", function(d) { return d.target.y; });

				node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });		  
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