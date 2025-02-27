# Deno Mantine

このプロジェクトは、Next.js + DenoとMantineを組み合わせたWebアプリケーションです。

## 特徴

- Denoランタイムを使用したNext.jsアプリケーション
- MantineによるモダンなUIコンポーネント
- APIルートによる恐竜データの提供
- TypeScript完全対応

## 開発を始める

### 必要な環境

- Deno（最新版）
- Node.js（開発ツール用）

### 開発サーバーの起動

```bash
# 開発サーバーの起動
deno task dev
```

[http://localhost:3000](http://localhost:3000) をブラウザで開いて結果を確認できます。

## APIエンドポイント

### 恐竜データAPI

- `GET /api/dinosaurs`: すべての恐竜データを取得
- `GET /api/dinosaurs/[name]`: 特定の恐竜のデータを取得

## 開発ガイドライン

### コードスタイル

- `deno fmt` を使用してコードフォーマットを統一
- `deno lint` でコードの品質を維持

### テスト

```bash
# テストの実行
deno task test

# カバレッジレポートの生成
deno task test:cov
```

## ライセンス

MITライセンスで提供されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。
