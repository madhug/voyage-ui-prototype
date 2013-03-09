	$(document).ready(function(){
		var w = 960;
		var	h = 500;
		
		var force = d3.layout.force()
				.charge(-10000)
				.linkDistance(200)
				.size([w, h]);
		
		var svg = d3.select("#chart").append("svg");
		//.attr("class","ui-grid-a .ui-responsive");
		
		var color = d3.scale.category20();
		d3.json(
          'fdgTest.json',
          function(data) {
		  force
			  .nodes(data.nodes)
			  .links(data.links)
			  .start();

		  var link = svg.selectAll(".link")
			  .data(data.links)
			.enter().append("line")
			  .attr("class", "link")
			  .style("stroke-width", function(d) { return Math.sqrt(d.value); });

		  var node = svg.selectAll(".node")
			  .data(data.nodes)
			.enter().append("g")
			.attr("class", "node")
			.call(force.drag);
			
			var ahref = node.append("a")
			            .attr("href","#teaser")
						.attr("data-rel","popup");
			
			ahref.append("circle")
			  .attr("x","-8")
			  .attr("y","-8")
			  .attr("r", function(d)
			  {
				if(d.group == 1) return h/5;
				else return h/10;
			  })
			  .style("fill", function(d) { return color(d.group); });
			  
			
			ahref.append("text")
			  .attr("dx",-10)
			  .attr("dy",".35em")
			  .attr("class","black")
			  .text(function(d) { return d.name; });

		  force.on("tick", function() {
			link.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });

			node.attr("transform", function(d) 
			{ return "translate(" + d.x + "," + d.y + ")"; });
		  });//force.on()
		});//d3.json()
	});//ready(function)
	
		/*$(function() {
			$('div[data-role="dialog"]').live('pagebeforeshow', function(e, ui) {
				ui.prevPage.addClass("ui-dialog-background ");
			});
			$('div[data-role="dialog"]').live('pagehide', function(e, ui) {
				$(".ui-dialog-background ").removeClass("ui-dialog-background ");
			});
		});*/