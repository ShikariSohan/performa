import { executeQuery } from "../../../lib/db";

export default async (req, res) => {
  if (req.method === "GET") {
    console.log(req.query)
    const id = req.query.id;
    const proposal = await executeQuery(
      "select * from project_info where projectId=(?)",
      [id]
    );
    console.log(proposal)
    const componant = await executeQuery(
      "select * from componants where projectId=?",[id]
    );
    return res.status(200).json({ data: {
        proposal,
        componant
    }, err: false });
  }
};
