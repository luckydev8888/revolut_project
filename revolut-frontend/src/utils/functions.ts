import { v4 as uuidv4 } from "uuid";
import Compressor from "compressorjs";
import { FILE_COMPRESS_QUALITY } from "./constants";

export const getUniqueFileName = (fileName: string): string => {
  let fileExtension = fileName.split(".")[1];
  return `${uuidv4()}.${fileExtension}`;
};

export const compressImage = (file: File): Promise<File> => {
  return new Promise<File>((resolve, reject) => {
      new Compressor(file, {
          quality: FILE_COMPRESS_QUALITY,
          success: (result) => {
              resolve(new File([result], file.name, {type: result.type}))
          },
          error: (error: Error) => reject(error)
      })
  });
}