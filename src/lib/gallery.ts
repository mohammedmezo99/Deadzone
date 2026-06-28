import fs from "fs";
import path from "path";

export type GalleryImage = {
    src: string;
    alt: string;
};

const liteGalleryDir = path.join(process.cwd(), "public", "showcase", "deadzone-lite");
const imagePattern = /\.(png|jpe?g|webp|avif)$/i;

function byNumericFilename(a: string, b: string) {
    const aNumber = Number.parseInt(a, 10);
    const bNumber = Number.parseInt(b, 10);

    if (Number.isNaN(aNumber) || Number.isNaN(bNumber)) {
        return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
    }

    return aNumber - bNumber;
}

export function getDeadZoneLiteGalleryImages(): GalleryImage[] {
    const files = fs.readdirSync(liteGalleryDir).filter((file) => imagePattern.test(file)).sort(byNumericFilename);

    return files.map((file, index) => ({
        src: `/showcase/deadzone-lite/${file}`,
        alt: `Lite Screenshot ${index + 1}`,
    }));
}
