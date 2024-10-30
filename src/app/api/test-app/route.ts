// src/app/api/test-app/route.ts

import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

// Use environment variables for security
const notionSecret = "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";
const notionDatabaseId = "12f39bcee00e806cbff7c0f8b8301009";

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

// POST request to add data
export async function POST(req: Request) {
  if (!notionSecret || !notionDatabaseId) {
    return NextResponse.json({ error: "Missing Notion secret or Database ID." }, { status: 500 });
  }

  try {
    const { name, email, phone } = await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "All fields (name, email, phone) are required." }, { status: 400 });
    }

    // Create a new page in the Notion database with the provided fields
    const response = await notion.pages.create({
      parent: { database_id: notionDatabaseId },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        Email: { rich_text: [{ text: { content: email } }] },
        Phone: { rich_text: [{ text: { content: phone } }] },
      },
    });

    return NextResponse.json({ message: "Data added successfully.", data: response }, { status: 201 });
  } catch (error) {
    console.error("Notion API error:", error);
    return NextResponse.json({ error: "Failed to add data to Notion API." }, { status: 500 });
  }
}
