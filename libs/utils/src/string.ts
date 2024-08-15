import * as path from 'path';

export async function getFileName(file: Express.Multer.File): Promise<string> {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const extname = path.extname(file.originalname);
  return file.originalname.replace(extname, '') + '-' + uniqueSuffix + extname;
}
