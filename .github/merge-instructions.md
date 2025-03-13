#!/usr/bin/env -S deno run --allow-read --allow-write

import { join } from "https://deno.land/std/path/mod.ts";

// スクリプト自身のディレクトリ（.github）を基準にする
const __dirname = new URL('.', import.meta.url).pathname;

// config では .github 内の相対パスを指定する
const config = {
  rules: {
    typescript: ['rules/00_basic.md', 'rules/typescript.md', 'rules/deno.md'],
    solidity: ['rules/00_basic.md', 'rules/solidity.md'],
  }
};

// コマンドライン引数から rule 名を取得する
if (Deno.args.length < 1) {
  console.error("エラー: rule名を引数として指定してください。例: deno run merge-rule.ts typescript");
  Deno.exit(1);
}

const ruleName = Deno.args[0];
if (!config.rules[ruleName]) {
  console.error(`エラー: 指定された rule名 '${ruleName}' は存在しません。`);
  Deno.exit(1);
}

let output = `# Rules - ${ruleName}\n\n`;
const files = config.rules[ruleName];

for (const file of files) {
  // 各ファイルは .github を基準とした相対パスで指定する
  const filePath = join(__dirname, file);
  try {
    const content = Deno.readTextFileSync(filePath);
    output += content + "\n\n";
  } catch (_error) {
    console.warn(`Warning: ファイル ${file} が存在しないか読み込みエラーが発生しました。`);
  }
}

// 出力先は .github/copilot-instructions.md とする
const outPath = join(__dirname, 'copilot-instructions.md');
Deno.writeTextFileSync(outPath, output);
console.log(`rule '${ruleName}' の内容が ${outPath} にマージされました。`);
