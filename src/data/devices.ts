import type { CodenameRegistryEntry, DeviceCategory, SupportedDevice } from "@/types";

export const deviceCategories: DeviceCategory[] = [
    "Xiaomi Series",
    "Xiaomi MIX / Fold / Flip Series",
    "Redmi K / Turbo Series",
    "Redmi Note Series",
    "Redmi Number Series",
    "POCO F Series",
    "POCO X Series",
    "POCO M / C Series",
    "Xiaomi Pad / Redmi Pad / POCO Pad",
];

const fallbackImage = "/devices/fallback-device.svg";
const exactDeviceImageByName: Record<string, string> = {
    "POCO X6 5G": "poco-x6",
    "POCO X6 Pro": "poco-x6-pro",
    "POCO X7": "poco-x7",
    "Xiaomi 13T Pro": "xiaomi-13t-pro",
    "Xiaomi 14T": "xiaomi-14t",
    "Xiaomi 15T Pro": "xiaomi-15t-pro",
    "Xiaomi 17": "xiaomi-17",
    "Xiaomi 17 Ultra": "xiaomi-17-ultra",
    "Xiaomi Pad 6S Pro 12.4": "xiaomi-pad-6s-pro-12-4",
    "Xiaomi Pad 8": "xiaomi-pad-8",
    "Xiaomi Pad 8 Pro": "xiaomi-pad-8-pro",
};

const exactImageKeys = new Set([
    "agate",
    "amethyst",
    "aristotle",
    "aurora",
    "babylon",
    "cupid",
    "dada",
    "diting",
    "dizi",
    "fuxi",
    "garnet",
    "haydn",
    "houji",
    "ingres",
    "ishtar",
    "lisa",
    "malachite",
    "marble",
    "miro",
    "mondrian",
    "moonstone",
    "munch",
    "muyu",
    "nuwa",
    "onyx",
    "peridot",
    "pipa",
    "pissarro",
    "plato",
    "redwood",
    "rodin",
    "rothko",
    "ruan",
    "sapphire",
    "sapphiren",
    "sky",
    "star",
    "sunstone",
    "taoyao",
    "tapas",
    "thor",
    "topaz",
    "uke",
    "venus",
    "vermeer",
    "vili",
    "xaga",
    "xuanyuan",
    "xun",
    "zeus",
    "zircon",
    "ziyi",
    "zorn",
]);

type CodenameSeed = {
    aliases?: string[];
    closestTo?: string;
    exactFor?: string[];
};

const codenameSeeds: Record<string, CodenameSeed> = {
    agate: {},
    alioth: { aliases: ["aliothin"], closestTo: "venus" },
    amethyst: {},
    annibale: { closestTo: "zorn" },
    aristotle: {},
    aurora: {},
    babylon: {},
    breeze: { closestTo: "sky" },
    chenfeng: { closestTo: "ziyi" },
    corot: { closestTo: "aristotle" },
    cupid: {},
    dada: {},
    dagu: { closestTo: "pipa" },
    daumier: { closestTo: "plato" },
    degas: { closestTo: "rothko" },
    diting: { aliases: ["ditingp"], exactFor: ["Xiaomi 12T Pro"] },
    dizi: {},
    duchamp: { closestTo: "redwood" },
    flame: { closestTo: "sky" },
    fuxi: {},
    garnet: { exactFor: ["Redmi Note 13 Pro 5G"] },
    goku: { closestTo: "babylon" },
    haotian: { closestTo: "dada" },
    haydn: { aliases: ["haydnin"], closestTo: "venus" },
    houji: {},
    ingres: { exactFor: ["POCO F4 GT"] },
    ishtar: {},
    klimt: { closestTo: "rothko" },
    liuqin: { closestTo: "pipa" },
    lisa: {},
    malachite: { exactFor: ["Redmi Note 14 Pro"] },
    manet: { closestTo: "vermeer" },
    marble: { aliases: ["marblein"], exactFor: ["POCO F5"] },
    mars: { closestTo: "venus" },
    mayfly: { closestTo: "zeus" },
    miro: { exactFor: ["POCO F7 Ultra"] },
    mondrian: { exactFor: ["POCO F5 Pro"] },
    moonstone: {},
    munch: { aliases: ["munchin"], exactFor: ["POCO F4"] },
    muyu: {},
    myron: { closestTo: "miro" },
    nezha: { closestTo: "xuanyuan" },
    nuwa: {},
    odin: { closestTo: "dada" },
    onyx: { exactFor: ["POCO F7"] },
    pandora: { closestTo: "dada" },
    peridot: { exactFor: ["POCO F6"] },
    piano: { closestTo: "muyu" },
    pipa: {},
    pissarro: { exactFor: ["Redmi Note 11 Pro+ 5G", "Xiaomi 11i 5G"] },
    plato: {},
    popsicle: { closestTo: "xuanyuan" },
    psyche: { closestTo: "cupid" },
    pudding: { closestTo: "dada" },
    redwood: { exactFor: ["POCO X5 Pro"] },
    rodin: { exactFor: ["POCO X7 Pro"] },
    rothko: { exactFor: ["Xiaomi 14T Pro"] },
    ruan: { exactFor: ["Redmi Pad Pro 5G", "POCO Pad 5G"] },
    sapphire: {},
    sapphiren: {},
    sheng: { closestTo: "pipa" },
    shennong: { closestTo: "houji" },
    sky: { exactFor: ["Redmi 12 5G"] },
    socrates: { closestTo: "mondrian" },
    star: {},
    sunstone: { exactFor: ["Redmi Note 12 5G"] },
    taoyao: {},
    tapas: {},
    thor: {},
    topaz: {},
    uke: {},
    unicorn: { closestTo: "thor" },
    vayu: { aliases: ["bhima"], closestTo: "moonstone" },
    venus: {},
    vermeer: { exactFor: ["POCO F6 Pro"] },
    vili: {},
    xaga: { exactFor: ["POCO X4 GT"] },
    xuanyuan: {},
    xun: {},
    yudi: { closestTo: "pipa" },
    yupei: { closestTo: "muyu" },
    zeus: {},
    zijin: { closestTo: "ziyi" },
    ziyi: { exactFor: ["Xiaomi 13 Lite", "Xiaomi Civi 2"] },
    zizhan: { closestTo: "babylon" },
    zircon: {},
    zorn: { exactFor: ["POCO F7 Pro"] },
};

type CodenameRegistryMeta = CodenameRegistryEntry & {
    exactFor?: string[];
};

function buildCodenameEntry(codename: string, seed: CodenameSeed = {}): CodenameRegistryMeta {
    const imageKey = exactImageKeys.has(codename) ? codename : seed.closestTo;

    if (imageKey) {
        return {
            codename,
            supported: true,
            image: `/devices/${imageKey}.webp`,
            imageFallback: fallbackImage,
            imageType: exactImageKeys.has(codename) ? "exact" : "closest",
            aliases: seed.aliases,
            closestTo: seed.closestTo,
            exactFor: seed.exactFor,
        };
    }

    return {
        codename,
        supported: true,
        image: fallbackImage,
        imageFallback: fallbackImage,
        imageType: "fallback",
        aliases: seed.aliases,
        closestTo: seed.closestTo,
        exactFor: seed.exactFor,
    };
}

const codenameRegistryMeta = Object.fromEntries(
    Object.entries(codenameSeeds).map(([codename, seed]) => [codename, buildCodenameEntry(codename, seed)]),
) as Record<string, CodenameRegistryMeta>;

export const codenameRegistry: Record<string, CodenameRegistryEntry> = Object.fromEntries(
    Object.entries(codenameRegistryMeta).map(([codename, entry]) => {
        const { exactFor: _exactFor, ...registryEntry } = entry;
        return [codename, registryEntry];
    }),
) as Record<string, CodenameRegistryEntry>;

type DeviceSeed = {
    name: string;
    codename: string;
    category: DeviceCategory;
    brand: string;
    aliases?: string[];
};

function defineDevice(seed: DeviceSeed): SupportedDevice {
    const registryEntry = codenameRegistryMeta[seed.codename];
    const exactDeviceImageKey = exactDeviceImageByName[seed.name];

    if (exactDeviceImageKey) {
        return {
            ...seed,
            supported: true,
            image: `/devices/${exactDeviceImageKey}.webp`,
            imageSource: "exact",
            aliases: Array.from(new Set([...(registryEntry?.aliases ?? []), ...(seed.aliases ?? [])])),
        };
    }

    if (!registryEntry) {
        return {
            ...seed,
            supported: true,
            image: fallbackImage,
            imageSource: "fallback",
        };
    }

    let imageSource: SupportedDevice["imageSource"] = registryEntry.imageType;

    if (registryEntry.imageType === "exact") {
        const exactFor = registryEntry.exactFor ?? [];
        imageSource = exactFor.length === 0 || exactFor.includes(seed.name) ? "exact" : "codename";
    }

    return {
        ...seed,
        supported: true,
        image: registryEntry.image,
        imageSource,
        aliases: Array.from(new Set([...(registryEntry.aliases ?? []), ...(seed.aliases ?? [])])),
    };
}

const supportedDeviceEntries: DeviceSeed[] = [
    { name: "Xiaomi 11 Lite 5G NE", codename: "lisa", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 11", codename: "venus", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 11 Pro", codename: "mars", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 11 Ultra", codename: "star", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 11T", codename: "agate", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 11T Pro", codename: "vili", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 11i 5G", codename: "pissarro", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 12", codename: "cupid", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 12 Lite 5G", codename: "taoyao", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 12 Pro", codename: "zeus", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 12 Pro Dimensity Edition", codename: "daumier", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 12S", codename: "mayfly", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 12S Pro", codename: "unicorn", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 12S Ultra", codename: "thor", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 12T", codename: "plato", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 12T Pro", codename: "diting", category: "Xiaomi Series", brand: "Xiaomi", aliases: ["ditingp"] },
    { name: "Xiaomi 12X", codename: "psyche", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 13", codename: "fuxi", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 13 Lite", codename: "ziyi", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 13 Pro", codename: "nuwa", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 13T", codename: "aristotle", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 13T Pro", codename: "corot", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 13 Ultra", codename: "ishtar", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 14", codename: "houji", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 14 Civi", codename: "chenfeng", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 14 Pro", codename: "shennong", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 14 Ultra", codename: "aurora", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 14T", codename: "degas", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 14T Pro", codename: "rothko", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 15", codename: "dada", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 15 Pro", codename: "haotian", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 15 Ultra", codename: "xuanyuan", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 15T Pro", codename: "klimt", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 17", codename: "pudding", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 17 Pro", codename: "pandora", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 17 Pro Max", codename: "popsicle", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi 17 Ultra", codename: "nezha", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi Civi 1S", codename: "zijin", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi Civi 2", codename: "ziyi", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi Civi 4 Pro", codename: "chenfeng", category: "Xiaomi Series", brand: "Xiaomi" },
    { name: "Xiaomi Mi 11X", codename: "alioth", category: "Xiaomi Series", brand: "Xiaomi", aliases: ["aliothin"] },
    { name: "Xiaomi Mi 11i", codename: "haydn", category: "Xiaomi Series", brand: "Xiaomi", aliases: ["haydnin"] },
    { name: "Xiaomi Mi 11X Pro", codename: "haydn", category: "Xiaomi Series", brand: "Xiaomi", aliases: ["haydnin"] },

    { name: "Xiaomi MIX 4", codename: "odin", category: "Xiaomi MIX / Fold / Flip Series", brand: "Xiaomi" },
    { name: "Xiaomi MIX Fold 2", codename: "zizhan", category: "Xiaomi MIX / Fold / Flip Series", brand: "Xiaomi" },
    { name: "Xiaomi MIX Fold 3", codename: "babylon", category: "Xiaomi MIX / Fold / Flip Series", brand: "Xiaomi" },
    { name: "Xiaomi MIX Fold 4", codename: "goku", category: "Xiaomi MIX / Fold / Flip Series", brand: "Xiaomi" },

    { name: "Redmi K40", codename: "alioth", category: "Redmi K / Turbo Series", brand: "Redmi", aliases: ["aliothin"] },
    { name: "Redmi K40 Pro", codename: "haydn", category: "Redmi K / Turbo Series", brand: "Redmi", aliases: ["haydnin"] },
    { name: "Redmi K40 Pro+", codename: "haydn", category: "Redmi K / Turbo Series", brand: "Redmi", aliases: ["haydnin"] },
    { name: "Redmi K40S", codename: "munch", category: "Redmi K / Turbo Series", brand: "Redmi", aliases: ["munchin"] },
    { name: "Redmi K50 Gaming", codename: "ingres", category: "Redmi K / Turbo Series", brand: "Redmi" },
    { name: "Redmi K50 Ultra", codename: "diting", category: "Redmi K / Turbo Series", brand: "Redmi", aliases: ["ditingp"] },
    { name: "Redmi K50i", codename: "xaga", category: "Redmi K / Turbo Series", brand: "Redmi" },
    { name: "Redmi K60", codename: "mondrian", category: "Redmi K / Turbo Series", brand: "Redmi" },
    { name: "Redmi K60 Pro", codename: "socrates", category: "Redmi K / Turbo Series", brand: "Redmi" },
    { name: "Redmi K60 Ultra", codename: "corot", category: "Redmi K / Turbo Series", brand: "Redmi" },
    { name: "Redmi K70", codename: "vermeer", category: "Redmi K / Turbo Series", brand: "Redmi" },
    { name: "Redmi K70 Pro", codename: "manet", category: "Redmi K / Turbo Series", brand: "Redmi" },
    { name: "Redmi K70 Ultra", codename: "rothko", category: "Redmi K / Turbo Series", brand: "Redmi" },
    { name: "Redmi K70E", codename: "duchamp", category: "Redmi K / Turbo Series", brand: "Redmi" },
    { name: "Redmi K80", codename: "zorn", category: "Redmi K / Turbo Series", brand: "Redmi" },
    { name: "Redmi K80 Pro", codename: "miro", category: "Redmi K / Turbo Series", brand: "Redmi" },
    { name: "Redmi K90", codename: "annibale", category: "Redmi K / Turbo Series", brand: "Redmi" },
    { name: "Redmi K90 Pro Max", codename: "myron", category: "Redmi K / Turbo Series", brand: "Redmi" },
    { name: "Redmi Turbo 3", codename: "peridot", category: "Redmi K / Turbo Series", brand: "Redmi" },
    { name: "Redmi Turbo 4", codename: "rodin", category: "Redmi K / Turbo Series", brand: "Redmi" },

    { name: "Redmi Note 11 Pro 5G", codename: "pissarro", category: "Redmi Note Series", brand: "Redmi" },
    { name: "Redmi Note 11 Pro+ 5G", codename: "pissarro", category: "Redmi Note Series", brand: "Redmi" },
    { name: "Redmi Note 11T Pro", codename: "xaga", category: "Redmi Note Series", brand: "Redmi" },
    { name: "Redmi Note 11T Pro+", codename: "xaga", category: "Redmi Note Series", brand: "Redmi" },
    { name: "Redmi Note 12 4G", codename: "tapas", category: "Redmi Note Series", brand: "Redmi" },
    { name: "Redmi Note 12 5G", codename: "sunstone", category: "Redmi Note Series", brand: "Redmi" },
    { name: "Redmi Note 12 NFC 4G", codename: "topaz", category: "Redmi Note Series", brand: "Redmi" },
    { name: "Redmi Note 12 Pro Speed", codename: "redwood", category: "Redmi Note Series", brand: "Redmi" },
    { name: "Redmi Note 12R", codename: "sky", category: "Redmi Note Series", brand: "Redmi" },
    { name: "Redmi Note 12R Pro", codename: "sunstone", category: "Redmi Note Series", brand: "Redmi" },
    { name: "Redmi Note 12 Turbo", codename: "marble", category: "Redmi Note Series", brand: "Redmi", aliases: ["marblein"] },
    { name: "Redmi Note 13 4G", codename: "sapphire", category: "Redmi Note Series", brand: "Redmi" },
    { name: "Redmi Note 13 4G NFC", codename: "sapphiren", category: "Redmi Note Series", brand: "Redmi" },
    { name: "Redmi Note 13 Pro 5G", codename: "garnet", category: "Redmi Note Series", brand: "Redmi" },
    { name: "Redmi Note 13 Pro+ 5G", codename: "zircon", category: "Redmi Note Series", brand: "Redmi" },
    { name: "Redmi Note 13R", codename: "breeze", category: "Redmi Note Series", brand: "Redmi" },
    { name: "Redmi Note 14 Pro", codename: "malachite", category: "Redmi Note Series", brand: "Redmi" },
    { name: "Redmi Note 14 Pro+", codename: "amethyst", category: "Redmi Note Series", brand: "Redmi" },

    { name: "Redmi 12 5G", codename: "sky", category: "Redmi Number Series", brand: "Redmi" },
    { name: "Redmi 13 5G", codename: "breeze", category: "Redmi Number Series", brand: "Redmi" },
    { name: "Redmi 14C 5G", codename: "flame", category: "Redmi Number Series", brand: "Redmi" },
    { name: "Redmi 14R 5G", codename: "flame", category: "Redmi Number Series", brand: "Redmi" },

    { name: "POCO F3", codename: "alioth", category: "POCO F Series", brand: "POCO", aliases: ["aliothin"] },
    { name: "POCO F4", codename: "munch", category: "POCO F Series", brand: "POCO", aliases: ["munchin"] },
    { name: "POCO F4 GT", codename: "ingres", category: "POCO F Series", brand: "POCO" },
    { name: "POCO F5", codename: "marble", category: "POCO F Series", brand: "POCO", aliases: ["marblein"] },
    { name: "POCO F5 Pro", codename: "mondrian", category: "POCO F Series", brand: "POCO" },
    { name: "POCO F6", codename: "peridot", category: "POCO F Series", brand: "POCO" },
    { name: "POCO F6 Pro", codename: "vermeer", category: "POCO F Series", brand: "POCO" },
    { name: "POCO F7", codename: "onyx", category: "POCO F Series", brand: "POCO" },
    { name: "POCO F7 Pro", codename: "zorn", category: "POCO F Series", brand: "POCO" },
    { name: "POCO F7 Ultra", codename: "miro", category: "POCO F Series", brand: "POCO" },
    { name: "POCO F8 Pro", codename: "annibale", category: "POCO F Series", brand: "POCO" },
    { name: "POCO F8 Ultra", codename: "myron", category: "POCO F Series", brand: "POCO" },

    { name: "POCO X3 Pro", codename: "vayu", category: "POCO X Series", brand: "POCO", aliases: ["bhima"] },
    { name: "POCO X4 GT", codename: "xaga", category: "POCO X Series", brand: "POCO" },
    { name: "POCO X5 5G", codename: "moonstone", category: "POCO X Series", brand: "POCO" },
    { name: "POCO X5 Pro", codename: "redwood", category: "POCO X Series", brand: "POCO" },
    { name: "POCO X6 5G", codename: "garnet", category: "POCO X Series", brand: "POCO" },
    { name: "POCO X6 Pro", codename: "duchamp", category: "POCO X Series", brand: "POCO" },
    { name: "POCO X7", codename: "malachite", category: "POCO X Series", brand: "POCO" },
    { name: "POCO X7 Pro", codename: "rodin", category: "POCO X Series", brand: "POCO" },

    { name: "POCO M6 Plus 5G", codename: "breeze", category: "POCO M / C Series", brand: "POCO" },
    { name: "POCO M6 Pro 5G", codename: "sky", category: "POCO M / C Series", brand: "POCO" },
    { name: "POCO M7 5G", codename: "flame", category: "POCO M / C Series", brand: "POCO" },

    { name: "POCO Pad 5G", codename: "ruan", category: "Xiaomi Pad / Redmi Pad / POCO Pad", brand: "POCO" },
    { name: "Redmi Pad Pro", codename: "dizi", category: "Xiaomi Pad / Redmi Pad / POCO Pad", brand: "Redmi" },
    { name: "Redmi Pad Pro 5G", codename: "ruan", category: "Xiaomi Pad / Redmi Pad / POCO Pad", brand: "Redmi" },
    { name: "Redmi Pad SE", codename: "xun", category: "Xiaomi Pad / Redmi Pad / POCO Pad", brand: "Redmi" },
    { name: "Xiaomi Pad 5 Pro 12.4", codename: "dagu", category: "Xiaomi Pad / Redmi Pad / POCO Pad", brand: "Xiaomi" },
    { name: "Xiaomi Pad 6", codename: "pipa", category: "Xiaomi Pad / Redmi Pad / POCO Pad", brand: "Xiaomi" },
    { name: "Xiaomi Pad 6 Max 14", codename: "yudi", category: "Xiaomi Pad / Redmi Pad / POCO Pad", brand: "Xiaomi" },
    { name: "Xiaomi Pad 6 Pro", codename: "liuqin", category: "Xiaomi Pad / Redmi Pad / POCO Pad", brand: "Xiaomi" },
    { name: "Xiaomi Pad 6S Pro 12.4", codename: "sheng", category: "Xiaomi Pad / Redmi Pad / POCO Pad", brand: "Xiaomi" },
    { name: "Xiaomi Pad 7", codename: "uke", category: "Xiaomi Pad / Redmi Pad / POCO Pad", brand: "Xiaomi" },
    { name: "Xiaomi Pad 7 Pro", codename: "muyu", category: "Xiaomi Pad / Redmi Pad / POCO Pad", brand: "Xiaomi" },
    { name: "Xiaomi Pad 8", codename: "yupei", category: "Xiaomi Pad / Redmi Pad / POCO Pad", brand: "Xiaomi" },
    { name: "Xiaomi Pad 8 Pro", codename: "piano", category: "Xiaomi Pad / Redmi Pad / POCO Pad", brand: "Xiaomi" },
];

const categoryOrder = new Map(deviceCategories.map((category, index) => [category, index]));

export const supportedDevices: SupportedDevice[] = supportedDeviceEntries
    .map(defineDevice)
    .sort((left, right) => {
        const leftCategoryRank = categoryOrder.get(left.category) ?? Number.MAX_SAFE_INTEGER;
        const rightCategoryRank = categoryOrder.get(right.category) ?? Number.MAX_SAFE_INTEGER;

        if (leftCategoryRank !== rightCategoryRank) {
            return leftCategoryRank - rightCategoryRank;
        }

        if (left.brand !== right.brand) {
            return left.brand.localeCompare(right.brand);
        }

        return left.name.localeCompare(right.name);
    });

export function findSupportedDevice(codename: string) {
    return supportedDevices.find((device) => device.codename === codename.trim().toLowerCase());
}
