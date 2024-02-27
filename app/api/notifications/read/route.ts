import { NextRequest, NextResponse } from "next/server";
import { ReadNotifsReqDto } from "@/types/notifications/read-notifs-req.dto";
import { MOCK_NOTIFICATIONS } from "@/app/api/notifications/route";

// Post several read notifications
export async function POST(req: NextRequest) {
  const body: ReadNotifsReqDto = await req.json();
  MOCK_NOTIFICATIONS.forEach((notification) => {
    if (body.notificationIds.includes(notification.id)) {
      notification.read = true;
    }
  });
  return NextResponse.json(
    {
      success: true,
    },
    {
      status: 200,
    }
  );
}
