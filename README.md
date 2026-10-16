# SmartShelf CSS files

## Files
- `css/style.css`: màu sắc, kiểu chữ, khung trang, panel và thẻ sản phẩm.
- `css/components.css`: sidebar, header và toast.
- `css/responsive.css`: tinh chỉnh bố cục cho tablet và điện thoại.

## Cách thêm vào 5 trang HTML
Đặt các thẻ sau trong `<head>`, theo đúng thứ tự:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/responsive.css">
```

Các đường dẫn trên giả định 5 tệp HTML chính nằm ở thư mục gốc và các CSS nằm trong `css/`.

Lưu ý: các tệp CSS này định dạng những lớp chung và lớp của components đã tạo. Nếu HTML hiện tại dùng tên class khác, cần điều chỉnh selector cho khớp. Những component HTML được nạp bằng `fetch()` cũng cần JavaScript để tải nội dung.
