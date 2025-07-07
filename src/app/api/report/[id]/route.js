import Cloudinary from "cloudinary";
import cloudinary from "../../../../../config/cloudinary";
import { dbConnect } from "../../../../../db";
import ReportModel from "../../../../../models/Report";
export const dynamic = "force-dynamic";

export async function GET(_, { params: { id } }) {
  try {
    await dbConnect();
    const report = await ReportModel.findOne({ _id: id });
    return Response.json(report);
  } catch {
    return Response.json({ message: "An error occured!" }, { status: 500 });
  }
}

export async function DELETE(_, { params: { id } }) {
  try {
    await dbConnect();
    await cloudinary();
    const report = await ReportModel.findOneAndDelete({ _id: id });
    Cloudinary.v2.uploader.destroy(report.selectedFile.publicId);
    return Response.json(report);
  } catch {
    return Response.json({ message: "An error occured!" }, { status: 500 });
  }
}
