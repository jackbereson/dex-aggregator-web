/* eslint-disable no-console */
import axios from "axios";

export class UploadHelper {
  static async uploadSingeFile({
    file,
    token,
  }: {
    file: string | Blob;
    token: string;
  }): Promise<UploadFile> {
    const url = process.env.UPLOAD_URI;

    // console.log("url", url);
    const formdata = new FormData();

    formdata.append("file", file);

    // console.log("formdata", formdata);
    try {
      let res = await axios.post(`${url}/upload-file`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-token": token,
        },
      });

      // console.log("res", res);

      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async uploadNftFiles({
    files,
    token,
  }: {
    files: any[];
    token: string;
  }): Promise<UploadFile> {
    const url = process.env.UPLOAD_URI;

    // console.log("files", files);
    const formdata = new FormData();

    for (const key of Object.keys(files)) {
      formdata.append("files", files[key as unknown as number]);
    }

    // console.log("formdata", formdata);
    try {
      let res = await axios.post(`${url}/upload-nft-files`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-token": token,
        },
      });

      // console.log("res", res);

      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export enum MediaType {
  AVATAR = "AVATAR",
  BANNER = "BANNER",
  NFT = "NFT",
  CONTENT = "CONTENT",
  COLLECTION = "COLLECTION",
  LAUNCHPAD = "LAUNCHPAD",
  OTHER = "OTHER",
}

export type UploadFile = {
  message: string;
  urls: string[];
};
