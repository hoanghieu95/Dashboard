import connectToDB from "@/database";
import History from "@/models/history";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const getAllHistory = await History.find({});

    if (getAllHistory) {
      return NextResponse.json({
        success: true,
        data: getAllHistory,
      });
    } else {
      return NextResponse.json({
        success: false,
        message:
          "failed to fetch the history ! Please try again after some time",
      });
    }
  } catch (e) {
    console.log(e);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
