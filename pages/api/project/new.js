import { executeQuery } from "../../../lib/db";

export default async (req, res) => {
  if (req.method === "GET") res.send(200);
  else if (req.method === "POST") {
    const data = req.body;
    const {componants} = data ;
  
     await executeQuery(
       "INSERT INTO project_info (projectId,name,location,latitude,longitude,exec,cost,timespan,goal,is_proposal) VALUES(?,?,?,?,?,?,?,?,?,?)",
       [data.projectId, data.title, data.location, data.lat,data.long,data.ea,data.cost,data.timeSpan,data.goal,1]
     );
     await executeQuery(
       "INSERT INTO proposals (projectId,proposal_date) VALUES(?,?)",
       [data.projectId,data.proposalDate]
     );
    for(let i=0;i<componants.length;i++){
      await executeQuery(
        "INSERT INTO componants (projectId,usercode,componant_id,componant_type,budget_ratio) VALUES(?,?,?,?,?)",
        [
          data.projectId,
          data.ea,
          componants[i].componantId,
          componants[i].componantType,
          componants[i].budgetRatio,
        ]
      );
    }
    return res
      .status(200)
      .json({ msg: "Project Added Successfully!", err: false });
  }
};
