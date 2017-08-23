var pairingApp = {};

pairingApp.key = "MDo2MDA1ZDVjYy00NDExLTExZTctODA5ZC04N2I2ZDY0M2RiNzY6b013WXVrWjBmQklFazJ6eUxuZnduVXVPbWtLQWpSQU1Dc3RW"

pairingApp.getWine = function(userChoice) {
    pairingApp.lcboWine = $.ajax({
        url: "https://lcboapi.com/products",
        method: "GET",
        dataType: "json",
        data: {
            access_key: pairingApp.key,
            q: userChoice,
            per_page: 100, 
            page: 1
        }
    })

    $.when(pairingApp.lcboWine).done(function(wineResult){
        var finalResults = wineResult.result;
        pairingApp.getWineTwo(finalResults, userChoice)
    })
};

pairingApp.getWineTwo = function(firstResponse, userChoice) {
    pairingApp.lcboWineTwo = $.ajax({
        url: "https://lcboapi.com/products",
        method: "GET",
        dataType: "json",
        data: {
            access_key: pairingApp.key,
            q: userChoice,
            per_page: 100, 
            page: 2
        }
    })

    $.when(pairingApp.lcboWineTwo).done(function(wineResultTwo){
        var finalResultsTwo = wineResultTwo.result;
        pairingApp.getWineThree(finalResultsTwo, firstResponse, userChoice)
    })
};

pairingApp.getWineThree = function(secondResponse, firstResponse, userChoice) {
    pairingApp.lcboWineThree = $.ajax({
        url: "https://lcboapi.com/products",
        method: "GET",
        dataType: "json",
        data: {
            access_key: pairingApp.key,
            q: userChoice,
            per_page: 100, 
            page: 3
        }
    })

    $.when(pairingApp.lcboWineThree).done(function(wineResultThree){
        var finalResultsThree = wineResultThree.result;
        var finalFrontier = [...finalResultsThree, ...secondResponse, ...firstResponse]
        pairingApp.displayWine(finalFrontier);
    });
};

pairingApp.pairings = {
	Salad: ['Pinot Noir','Rosé', 'Chardonnay', 'Sauvignon Blanc'],
	Meat: ['Cabernet Sauvignon', 'Merlot', 'Malbec'],
	Cheese: ['Port', 'Amarone', 'Montepulciano', 'Pinot Grigio'],
	Spicy: ['Sauvignon Blanc', 'Riesling', 'Syrah'],
	Pasta: ['Montepulciano', 'Sangiovese', 'Chianti', 'Sauvignon Blanc'],
	Seafood: ['Pinot Noir', 'Riesling', 'Prosecco', 'Chardonnay']
}

pairingApp.displayWine = function(wines) {
	var filteredWines = [];
	var pairedWines = pairingApp.pairings[pairingApp.flavour]; 
	var finalWines = [];

	filteredWines = wines.filter(function(wine) {
		return wine.primary_category === "Wine" &&
			   wine.package_unit_type === "bottle" 
			   wine.image_url !== null
		});

	pairedWines.forEach(function(pairing) {
		filteredWines.forEach(function(wine) {
			if (wine.name.indexOf(pairing) > 0) {
				finalWines.push(wine); 
			} else if (wine.varietal !== null && wine.varietal.indexOf(pairing) > 0) {
				finalWines.push(wine);
			}  else if (wine.origin !== null && wine.origin.indexOf(pairing) > 0) {
				finalWines.push(wine);
			} else if (wine.secondary_category !== null && wine.secondary_category.indexOf(pairing) > 0) {
				finalWines.push(wine);
			}

		});
	}); 

	 console.log(finalWines);
	 finalWines.forEach(function(wineBottle){
		var title = $("<h2>").text(wineBottle.name);
	 	var image = $("<img>").attr("src", wineBottle.image_url).addClass("border");
	 	var cents = $("<p>").append("$").append(wineBottle.regular_price_in_cents/100).append(" | ").append("LCBO #").append(wineBottle.id);
	 	var origin = $("<p>").addClass("origin").append(wineBottle.origin);
	 	var notes = $("<p>").text(wineBottle.tasting_note);
		var container = $("<div>").addClass("wine").addClass("clearfix").append(image, title, cents, notes, origin);
		$("#wines").append(container);
 	})
}

$('a[href*=#]:not([href=#])').hide();

pairingApp.init = function() {

	$("#menu").on("change", function(){
		$("#fade p").animate({ opacity: 1}, 3000);
		$(".intro").hide();
		var userChoice = $(this).val();
		$("#wines").empty();
		pairingApp.flavour = userChoice;

		if(userChoice === "Seafood") {
			pairingApp.getWine("Wine");
			$('a[href*=#]:not([href=#])').show();
			$(".pair .paired").html("For fish with lots of flavour, go for a full-flavoured wine like Chardonnay. For a lighter fish, a Sauvignon Blanc is recommended. Salmon is rich and fatty, so a Pinot Noir is suggested, as it is light enough to go with fish and flavourful enough to keep up. A Champagne or Riesling pair well with crustaceans or caviar.");
		}

		if(userChoice === "Meat") {
			pairingApp.getWine("Wine");
			$('a[href*=#]:not([href=#])').show();
			$(".pair .paired").html("For a basic red meat dish such as steak or a fatty meat, you'll want a wine with lots of tannins to balance the fat. Great wine choices include Caberenet Sauvignon, Merlot and Malbec. For a dish with some spice such as peppered steak, a Shiraz is recommended. A Beaujolais goes well with pork while adding a subtle touch of sweetness and interest to the dining experience. ");
		} 


		if(userChoice === "Salad") {
			pairingApp.getWine("Wine");
			$('a[href*=#]:not([href=#])').show();
			$(".pair .paired").html("For water filled fruits and veggies, try a Rosé. A fuller wine like Chardonnay is a perfect match for green vegetables. The earthyness of mushrooms and potatoes pair exceptionally well with a Pinot Noir. For acidic fruits and veggies, such as tomatoes, pair with mildly acidic wines such as a Sauvignon Blanc, Beaujolais, or a Chianti. ");
		} 

		if(userChoice === "Pasta") {
			pairingApp.getWine("Wine");
			$('a[href*=#]:not([href=#])').show();
			$(".pair .paired").html("It's important to keep in mind that pasta is a blank canvas upon which other ingredients draw, so the majority of the time you will match the wine to the other, more assertive flavours. The flavours of lasagna pair well to heartier wines such as a Chianti or Montepulciano. To cut the richness of the sauce in cream based dishes, go for a Sauvignon Blanc. Match the acidity in tomato sauce with wines such as a Chianti or Sangiovese. When the sauce doesn't have dramatic flavors, go for a Pinot Grigio. ");
		}

		if(userChoice === "Cheese") {
			pairingApp.getWine("Wine");
			$('a[href*=#]:not([href=#])').show();
			$(".pair .paired").html("Blue cheese is dessert wine territory, so try a Port. An Amarone is the perfect partner for highly flavoured tastes like parmigiano reggiano. Other hard, flavourful cheeses go well with a full, tannic wine such as Cabernet Sauvignon or a Montepulciano. For soft cheese like brie and chevre, go for a Pinot Grigio.");
		}

		if(userChoice === "Spicy") {
			pairingApp.getWine("Wine");
			$('a[href*=#]:not([href=#])').show();
			$(".pair .paired").html("Spicy foods have a reputation as being tough to pair with wines, but opportunity abounds in these bold flavours. Pair a Sauvignon Blanc with chile and lime infused flavours of Mexican and Southwestern dishes. Match a Riesling with the sweet-hot flavours of Thai and Chinese food. A Shiraz will compliment the earth, brown spices of Middle Eastern dishes. ");
		}
		pairingApp.getWine();
	});
};

        $(function() {
            $('a[href*=#]:not([href=#])').click(function() {

                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 1500);
                        return false;
                    }
                }
            });
        });

$(function(){
	pairingApp.init();
})

