# BẢNG KIỂM KÊ MÀN HÌNH - SMARTSHELF (NHÓM 5)

| # | Vai trò | Mục tiêu người dùng | Nhiệm vụ người dùng | Màn hình | Tệp HTML | CRUD | Trạng thái | AI tích hợp | Người phụ trách |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Khách hàng | Khám phá & Tìm kiếm | Tìm kiếm sản phẩm, lọc theo giá/kệ | Tìm kiếm sản phẩm | shopper-product-search.html | R | Bình thường, Đang tải, Rỗng | — | Nguyễn Văn Hân |
| 2 | Khách hàng | Định vị tại quầy | Xem sơ đồ kệ, vị trí sản phẩm | Bản đồ vị trí sản phẩm | shopper-product-location.html | R | Bình thường, Đang tải | — | Nguyễn Văn Hân |
| 3 | Khách hàng | Mua sắm liền mạch | Nhận gợi ý món tương đương khi hết hàng | Gợi ý thay thế | shopper-product-alternatives.html | R | Đang tải, Thành công, Không có dữ liệu | **AI-2: Product Alternative AI** | Nguyễn Văn Hân |
| 4 | Nhân viên | Quản lý khu vực | Theo dõi số lượng tồn trên từng kệ | Sơ đồ khu vực | associate-zone-view.html | R | Bình thường, Cảnh báo đỏ | — | Nguyễn Quang Long |
| 5 | Nhân viên | Kiểm kê hàng | Đếm số lượng thực tế và cập nhật | Kiểm tra kệ hàng | associate-shelf-check.html | R/U | Đang chờ, Đã cập nhật | — | Nguyễn Quang Long |
| 6 | Nhân viên | Bổ sung kệ | Nhận lệnh ưu tiên kệ cần bù hàng gấp | Nhiệm vụ bổ sung | associate-restock-task.html | C/R/U/D | Chờ xử lý, Đang làm, Hoàn thành | **AI-1: Restock Priority AI** | Nguyễn Quang Long |
| 7 | Quản lý | Theo dõi tổng quan | Giám sát toàn bộ chỉ số vận hành | Tổng quan cửa hàng | manager-store-dashboard.html | R | Bình thường, Đang tải | — | Trần Trọng Hoàng Anh |
| 8 | Quản lý | Phân công việc | Giao việc bổ sung hàng cho nhân viên | Bảng điều phối | manager-restock-board.html | C/R/U | Đang làm, Hoàn tất | — | Trần Trọng Hoàng Anh |
| 9 | Quản lý | Phân tích rủi ro | Xem các bất thường về tồn kho/doanh số | Phân tích chuyên sâu | manager-retail-insights.html | R | Bình thường, Cảnh báo | **AI-3: Shelf Anomaly Insight** | Trần Trọng Hoàng Anh |
| 10| Quản trị | Quản lý danh mục | Thêm mới, chỉnh sửa thông tin hàng hóa | Quản trị sản phẩm | admin-product-management.html | C/R/U/D | Form hợp lệ, Báo lỗi | — | Trần Trọng Hoàng Anh |
