import AWS from "aws-sdk";
import Utils from "../Utils";
import { format } from "date-fns";
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import NotificationUtils from "@/utils/baseUtils/NotificationUtils";
import LoaderUtils from "@/utils/baseUtils/LoaderUtils";

class S3FileUpload {
  static params = {
    ALBUM_BUCKET_NAME: "lumbex-vue-s3-file-uploads",
    ALBUM_BUCKET_LINK:
      "https://lumbex-vue-s3-file-uploads.s3-us-west-2.amazonaws.com/",
    BUCKET_REGION: "us-west-2",
    albums: {
      STAGING: "staging",
      BANK_LOGO: "BankLogo",
      CUSTOMER_PICTURE: "CustomerPicture",
      CUSTOMER_MANDATE: "CustomerMandate",
      ACCOUNT_DOCUMENTS: "accountDocuments"
    }
  };

  static async uploadFileToS3BucketAsync(
    file,
    targetAlbum,
    uploadProgress = () => {},
    uploadError = () => {},
    finalName,
    finalAlbum
  ) {
    LoaderUtils.showLoading(true, LoaderUtils.types.UPLOAD);

    let albumPhotosKey = encodeURIComponent(targetAlbum) + "/";
    let photoKey = `${albumPhotosKey}${finalName}_${Utils.generateNineRandomNumbers()}.${this.getFileExtension(
      file
    )}`;

    AWS.config.update({
      region: S3FileUpload.params.BUCKET_REGION,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: StoreUtils.rootGetters("user/getIdentityPoolId")
      })
    });

    let upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: S3FileUpload.params.ALBUM_BUCKET_NAME,
        Key: photoKey,
        Body: file,
        ACL: "public-read"
      }
    });
    let promise = upload
      .on("httpUploadProgress", function(progress) {
        uploadProgress((progress.loaded * 100) / progress.total);
      })
      .promise();
    return await promise.then((data, err) => {
      if (err) {
        uploadError(`Unable to upload file`);
        return err;
      }

      NotificationUtils.addNotificationSlide(
        `${finalName} Uploaded. Click submit!`,
        NotificationUtils.type.SUCCESS
      );
      LoaderUtils.showLoading(false, LoaderUtils.types.UPLOAD);

      return [
        {
          ...data,
          url: data.Location,
          finalUrl: S3FileUpload.getFileFinalUrl(
            data.Key,
            finalName,
            finalAlbum
          ),
          finalName,
          finalAlbum
        }
      ];
    });
  }

  static async uploadFileToS3BucketAsyncOld(
    file,
    targetAlbum,
    uploadProgress = () => {},
    uploadError = () => {},
    finalName,
    finalAlbum
  ) {
    // console.log("finalAlbum =>", finalAlbum);

    let albumPhotosKey = encodeURIComponent(targetAlbum) + "/";
    let photoKey = `${albumPhotosKey}${format(
      new Date(),
      "dd-MMM-yyyy HH:mm:ss"
    )}_${Utils.generateNineRandomNumbers()}.${this.getFileExtension(file)}`;

    const accessKeyId = StoreUtils.rootGetters("user/getS3Key").accessKey;
    const secretAccessKey = StoreUtils.rootGetters("user/getS3Key").secretKey;

    let s3 = new AWS.S3({
      accessKeyId,
      secretAccessKey
    });

    // Setting up S3 upload parameters
    const params = {
      Bucket: S3FileUpload.params.ALBUM_BUCKET_NAME,
      Key: photoKey,
      Body: file,
      ACL: "public-read"
    };

    return await s3
      .upload(params)
      .on("httpUploadProgress", function(progress) {
        uploadProgress((progress.loaded * 100) / progress.total);
      })
      .promise()
      .then(data => {
        return [
          {
            ...data,
            url: data.Location,
            finalUrl: S3FileUpload.getFileFinalUrl(
              data.Key,
              finalName,
              finalAlbum
            ),
            finalName,
            finalAlbum
          }
        ];
      })
      .catch(() => {
        // console.log("Upload Error =>", err);
        uploadError(`Unable to upload file`);
      });
  }

  static getFileFinalUrl(oldKey, newName, targetAlbum) {
    return `${
      S3FileUpload.params.ALBUM_BUCKET_LINK
    }${targetAlbum}/${newName}.${this.getFileExtensionFromKey(oldKey)}`;
  }
  static async moveFileInS3Bucket(oldKey, newName, targetAlbum) {
    //copy file from staging area to the final destination

    // create a new s3 object
    let s3 = new AWS.S3();

    let newAlbumPhotosKey = encodeURIComponent(targetAlbum) + "/";
    let newPhotoKey = `${newAlbumPhotosKey}${newName}.${this.getFileExtensionFromKey(
      oldKey
    )}`;

    // Copy the object to a new location
    s3.copyObject({
      Bucket: S3FileUpload.params.ALBUM_BUCKET_NAME,
      CopySource: `${S3FileUpload.params.ALBUM_BUCKET_NAME}/${oldKey}`,
      Key: newPhotoKey
    })
      .promise()
      .then(() =>
        // Delete the old object
        s3
          .deleteObject({
            Bucket: S3FileUpload.params.ALBUM_BUCKET_NAME,
            Key: oldKey
          })
          .promise()
      )
      // Error handling is left up to reader
      .catch();
  }

  static getFileExtension(file) {
    return file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);
  }

  static getFileExtensionFromKey(fileKey) {
    return fileKey.slice(((fileKey.lastIndexOf(".") - 1) >>> 0) + 2);
  }
}

export default S3FileUpload;
