import fs from "node:fs";
import path from "node:path";

const fallbackVersion = "v1.06";
const versionFilePath = path.join(process.cwd(), "Version");

export function getDeadZoneVersion() {
    try {
        const value = fs.readFileSync(versionFilePath, "utf8").trim();
        return value || fallbackVersion;
    } catch {
        return fallbackVersion;
    }
}

export const deadZoneVersion = fallbackVersion;
