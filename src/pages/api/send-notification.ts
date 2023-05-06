import { Novu } from "@novu/node";

export default async function handler(req: any, res: any) {
  if (!process.env.NOVU_API_KEY) {
    res.status(500).json({ success: 0 });
    return;
  }
  const novu = new Novu(process.env.NOVU_API_KEY);
  const data = JSON.parse(req.body);
  await novu.trigger("in-app-casual-hi", {
    to: {
      subscriberId: process.env.NEXT_PUBLIC_NOVU_SUBSCRIBER_ID || "",
    },
    payload: {
      msg: data.msg
    },
  });

  res.status(200).json({ success: 1 });
}
