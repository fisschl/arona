import { object, string } from "zod/mini";
import { storage } from "./storage";

export const S3AccessZod = object({
  accessKeyId: string(),
  secretAccessKey: string(),
  endpoint: string(),
});

export const readS3Access = async () => {
  const access = await storage.getItem("s3-access");
  return S3AccessZod.parse(access);
};

export const writeS3Access = async (access: Record<string, unknown>) => {
  const parsed = S3AccessZod.safeParse(access);
  if (!parsed.success) throw new Error("Invalid access");
  await storage.setItem("s3-access", parsed.data);
};
