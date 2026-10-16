// Tải nội dung HTML từ file components
function loadComponent(containerId, filePath) {
    const container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    fetch(filePath)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Không thể tải " + filePath);
            }

            return response.text();
        })
        .then(function (html) {
            container.innerHTML = html;
            setActiveNavigation();
            updateCartCount();
        })
        .catch(function (error) {
            console.error(error);
        });
}

// Đánh dấu trang đang mở trên sidebar
function setActiveNavigation() {
    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".sidebar a").forEach(function (link) {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

// Hiển thị thông báo ngắn trên màn hình
function showToast(message) {
    let toast = document.getElementById("app-toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "app-toast";
        toast.className = "app-toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 2500);
}

// Lấy giỏ hàng từ localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("smartshelf-cart")) || [];
}

// Cập nhật số lượng sản phẩm trên biểu tượng giỏ hàng
function updateCartCount() {
    const cart = getCart();

    let totalQuantity = 0;

    cart.forEach(function (item) {
        totalQuantity += item.quantity;
    });

    document.querySelectorAll(
        "#cart-count, #header-cart-count"
    ).forEach(function (element) {
        element.textContent = totalQuantity;
    });
}

// Chạy khi trang tải xong
document.addEventListener("DOMContentLoaded", function () {
    loadComponent("sidebar-container", "components/sidebar.html");
    loadComponent("header-container", "components/header.html");
    loadComponent(
        "toast-container-placeholder",
        "components/toast.html"
    );

    setActiveNavigation();
    updateCartCount();
});