import { S3Client } from "@aws-sdk/client-s3";
import { boolean, minLength, object, string } from "zod/mini";
import { storage } from "./storage";

export const S3CredentialsZod = object({
  accessKeyId: string().check(minLength(8)),
  secretAccessKey: string().check(minLength(8)),
});

export const S3AccessZod = object({
  region: string().check(minLength(3)),
  credentials: S3CredentialsZod,
  endpoint: string().check(minLength(8)),
  forcePathStyle: boolean(),
});

export const readS3Access = async () => {
  const access = await storage.getItem("s3-access");
  return S3AccessZod.parse(access);
};

export const writeS3Access = async (access: Record<string, unknown>) => {
  const parsed = S3AccessZod.parse(access);
  await storage.setItem("s3-access", parsed);
};

export const createS3Service = async () => {
  const access = await readS3Access();
  return new S3Client(access);
};

export const S3BucketZod = object({
  bucket: string().check(minLength(1)),
});

export const readS3Bucket = async () => {
  const bucket = await storage.getItem("s3-bucket");
  return S3BucketZod.parse(bucket);
};

export const writeS3Bucket = async (bucket: Record<string, unknown>) => {
  const parsed = S3BucketZod.parse(bucket);
  await storage.setItem("s3-bucket", parsed);
};
