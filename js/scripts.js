
var drinkList = [
	[
		"Vanilla Latte",
		"A lovely foamy latte made with whole milk, with just a dash of Vanilla. (Comes with 2 shots of coffee)",
		"vanillaLatte",
		5.59
	],
	[
		"Hot Chocolate",
		"A delicious and chocolatey hot drink topped with decadent whipped cream.",
		"hotChocolate",
		3.29
	],
	[
		"Strawberry Smoothie",
		"A chilled beverage with no less than 8 strawberries and a dash of apple juice blended with ice.",
		"strawberrySmoothie",
		7.89
	],
	[
		"Iced Mocha",
		"A lovely iced chocolate mocha with whipped cream. (Comes with 2 shots of coffee)",
		"icedMocha",
		6.39
	]
]

var numDrinks = [0, 0, 0, 0];
var currentHighlight = "";
var highlighted = false;
var hidden = true;
var arrayTarget = 0;
var grandTotal = 0;
var totalDrinks = 0;

Orderprefix = "Drinks"; 
cartName = this.Orderprefix + "order"; 
shippingRates = this.Orderprefix + "shipping-rates";
total = this.Orderprefix + "total"; 


$(function(){
    
    this.storage = sessionStorage; 
    createCart();
    
	$('#image_preview img').hide();
	createDrinkList();
	$('#drink_list td').click(changeDrink);
	$('#add_item').click(addToCart);
	$('#remove_item').click(removeFromCart);
	$('#clear_cart').click(clearCart);
	rowColor();
	
    displayCart1();
    handleCheckoutOrderForm();
    displayUserDetails();
});


function	_validateForm ( form ) {
			var self = this;
			var fields = self.requiredFields;
			var $visibleSet = form.find( "fieldset:visible" );
			var valid = true;

            form.find( ".message" ).remove();

		  $visibleSet.each(function() {

			$( this ).find( ":input" ).each(function() {
				var $input = $( this );
                var type = $input.data( "type" );
				var msg = $input.data( "message" );

				if( type == "string" ) {
					if( $input.val() == fields.str.value ) {
						$( "<span class='message'/>" ).text( msg ).
						insertBefore( $input );

						valid = false;
					}
				} else {
					if( !fields.expression.value.test( $input.val() ) ) {
						$( "<span class='message'/>" ).text( msg ).
						insertBefore( $input );

						valid = false;
					}
				}

			});
		  });

			return valid;
}


function saveData ( form ) {
			var self = this;
			var $visibleSet = $( "fieldset" );
            console.log("hi" + $visibleSet);
			$visibleSet.each(function() {
                console.log("hi1");
                var $set = $( this );
                console.log("hi2");
				if( $set.is( "#fieldset-billing" ) ) {
                     console.log("hi33");
					var name = $( "#name", $set ).val();
					var email = $( "#email", $set ).val();
					var city = $( "#city", $set ).val();
					var address = $( "#address", $set ).val();
					var zip = $( "#zip", $set ).val();
					var country = $( "#country", $set ).val();
                     console.log(country);   
					sessionStorage.setItem( "name-payment", name );
					sessionStorage.setItem( "email-payment", email );
					sessionStorage.setItem( "city-payment", city );
					sessionStorage.setItem( "address-payment", address );
					sessionStorage.setItem( "zip-payment", zip );
					sessionStorage.setItem( "country-payment", country );
                } else {
 					var sName = $( "#sname", $set ).val();
					var sEmail = $( "#semail", $set ).val();
					var sCity = $( "#scity", $set ).val();
					var sAddress = $( "#saddress", $set ).val();
					var sZip = $( "#szip", $set ).val();
					var sCountry = $( "#scountry", $set ).val();
                    console.log(sName);    
					sessionStorage.setItem( "name-residence", sName );
					sessionStorage.setItem( "email-residence", sEmail );
					sessionStorage.setItem( "city-residence", sCity );
					sessionStorage.setItem( "address-residence", sAddress );
					sessionStorage.setItem( "zip-residence", sZip );
					sessionStorage.setItem( "country-residence", sCountry );

				}
			});
}


function displayUserDetails () {
            this.$userDetails = $( "#user-details-content" ); 
			if( this.$userDetails.length ) {
				if( sessionStorage.getItem( "name-residence" ) == null ) {
					var name = sessionStorage.getItem( "name-payment" );
					var email = sessionStorage.getItem( "email-payment" );
					var city = sessionStorage.getItem( "city-payment" );
					var address = sessionStorage.getItem( "address-payment" );
					var zip = sessionStorage.getItem( "zip-payment" );
					var country = sessionStorage.getItem( "country-payment" );
                    console.log(name + " " + email);    
					var html = "<div class='detail'>";
						html += "<h2>Billing and Shipping</h2>";
						html += "<ul>";
						html += "<li>" + name + "</li>";
						html += "<li>" + email + "</li>";
						html += "<li>" + city + "</li>";
						html += "<li>" + address + "</li>";
						html += "<li>" + zip + "</li>";
						html += "<li>" + country + "</li>";
						html += "</ul></div>";

					this.$userDetails[0].innerHTML = html;
				} else {
					var name = sessionStorage.getItem( "name-payment" );
					var email = sessionStorage.getItem( "email-payment" );
					var city = sessionStorage.getItem( "city-payment" );
					var address = sessionStorage.getItem( "address-payment" );
					var zip = sessionStorage.getItem( "zip-payment" );
					var country = sessionStorage.getItem( "country-payment" );
                        
					var sName = sessionStorage.getItem( "name-residence");
					var sEmail = sessionStorage.getItem( "email-residence" );
					var sCity = sessionStorage.getItem( "city-residence" );
					var sAddress = sessionStorage.getItem( "address-residence" );
					var sZip = sessionStorage.getItem( "zip-residence" );
					var sCountry = sessionStorage.getItem( "country-residence" );
                    console.log(name + " " + email);    
					var html = "<div class='detail'>";
						html += "<h2>Billing</h2>";
						html += "<ul>";
						html += "<li>" + name + "</li>";
						html += "<li>" + email + "</li>";
						html += "<li>" + city + "</li>";
						html += "<li>" + address + "</li>";
						html += "<li>" + zip + "</li>";
						html += "<li>" + country + "</li>";
						html += "</ul></div>";

						html += "<div class='detail right'>";
						html += "<h2>Shipping</h2>";
						html += "<ul>";
						html += "<li>" + sName + "</li>";
						html += "<li>" + sEmail + "</li>";
						html += "<li>" + sCity + "</li>";
						html += "<li>" + sAddress + "</li>";
						html += "<li>" + sZip + "</li>";
						html += "<li>" + sCountry + "</li>";
						html += "</ul></div>";

					this.$userDetails[0].innerHTML = html;

				}
			}
}


function handleCheckoutOrderForm () {
		var self = this;
        self.$checkoutOrderForm = $( "#checkout-order-form" ); // Checkout user details form
    
			if( self.$checkoutOrderForm.length ) {
				var $sameAsBilling = $( "#same-as-billing" );
				$sameAsBilling.on( "change", function() {
					var $check = $( this );
					if( $check.prop( "checked" ) ) {
						$( "#fieldset-shipping" ).slideUp( "normal" );
					} else {
						$( "#fieldset-shipping" ).slideDown( "normal" );
					}
				});

				self.$checkoutOrderForm.on( "submit", function() {
					var $form = $( this );
					var valid = true;
                    console.log("validate " + valid);    
					if( !valid ) {
						return valid;
					} else {
						self.saveData( $form );
					}
				});
			}
}


		
function createCart() {

 			if( sessionStorage.getItem( this.cartName ) === null ) {
 				var cart = {};
				cart.items = [];
                sessionStorage.setItem( this.cartName, JSON.stringify( cart ) );
			}
}

function changeDrink() {
		arrayTarget = $(this).attr('rel');
		var picSrc = "images/" + drinkList[arrayTarget][2] + ".jpg";
		$('#image_preview img').attr('src', picSrc);
		if(hidden){
			$('#image_preview img').show();
			hidden = false;	
		}
		$('p.drink_name').html(drinkList[arrayTarget][0]);
		$('p.drink_desc').html(drinkList[arrayTarget][1]);
		$('p.drink_price').html("$" + drinkList[arrayTarget][3]);
		var thisClass = $(this).attr('class');
		highlightIt(thisClass);
}

function highlightIt(thisClass){
	if (currentHighlight != ""){
		$(currentHighlight).removeClass('highlight');
	}
	$('p.' + thisClass).addClass('highlight');
	currentHighlight = 'p.' + thisClass;
	highlighted = true;
}

function createDrinkList(){
	for (var i = 0; i < drinkList.length; i++){
		
		//drink_list table
		$('#drink_list').append('<tr><td class="drink_name" rel="' + i + '">' + drinkList[i][0] + '</td><td class="drink_desc" rel="' + i + '">' + drinkList[i][1] + '</td><td class="drink_price" rel="' + i + '">$' + drinkList[i][3] + '</td></tr>');
	}
}


function	displayCart1 () {
    $('#shopping_cart tbody').empty();
				var cart = JSON.parse( sessionStorage.getItem( this.cartName ) );
				var items = cart.items, numitems = 0, totalDrinks = 0, grandTotal =0 ;
                console.log("displaye1 " +cart + "  "  + this.cartName)
                
                var hashitem = new Object();
                var menu = new Array();
                var pricemneu = new Array();
                if( items.length != 0 ) {
                    for( var k = 0; k < items.length; ++k ) {
                        var item = items[k];
						var product = item.product;
                        hashitem[product] = 0;
 
                    }
                }
    
    	       if( items.length != 0 ) {
                    for( var k = 0; k < items.length; ++k ) {
                        var item = items[k];
						var product = item.product;
                        var price = item.price;
                        if(hashitem[product]  == 0){
                            hashitem[product] = 1;
                            menu.push(product);
                            pricemneu.push(price);
                            numitems++;
                        }
                        else{
                            hashitem[product] = hashitem[product] + 1;
                        }
                    }
               }
    
                for(var  k = 0; k < numitems; k++) {
                    
                    console.log("items " + menu[k] + " " + pricemneu[k] + "  " + hashitem[menu[k]] );
                     $('#shopping_cart tbody').append('<tr><td>' +menu[k] + '</td><td class="num_drinks" class="' + 
                                k + '">' + hashitem[menu[k]] + '</td><td class="drink_price">' +   pricemneu[k] 
                                + '</td></tr>');
                    
                    totalDrinks += hashitem[menu[k]];
	               grandTotal += pricemneu[k] * hashitem[menu[k]];
                    
                }
    
	$('#drinks_total').html(totalDrinks);
	$('#grand_total').html('$' + grandTotal.toFixed(2));

}



function addStorage ( values ) {
			var cart = sessionStorage.getItem( this.cartName );
            console.log(cart);
			var cartObject = JSON.parse( cart );
			var cartCopy = cartObject;
			var items = cartCopy.items;
			items.push( values );
			sessionStorage.setItem( this.cartName, JSON.stringify( cartCopy ) );
}



function _removeFromCart ( values ) {
			var cart = sessionStorage.getItem( this.cartName );
    console.log(values);
           
			var cartObject = JSON.parse( cart );
			var cartCopy = cartObject;
			var items = cartCopy.items;
            var items1 = [];
             console.log(cart);
    
             console.log(items.length);
            
            for( var k = 0; k < items.length; k++ ) {
                
                var val1 =  items.pop();
                console.log(k);
                console.log(val1.product);
                console.log(values.product);
                
                
                if(val1.product == values.product)
                    break;
                items1.push(val1);
            }
    
            for(k =0; k < items1.length; k++){
                var val1 = items1.pop();
                items.push(val1);
            }

			sessionStorage.setItem( this.cartName, JSON.stringify( cartCopy ) );
}




function addtolocalstoarge (itemnumber) {
        var self = this;
        createCart();
    
        name = drinkList[itemnumber][0];
        price =  drinkList[itemnumber][3];
        quantity = 1;
    
        addStorage({
						product: name,
						price: price,
						qty: quantity
            });
}


function removeFromlocalstoarge (itemnumber) {
        var self = this;
        createCart();
    
        name = drinkList[itemnumber][0];
        price =  drinkList[itemnumber][3];
        quantity = 1;
    
        _removeFromCart({
						product: name,
						price: price,
						qty: quantity
            });
    //
}



function addToCart(){
	if (highlighted) {
		numDrinks[arrayTarget]++;
		//updateCart();
        addtolocalstoarge(arrayTarget);
        displayCart1();
		
	}
	if (!highlighted) {
		alert('Please click a drink before attempting to add it to your order!');	
	}
    
    
}

function removeFromCart(){
    
    
    removeFromlocalstoarge(arrayTarget);
	if (numDrinks[arrayTarget] > 0){
		numDrinks[arrayTarget]--;
	} 
    displayCart1();
}

function clearCart(drinksAmount) {
    
	for (var i = 0; i < numDrinks.length; i++){
		numDrinks[i] = 0;	
	}
	grandTotal = 0;
	totalDrinks = 0;
	updateCart();	
    
    var cart = {};
    cart.items = [];
    createCart();
    sessionStorage.setItem( this.cartName, JSON.stringify( cart ) );
    sessionStorage.clear();
}



function updateCart(){
	
	$('#shopping_cart tbody').empty();
	
	totalDrinks = 0;
	grandTotal = 0;
	
	for(var i = 0; i < numDrinks.length; i++){
        if(numDrinks[i] != 0)
		
	$('#shopping_cart tbody').append('<tr><td>' + drinkList[i][0] + '</td><td class="num_drinks" class="' + i + '">' + numDrinks[i] + '</td><td class="drink_price">$' + (drinkList[i][3] * numDrinks[i]).toFixed(2) + '</td></tr>');
	

	totalDrinks += numDrinks[i];
	grandTotal += (drinkList[i][3] * numDrinks[i]);
}
    $('#drinks_total').html(totalDrinks);
	$('#grand_total').html('$' + grandTotal.toFixed(2));
	}
	
function rowColor(){
	$('#shopping_cart tbody tr:even').addClass('blueish');
	$('#drink_list tr:even').addClass('reddish');	
}