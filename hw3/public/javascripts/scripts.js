//Troy Carpenter
$(function () {
    // Add event listener to the button
    $("#order").click(function (event) {
        event.preventDefault(); // Prevent form submission
        wipe();
    });

    // Function to select the month through the dropdown
    window.selectMonth = function (month) {
        $("#selectedMonth").text(month);
        getOrders();
    };

    // Function to place orders
    function wipe() {
        let notesText = $("#note").val().toLowerCase(); // Get text and convert to lowercase

        // Get selected flavor from radio buttons
        let flavor = $('input[name="flavor"]:checked').val();

        // Get selected topping ID from dropdown
        let gotQuantity = $('#subject').val();

        // Check if the word "vegan" is in the text box
        if (notesText.includes("vegan")) {
            $("#note").val("");
            alert("Cheesecake is not Vegan"); // Show pop-up
        } else {
            console.log("Button clicked!"); // Debugging log

            $.post("http://localhost:3000/newOrder", {
                toppingId: flavor,
                quantity: gotQuantity,
                notes: notesText,
                month: 3,
                year: 2023
            });

            // // Define a POST endpoint to handle new orders
            // $.post('/newOrder', (req, res) => {

            //     // Extract the order details from the request body
            //     const { toppingId, quantity, notes, month, year } = req.body;

            //     // Call the function to insert the order into the database
            //     newOrder.addNewOrder(toppingId, quantity, notes, month, year, (err, results) => {

            //         if (err) {
            //             // If an error occurs, send a 500 Internal Server Error response
            //             res.status(500).json({ error: 'Error adding order' });
            //         } else {
            //             // If successful, respond with a success message and the new order ID
            //             res.json({ message: 'Order added successfully', orderId: results.insertId });
            //         }
            //     });
            // });

            // Remove elements
            $("#order, #note, #table, #label").remove();

            // Gives thank you message once everything gets deleted
            $("#message").html("Thank you! Your order has been placed!");
        }

    }
});

// Function to get orders for the selected month
function getOrders() {
    // Get the currently selected month
    const month = $("#selectedMonth").text();

    if (!month) {
        alert("Please select a month first!");
        return;
    }

    //TODO: make this get from the database better
    // Send POST request using jQuery
    // Correct client-side code
    $.post('/orders', { month: month })
        .done(function (data) {
            console.log('Data received:', data);

            // Clear any existing table data
            $("#table1 tbody").empty();



            // Populate the table with the returned data
            data.forEach(order => {
                //define the topping based on it's ID
                var topping;
                const toppingID = order.T_ID;
                if (toppingID == 1) {
                    topping = "Plain";
                } else if (toppingID == 2) {
                    topping = "Cherry";
                } else if (toppingID == 3) {
                    topping = "Chocolate";
                }

                $("#table1 tbody").append(`
                <tr>
                    <td>${topping}</td>
                    <td>${order.quantity}</td>
                </tr>
        `);
            });
        })
        .fail(function (err) {
            alert(err.responseJSON?.error || 'An error occurred while fetching orders.');
        });
}
