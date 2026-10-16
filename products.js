// Dữ liệu sản phẩm mẫu
const products = [
    {
        id: 1,
        name: "Sữa tươi không đường",
        brand: "Vinamilk",
        category: "Thực phẩm",
        price: 32000,
        image: "https://placehold.co/300x200?text=Milk",
        description: "Sữa tươi không đường"
    },
    {
        id: 2,
        name: "Mì ăn liền",
        brand: "Hảo Hảo",
        category: "Thực phẩm",
        price: 4500,
        image: "https://placehold.co/300x200?text=Noodles",
        description: "Mì ăn liền vị tôm chua cay"
    },
    {
        id: 3,
        name: "Nước giặt",
        brand: "OMO",
        category: "Gia dụng",
        price: 85000,
        image: "https://placehold.co/300x200?text=Detergent",
        description: "Nước giặt quần áo"
    },
    {
        id: 4,
        name: "Dầu ăn",
        brand: "Simply",
        category: "Thực phẩm",
        price: 52000,
        image: "https://placehold.co/300x200?text=Cooking+Oil",
        description: "Dầu ăn thực vật"
    },
    {
        id: 5,
        name: "Dầu gội",
        brand: "Clear",
        category: "Chăm sóc cá nhân",
        price: 68000,
        image: "https://placehold.co/300x200?text=Shampoo",
        description: "Dầu gội sạch gàu"
    },
    {
        id: 6,
        name: "Kem đánh răng",
        brand: "Colgate",
        category: "Chăm sóc cá nhân",
        price: 28000,
        image: "https://placehold.co/300x200?text=Toothpaste",
        description: "Kem đánh răng bảo vệ răng"
    }
];

// Hiển thị giá tiền theo định dạng Việt Nam
function formatPrice(price) {
    return price.toLocaleString("vi-VN") + " đ";
}

// Hiển thị danh sách sản phẩm
function renderProducts(productList) {
    const productGrid = document.getElementById("product-grid");

    if (!productGrid) {
        return;
    }

    productGrid.innerHTML = "";

    if (productList.length === 0) {
        productGrid.innerHTML =
            '<p class="text-center">Không tìm thấy sản phẩm phù hợp.</p>';
    } else {
        productList.forEach(function (product) {
            const card = document.createElement("div");
            card.className = "col-md-4 col-sm-6 mb-4";

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

                        <p class="card-text">
                            Danh mục: ${product.category}
                        </p>

                        <p class="fw-bold text-primary">
                            ${formatPrice(product.price)}
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

            productGrid.appendChild(card);
        });
    }

    const resultCount = document.getElementById("result-count");

    if (resultCount) {
        resultCount.textContent = productList.length;
    }
}

// Tìm kiếm, lọc danh mục, thương hiệu và sắp xếp
function filterProducts() {
    const searchInput = document.getElementById("product-search");
    const categoryFilter = document.getElementById("category-filter");
    const brandFilter = document.getElementById("brand-filter");
    const sortSelect = document.getElementById("sort-products");

    const keyword = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const category = categoryFilter ? categoryFilter.value : "";
    const brand = brandFilter ? brandFilter.value : "";
    const sort = sortSelect ? sortSelect.value : "";

    let result = products.filter(function (product) {
        const matchesKeyword =
            product.name.toLowerCase().includes(keyword) ||
            product.brand.toLowerCase().includes(keyword);

        const matchesCategory =
            category === "" || product.category === category;

        const matchesBrand =
            brand === "" || product.brand === brand;

        return matchesKeyword && matchesCategory && matchesBrand;
    });

    if (sort === "price-asc") {
        result.sort(function (a, b) {
            return a.price - b.price;
        });
    }

    if (sort === "price-desc") {
        result.sort(function (a, b) {
            return b.price - a.price;
        });
    }

    if (sort === "name-asc") {
        result.sort(function (a, b) {
            return a.name.localeCompare(b.name, "vi");
        });
    }

    renderProducts(result);
}

// Xử lý các sự kiện trên trang tìm kiếm
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("product-search");
    const categoryFilter = document.getElementById("category-filter");
    const brandFilter = document.getElementById("brand-filter");
    const sortSelect = document.getElementById("sort-products");
    const clearButton = document.getElementById("clear-filters");

    if (searchInput) {
        searchInput.addEventListener("input", filterProducts);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener("change", filterProducts);
    }

    if (brandFilter) {
        brandFilter.addEventListener("change", filterProducts);
    }

    if (sortSelect) {
        sortSelect.addEventListener("change", filterProducts);
    }

    if (clearButton) {
        clearButton.addEventListener("click", function () {
            if (searchInput) searchInput.value = "";
            if (categoryFilter) categoryFilter.value = "";
            if (brandFilter) brandFilter.value = "";
            if (sortSelect) sortSelect.value = "";

            filterProducts();
        });
    }

    renderProducts(products);
});

// Cho các file JS khác sử dụng danh sách sản phẩm
window.products = products;
window.formatPrice = formatPrice;
window.renderProducts = renderProducts;