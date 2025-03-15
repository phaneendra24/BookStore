import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import S3 from "aws-sdk/clients/s3";
import { env } from "~/env.mjs";

const s3Client = new S3({
  endpoint: "http://localhost:9000",
  region: "us-east-1", // Can be any value, MinIO ignores it
  credentials: {
    accessKeyId: env.MINIO_ACCESS_KEY, // Your MinIO access key
    secretAccessKey: env.MINIO_ACCESS_SECRET, // Your MinIO secret key
  },
  s3ForcePathStyle: true, // Required for MinIO
});

import * as Minio from "minio";
import { z } from "zod";

const minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: env.MINIO_ACCESS_KEY,
  secretKey: env.MINIO_ACCESS_SECRET,
});

const bucketName = "store";

async function getPresignedUploadUrl(
  bucketName: string,
  objectKey: string,
  expirationSeconds = 900
) {
  // return s3Client.getSignedUrl("putObject", {
  //   Bucket: bucketName,
  //   Key: objectKey,
  //   Expires: expirationSeconds,
  // });
  const buckets = await minioClient.listBuckets();
  console.log("buckets: ", buckets);

  const url = await minioClient.presignedPutObject(
    bucketName,
    objectKey,
    expirationSeconds
  );

  console.log("url :", url);

  return url;
}

export const Miniorouter = createTRPCRouter({
  generatePreSignedUrlsToUpload: protectedProcedure
    .input(z.object({ no_of_urls: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const urls: string[] = [];
      const object_keys: string[] = [];
      await Promise.all(
        Array.from({ length: input.no_of_urls }, async (_, i) => {
          const objectKey = `uploads/${Date.now()}-ITM-${i}`;
          const temp_url = await getPresignedUploadUrl(
            bucketName,
            objectKey,
            900
          );
          urls.push(temp_url);
          object_keys.push(objectKey);
        })
      );

      console.log("urls", urls);

      return {
        object_keys: object_keys,
        urls: urls,
      };
    }),

  // Generate a presigned URL for downloading a file
  // async function generateDownloadUrl(bucketName, objectKey, expirationSeconds = 3600) {
  //   const command = new GetObjectCommand({
  //     Bucket: bucketName,
  //     Key: objectKey
  //   });

  //   return await getSignedUrl(s3Client, command, { expiresIn: expirationSeconds });
  // }
});
