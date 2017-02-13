let s3 = require('s3');
let AWS = require('aws-sdk'); // https://www.npmjs.com/package/aws-sdk

export = () => {
  console.log('process.env.AWS_S3_ACCESS_KEY', process.env.AWS_S3_ACCESS_KEY);

  AWS.config.loadFromPath('./amz-s3-credentials.json');

  let awsS3Client = new AWS.S3({
    signatureVersion: "v4",
//    s3DisableBodySigning: true
  });
  let client = s3.createClient({
    maxAsyncS3: 20,     // this is the default
    s3RetryCount: 3,    // this is the default
    s3RetryDelay: 1000, // this is the default
    multipartUploadThreshold: 20971520, // this is the default (20 MB)
    multipartUploadSize: 15728640, // this is the default (15 MB)
    s3Client: awsS3Client
  });

  client.s3.addExpect100Continue = () => {};

  let params = {
    localDir: "./dist/prod",
    deleteRemoved: true,
    s3Params: {
      Prefix: "",
      Bucket: "hitta-skyddsrum",
    },
  };
  let uploader = client.uploadDir(params);
  uploader.on('error', (err: any) => {
    console.error("unable to sync:", err.stack);
  });
  uploader.on('progress', () => {
    console.log("progress", (uploader.progressAmount/uploader.progressTotal) * 100);
  });
  uploader.on('end', () => {
    console.log("done uploading");
  });

  return uploader;
}