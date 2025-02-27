//Troy Carpenter
$(function() {
    // Add event listener to the button
    $("#order").click(function(event) {
        event.preventDefault(); // Prevent form submission
        wipe();
    });

    // Function to select the month through the dropdown
    window.selectMonth = function(month) {
        $("#selectedMonth").text(month);
        $(".dropdown-content").hide(); // Close the dropdown
        getOrders();
    };

    // Function to place orders
    function wipe() {
        let notesText = $("#note").val().toLowerCase(); // Get text and convert to lowercase

        // Check if the word "vegan" is in the text box
        if (notesText.includes("vegan")) {
            $("#note").val("");
            alert("Cheesecake is not Vegan"); // Show pop-up
        } else {
            console.log("Button clicked!"); // Debugging log

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

    // Send POST request using jQuery
    $.post('/orders', { month: month })
        .done(function(data) {
            // Clear any existing table data
            $("#table1 tbody").empty();

            // Populate the table with the returned data
            data.forEach(order => {
                $("#table1 tbody").append(`
                    <tr>
                        <td>${order.topping}</td>
                        <td>${order.quantity}</td>
                    </tr>
                `);
            });
        })
        .fail(function(err) {
            alert(err.responseJSON?.error || 'An error occurred while fetching orders.');
        });
}
