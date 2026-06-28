export type SupportedDevice = {
    name: string;
    codename: string;
    aliases: string[];
    category: "Xiaomi" | "Redmi" | "POCO" | "Pad" | "MIX" | "Civi" | "Unknown";
    family: string;
    chipset: "Snapdragon" | "MediaTek" | "Unknown";
    status: "Active" | "Supported" | "Inactive";
    supportedStyles: Array<"Lite" | "GamingPlus" | "Legend" | "Ninja">;
    image: string | null;
    notes?: string;
};

type SupportedDeviceSeed = {
    names: string[];
    codename: string;
    category: SupportedDevice["category"];
    notes?: string;
    chipset?: SupportedDevice["chipset"];
    status?: SupportedDevice["status"];
    supportedStyles?: SupportedDevice["supportedStyles"];
};

const defaultSupportedStyles: SupportedDevice["supportedStyles"] = ["Lite", "GamingPlus", "Legend", "Ninja"];

const trustedChipsetByCodename: Record<string, SupportedDevice["chipset"]> = {
    agate: "MediaTek",
    amethyst: "Snapdragon",
    annibale: "Snapdragon",
    aristotle: "MediaTek",
    aurora: "Snapdragon",
    babylon: "Snapdragon",
    breeze: "Snapdragon",
    chenfeng: "Snapdragon",
    corot: "Snapdragon",
    cupid: "Snapdragon",
    dada: "Snapdragon",
    dagu: "Snapdragon",
    daumier: "MediaTek",
    diting: "Snapdragon",
    dizi: "Snapdragon",
    flame: "Snapdragon",
    fuxi: "Snapdragon",
    garnet: "Snapdragon",
    goku: "Snapdragon",
    haotian: "Snapdragon",
    haydn: "Snapdragon",
    houji: "Snapdragon",
    ingres: "Snapdragon",
    ishtar: "Snapdragon",
    lisa: "Snapdragon",
    liuqin: "Snapdragon",
    malachite: "Snapdragon",
    manet: "Snapdragon",
    marble: "Snapdragon",
    mayfly: "Snapdragon",
    miro: "Snapdragon",
    mondrian: "Snapdragon",
    moonstone: "Snapdragon",
    munch: "Snapdragon",
    muyu: "Snapdragon",
    myron: "Snapdragon",
    nezha: "Snapdragon",
    nuwa: "Snapdragon",
    odin: "Snapdragon",
    onyx: "Snapdragon",
    pandora: "Snapdragon",
    peridot: "Snapdragon",
    piano: "Snapdragon",
    pipa: "Snapdragon",
    pissarro: "MediaTek",
    plato: "MediaTek",
    popsicle: "Snapdragon",
    pudding: "Snapdragon",
    redwood: "Snapdragon",
    rodin: "Snapdragon",
    rothko: "Snapdragon",
    ruan: "Snapdragon",
    sapphire: "Snapdragon",
    sapphiren: "Snapdragon",
    sheng: "Snapdragon",
    shennong: "Snapdragon",
    sky: "Snapdragon",
    socrates: "Snapdragon",
    star: "Snapdragon",
    sunstone: "Snapdragon",
    taoyao: "Snapdragon",
    tapas: "Snapdragon",
    thor: "Snapdragon",
    topaz: "Snapdragon",
    uke: "Snapdragon",
    unicorn: "Snapdragon",
    venus: "Snapdragon",
    vermeer: "Snapdragon",
    vili: "Snapdragon",
    xaga: "MediaTek",
    xuanyuan: "Snapdragon",
    xun: "Snapdragon",
    yudi: "Snapdragon",
    yupei: "Snapdragon",
    zeus: "Snapdragon",
    zijin: "Snapdragon",
    ziyi: "Snapdragon",
    zizhan: "Snapdragon",
    zircon: "MediaTek",
    zorn: "Snapdragon",
};

export const verifiedDeviceImageByCodename: Record<string, string> = {
    agate: "/devices/agate.webp",
    amethyst: "/devices/amethyst.webp",
    aristotle: "/devices/aristotle.webp",
    aurora: "/devices/aurora.webp",
    babylon: "/devices/babylon.webp",
    cupid: "/devices/cupid.webp",
    dada: "/devices/dada.webp",
    diting: "/devices/diting.webp",
    dizi: "/devices/dizi.webp",
    fuxi: "/devices/fuxi.webp",
    garnet: "/devices/garnet.webp",
    haydn: "/devices/haydn.webp",
    houji: "/devices/houji.webp",
    ingres: "/devices/ingres.webp",
    ishtar: "/devices/ishtar.webp",
    lisa: "/devices/lisa.webp",
    malachite: "/devices/malachite.webp",
    marble: "/devices/marble.webp",
    miro: "/devices/miro.webp",
    mondrian: "/devices/mondrian.webp",
    moonstone: "/devices/moonstone.webp",
    munch: "/devices/munch.webp",
    muyu: "/devices/muyu.webp",
    nuwa: "/devices/nuwa.webp",
    onyx: "/devices/onyx.webp",
    peridot: "/devices/peridot.webp",
    pipa: "/devices/pipa.webp",
    pissarro: "/devices/pissarro.webp",
    plato: "/devices/plato.webp",
    redwood: "/devices/redwood.webp",
    rodin: "/devices/rodin.webp",
    rothko: "/devices/rothko.webp",
    ruan: "/devices/ruan.webp",
    sapphire: "/devices/sapphire.webp",
    sapphiren: "/devices/sapphiren.webp",
    sky: "/devices/sky.webp",
    star: "/devices/star.webp",
    sunstone: "/devices/sunstone.webp",
    taoyao: "/devices/taoyao.webp",
    tapas: "/devices/tapas.webp",
    thor: "/devices/thor.webp",
    topaz: "/devices/topaz.webp",
    uke: "/devices/uke.webp",
    venus: "/devices/venus.webp",
    vermeer: "/devices/vermeer.webp",
    vili: "/devices/vili.webp",
    xaga: "/devices/xaga.webp",
    xuanyuan: "/devices/xuanyuan.webp",
    xun: "/devices/xun.webp",
    zeus: "/devices/zeus.webp",
    zircon: "/devices/zircon.webp",
    ziyi: "/devices/ziyi.webp",
    zorn: "/devices/zorn.webp",
};

function inferFamily(name: string, category: SupportedDevice["category"]) {
    if (category === "Pad") {
        if (name.startsWith("Redmi K Pad")) return "Redmi K Pad";
        if (name.startsWith("Redmi Pad")) return "Redmi Pad";
        if (name.startsWith("POCO Pad")) return "POCO Pad";
        if (name.startsWith("Xiaomi Pad")) return "Xiaomi Pad";
        return "Pad";
    }

    if (category === "MIX") {
        if (name.startsWith("Xiaomi MIX Fold")) return "Xiaomi MIX Fold";
        if (name.startsWith("Xiaomi MIX Flip")) return "Xiaomi MIX Flip";
        return "Xiaomi MIX";
    }

    if (category === "Civi") {
        return "Xiaomi Civi";
    }

    if (category === "POCO") {
        if (name.startsWith("POCO F")) return "POCO F";
        if (name.startsWith("POCO X")) return "POCO X";
        if (name.startsWith("POCO M")) return "POCO M";
        if (name.startsWith("POCO C")) return "POCO C";
        return "POCO";
    }

    if (category === "Redmi") {
        if (name.startsWith("Redmi Note")) return "Redmi Note";
        if (name.startsWith("Redmi Turbo")) return "Redmi Turbo";
        if (name.startsWith("Redmi K")) return "Redmi K";
        if (name.startsWith("Redmi A")) return "Redmi A";
        return "Redmi";
    }

    if (category === "Xiaomi") {
        if (name.startsWith("Xiaomi Mi")) return "Xiaomi Mi";
        return "Xiaomi Number";
    }

    return "Unknown";
}

function seed(
    category: SupportedDevice["category"],
    names: string[],
    codename: string,
    notes?: string,
): SupportedDeviceSeed {
    return { category, names, codename, notes };
}

const supportedDeviceSeeds: SupportedDeviceSeed[] = [
    seed("Xiaomi", ["Xiaomi 17"], "pudding"),
    seed("Xiaomi", ["Xiaomi 17 Pro"], "pandora"),
    seed("Xiaomi", ["Xiaomi 17 Pro Max"], "popsicle"),
    seed("Xiaomi", ["Xiaomi 17 Ultra"], "nezha"),
    seed("Xiaomi", ["Xiaomi 15"], "dada"),
    seed("Xiaomi", ["Xiaomi 15 Pro"], "haotian"),
    seed("Xiaomi", ["Xiaomi 15 Ultra"], "xuanyuan"),
    seed("Xiaomi", ["Xiaomi 15S Pro"], "dijun"),
    seed("Xiaomi", ["Xiaomi 15T"], "goya"),
    seed("Xiaomi", ["Xiaomi 15T Pro"], "klimt"),
    seed("Xiaomi", ["Xiaomi 14"], "houji"),
    seed("Xiaomi", ["Xiaomi 14 Pro"], "shennong"),
    seed("Xiaomi", ["Xiaomi 14 Ultra"], "aurora"),
    seed("Xiaomi", ["Xiaomi 14T"], "degas"),
    seed("Xiaomi", ["Xiaomi 14T Pro"], "rothko"),
    seed("Civi", ["Xiaomi 14 Civi", "Xiaomi Civi 4 Pro"], "chenfeng"),
    seed("Xiaomi", ["Xiaomi 13"], "fuxi"),
    seed("Xiaomi", ["Xiaomi 13 Pro"], "nuwa"),
    seed("Xiaomi", ["Xiaomi 13 Ultra"], "ishtar"),
    seed("Civi", ["Xiaomi 13 Lite", "Xiaomi Civi 2"], "ziyi"),
    seed("Xiaomi", ["Xiaomi 13T"], "aristotle"),
    seed("Xiaomi", ["Xiaomi 13T Pro"], "corot"),
    seed("Xiaomi", ["Xiaomi 12"], "cupid"),
    seed("Xiaomi", ["Xiaomi 12 Pro"], "zeus"),
    seed("Xiaomi", ["Xiaomi 12 Pro Dimensity"], "daumier"),
    seed("Xiaomi", ["Xiaomi 12 Lite"], "taoyao"),
    seed("Xiaomi", ["Xiaomi 12T"], "plato"),
    seed("Xiaomi", ["Xiaomi 12T Pro"], "diting"),
    seed("Xiaomi", ["Xiaomi 12X"], "psyche"),
    seed("Xiaomi", ["Xiaomi 12S"], "mayfly"),
    seed("Xiaomi", ["Xiaomi 12S Pro"], "unicorn"),
    seed("Xiaomi", ["Xiaomi 12S Ultra"], "thor"),
    seed("Xiaomi", ["Xiaomi 11"], "venus"),
    seed("Xiaomi", ["Xiaomi 11 Pro"], "star"),
    seed("Xiaomi", ["Xiaomi 11 Ultra"], "mars"),
    seed("Xiaomi", ["Xiaomi 11T"], "agate"),
    seed("Xiaomi", ["Xiaomi 11T Pro"], "vili"),
    seed("Xiaomi", ["Xiaomi 11 Lite 5G NE", "Xiaomi 11 LE"], "lisa"),
    seed("Xiaomi", ["Xiaomi Mi 11 Lite 5G"], "renoir"),
    seed("Xiaomi", ["Xiaomi Mi 11 Lite 4G"], "courbet"),
    seed("Civi", ["Xiaomi Civi"], "mona"),
    seed("Civi", ["Xiaomi Civi 1S"], "zijin"),
    seed("Civi", ["Xiaomi Civi 2", "Xiaomi 13 Lite"], "ziyi"),
    seed("Civi", ["Xiaomi Civi 3"], "yuechu"),
    seed("Civi", ["Xiaomi Civi 4 Pro", "Xiaomi 14 Civi"], "chenfeng"),
    seed("Civi", ["Xiaomi Civi 5 Pro"], "luming"),

    seed("MIX", ["Xiaomi MIX 4"], "odin"),
    seed("MIX", ["Xiaomi MIX Fold"], "cetus"),
    seed("MIX", ["Xiaomi MIX Fold 2"], "zizhan"),
    seed("MIX", ["Xiaomi MIX Fold 3"], "babylon"),
    seed("MIX", ["Xiaomi MIX Fold 4"], "goku"),
    seed("MIX", ["Xiaomi MIX Flip"], "ruyi"),
    seed("MIX", ["Xiaomi MIX Flip 2"], "bixi"),

    seed("Redmi", ["Redmi K90", "POCO F8 Pro"], "annibale"),
    seed("Redmi", ["Redmi K90 Pro Max", "POCO F8 Ultra"], "myron"),
    seed("Redmi", ["Redmi K80"], "zorn"),
    seed("Redmi", ["Redmi K80 Pro"], "miro"),
    seed("Redmi", ["Redmi K80 Ultra"], "dali"),
    seed("Redmi", ["Redmi K70"], "vermeer"),
    seed("Redmi", ["Redmi K70 Pro"], "manet"),
    seed("Redmi", ["Redmi K70 Ultra", "Xiaomi 14T Pro"], "rothko"),
    seed("Redmi", ["Redmi K70E", "POCO X6 Pro"], "duchamp"),
    seed("Redmi", ["Redmi K60"], "mondrian"),
    seed("Redmi", ["Redmi K60 Pro"], "socrates"),
    seed("Redmi", ["Redmi K60 Ultra", "Xiaomi 13T Pro"], "corot"),
    seed("Redmi", ["Redmi K60E"], "rembrandt"),
    seed("Redmi", ["Redmi K50"], "rubens"),
    seed("Redmi", ["Redmi K50 Pro"], "matisse"),
    seed("Redmi", ["Redmi K50 Gaming", "POCO F4 GT"], "ingres"),
    seed("Redmi", ["Redmi K50 Ultra", "Xiaomi 12T Pro"], "diting"),
    seed("Redmi", ["Redmi K40", "POCO F3", "Mi 11X"], "alioth"),
    seed("Redmi", ["Redmi K40S", "POCO F4"], "munch"),
    seed("Redmi", ["Redmi K40 Pro", "Redmi K40 Pro+", "Mi 11i", "Mi 11X Pro"], "haydn"),
    seed("Redmi", ["Redmi K40 Gaming", "POCO F3 GT"], "ares"),
    seed("Redmi", ["Redmi Turbo 4", "POCO X7 Pro"], "rodin"),
    seed("Redmi", ["Redmi Turbo 4 Pro", "POCO F7"], "onyx"),
    seed("Redmi", ["Redmi Turbo 3", "POCO F6"], "peridot"),

    seed("Redmi", ["Redmi Note 15 4G"], "spinel"),
    seed("Redmi", ["Redmi Note 15 5G"], "kunzite"),
    seed("Redmi", ["Redmi Note 15 Pro 4G"], "charoite"),
    seed("Redmi", ["Redmi Note 15 Pro 5G"], "lapis"),
    seed("Redmi", ["Redmi Note 15 Pro+ 5G"], "flourite"),
    seed("Redmi", ["Redmi Note 14 4G"], "tanzanite"),
    seed("Redmi", ["Redmi Note 14 5G", "POCO M7 Pro 5G"], "beryl"),
    seed("Redmi", ["Redmi Note 14S 4G"], "emerald-r"),
    seed("Redmi", ["Redmi Note 14 Pro 4G"], "obsidian"),
    seed("Redmi", ["Redmi Note 14 Pro 5G", "POCO X7"], "malachite"),
    seed("Redmi", ["Redmi Note 14 Pro+ 5G"], "amethyst"),
    seed("Redmi", ["Redmi Note 13 4G"], "sapphire"),
    seed("Redmi", ["Redmi Note 13 NFC 4G"], "sapphiren"),
    seed("Redmi", ["Redmi Note 13 5G", "POCO X6 Neo 5G"], "gold"),
    seed("Redmi", ["Redmi Note 13 Pro 4G", "POCO M6 Pro 4G"], "emerald"),
    seed("Redmi", ["Redmi Note 13 Pro 5G", "POCO X6 5G"], "garnet"),
    seed("Redmi", ["Redmi Note 13 Pro+ 5G"], "zircon"),
    seed("Redmi", ["Redmi Note 12 4G"], "tapas"),
    seed("Redmi", ["Redmi Note 12 4G NFC"], "topaz"),
    seed("Redmi", ["Redmi Note 12 5G"], "sunstone"),
    seed("Redmi", ["Redmi Note 12S"], "sea"),
    seed("Redmi", ["Redmi Note 12 Pro", "Redmi Note 12 Pro+ 5G"], "ruby"),
    seed("Redmi", ["Redmi Note 12 Pro Speed", "POCO X5 Pro 5G"], "redwood"),
    seed("Redmi", ["Redmi Note 12 Turbo", "POCO F5"], "marble"),
    seed("Redmi", ["Redmi Note 12T Pro"], "pearl"),
    seed("Redmi", ["Redmi Note 11"], "spes"),
    seed("Redmi", ["Redmi Note 11 4G"], "selenes"),
    seed("Redmi", ["Redmi Note 11 5G"], "evergo"),
    seed("Redmi", ["Redmi Note 11 Pro 4G"], "viva"),
    seed("Redmi", ["Redmi Note 11 Pro 5G", "POCO X4 Pro 5G"], "veux"),
    seed("Redmi", ["Redmi Note 11 Pro+ 5G"], "pissarro"),
    seed("Redmi", ["Redmi Note 11S"], "fleur"),
    seed("Redmi", ["Redmi Note 11T Pro", "POCO X4 GT"], "xaga"),
    seed("Redmi", ["Redmi Note 10"], "mojito"),
    seed("Redmi", ["Redmi Note 10 Pro"], "sweet"),
    seed("Redmi", ["Redmi Note 10 Pro 5G", "POCO X3 GT"], "chopin"),
    seed("Redmi", ["Redmi Note 10S", "POCO M5s"], "rosemary"),
    seed("Redmi", ["Redmi Note 10 5G", "POCO M3 Pro 5G"], "camellian", "Variant codename: camellia."),
    seed("Redmi", ["POCO M3 Pro 5G variant"], "camellia", "Variant codename for Redmi Note 10 5G / POCO M3 Pro 5G."),
    seed("Redmi", ["Redmi Note 10 JE"], "xig02"),

    seed("Redmi", ["Redmi 15 4G"], "creek"),
    seed("Redmi", ["Redmi 15 5G", "Redmi Note 15R 5G"], "spring"),
    seed("Redmi", ["Redmi 15C", "POCO C85"], "dew"),
    seed("Redmi", ["Redmi 15C 5G"], "tornado"),
    seed("Redmi", ["Redmi 14C", "POCO C75", "Redmi A3 Pro"], "lake"),
    seed("Redmi", ["Redmi 14C 5G", "POCO M7 5G"], "flame"),
    seed("Redmi", ["Redmi 14R 5G"], "flame"),
    seed("Redmi", ["Redmi 13", "POCO M6 4G"], "moon"),
    seed("Redmi", ["Redmi 13 5G", "POCO M6 Plus 5G"], "breeze"),
    seed("Redmi", ["Redmi 13C", "POCO C65"], "gale"),
    seed("Redmi", ["Redmi 13C 5G", "POCO M6 5G"], "air"),
    seed("Redmi", ["Redmi 12"], "fire"),
    seed("Redmi", ["Redmi 12 5G", "POCO M6 Pro 5G"], "sky"),
    seed("Redmi", ["Redmi 12C", "POCO C55"], "earth"),
    seed("Redmi", ["Redmi 10", "Redmi 10 Prime"], "selene"),
    seed("Redmi", ["Redmi 10 5G", "POCO M4 5G"], "light"),
    seed("Redmi", ["Redmi 10C", "Redmi 10 Power"], "fog"),
    seed("Redmi", ["Redmi 10A"], "dandelion"),

    seed("POCO", ["POCO F8 Ultra", "Redmi K90 Pro Max"], "myron"),
    seed("POCO", ["POCO F8 Pro", "Redmi K90"], "annibale"),
    seed("POCO", ["POCO F7 Ultra", "Redmi K80 Pro"], "miro"),
    seed("POCO", ["POCO F7 Pro", "Redmi K80"], "zorn"),
    seed("POCO", ["POCO F7", "Redmi Turbo 4 Pro"], "onyx"),
    seed("POCO", ["POCO F6", "Redmi Turbo 3"], "peridot"),
    seed("POCO", ["POCO F6 Pro", "Redmi K70"], "vermeer"),
    seed("POCO", ["POCO F5", "Redmi Note 12 Turbo"], "marble"),
    seed("POCO", ["POCO F5 Pro", "Redmi K60"], "mondrian"),
    seed("POCO", ["POCO F4", "Redmi K40S"], "munch"),
    seed("POCO", ["POCO F4 GT", "Redmi K50 Gaming"], "ingres"),
    seed("POCO", ["POCO F3", "Redmi K40"], "alioth"),
    seed("POCO", ["POCO F3 GT", "Redmi K40 Gaming"], "ares"),

    seed("POCO", ["POCO X8 Pro", "Redmi Turbo 5"], "klee"),
    seed("POCO", ["POCO X8 Pro Max", "Redmi Turbo 5 Max"], "dash"),
    seed("POCO", ["POCO X7", "Redmi Note 14 Pro 5G"], "malachite"),
    seed("POCO", ["POCO X7 Pro", "Redmi Turbo 4"], "rodin"),
    seed("POCO", ["POCO X6 5G", "Redmi Note 13 Pro 5G"], "garnet"),
    seed("POCO", ["POCO X6 Pro", "Redmi K70E"], "duchamp"),
    seed("POCO", ["POCO X6 Neo 5G", "Redmi Note 13 5G"], "gold"),
    seed("POCO", ["POCO X5 5G"], "moonstone"),
    seed("POCO", ["POCO X5 Pro 5G", "Redmi Note 12 Pro Speed"], "redwood"),
    seed("POCO", ["POCO X4 GT", "Redmi Note 11T Pro"], "xaga"),
    seed("POCO", ["POCO X4 Pro 5G", "Redmi Note 11 Pro 5G"], "veux"),
    seed("POCO", ["POCO X3 Pro"], "vayu", "Variant codename: bhima."),
    seed("POCO", ["POCO X3 Pro variant"], "bhima", "Variant codename for POCO X3 Pro."),
    seed("POCO", ["POCO X3", "POCO X3 NFC"], "surya"),

    seed("POCO", ["POCO M7 5G", "Redmi 14C 5G"], "flame"),
    seed("POCO", ["POCO M7 Pro 5G", "Redmi Note 14 5G"], "beryl"),
    seed("POCO", ["POCO M6 4G", "Redmi 13"], "moon"),
    seed("POCO", ["POCO M6 5G", "Redmi 13C 5G"], "air"),
    seed("POCO", ["POCO M6 Plus 5G", "Redmi 13 5G"], "breeze"),
    seed("POCO", ["POCO M6 Pro 4G", "Redmi Note 13 Pro 4G"], "emerald"),
    seed("POCO", ["POCO M6 Pro 5G", "Redmi 12 5G"], "sky"),
    seed("POCO", ["POCO M5"], "rock"),
    seed("POCO", ["POCO M5s", "Redmi Note 10S"], "rosemary"),
    seed("POCO", ["POCO M4 5G", "Redmi 10 5G"], "light"),
    seed("POCO", ["POCO M4 Pro 4G"], "fleur"),
    seed("POCO", ["POCO M4 Pro 5G"], "evergreen"),
    seed("POCO", ["POCO M3"], "citrus"),
    seed("POCO", ["POCO M3 Pro 5G", "Redmi Note 10 5G"], "camellian", "Variant codename: camellia."),
    seed("POCO", ["POCO M3 Pro 5G variant"], "camellia", "Variant codename for Redmi Note 10 5G / POCO M3 Pro 5G."),
    seed("POCO", ["POCO C85", "Redmi 15C"], "dew"),
    seed("POCO", ["POCO C81", "Redmi A7 Pro"], "arctic"),
    seed("POCO", ["POCO C75", "Redmi 14C"], "lake"),
    seed("POCO", ["POCO C75 5G", "Redmi A4 5G"], "warm"),
    seed("POCO", ["POCO C71", "Redmi A5"], "serenity"),
    seed("POCO", ["POCO C65", "Redmi 13C"], "gale"),
    seed("POCO", ["POCO C61", "Redmi A3"], "blue"),
    seed("POCO", ["POCO C55", "Redmi 12C"], "earth"),
    seed("POCO", ["POCO C51", "Redmi A2+"], "water"),
    seed("POCO", ["POCO C50", "Redmi A1+"], "ice"),

    seed("Pad", ["Xiaomi Pad 8 Pro"], "piano"),
    seed("Pad", ["Xiaomi Pad 8"], "yupei"),
    seed("Pad", ["Xiaomi Pad 7 Ultra"], "jinghu"),
    seed("Pad", ["Xiaomi Pad 7S Pro 12.5"], "violin"),
    seed("Pad", ["Xiaomi Pad 7 Pro"], "muyu"),
    seed("Pad", ["Xiaomi Pad 7"], "uke"),
    seed("Pad", ["Xiaomi Pad 6S Pro 12.4"], "sheng"),
    seed("Pad", ["Xiaomi Pad 6 Max"], "yudi"),
    seed("Pad", ["Xiaomi Pad 6 Pro"], "liuqin"),
    seed("Pad", ["Xiaomi Pad 6"], "pipa"),
    seed("Pad", ["Xiaomi Pad 5"], "nabu"),
    seed("Pad", ["Xiaomi Pad 5 Pro 5G"], "enuma"),
    seed("Pad", ["Xiaomi Pad 5 Pro Wi-Fi"], "elish"),
    seed("Pad", ["Xiaomi Pad 5 Pro 12.4"], "dagu"),
    seed("Pad", ["Redmi K Pad"], "turner"),
    seed("Pad", ["Redmi K Pad 2"], "yili"),
    seed("Pad", ["Redmi Pad 2"], "taiko"),
    seed("Pad", ["Redmi Pad 2 4G"], "koto"),
    seed("Pad", ["Redmi Pad 2 Pro"], "flute"),
    seed("Pad", ["Redmi Pad 2 Pro 5G"], "organ"),
    seed("Pad", ["Redmi Pad 2 SE"], "guitar"),
    seed("Pad", ["Redmi Pad 2 SE 4G"], "erhu"),
    seed("Pad", ["Redmi Pad Pro", "POCO Pad"], "dizi"),
    seed("Pad", ["Redmi Pad Pro 5G", "POCO Pad 5G"], "ruan"),
    seed("Pad", ["Redmi Pad SE"], "xun"),
    seed("Pad", ["Redmi Pad SE 8.7 WiFi"], "flare"),
    seed("Pad", ["Redmi Pad SE 8.7 4G"], "spark"),
    seed("Pad", ["Redmi Pad"], "yunluo"),
];

type MergeLogItem = {
    codename: string;
    mergedNames: string[];
};

function mergeNotes(existing: string | undefined, incoming: string | undefined) {
    const merged = Array.from(new Set([existing, incoming].filter(Boolean) as string[]));
    return merged.length ? merged.join(" ") : undefined;
}

const supportedDeviceMergeLog: MergeLogItem[] = [];
const supportedDeviceMap = new Map<string, SupportedDevice>();

for (const entry of supportedDeviceSeeds) {
    const codename = entry.codename.trim().toLowerCase();
    const names = entry.names.map((name) => name.trim()).filter(Boolean);

    if (!codename || names.length === 0) {
        continue;
    }

    const existing = supportedDeviceMap.get(codename);

    if (!existing) {
        const [name, ...aliases] = names;

        supportedDeviceMap.set(codename, {
            name,
            codename,
            aliases: Array.from(new Set(aliases)),
            category: entry.category,
            family: inferFamily(name, entry.category),
            chipset: entry.chipset || trustedChipsetByCodename[codename] || "Unknown",
            status: entry.status || "Supported",
            supportedStyles: entry.supportedStyles || [...defaultSupportedStyles],
            image: verifiedDeviceImageByCodename[codename] || null,
            notes: entry.notes,
        });
        continue;
    }

    const mergedNames = names.filter((name) => name !== existing.name && !existing.aliases.includes(name));
    existing.aliases = Array.from(new Set([...existing.aliases, ...mergedNames]));
    existing.notes = mergeNotes(existing.notes, entry.notes);
    existing.supportedStyles = Array.from(new Set([...existing.supportedStyles, ...(entry.supportedStyles || defaultSupportedStyles)])) as SupportedDevice["supportedStyles"];

    if (mergedNames.length > 0) {
        supportedDeviceMergeLog.push({ codename, mergedNames });
    }
}

export const supportedDevices: SupportedDevice[] = Array.from(supportedDeviceMap.values());

export const supportedDeviceVariantGroups = [
    { label: "star / mars", codenames: ["star", "mars"] },
    { label: "vayu / bhima", codenames: ["vayu", "bhima"] },
    { label: "camellian / camellia", codenames: ["camellian", "camellia"] },
];

export const supportedDeviceStats = {
    sourceEntries: supportedDeviceSeeds.length,
    totalRecords: supportedDevices.length,
    uniqueCodenames: new Set(supportedDevices.map((device) => device.codename)).size,
    duplicateCodenamesMerged: Array.from(new Set(supportedDeviceMergeLog.map((item) => item.codename))),
};

export { supportedDeviceMergeLog };

export function findSupportedDeviceRecord(codename: string) {
    return supportedDeviceMap.get(codename.trim().toLowerCase()) || null;
}
