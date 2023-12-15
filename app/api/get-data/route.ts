import { NextResponse } from "next/server";

export function GET(request: Request) {
    return NextResponse.json({ message: 'Hello world!!' }, {
        headers: { "Authorization": "Bearer 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" },
    });
}