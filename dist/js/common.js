let common = {
	init: function() {
		common.navigation();
		common.main();
		common.carousel();
		common.submit();
	},
	navigation: function(){

		
		function headerFixing() {
			if($('.header').hasClass('header-simple')){
				$('body').css({'padding-top': $('.header').outerHeight()})
			}else {
				$('body').css({'padding-top': $('.header-top').outerHeight()})
			}
		};

		headerFixing();

		$(window).scroll(function() {
			headerFixing();
		});

		$( window ).resize(function() {
			headerFixing();
		});

		$('.header-nav-trigger').click(function(e){
			if($(window).width() < 1201 && $(window).width() > 767) {
				e.preventDefault();
				$('.header-nav-trigger').removeClass('active');
				$(this).toggleClass('active');
			}
			if($(window).width() < 768) {
				e.preventDefault();
				$(this).toggleClass('open');
				$(this).find('.header-nav-submenu').slideToggle('fast');
			}
		});

		function menuStatusCheck(){
			if($('.menu-trigger').hasClass('open')) {
				$('.header-nav-trigger').removeClass('open');
				if($(window).width() < 768) {
					$('.header-nav-submenu').css('display', 'none');
				}
			}
		}

		jQuery(function($){
			$(document).mouseup(function (e){ 
				var menu = $('.header-nav-trigger');
				if (!menu.is(e.target) && menu.has(e.target).length === 0) { 
					if($(window).width() < 1201 && $(window).width() > 767) {
						$('.header-nav-trigger').removeClass('active');
					}
				}
			});
		});

		// menu-trigger

		$('.menu-trigger').click(function(event){
			event.preventDefault();
			$('.header').toggleClass('open');
			$(this).toggleClass('open');
			$('body').toggleClass('hidden');
			menuStatusCheck();
		});
		















	},
	main: function(){

		// link-select

		$('.link-select .link-select-active').click(function(event){
			event.preventDefault();
			$(this).closest('.link-select').toggleClass('active');
			$(this).closest('.link-select').find('.link-select-hidden').fadeToggle('fast');
		});
		$('.call-search').click(function(event){
			event.preventDefault();
			if(!$('.search-popup').hasClass('open') && !$('.popup-wrapper').hasClass('active')){
				$('.search-popup').addClass('open');
				$('body').addClass('hidden');
			}else {
				$('.search-popup').removeClass('open');
				$('body').removeClass('hidden');
			}
		});

		jQuery(function($){
			$(document).mouseup(function (e){
				let linkSelect = $(".link-select");
				let searchPopup = $(".search-popup");
				let searchPopupTrigger = $(".call-search");

				if (!linkSelect.is(e.target)
					&& linkSelect.has(e.target).length === 0) {
					linkSelect.removeClass('active');
					linkSelect.find('.link-select-hidden').fadeOut('fast');
				}
				if (!searchPopup.is(e.target)
					&& !searchPopupTrigger.is(e.target) 
					&& searchPopup.has(e.target).length === 0
					&& searchPopupTrigger.has(e.target).length === 0) {
					$('.search-popup').removeClass('open');
				}
			});
		});











		// b-lazy

		var bLazy = new Blazy({});

		// tabs 

		$('.tabs-section a').click(function(e){
			e.preventDefault();
			if(!$(this).hasClass('.active')) {
				var tabCnt = '.' + $(this).attr('data-cnt');
				$(this).closest('.tabs-block').find('.tabs-section a.active').removeClass('active')
				$(this).closest('.tabs-block').find('.tab-cnt').removeClass('active')
				$(tabCnt).addClass('active')
				$(this).addClass('active');
				var bLazy = new Blazy({});
			}
		});

		// click in another place

		jQuery(function($){
			$(document).mouseup(function (e){ 
				var popup = $(".popup");
				var popupLayout = $(".popup-layout");
				if (!popup.is(e.target) && popupLayout.is(e.target) 
					&& popup.has(e.target).length === 0) { 
					$('.popup-wrapper').removeClass('active');
					$('body').removeClass('hidden');
				}
			});
		});

		// form row change

		$('.form-row input').keyup(function(){
			if($(this).val() == '') {
				$(this).closest('.form-row').removeClass('active')
			}else {$(this).closest('.form-row').addClass('active')}
		});

		// popups call
		$('.call-popup').click(function(event){
			event.preventDefault();
			var popup  = '#' + $(this).attr('data-popup');
			$('.header').removeClass('open');
			$('.menu-trigger').removeClass('open');
			$('.header-nav-trigger').removeClass('open');
			if($(window).width() < 768) {
				$('.header-nav-submenu').css('display', 'none');
			}
			$('.popup-wrapper').removeClass('active');
			$('body').addClass('hidden');
			$(popup).addClass('active');
		});
		
		$('.popup-close').click(function(){
			$(this).closest('.popup-wrapper').removeClass('active');
			$('body').removeClass('hidden');
		});

		// phone mask
		$('.tel-trigger').mask("+7(999) 999-99-99");

		

	},
	carousel: function(){
		let bannerBenefits = $('.banner-benefits');
		bannerBenefits.owlCarousel({
			loop:true,
			items: 3,
			margin: 0,
			nav: true,
			dots: false
		});

		let solutionSlider = $('.solution-slider');
		solutionSlider.owlCarousel({
			loop:true,
			items: 1,
			margin: 0,
			nav: true,
			dots: false,
			responsive:{
				0:{
					items:1,
					nav: false,
					dots: true
				},
				993:{
					items:1
				},
			}
		});

		
		let newsBlog = $('.news-blog-slider');
		let newsPrev = $('.news-prev-slider');

		function newsBlogInit(){
			newsBlog.owlCarousel({
				loop:true,
				items: 1,
				margin: 0,
				nav: false,
				dots: true
			});
			newsPrev.owlCarousel({
				loop:true,
				items: 1,
				margin: 15,
				nav: false,
				dots: true
			});
		}
		$(window).scroll(function() {
			if($(window).width() < 601) {
				newsBlogInit();
			}else {
				newsBlog.trigger('destroy.owl.carousel');
				newsPrev.trigger('destroy.owl.carousel');
			}
		});
		$( window ).resize(function() {
			if($(window).width() < 601) {
				newsBlogInit();
			}else {
				newsBlog.trigger('destroy.owl.carousel');
				newsPrev.trigger('destroy.owl.carousel');
			}
		});































		var cardImages = $('.card-slider-images');
		var cardImagesDots = $('.card-slider-images-dots');

		cardImagesDots.owlCarousel({
			loop:false,
			items: 4,
			margin: 10,
			nav: true,
			dots: false,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			responsive:{
				0:{
					items:2,
				},
				319:{
					items:3
				},
				456:{
					items:4
				},
			}
		});

		cardImages.owlCarousel({
			loop:false,
			items: 1,
			margin: 0,
			nav: false,
			dots: false,
			autoHeight: true,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			dotsContainer: '.card-slider-images-dots'
		});

		$('.card-slider-images-dots .owl-dot.card-slider-dots-img').click(function () {
			cardImages.trigger('to.owl.carousel', [$(this).parent().index(), 300]);
		});





		var revSlider = $('.rev-slider');

		revSlider.owlCarousel({
			loop:true,
			items: 1,
			margin:0,
			nav: true,
			dots: true,
			autoHeight: true,
			responsive:{
				0:{
					items:1,
				},
				551:{
					items:1
				},
			}
		});

		$('.owl-carousel').on('translated.owl.carousel', function(event) {
			var bLazy = new Blazy({});
		})

		
	},
	submit: function(){
		$("form:not(.product-filter-checkers)").submit(function(event){
			event.preventDefault();
			formField = $(this).find(".required-field")
			thanksTrigger = $(this).find('.thanks-page-trigger');

			console.log()
			
			formField.each(function(){
				var thisEl = $(this);
				if (! thisEl.val().length) {
					thisEl.addClass('error')
					setTimeout(function(){
						thisEl.removeClass('error')
					}, 3000)
					thisEl.addClass('form-error')
				}else { thisEl.removeClass('form-error')}
			});	
			if(formField.hasClass('form-error') == false){
				if(!thanksTrigger.hasClass('thanks-page-trigger')) {
					$('.popup-wrapper').hide();
					$('.popup-wrapper').removeClass('active');
					$('#thanksPopup').fadeIn('fast');
					$('body').addClass('hidden');
					var bLazy = new Blazy({});
				}else {
					window.location.href = "./thanks.html";
				}
			}
		});

		let formSubmitButton = document.querySelectorAll('.submit-btn');

		formSubmitButton.forEach(function (button) {
			button.addEventListener("click", function (e) {
				let inputItems = button.closest('form').querySelectorAll('[required]');
				inputItems.forEach((item) => {
					item.classList.add('was-validate');
				});
			});
		});

		
	},
};

(function() {
	common.init();
}());

