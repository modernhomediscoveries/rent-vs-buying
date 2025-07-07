import Cloudinary from "cloudinary";
import cloudinary from "../../../../config/cloudinary";
import { dbConnect } from "../../../../db";
import ReportModel from "../../../../models/Report";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { reportId, reportData, deletePrevPhoto } = await req.json();
    await dbConnect();
    await cloudinary();
    if (reportId) {
      const report = await ReportModel.findOneAndUpdate(
        { _id: reportId },
        reportData
      );
      if (deletePrevPhoto) {
        Cloudinary.v2.uploader.destroy(report.selectedFile.publicId);
      }
    } else {
      await ReportModel.create(reportData);
    }
    return Response.json({ message: "Saved successfully!" });
  } catch {
    return Response.json({ message: "An error occured!" }, { status: 500 });
  }
}
