import { executeQuery } from "../../../lib/db";

export default async (req, res) => {
  if (req.method === "GET") {
    const data = await executeQuery(
      "select * from proposals INNER JOIN project_info ON proposals.projectId=project_info.projectId",
      []
    );    
    return res
      .status(200)
      .json({ data:data, err: false })
  }
};
