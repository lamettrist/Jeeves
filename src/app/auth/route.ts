import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
    // const { userId } = await auth();
    // if (userId) {
    //     return NextResponse.json({
    //         'status': `You're already logged in, why are you here?`
    //     });
    // }
return NextResponse.json({
    'status': `WHO ARE YOU?`
});
}
