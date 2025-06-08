# Đây là frontend của ứng dụng

- Sau khi bạn chạy lên phần backend, quay trở lại đây để chạy phần frontend. Cách chạy như sau:

- Bạn mở terminal của phần frontend lên. Sau đó chạy lệnh:

```docker build --no-cache -t equipment-frontend .```

- Đợi cho build xong thì bạn chạy lệnh sau:

```docker run -p 3000:3000 equipment-frontend```

- Đợi ứng dụng chạy thì bạn mở link: localhost:3000 trên trình duyệt của bạn, sẽ thấy màn hình đăng nhập. Bạn nhập tên đăng nhập là: `admin_1` và password là: `admin123`, sau đó click nút `Đăng nhập`

- Trình duyệt sẽ đưa bạn đến màn home. Ở đây, chúng tôi đã tạo sẵn 1 đơn vị có tên là `Đơn vị chính` rồi, bạn thực hiện thao tác trên màn hình.

