(function($) {

  	// Aggiunta di un listener per gli elementi "submit on change" <select> e <input>.
  	$(document).on('change', '[data-submit-on-change]', function() {
    var $input = $(this), target = $input.attr('data-submit-on-change');
    $(target).submit();
  });

   	// Aggiunta di un listener per gli elementi "Ajax load on submit" <form>.
  	$(document).on('submit', '[data-submit-load]', function(e) {
    e.preventDefault();
    var $form = $(this),
        url = $form.attr('action'),
        target = $form.attr('data-submit-load'),
        data = $form.serialize();
    
    loadAndUpdateHistoryState(url, target, data);
  });

  	// Aggiunta di un listener per gli elementi "Ajax load on click" <a>.
  	$(document).on('click', '[data-click-load]', function(e) {
    e.preventDefault();
    var $link = $(this),
        url = $link.attr('href'),
        target = $link.attr('data-click-load');

    loadAndUpdateHistoryState(url, target, '');
  });

  	// Esecuzione di un caricamento Ajax utilizzando jQuery con i parametri forniti e 
  	// aggiornamento dello stato della cronologia.
  	function loadAndUpdateHistoryState(url, target, data) {
    	$(target).load(url + ' ' + target, data, function() {
      		window.history.pushState({}, null, url + '?' + data);
    	});
  	}
  
  	// Utilizzando l'indirizzo fornito, ottieni la stima della tariffa di spedizione più 
  	// economica utilizzando l'API Ajax e aggiorna l'elemento di destinazione specificato 
  	// con un messaggio.
  	window.fetchShippingRateEstimate = function(target, shipping_address) {
    if(!shipping_address) return;
    $.ajax({
      	url: '/cart/shipping_rates.json',
      	data: $.serialize({ shipping_address: shipping_address }),
      	success: function(shipping_rates) {
        	if(shipping_rates.length === 0) return;
        	var shipping_rate = shipping_rates[0];
        	$(target).html(
          	'<em>' +
            shipping_rate.name + ' ($' + shipping_rate.price + ') to ' +
            shipping_address.city + ', ' + shipping_address.province +
          	'</em>'
        	);
      	}
    	});
  	};
  
  	// Rimozione della classe "no-js" dall'elemento body, poiché JS è attualmente disponibile 
  	// e inizializzato.
  	$('body').removeClass('no-js');

})(jQuery);