// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = Barrell;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) {
  const barrells = (await fetch(
    `https://${req.headers.host}/api/barrells`
  ).then((response) => response.json())) as Barrell[];

  if (barrells.find((barrell) => barrell.name == req.query.name)) {
    res
      .status(200)
      .send(barrells.find((barrell) => barrell.name == req.query.name)!);
  } else {
    res.status(404).send("Barrell not found");
  }
}
