// src/app/api/test-app/route.ts

import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

// Use environment variables for security
const notionSecret = "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"
const notionDatabaseId = "12f39bcee00e806cbff7c0f8b8301009"

const notion = new Client({ auth: notionSecret });

export async function GET() {
  if (!notionSecret || !notionDatabaseId) {
    return NextResponse.json({ error: "Missing Notion secret or Database ID." }, { status: 500 });
  }

  try {
    const query = await notion.databases.query({
      database_id: notionDatabaseId,
    });

    return NextResponse.json(query.results, { status: 200 });
  } catch (error) {
    console.error("Notion API error:", error);
    return NextResponse.json({ error: "Failed to fetch data from Notion API." }, { status: 500 });
  }
}


