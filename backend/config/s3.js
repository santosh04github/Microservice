import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "AKIAW5SOHC6QZUO5RR2I",      // set in .env
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  bucketName:process.env.S3_BUCKET_NAME

  
                  // e.g., "ap-south-1"
});

export default s3;
