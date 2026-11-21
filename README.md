# KindQuest – Small Actions, Big Impact

MVP React + Vite: biến những việc tốt hằng ngày thành nhiệm vụ, nhận KindPoints và mở khóa huy hiệu.

## Yêu cầu
- Node.js 20.19+ hoặc 22.12+ (để tương thích Vite 6)
- npm
- VS Code (khuyên dùng)

## Chạy trên Windows PowerShell
```powershell
cd "duong-dan-den-thu-muc\kindquest-mvp"
npm install
npm run dev
```
Mở URL do Vite hiển thị (thường là http://localhost:5173/).

## Build kiểm tra
```powershell
npm run build
npm run preview
```

## Tính năng
- Tổng quan: KindPoints, cấp độ, tiến độ, nhiệm vụ nổi bật
- 9 nhiệm vụ theo 4 danh mục; lọc nhiệm vụ
- Hoàn thành mỗi nhiệm vụ đúng 1 lần
- 6 huy hiệu với điều kiện mở khóa tự động
- Thống kê đóng góp theo danh mục
- Lưu tiến độ trong localStorage (key: `kindquest-mvp-v1`)
- Đặt lại tiến độ với hộp thoại xác nhận
- Responsive desktop/mobile

## Demo gợi ý
1. Mở trang Tổng quan, xem 0 KP.
2. Vào Nhiệm vụ, hoàn thành nhiệm vụ 10 KP và 20 KP.
3. Xem huy hiệu Khởi đầu tử tế và Ngôi sao nhỏ được mở khóa.
4. Tải lại trang, xác nhận 30 KP vẫn còn.
5. Vào Thành tích xem biểu đồ tiến độ theo lĩnh vực.

## Giới hạn MVP
- Không có đăng nhập, backend, AI thật hay blockchain.
- Dữ liệu được lưu cục bộ theo trình duyệt/thiết bị; không đồng bộ giữa các máy.
- Nhiệm vụ được người dùng tự đánh dấu, chưa có xác minh thực tế.
- Điểm không phải tiền hay token có thể giao dịch.

## Triển khai
Đẩy code lên GitHub rồi import repo vào Vercel. Framework: Vite; Build command: `npm run build`; Output directory: `dist`.

## Cấu trúc
- `src/App.jsx`: giao diện chính, điều hướng, logic điểm/huy hiệu, localStorage
- `src/App.css`: giao diện responsive
- `src/data/quests.js`: dữ liệu nhiệm vụ/huy hiệu
- `src/components/QuestCard.jsx`: thẻ nhiệm vụ
- `src/components/BadgeCard.jsx`: thẻ huy hiệu
