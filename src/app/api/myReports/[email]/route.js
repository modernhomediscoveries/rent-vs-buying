import { dbConnect } from "../../../../../db";
import ReportModel from "../../../../../models/Report";
export const dynamic = "force-dynamic";

export async function GET(_, { params: { email } }) {
  try {
    await dbConnect();
    const report = await ReportModel.find({ userEmail: email });
    return Response.json(report);
  } catch {
    return Response.json({ message: "An error occured!" }, { status: 500 });
  }
}
