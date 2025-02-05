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