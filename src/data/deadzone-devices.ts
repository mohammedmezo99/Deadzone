export type DeadZoneDevice = {
    codename: string;
    name: string;
    soc: "MTK" | "Snapdragon";
    brand: string;
    platform: string;
    status: "supported" | "coming_soon";
    image?: string;
    imageAlt?: string;
    bases?: string[];
    tags?: string[];
};

const platform = "HyperOS 3 / Global ROM Base / CN features";
const baseTags = ["Global Base", "China Base", "HyperOS 3", "Fastboot ZIP"];

function withComputedTags<T extends Omit<DeadZoneDevice, "tags" | "bases">>(device: T): DeadZoneDevice {
    return {
        ...device,
        image: device.image || `/devices/${device.codename}.webp`,
        imageAlt: device.imageAlt || `${device.name} device image`,
        bases: ["Global Base", "China Base"],
        tags: [
            ...baseTags,
            device.soc,
            device.status === "coming_soon" ? "Coming Soon" : "Ready",
        ],
    };
}

function ensureComputedTags(device: DeadZoneDevice): DeadZoneDevice {
    return device.tags?.length ? device : withComputedTags(device);
}

export const mtkDevices: DeadZoneDevice[] = [
    withComputedTags({ codename: "agate", name: "Xiaomi 11T", soc: "MTK", brand: "Xiaomi", platform, status: "supported" }),
    withComputedTags({ codename: "aristotle", name: "Xiaomi 13T", soc: "MTK", brand: "Xiaomi", platform, status: "supported" }),
    withComputedTags({ codename: "daumier", name: "Xiaomi 12 Pro Dimensity Edition", soc: "MTK", brand: "Xiaomi", platform, status: "supported" }),
    withComputedTags({ codename: "pissarro", name: "Redmi Note 11 Pro/Pro+ 5G / Xiaomi 11i 5G", soc: "MTK", brand: "Redmi", platform, status: "coming_soon" }),
    withComputedTags({ codename: "plato", name: "Xiaomi 12T", soc: "MTK", brand: "Xiaomi", platform, status: "supported" }),
    withComputedTags({ codename: "xaga", name: "Redmi Note 11T Pro/Pro+ / Redmi K50i / POCO X4 GT", soc: "MTK", brand: "Redmi", platform, status: "coming_soon" }),
    withComputedTags({ codename: "zircon", name: "Redmi Note 13 Pro+ 5G", soc: "MTK", brand: "Redmi", platform, status: "supported" }),
];

export const snapdragonDevices: DeadZoneDevice[] = [
    { codename: "amethyst", name: "Redmi Note 14 Pro+ 5G", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "aurora", name: "Xiaomi 14 Ultra", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "babylon", name: "Xiaomi MIX Fold 3", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "breeze", name: "Redmi 13 5G / Redmi Note 13R / POCO M6 Plus 5G", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "chenfeng", name: "Xiaomi Civi 4 Pro", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "cupid", name: "Xiaomi 12", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "dada", name: "Xiaomi 15", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "dagu", name: "Xiaomi Pad 5 Pro 12.4", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "diting", name: "Xiaomi 12T Pro / Redmi K50 Ultra", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "dizi", name: "Redmi Pad Pro", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "flame", name: "Redmi 14R 5G / Redmi 14C 5G / POCO M7 5G", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "fuxi", name: "Xiaomi 13", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "garnet", name: "Redmi Note 13 Pro 5G / POCO X6 5G", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "goku", name: "Xiaomi MIX Fold 4", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "haotian", name: "Xiaomi 15 Pro", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "haydn", name: "Redmi K40 Pro / K40 Pro+ / Mi 11i", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "houji", name: "Xiaomi 14", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "ingres", name: "Redmi K50 Gaming / POCO F4 GT", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "ishtar", name: "Xiaomi 13 Ultra", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "lisa", name: "Xiaomi 11 Lite 5G NE", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "liuqin", name: "Xiaomi Pad 6 Pro", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "marble", name: "Redmi Note 12 Turbo / POCO F5", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "mayfly", name: "Xiaomi 12S", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "miro", name: "Redmi K80 Pro / POCO F7 Ultra", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "mondrian", name: "Redmi K60 / POCO F5 Pro", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "moonstone", name: "POCO X5 5G", soc: "Snapdragon", brand: "POCO", platform, status: "supported" },
    { codename: "munch", name: "Redmi K40S / POCO F4", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "muyu", name: "Xiaomi Pad 7 Pro", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "myron", name: "Redmi K90 Pro Max / POCO F8 Ultra", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "nezha", name: "Xiaomi 17 Ultra", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "nuwa", name: "Xiaomi 13 Pro", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "odin", name: "Xiaomi MIX 4", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "onyx", name: "Redmi Turbo 4 Pro / POCO F7", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "pandora", name: "Xiaomi 17 Pro", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "peridot", name: "Redmi Turbo 3 / POCO F6", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "piano", name: "Xiaomi Pad 8 Pro", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "pipa", name: "Xiaomi Pad 6", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "popsicle", name: "Xiaomi 17 Pro Max", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "pudding", name: "Xiaomi 17", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "redwood", name: "Redmi Note 12 Pro Speed / POCO X5 Pro 5G", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "ruan", name: "Redmi Pad Pro 5G / POCO Pad 5G", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "sapphire", name: "Redmi Note 13 4G", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "sapphiren", name: "Redmi Note 13 4G NFC", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "sheng", name: "Xiaomi Pad 6S Pro 12.4", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "shennong", name: "Xiaomi 14 Pro", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "sky", name: "Redmi 12 5G / Redmi Note 12R / POCO M6 Pro 5G", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "socrates", name: "Redmi K60 Pro", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "star", name: "Xiaomi Mi 11 Ultra", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "sunstone", name: "Redmi Note 12 5G / Redmi Note 12R Pro", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "taoyao", name: "Xiaomi 12 Lite 5G", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "tapas", name: "Redmi Note 12 4G", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "thor", name: "Xiaomi 12S Ultra", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "topaz", name: "Redmi Note 12 4G NFC", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "uke", name: "Xiaomi Pad 7", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "unicorn", name: "Xiaomi 12S Pro", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "venus", name: "Xiaomi Mi 11", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "vermeer", name: "Redmi K70", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "vili", name: "Xiaomi 11T Pro", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "xuanyuan", name: "Xiaomi 15 Ultra", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "xun", name: "Redmi Pad SE", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
    { codename: "yudi", name: "Xiaomi Pad 6 Max 14", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "yupei", name: "Xiaomi Pad 8", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "zeus", name: "Xiaomi 12 Pro", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "zijin", name: "Xiaomi Civi 1S", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "ziyi", name: "Xiaomi 13 Lite / Xiaomi Civi 2", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "zizhan", name: "Xiaomi MIX Fold 2", soc: "Snapdragon", brand: "Xiaomi", platform, status: "supported" },
    { codename: "zorn", name: "Redmi K80 / POCO F7 Pro", soc: "Snapdragon", brand: "Redmi", platform, status: "supported" },
];

export const allDevices = [...mtkDevices, ...snapdragonDevices].map(ensureComputedTags).sort((a, b) => a.codename.localeCompare(b.codename));

export function findDeadZoneDevice(codename: string) {
    return allDevices.find((device) => device.codename === codename);
}
