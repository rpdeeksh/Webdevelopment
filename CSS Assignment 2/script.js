document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.querySelectorAll("tbody tr");
    const subtotalElement = document.querySelector(".summary p span");
    const totalElement = document.getElementById("total");
    const couponInput = document.getElementById("coupon");
    const applyCouponBtn = document.getElementById("apply-coupon");
    const checkoutButton = document.querySelector(".checkout");
    let subtotal = 100; // Default subtotal value

    function updateTotal() {
        let total = subtotal;
        if (couponInput.value.trim() === "FIRST") {
            total *= 0.5; // Apply 50% discount
        }
        totalElement.innerText = `₹${total.toFixed(2)}`;
    }

    cartItems.forEach((item) => {
        const incrementBtn = item.querySelector(".increment");
        const decrementBtn = item.querySelector(".decrement");
        const quantitySpan = item.querySelector(".quantity span");
        const deleteBtn = item.querySelector(".delete");
        const priceElement = item.querySelector("td:nth-child(2)");

        let quantity = parseInt(quantitySpan.innerText);
        let price = parseFloat(priceElement.innerText.replace("₹", ""));

        incrementBtn.addEventListener("click", function () {
            quantity++;
            quantitySpan.innerText = quantity;
            subtotal += price;
            subtotalElement.innerText = `₹${subtotal.toFixed(2)}`;
            updateTotal();
        });

        decrementBtn.addEventListener("click", function () {
            if (quantity > 1) {
                quantity--;
                quantitySpan.innerText = quantity;
                subtotal -= price;
                subtotalElement.innerText = `₹${subtotal.toFixed(2)}`;
                updateTotal();
            }
        });

        deleteBtn.addEventListener("click", function () {
            subtotal -= price * quantity;
            subtotalElement.innerText = `₹${subtotal.toFixed(2)}`;
            item.remove();
            updateTotal();
        });
    });

    applyCouponBtn.addEventListener("click", function () {
        updateTotal();
    });

    checkoutButton.addEventListener("click", function () {
        // Create the popup
        const popup = document.createElement("div");
        popup.classList.add("loading-popup");

        popup.innerHTML = `
            <p>Taking you to the payment page...</p>
            <div class="spinner"></div>
        `;

        document.body.appendChild(popup);
        popup.style.display = "block";

        // Simulate loading for 3 seconds
        setTimeout(() => {
            popup.style.display = "none";
            alert("Proceeding to payment page!");
            // Redirect to the payment page here
            // window.location.href = "payment.html";
        }, 3000);
    });

    updateTotal();
});
