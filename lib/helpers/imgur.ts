import axios from "axios";

export class Imgur {
  static async uploadImage(image: any): Promise<{ link: string }> {
    const data = new FormData();

    data.append("image", image);

    try {
      let res = await axios.post("https://api.imgur.com/3/image", data, {
        headers: {
          Authorization: "Client-ID 18c8d1c82afa55e",
        },
      });

      return res.data.data;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      throw err;
    }
  }
}
