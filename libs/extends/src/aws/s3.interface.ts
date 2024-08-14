export interface File {
  name?: string;
  size?: number;
  type?: string;
  extension?: string;
  content: Buffer;
}

export interface S3File {
  bucketName: string;
  key: string;
  file: File;
}
