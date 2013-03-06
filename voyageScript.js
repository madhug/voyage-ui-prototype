	$(document).ready(function(){
		var svg = d3.select("#chart").append("svg");
		var ypos = 20
		d3.json(
          'data.json',
          function(data){
            var identity = svg.append("g")
                
            identity.selectAll("text")
			.data(data.data)
			.enter().append("text")
			.attr("x",20)
			.attr("y",function(){ypos += parseInt(20); return ypos;})
			.text(function(d) {
				return d.identity;
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