$(function () {
    // Get name of customers (to be used in the 'add product' in 'split' page)
    var customers = $('.customer').length;
    var customersarray = []
    for (j = 0; j < customers; j++) {

        customersarray.push(document.getElementById("customer" + j).value);
    }

    // Button to add new customers
    $(document).on('click', '.btn-add', function (e) {

        var x = `<div class="mdl-textfield mdl-js-textfield">
                 <input class="form-control mdl-textfield__input" id="p1" placeholder="e.g. John" name="fields[]" type="text"/>
                 </div>`
        $(".form-group").append(x);
        $("input:text:visible:last").focus();

        componentHandler.upgradeDom();

        // Button to remove customers
    }).on('click', '.btn-remove', function (e) {
        e.preventDefault();
        $(".form-group").children('div:last').remove();
        return false;
    });


    // Function to add cards (products)
    $(".add-row").click(function () {
        var product = $('.product').length;

        var markup = `
          <div class="mdl-cell mdl-cell--4-col card-lesson mdl-card mdl-shadow--2dp product">
          <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">Please describe the item consumed below:</h2>
          </div>
          <div class="mdl-card__supporting-text">

          Product: &ensp;<div class="mdl-textfield mdl-js-textfield"><input autocomplete="off" autofocus class="mdl-textfield__input" placeholder="e.g. Pepperoni Pizza" name="products[]" type="text"/></div> &ensp;
          Quantity: &ensp;<div class="mdl-textfield mdl-js-textfield"><input autocomplete="off" class="mdl-textfield__input" type="number" min="1" placeholder="e.g. 1" value="1" name="quantities[]"/></div> &ensp; &ensp;
          Price: &ensp;<div class="mdl-textfield mdl-js-textfield"><input autocomplete="off" class="mdl-textfield__input" type="number" min="0.01" step="0.01"  placeholder="e.g. 29,90" name="values[]"/></div> &ensp; &ensp;
        <br>
          Who consumed: &ensp;
        <br>`
        console.log(customersarray);
        console.log(customers);
        for (i = 0; i < customers; i++) {

            markup += `<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect">
                        <input type="checkbox" name="consumed`
            markup += i;
            markup += `_`;
            markup += product;
            markup += `" class="mdl-switch__input" checked><span class="mdl-switch__label">`
            markup += customersarray[i];
            markup += `</span></label>`
        }


        markup += `</div>
          <div class="mdl-card__actions mdl-card--border">
            <button type="button" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect delete-row">Remove Product</button>
          </div>`;

        $(".products").append(markup);
        componentHandler.upgradeDom()
    });


});

// Function to delete cards (products)
$(function () {
    $(document).on('click', '.delete-row', function (e) {
        // Check if there's at least one product
        var product = $('.product').length;
        if (product == 1) {
            alert('You must input at least one product!');
        }
        else {
            // Product card removed
            $(this).parent().parent().remove();

            // Loops through checkboxes to rename them after removing one (to maintain the ordered checklist names)
            var customer = $('.customer').length;
            var product = $('.product').length;

            var currentcustomer = 0;
            var currentproduct = 0;

            $("#products input[type=checkbox]").each(function (index) {

                if (currentcustomer == customer) {
                    currentcustomer = 0;
                    currentproduct++;
                }

                //validation
                //console.log(currentcustomer);
                //console.log(currentproduct)
                //console.log("this is what i'll substitute")
                //console.log("customer" + currentcustomer + "_" + currentproduct);
                //console.log("this is the current checkbox:");
                //console.log(this);

                // finally, change name to the desired one
                var newname = "consumed" + currentcustomer + "_" + currentproduct;
                $(this).attr("name", newname);

                console.log("this is the new name:");
                console.log(this);

                currentcustomer++;
            });

            componentHandler.upgradeDom();
        }
    });
});


// Validate forms when buttons are clicked, preventing the user from advancing without filling all fields
$(document).ready(function () {

    $("#submitbutton").click(function () {
        var formInvalid = false;

        $('#form input').each(function () {
            if ($(this).val() === '') {
                formInvalid = true;
            }
        });

        if (formInvalid) {
            alert('All fields must be filled to continue!');
            return false;
        }

    });

});

// Tip switch: When tip switch is toggled off, the tip value field is disabled and given value of 0 (no tip)
$(document).ready(function () {

    $('#tipswitch').on('change', function () {
        $('#tipvalue').prop('disabled', function (i, v) {
            return !v;
        });
        $('#tipvalue').val("0");
    });

});

// When enter is pressed, submit form
$(document).ready(function () {
    $('.input').keypress(function (e) {
        if (e.which == 13) {
            $('form#login').submit();
            return false;
        }
    });
});

var $language = $('#language');
var $languageform = $('#languageform')
$language.on('change', $languageform.submit());