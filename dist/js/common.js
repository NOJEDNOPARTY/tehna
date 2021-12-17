let common = {
	init: function() {
		common.navigation();
		common.main();
		common.carousel();
		common.submit();
	},
	navigation: function(){

		// header navigation functionality

		
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

		// filter trigger
		$('.filter-trigger').click(function(event){
			event.preventDefault();
			if($(window).width() < 993) {
				$(this).closest('.filter').toggleClass('open');
				$(this).closest('.filter').find('form').slideToggle('fast');
			}
		});
		
	},
	main: function(){

		const rotation = document.querySelector('.rotation');

		circlr(rotation)
		.scroll(true)
		.play()
		.on('show', n => {});

		
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
			}else {
				$('.search-popup').removeClass('open');
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

		// tabs 

		$('.tab-cnt-trigger').click(function(e){
			e.preventDefault();
			let tabCnt = '.' + $(this).attr('data-cnt');
			if($(window).width() > 767) {
				if(!$(this).hasClass('.active')) {
					$(this).closest('.tabs-block').find('.tabs-section a.active').removeClass('active')
					$(this).closest('.tabs-block').find('.tab-cnt').removeClass('active');
					$(tabCnt).addClass('active');
					$(this).addClass('active');
					var bLazy = new Blazy({});
				}
			}else {
				$(this).toggleClass('active');
				$(tabCnt).slideToggle('fast');
			}
		});



		// b-lazy

		var bLazy = new Blazy({});
		
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
		$('.tel-trigger').mask("+380(99) 999-99-99");

		

	},
	carousel: function(){
		let cardImages = $('.card-images-slider');

		cardImages.owlCarousel({
			loop:true,
			items: 1,
			margin: 0,
			nav: true,
			dots: false,
			autoHeight: true
		});


		let sliderTop = $('.slider-top-owl');

		sliderTop.owlCarousel({
			loop:false,
			items: 1,
			margin: 0,
			nav: false,
			dots: false,
			autoHeight: true,
			dotsContainer: '.slider-bottom-owl',
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
		});


		let sliderBottom = $('.slider-bottom-owl');

		sliderBottom.owlCarousel({
			loop:false,
			items: 6,
			margin: 20,
			nav: true,
			dots: false,
			responsive:{
				0:{
					items:2,
					margin: 10
				},
				500:{
					items:3
				},
				600:{
					items:4,
					margin: 15
				},
				993:{
					items:6
				},
			}
		});

		sliderTop.on('changed.owl.carousel', function(event) {
			let i = event.item.index;
			sliderBottom.trigger('to.owl.carousel', [i, 300]);

			$('.slider-bottom-owl .owl-item').removeClass('active-2');
			$(`.slider-bottom-owl .owl-item:nth-child(${i + 1})`).addClass('active-2');
			
		})

		$('.slider-bottom-owl .owl-item:first-child').addClass('active-2');

		$('.slider-bottom-owl .owl-item').click(function () {
			$('.slider-bottom-owl .owl-item').removeClass('active-2');
			$(this).addClass('active-2');
			sliderTop.trigger('to.owl.carousel', [$(this).index(), 300]);
		});

		$('.slider-top-item').fancybox({
			backFocus : false,
			hash   : false,
		});

		let articleSlider = $('.article-page-slider');

		articleSlider.owlCarousel({
			loop:true,
			items: 2,
			margin: 30,
			nav: true,
			dots: false,
			responsive:{
				0:{
					items:1,
					margin: 0
				},
				601:{
					items:2
				},
			}
		});

		let bannerBenefits = $('.banner-benefits');
		bannerBenefits.owlCarousel({
			loop:true,
			items: 3,
			margin: 0,
			nav: true,
			dots: false
		});

		let solutionSlider = $('.solution-slider-js');
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

		let solutionGallery = $('.solution-gallery-js');
		solutionGallery.owlCarousel({
			loop:true,
			items: 3,
			margin: 30,
			nav: true,
			dots: false,
			responsive:{
				0:{
					items:1,
					nav: false,
					dots: true
				},
				550:{
					items:2
				},
				768:{
					items:3
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

		$('.owl-carousel').on('translated.owl.carousel', function(event) {
			var bLazy = new Blazy({});
		})

		
	},
	submit: function(){

		let formSubmitButton = document.querySelectorAll('.submit-btn');

		formSubmitButton.forEach(function (button) {
			button.addEventListener("click", function (e) {
				let inputItems = button.closest('form').querySelectorAll('[required]');
				inputItems.forEach((item) => {
					item.classList.add('was-validate');
				});
			});
		});

		let inputs = document.querySelectorAll('.input__file');
		Array.prototype.forEach.call(inputs, function (input) {
		  let label = input.nextElementSibling,
			labelVal = label.querySelector('.input__file-button-text').innerText;
	  
		  input.addEventListener('change', function (e) {
			let countFiles = '';
			if (this.files && this.files.length >= 1)
			  countFiles = this.files.length;
	  
			if (countFiles)
			  label.querySelector('.input__file-button-text').innerText = 'Выбрано файлов: ' + countFiles;
			else
			  label.querySelector('.input__file-button-text').innerText = labelVal;
		  });
		});



		
	},
};

(function() {
	common.init();
}());

