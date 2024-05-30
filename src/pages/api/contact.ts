import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  runtime: "edge",
};

const defaultHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Methods": "POST",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // if dev environment just return 200 but making a small delay to simulate a real request
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return new Response(
      JSON.stringify({ message: "Email sent successfully (DEV)" }),
      {
        status: 200,
        headers: {
          ...defaultHeaders,
          "Access-Control-Allow-Origin": "localhost:3000",
        },
      }
    );
  }

  const { to, name, text } = await req.body;

  const sesClient = new SESClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const params: any = {
    Source: process.env.EMAIL_USER || "",
    Destination: {
      ToAddresses: [process.env.EMAIL_USER],
    },
    Message: {
      Subject: {
        Data: "this email tried to contact you: " + to,
      },
      Body: {
        Text: {
          Data: "from: " + name + "\n" + text,
        },
      },
    },
  };

  const command = new SendEmailCommand(params);

  try {
    const data = await sesClient.send(command);
    return new Response(
      JSON.stringify({ message: "Email sent successfully", data }),
      {
        status: 200,
        headers: {
          ...defaultHeaders,
          "Access-Control-Allow-Origin": process.env.DOMAIN || "",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to send email", error }),
      {
        status: 500,
        headers: {
          ...defaultHeaders,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
