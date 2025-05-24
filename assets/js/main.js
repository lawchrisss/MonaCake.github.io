/*
	Escape Velocity by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body   = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			noOpenerFade: true,
			alignment: 'center',
			detach: false
		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo h1').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// ───────────────────────────────────────────────────────────────────────────────
	//  Javascript that is newly added, Filter & Sort Products
	// ───────────────────────────────────────────────────────────────────────────────
	$(function(){
    const filterBtns   = document.querySelectorAll('.filter-tabs button');
    const priceRange   = document.getElementById('price-range');
    const priceValue   = document.getElementById('price-value');
    const productGrid  = document.getElementById('product-grid');
    const cards        = Array.from(productGrid.children);

    // Update label on slider move
    priceRange.addEventListener('input', () => {
      priceValue.textContent = `$${priceRange.value}`;
      applyFilterAndSort();
    });

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilterAndSort();
      });
    });

    function applyFilterAndSort() {
      const activeCat = document.querySelector('.filter-tabs button.active').dataset.cat;
      const maxPrice  = parseInt(priceRange.value, 10);

      cards.forEach(card => {
        const matchesCat   = (activeCat === 'all' || card.dataset.cat === activeCat);
        const withinPrice  = (parseFloat(card.dataset.price) <= maxPrice);
        card.style.display = (matchesCat && withinPrice) ? '' : 'none';
      });
    }

    // initialize
    applyFilterAndSort();
  });
})(jQuery);