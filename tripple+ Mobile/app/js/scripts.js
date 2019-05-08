$(document).ready(function(){
	
	$('.js--tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('.tab-link').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	});


	$('.js--remove-tile').on('click', function(e) {
		e.preventDefault();

		var count = $('.watering-options tile').length - 1;
		console.log($('.watering-options div').length);
		var width = $('.watering-options .tile:first-of-type').width();
		

		$(this).closest('.tile').remove();

		if ($(window).width() > 991) {
			
			if (count == 4) {
				$('.watering-options .tile:nth-last-child(-n+2)').css('flex', '1 0 44%');
			}
	
			if (count == 3) {
				$('.watering-options .tile').css('flex', '1 0 28%');
			}

			if (count == 1) {
				$('.watering-options .tile').css('flex', '0 0 47%');
			}
		}

		if ($(window).width() < 991) {
			$('.watering-options .tile:last-child').css('flex', '0 0 ' + (width + 60) + 'px');
		}
		
	});
})