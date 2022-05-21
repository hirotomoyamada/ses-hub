import Encoding from "encoding-japanese";

export type ConvertOptions =
  | {
      from?: Encoding.ConvertOptions["from"];
      to: Encoding.ConvertOptions["to"];
    }
  | undefined;

const toBlob = (data: string, type: string, option?: ConvertOptions) => {
  const base64 = window.btoa(
    encodeURIComponent(data).replace(/[^a-zA-Z0-9@*_+\-./]/g, (t) => {
      const code = t.charCodeAt(0);

      if (code <= 0xff) {
        return "%" + ("00" + code.toString(16)).slice(-2).toUpperCase();
      } else {
        return "%u" + ("0000" + code.toString(16)).slice(-4).toUpperCase();
      }
    })
  );

  const convert = !option
    ? base64
    : Encoding.convert(base64, {
        from: option.from,
        to: option.to,
        type: "string",
      });

  const blob = new Blob([convert], {
    type,
  });

  return blob;
};

export interface DownloadFileFromArrayBuffer {
  utf8Array: Uint8Array;
  type: string;
  fileName: string;
  option?: ConvertOptions;
}

export const downloadFileFromArrayBuffer = ({
  utf8Array,
  type,
  fileName,
  option,
}: DownloadFileFromArrayBuffer) => {
  const convert = !option
    ? utf8Array
    : new Uint8Array(
        Encoding.convert(utf8Array, {
          from: option.from,
          to: option.to,
        })
      );
  const blob = new Blob([convert], { type });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("download", fileName);
  link.setAttribute("href", url);
  link.click();
};

export interface DownloadFileFromBase64 {
  base64: string;
  type: string;
  fileName: string;
  option?: ConvertOptions;
}

export const downloadFileFromBase64 = ({
  base64,
  type,
  fileName,
  option,
}: DownloadFileFromBase64) => {
  const blob = toBlob(base64, type, option);
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("download", fileName);
  link.setAttribute("href", url);
  link.click();
};
