// utils/analytics.server.ts
import { SignatureV4 } from "https://esm.sh/@smithy/signature-v4";
import { HttpRequest } from "https://esm.sh/@smithy/protocol-http";
import { Sha256 } from "https://esm.sh/@aws-crypto/sha256-js";
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import { AwsCredentialIdentity } from "https://esm.sh/@aws-sdk/types";

interface AnalyticsEvent {
  event_id: string;
  event_type: string;
  pathname?: string | null;
  referrer?: string | null;
  user_agent?: string | null;
  session_id: string;
  anonymous_id: string;
  user_id?: string | null;
  timestamp: number;
  data_element?: string | null;
  name?: string | null;
  email?: string | null;
}

interface AWSCredentials extends AwsCredentialIdentity {
  accessKeyId: string;
  secretAccessKey: string;
}

async function getAWSCredentials(): Promise<AWSCredentials> {
  const client = new SecretsManagerClient({ 
    region: "us-east-1",
    credentials: {
      accessKeyId: Deno.env.get("AWS_ACCESS_KEY_ID") || '',
      secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY") || ''
    }
  });
  
  const command = new GetSecretValueCommand({
    SecretId: "deno-gatar-traffic-controller",
  });
  
  try {
    const response = await client.send(command);
    const credentials = JSON.parse(response.SecretString || '{}');
    return {
      accessKeyId: credentials.AWS_ACCESS_KEY_ID,
      secretAccessKey: credentials.AWS_SECRET_ACCESS_KEY
    };
  } catch (error) {
    console.error('Error fetching credentials:', error);
    throw error;
  }
}

async function sendLambdaRequest(event: AnalyticsEvent) {
  const credentials = await getAWSCredentials();
  const ANALYTICS_URL = new URL("https://1tmeqd63r4.execute-api.us-east-1.amazonaws.com/gatar_stage/gatar-event-consumer");

  const request = new HttpRequest({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    hostname: ANALYTICS_URL.hostname,
    path: ANALYTICS_URL.pathname,
    body: JSON.stringify(event),
    protocol: ANALYTICS_URL.protocol.replace(":", "")
  });

  const signer = new SignatureV4({
    credentials,
    region: 'us-east-1',
    service: "lambda",
    sha256: Sha256,
  });

  const signedRequest = await signer.sign(request);

  return fetch(ANALYTICS_URL, {
    method: signedRequest.method,
    headers: signedRequest.headers as HeadersInit,
    body: signedRequest.body,
  });
}

export async function trackEvent(event: AnalyticsEvent) {
  try {
    const response = await sendLambdaRequest(event);
    console.log('Event tracked:', event, response.status);
    return response.ok;
  } catch (error) {
    console.error('Failed to track event:', error);
    return false;
  }
}

export type { AnalyticsEvent };