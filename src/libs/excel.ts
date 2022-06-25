import ExcelJS from "exceljs";

export type Columns = Partial<ExcelJS.Column>[];

export type Rows = {
  [key: string | number]: string | number | boolean | null;
}[];

export interface CreateExcelSheet {
  sheetName?: string;
  columns: Columns;
  rows: Rows;
  format: "xlsx" | "csv";
}

export const createExcelSheet = async ({
  sheetName = "sheet1",
  columns,
  rows,
  format,
}: CreateExcelSheet): Promise<Uint8Array> => {
  const workbook = new ExcelJS.Workbook();

  workbook.addWorksheet(sheetName);

  const worksheet = workbook.getWorksheet(sheetName);

  worksheet.columns = columns;
  worksheet.addRows(rows);

  const utf8Array = (await workbook[format].writeBuffer()) as Uint8Array;

  return utf8Array;
};
