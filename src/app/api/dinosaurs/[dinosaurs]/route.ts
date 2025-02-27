import { NextRequest } from "next/server";
import data from "../data.json" with { type: "json" };

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ dinosaurs: string }> }
) => {
  const dinosaur = (await params).dinosaurs;
  
  if (!dinosaur) {
    return Response.json({ error: "No dinosaur name provided." }, { status: 400 });
  }

  const dinosaurData = data.find((item) =>
    item.name.toLowerCase() === dinosaur.toLowerCase()
  );

  if (!dinosaurData) {
    return Response.json({ error: "Dinosaur not found." }, { status: 404 });
  }

  return Response.json(dinosaurData);
};
