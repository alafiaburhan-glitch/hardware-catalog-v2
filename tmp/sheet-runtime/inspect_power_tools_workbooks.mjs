import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputs = process.argv.slice(2);
if (!inputs.length) throw new Error("Pass one or more workbook paths");

const summaries = [];
for (const inputPath of inputs) {
  const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(inputPath));
  const overview = await workbook.inspect({
    kind: "workbook,sheet,table,drawing",
    maxChars: 30000,
    tableMaxRows: 20,
    tableMaxCols: 20,
    tableMaxCellChars: 200,
  });
  const sheets = [];
  for (const sheet of workbook.worksheets.items) {
    const used = sheet.getUsedRange(true);
    sheets.push({
      name: sheet.name,
      address: used?.address ?? null,
      values: used?.values ?? [],
      formulas: used?.formulas ?? [],
    });
  }
  summaries.push({ inputPath, overview: overview.ndjson, sheets });
}

await fs.writeFile("tmp/power-tools-workbook-inspection.json", JSON.stringify(summaries, null, 2));
console.log(JSON.stringify(summaries.map((book) => ({
  inputPath: book.inputPath,
  sheets: book.sheets.map((sheet) => ({ name: sheet.name, address: sheet.address, rows: sheet.values.length })),
}))));
