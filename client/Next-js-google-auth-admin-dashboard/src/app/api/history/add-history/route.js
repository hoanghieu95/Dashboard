import connectToDB from "@/database";
import History from "@/models/history";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    const extractData = await req.json();
    const newlyCreatedHistory = await Product.create(extractData);

    if (newlyCreatedHistory) {
      return NextResponse.json({
        success: true,
        message: "History added successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "failed to add a history ! Please try after some time.",
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
