## ビルドステージ
FROM node:20.16.0 AS build

# 作業ディレクトリ
WORKDIR /app

# 依存関係のインストール
COPY package*.json ./
RUN npm install

# ソースコードのコピー
COPY . .

# ビルド
RUN npm run build

## 本番環境ステージ
FROM nginx:alpine

# Nginxの設定ファイルをコピー
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ビルドしたファイルをNginxのドキュメントルートにコピー
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Nginxを起動
CMD ["nginx", "-g", "daemon off;"]