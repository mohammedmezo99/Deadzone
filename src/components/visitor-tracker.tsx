"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function VisitorTracker() {
    const pathname = usePathname();

    useEffect(() => {
        fetch("/api/track", {
            method: "POST",
            body: JSON.stringify({ pathname }),
            headers: { "Content-Type": "application/json" }
        }).catch(err => console.error("Tracking error", err));
    }, [pathname]);

    return null;
}
