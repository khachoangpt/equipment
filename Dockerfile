# Dockerfile (Phiên bản đơn giản)

# 1. Chọn một image Node.js cơ sở
# Sử dụng phiên bản LTS mới nhất trên nền tảng Alpine cho nhẹ
FROM node:20-alpine

# 2. Thiết lập thư mục làm việc bên trong container
WORKDIR /app

# 3. Sao chép các file quản lý dependency
# Việc sao chép riêng các file này giúp tận dụng cache của Docker, tăng tốc build
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# 4. Cài đặt toàn bộ dependencies (bao gồm cả devDependencies)
RUN \
  if [ -f yarn.lock ]; then yarn install; \
  elif [ -f package-lock.json ]; then npm install --force; \
  elif [ -f pnpm-lock.yaml ]; then npm i -g pnpm && pnpm install; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 5. Sao chép toàn bộ mã nguồn của dự án vào container
COPY . .

# 6. Build ứng dụng Next.js cho môi trường production
RUN npm run build

# 7. Mở port 3000 để bên ngoài có thể truy cập vào container
EXPOSE 3000

# 8. Lệnh mặc định để khởi chạy ứng dụng khi container bắt đầu
CMD ["npm", "run", "start"]