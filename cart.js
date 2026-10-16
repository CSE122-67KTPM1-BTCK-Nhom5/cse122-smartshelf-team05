function getCartItems() {
    return JSON.parse(localStorage.getItem("smartshelf-cart")) || [];
}

function saveCartItems(cart) {
    localStorage.setItem("smartshelf-cart", JSON.stringify(cart));

    if (typeof updateCartCount === "function") {
        updateCartCount();
    }
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
    const product = window.products.find(function (item) {
        return item.id === productId;
    });

    if (!product) {
        return;
    }

    const cart = getCartItems();

    const existingItem = cart.find(function (item) {
        return item.id === productId;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCartItems(cart);

    if (typeof showToast === "function") {
        showToast("Đã thêm " + product.name + " vào giỏ hàng!");
    }

    renderCart();
}

// Thay đổi số lượng sản phẩm
function changeQuantity(productId, amount) {
    let cart = getCartItems();

    cart = cart.map(function (item) {
        if (item.id === productId) {
            item.quantity += amount;
        }

        return item;
    });

    cart = cart.filter(function (item) {
        return item.quantity > 0;
    });

    saveCartItems(cart);
    renderCart();
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
    let cart = getCartItems();

    cart = cart.filter(function (item) {
        return item.id !== productId;
    });

    saveCartItems(cart);
    renderCart();
}

// Hiển thị các sản phẩm trong giỏ hàng
function renderCart() {
    const cartContainer = document.getElementById("cart-items");

    if (!cartContainer) {
        return;
    }

    const cart = getCartItems();
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML =
            '<p class="text-center">Giỏ hàng của bạn đang trống.</p>';
    }

    cart.forEach(function (item) {
        const row = document.createElement("div");
        row.className =
            "d-flex align-items-center justify-content-between gap-3 border-bottom py-3";

        row.innerHTML = `
            <div>
                <h6>${item.name}</h6>
                <p class="mb-1">${formatPrice(item.price)}</p>

                <button
                    class="btn btn-sm btn-outline-secondary quantity-minus"
                    data-id="${item.id}"
                >−</button>

                <span class="mx-2">${item.quantity}</span>

                <button
                    class="btn btn-sm btn-outline-secondary quantity-plus"
                    data-id="${item.id}"
                >+</button>
            </div>

            <div class="text-end">
                <p class="fw-bold">
                    ${formatPrice(item.price * item.quantity)}
                </p>

                <button
                    class="btn btn-sm btn-outline-danger remove-item"
                    data-id="${item.id}"
                >
                    Xóa
                </button>
            </div>
        `;

        cartContainer.appendChild(row);
    });

    calculateTotal();
}

// Tính tiền hàng, giảm giá, phí giao hàng và tổng tiền
function calculateTotal() {
    const cart = getCartItems();

    let subtotal = 0;

    cart.forEach(function (item) {
        subtotal += item.price * item.quantity;
    });

    const discountCodeInput = document.getElementById("discount-code");
    const discountCode = discountCodeInput
        ? discountCodeInput.value.trim().toUpperCase()
        : "";

    // Mã SAVE10 giảm 10%, tối đa 50.000đ
    let discount = 0;

    if (discountCode === "SAVE10") {
        discount = Math.min(subtotal * 0.1, 50000);
    }

    const shipping = subtotal === 0 || subtotal >= 200000 ? 0 : 15000;
    const total = subtotal - discount + shipping;

    const subtotalElement = document.getElementById("subtotal");
    const discountElement = document.getElementById("discount-amount");
    const shippingElement = document.getElementById("shipping-fee");
    const totalElement = document.getElementById("order-total");

    if (subtotalElement) {
        subtotalElement.textContent = formatPrice(subtotal);
    }

    if (discountElement) {
        discountElement.textContent = formatPrice(discount);
    }

    if (shippingElement) {
        shippingElement.textContent = formatPrice(shipping);
    }

    if (totalElement) {
        totalElement.textContent = formatPrice(total);
    }
}

// Bắt sự kiện các nút thêm vào giỏ, tăng giảm và xóa
document.addEventListener("click", function (event) {
    const addButton = event.target.closest(".add-to-cart");

    if (addButton) {
        addToCart(Number(addButton.dataset.id));
    }

    const plusButton = event.target.closest(".quantity-plus");

    if (plusButton) {
        changeQuantity(Number(plusButton.dataset.id), 1);
    }

    const minusButton = event.target.closest(".quantity-minus");

    if (minusButton) {
        changeQuantity(Number(minusButton.dataset.id), -1);
    }

    const removeButton = event.target.closest(".remove-item");

    if (removeButton) {
        removeFromCart(Number(removeButton.dataset.id));
    }
});

// Áp dụng mã giảm giá
document.addEventListener("DOMContentLoaded", function () {
    const applyButton = document.getElementById("apply-discount");

    if (applyButton) {
        applyButton.addEventListener("click", function () {
            const input = document.getElementById("discount-code");
            const code = input ? input.value.trim().toUpperCase() : "";

            if (code === "SAVE10") {
                showToast("Áp dụng mã giảm giá thành công!");
            } else if (code === "") {
                showToast("Bn hãy nhập mã giảm giá.");
            } else {
                showToast("Mã giảm giá không hợp lệ.");
            }

            calculateTotal();
        });
    }

    const checkoutForm = document.getElementById("checkout-form");

    if (checkoutForm) {
        checkoutForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const cart = getCartItems();

            if (cart.length === 0) {
                showToast("Giỏ hàng đang trống!");
                return;
            }

            showToast("Đặt hàng mẫu thành công!");

            localStorage.removeItem("smartshelf-cart");
            renderCart();
            updateCartCount();
        });
    }

    renderCart();
});

window.getCartItems = getCartItems;
window.renderCart = renderCart;