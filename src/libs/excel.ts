import ExcelJS from "exceljs";

export interface CreateExcelSheet {
  sheetName: string;
  columns: Partial<ExcelJS.Column>[];
  rows: { [key: string | number]: string | number | boolean | null }[];
  format: "xlsx" | "csv";
}

export const createExcelSheet = async ({
  sheetName,
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
