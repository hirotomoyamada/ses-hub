import * as functions from "firebase-functions";
import { BitlyClient } from "bitly";

const bitly = new BitlyClient(functions.config().bitly.access_token);

export const shortUrl = async (data: string): Promise<string> => {
  const { link } = await bitly.shorten(data);

  return link;
};
