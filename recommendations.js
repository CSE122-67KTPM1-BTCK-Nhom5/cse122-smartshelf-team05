function getRecommendations(sourceProduct, preference) {
    let result = window.products.filter(function (product) {
        return product.id !== sourceProduct.id;
    });

    // Ưu tiên sản phẩm cùng danh mục
    if (preference === "category") {
        result = result.filter(function (product) {
            return product.category === sourceProduct.category;
        });
    }

    // Ưu tiên sản phẩm có giá thấp hơn
    if (preference === "cheaper") {
        result = result.filter(function (product) {
            return product.price < sourceProduct.price;
        });

        result.sort(function (a, b) {
            return b.price - a.price;
        });
    }

    // Ưu tiên sản phẩm có giá gần với sản phẩm ban đầu
    if (preference === "similar-price") {
        result.sort(function (a, b) {
            const differenceA = Math.abs(
                a.price - sourceProduct.price
            );

            const differenceB = Math.abs(
                b.price - sourceProduct.price
            );

            return differenceA - differenceB;
        });
    }

    return result.slice(0, 4);
}

// Hiển thị các sản phẩm được gợi ý
function renderRecommendations() {
    const resultContainer =
        document.getElementById("recommendation-results");

    if (!resultContainer) {
        return;
    }

    const sourceSelect = document.getElementById("source-product");
    const preferenceSelect =
        document.getElementById("recommendation-preference");

    const sourceId = sourceSelect
        ? Number(sourceSelect.value)
        : window.products[0].id;

    const sourceProduct = window.products.find(function (product) {
        return product.id === sourceId;
    });

    if (!sourceProduct) {
        resultContainer.innerHTML =
            "<p>Không tìm thấy sản phẩm ban đầu.</p>";
        return;
    }

    const preference = preferenceSelect
        ? preferenceSelect.value
        : "category";

    const loading = document.getElementById("recommendation-loading");

    if (loading) {
        loading.classList.remove("d-none");
    }

    resultContainer.innerHTML = "";

    // Mô phỏng quá trình phân tích
    setTimeout(function () {
        const recommendations = getRecommendations(
            sourceProduct,
            preference
        );

        if (loading) {
            loading.classList.add("d-none");
        }

        if (recommendations.length === 0) {
            resultContainer.innerHTML =
                "<p>Chưa tìm thấy sản phẩm thay thế phù hợp.</p>";
            return;
        }

        recommendations.forEach(function (product) {
            let reason = "";

            if (product.category === sourceProduct.category) {
                reason = "Cùng danh mục với sản phẩm ban đầu.";
            } else if (product.price < sourceProduct.price) {
                reason = "Có giá thấp hơn sản phẩm ban đầu.";
            } else {
                reason = "Một lựa chọn khác bn có thể tham khảo.";
            }

            const card = document.createElement("div");
            card.className = "col-md-6 col-lg-3 mb-3";

            card.innerHTML = `
                <div class="card h-100 product-card">
                    <img
                        src="${product.image}"
                        class="card-img-top"
                        alt="${product.name}"
                    >

                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>

                        <p class="card-text">
                            Thương hiệu: ${product.brand}
                        </p>

                        <p class="fw-bold text-primary">
                            ${formatPrice(product.price)}
                        </p>

                        <p class="small text-muted">
                            ${reason}
                        </p>

                        <button
                            class="btn btn-primary add-to-cart"
                            data-id="${product.id}"
                        >
                            Thêm vào giỏ
                        </button>
                    </div>
                </div>
            `;

            resultContainer.appendChild(card);
        });

        const reasonElement =
            document.getElementById("recommendation-reason");

        if (reasonElement) {
            reasonElement.textContent =
                "Đã tìm thấy " + recommendations.length +
                " sản phẩm thay thế cho " + sourceProduct.name + ".";
        }
    }, 500);
}

// Khởi tạo trang gợi ý
document.addEventListener("DOMContentLoaded", function () {
    const sourceSelect = document.getElementById("source-product");
    const analyzeButton =
        document.getElementById("analyze-recommendations");

    // Thêm sản phẩm vào danh sách chọn
    if (sourceSelect) {
        sourceSelect.innerHTML = "";

        window.products.forEach(function (product) {
            const option = document.createElement("option");

            option.value = product.id;
            option.textContent = product.name;

            sourceSelect.appendChild(option);
        });
    }

    if (analyzeButton) {
        analyzeButton.addEventListener(
            "click",
            renderRecommendations
        );
    }

    renderRecommendations();
});