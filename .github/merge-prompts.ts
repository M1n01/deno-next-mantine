// コンフィグ定義: rules ディレクトリ内のファイルの組み合わせを指定
const config = {
  rules: {
    typescript: ['rules/00_basic.md', 'rules/typescript.md', 'rules/deno.md'],
  }
};

// コマンドライン引数から、利用するルールキーを受け取る
if (Deno.args.length < 1) {
  console.error("Usage: deno run --allow-read --allow-write merge-prompts.ts <rule-key>");
  Deno.exit(1);
}

const ruleKey = Deno.args[0];
if (!(ruleKey in config.rules)) {
  console.error(`指定された rule '${ruleKey}' は存在しません。利用可能な rule: ${Object.keys(config.rules).join(", ")}`);
  Deno.exit(1);
}

const githubDir = ".github";
const promptsDir = ".github/prompts";

// 指定されたルールに基づいて、.github/prompts/rules 内のファイルを順番に読み込む
const ruleFiles = config.rules[ruleKey];
const ruleContents: string[] = [];
for (const filePath of ruleFiles) {
  const fullPath = `${promptsDir}/${filePath}`;
  try {
    const text = await Deno.readTextFile(fullPath);
    // 各ファイルの先頭にファイル名のコメントを付与（任意）
    const contentWithHeading = `<!-- ${filePath} -->\n${text}`;
    ruleContents.push(contentWithHeading);
  } catch (e) {
    console.error(`ファイル読み込みエラー: ${fullPath}`);
    console.error(e);
    Deno.exit(1);
  }
}

// .github/prompts/projects ディレクトリ内の Markdown ファイルを全て読み込む
const projectDir = `${promptsDir}/projects`;
const projectFiles: string[] = [];
for await (const entry of Deno.readDir(projectDir)) {
  if (entry.isFile && entry.name.endsWith(".md")) {
    projectFiles.push(entry.name);
  }
}
// 名前順（アルファベット順）にソート
projectFiles.sort();

const projectContents: string[] = [];
for (const fileName of projectFiles) {
  const fullPath = `${projectDir}/${fileName}`;
  try {
    const text = await Deno.readTextFile(fullPath);
    // 各ファイルの先頭にファイル名のコメントを付与（任意）
    const contentWithHeading = `<!-- ${fileName} -->\n${text}`;
    projectContents.push(contentWithHeading);
  } catch (e) {
    console.error(`ファイル読み込みエラー: ${fullPath}`);
    console.error(e);
    Deno.exit(1);
  }
}

// 出力内容を組み立てる（ルールとプロジェクトのセクションに分ける）
const header = `# Copilot Instructions - ${ruleKey}\n\n`;
const ruleSection = "## Rule Files\n\n" + ruleContents.join("\n\n");
const projectSection = "## Project Files\n\n" + projectContents.join("\n\n");

const combinedContent = header + ruleSection + "\n\n---\n\n" + projectSection;

// 出力先ファイルに書き出す
const outputPath = `${githubDir}/copilot-instructions.md`;
await Deno.writeTextFile(outputPath, combinedContent);
console.log(`${outputPath} を生成しました。`);
