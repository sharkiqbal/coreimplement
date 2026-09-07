import { initializeApp, cert } from "firebase-admin/app";
import { getSecurityRules } from "firebase-admin/security-rules";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SERVICE_ACCOUNT_PATH = process.argv[2];
if (!SERVICE_ACCOUNT_PATH) {
  console.error("Usage: node deploy-firestore-rules.mjs <path-to-service-account.json>");
  process.exit(1);
}

const serviceAccount = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, "utf8"));
const app = initializeApp({ credential: cert(serviceAccount) });

const rulesSource = readFileSync(path.join(__dirname, "..", "firestore.rules"), "utf8");

const securityRules = getSecurityRules(app);
await securityRules.releaseFirestoreRulesetFromSource(rulesSource);

console.log("Firestore rules deployed successfully.");
process.exit(0);
