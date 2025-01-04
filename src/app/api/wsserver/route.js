import WebSocket from "ws";
import { decodeWithKey } from "../../lib/utils";

const ANGELONE_URL = "wss://smartapisocket.angelone.in/smart-stream";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  console.log("Test 😀😀😀😀😀", searchParams);
  const clientCode = decodeWithKey(searchParams.get("clientCode"));
  const feedToken = searchParams.get("feedToken");
  const apiKey = decodeWithKey(searchParams.get("apiKey"));

  if (!clientCode || !feedToken || !apiKey) {
    return new Response(
      JSON.stringify({ error: "Missing required parameters" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  const finalurl = `${ANGELONE_URL}?clientCode=${clientCode}&feedToken=${feedToken}&apiKey=${apiKey}`;
  console.log("😎😎😎", finalurl);
  const angelOneWS = new WebSocket(finalurl);

  return new Response(
    async (stream) => {
      const encoder = new TextEncoder();

      angelOneWS.on("message", (data) => {
        const ltpData = JSON.parse(data.toString());
        stream.write(encoder.encode(`data: ${JSON.stringify(ltpData)}\n\n`));
      });

      angelOneWS.on("close", () => {
        stream.end();
      });

      angelOneWS.on("error", () => {
        stream.end();
      });
    },
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    }
  );
}
