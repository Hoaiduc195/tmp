# Thư viện nhỏ

Website tĩnh để đọc các file Markdown trong `content/`.

## Thêm bài viết

Chép file `.md` vào thư mục `content/`. Các file sẽ tự xuất hiện trong danh sách sau khi chạy lại hoặc deploy lại website.

## Chạy trên máy

```sh
pnpm install
pnpm dev
```

## Deploy lên Vercel

Import repository này trong Vercel. Project đã cấu hình build bằng `pnpm build` và thư mục kết quả `dist`.
