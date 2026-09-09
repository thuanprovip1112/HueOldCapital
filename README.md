# Huế — Website giới thiệu

Trang web đơn giản này quảng bá thành phố Huế (Việt Nam): di sản, văn hoá, lịch sử và ẩm thực.

Xem nhanh:

- Mở `index.html` trong trình duyệt để xem (không cần server).
- Hoặc dùng extension Live Server trong VS Code để preview và reload tự động.

Lưu ý về ảnh:

- Cách 1 — Dùng ảnh thực tế bằng URL: mở `images.json` và thêm các phần tử với trường `src` trỏ đến URL ảnh (ví dụ Unsplash). Ví dụ:

```
[
	{ "src": "https://.../photo.jpg", "alt": "Mô tả" }
]
```

- Cách 2 — Dùng ảnh local: đặt ảnh trong thư mục `images/` (ví dụ `images/myphoto.webp`) và cập nhật `images.json` với `"src": "images/myphoto.webp"`.

Vì trình duyệt chặn fetch khi mở file trực tiếp, hãy mở site bằng server tĩnh để `images.json` được tải đúng. Ví dụ chạy từ thư mục dự án:

```bash
# Python 3
python -m http.server 8000

# hoặc dùng Live Server extension trong VS Code
```

Mở `http://localhost:8000` để xem site với gallery động.

Tệp quan trọng:

- [index.html](index.html) — HTML chính.
- [styles.css](styles.css) — CSS giao diện.
- [script.js](script.js) — JS nhỏ cho gallery.

Muốn mở rộng: thêm ảnh vào thư mục `images/`, cập nhật nội dung, hoặc bổ sung trang tiếng Anh.

Script hỗ trợ và tự động hoá:

- `scripts/move_images.py`: di chuyển các ảnh trong `images/` vào các thư mục theo quy ước (ví dụ `attractions`, `history`, `culture`, `food`) và cập nhật `images_by_section.json`.
- `scripts/optimize_images.py`: tạo `thumbnail` và `webp` cho tất cả ảnh trong `images/` và xuất sang `images/optimized/` (cần Pillow).

Chạy ví dụ:

```bash
# Di chuyển ảnh vào thư mục tương ứng
python scripts/move_images.py

# Cài dependencies và tối ưu ảnh
pip install -r requirements.txt
python scripts/optimize_images.py
```

 Sau khi chạy, kiểm tra `images_by_section.json` để đảm bảo đường dẫn ảnh đúng. Nếu muốn, tôi có thể tự chạy các script này nếu bạn cho phép (yêu cầu quyền chạy trên máy).

Gallery folder automation:

- To show images placed under `images/gallery/`, generate `images/gallery/index.json` by running:

```bash
python scripts/gen_gallery_index.py
```

The site will prefer `images/gallery/index.json` for the main `Thư viện ảnh` section. You can manually edit the generated JSON to add captions or credits.
