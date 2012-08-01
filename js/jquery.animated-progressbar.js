(function($) {
    $.extend($.fn, {
        animatedProgressbar: function() {
            var progressBar = this;
            
			//Default values 
			var begin 	= 100;
			var end 	= 0;
			var delay	= 1000;
			var duration = 10000;

			if (progressBar.data("progressbar-begin") >= 0 && progressBar.data("progressbar-begin") <= 1) {
				begin = progressBar.data("progressbar-begin");
			}
			if (progressBar.data("progressbar-end") >= 0 && progressBar.data("progressbar-end") <= 1) {
				end = progressBar.data("progressbar-end");
			}
			if (progressBar.data("progressbar-delay") > 50 ) {
				delay = progressBar.data("progressbar-delay");
			}
			if ($(this).data("progressbar-duration") > 0 ) {
				duration = progressBar.data("progressbar-duration");
			}			
			var steps = duration / delay;
			progressBar.data("progressbar-steps", steps);

			var remainingSteps = steps;			
			progressBar.data("progressbar-remainingSteps", remainingSteps);

			progressBar.data("progressbar-originalWidth", progressBar.parent().width() * Math.abs(end - begin));
			progressBar.hide();				
			progressBar.animate({"width":progressBar.parent().width() * begin}, "0", function(){
				progressBar.data("progressbar-width", progressBar.parent().width() * begin);
				progressBar.show();
				step_animated_progressbar(progressBar);
			});
            return this;
		}
	});
	function step_animated_progressbar(elt) {
		//elt = this;
		var width = elt.data("progressbar-width");
		var originalWidth = elt.data("progressbar-originalWidth");
		var begin = elt.data("progressbar-begin");
		var end = elt.data("progressbar-end");
		var remainingSteps = elt.data("progressbar-remainingSteps");
		var delay = elt.data("progressbar-delay");
		var steps = elt.data("progressbar-steps");

		if (remainingSteps > 0) {
			if (begin > end) {
				var newWidth = width - (originalWidth / steps);
				if (newWidth< 0) {
					newWidth = 0;
				}
			}
			else {
				var newWidth = width + (originalWidth / steps);

			}

			elt.animate({"width": newWidth}, 0, function() {
				elt.data("progressbar-width", newWidth);
				remainingSteps--;
				elt.data("progressbar-remainingSteps", remainingSteps);
				setTimeout(function(){step_animated_progressbar(elt);}, delay);
			});
		}
	}
})(jQuery);