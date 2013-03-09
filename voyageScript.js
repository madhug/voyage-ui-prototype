	$(document).ready(function(){
		var width = 450;
	    var height = 450;
		var svg = d3.select("#chart").append("svg")
		.attr("class","ui-grid-a .ui-responsive");
		var ypos = 20
		d3.json(
          'data.json',
          function(data)
		  {
			images = svg.selectall("circle").data(data);
			images.enter().append("circle")
			.attr("href",function(d){return d.identity[0].items;});
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