import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { to, name, text } = await req.json();

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
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to send email", error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
