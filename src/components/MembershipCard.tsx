"use client";

import React from "react";
import { Gem, ShieldCheck, Sparkles, Crown } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";
import { GlassCard } from "@/components/ui/deadzone";
import { officialLinks, siteLinks } from "@/lib/links";
import styles from "@/components/MembershipCard.module.css";

export function MembershipCard() {
  return (
    <GlassCard accent="cyan" className={`${styles.cardContainer} p-6`}>
      <h2 className={styles.title}>Get Premium Membership</h2>
      <p className={styles.description}>
        Unlock GamingPlus, Legend, and Ninja with premium DeadZone access by MEZO.
      </p>
      <ul className={styles.features}>
        <li className={styles.featureItem}>
          <Sparkles className={styles.icon} /> GamingPlus for gaming‑focused users
        </li>
        <li className={styles.featureItem}>
          <Crown className={styles.icon} /> Legend for balanced daily use
        </li>
        <li className={styles.featureItem}>
          <Gem className={styles.icon} /> Ninja for the most exclusive DeadZone experience
        </li>
        <li className={styles.featureItem}>
          <ShieldCheck className={styles.icon} /> Premium support through MEZO
        </li>
      </ul>
      <div className={styles.buttons}>
        <PremiumButton
          href={officialLinks.contactMezo}
          external
          icon={<Gem className="h-4 w-4" />}
          className={styles.button}
        >
          Get Premium Membership
        </PremiumButton>
        <PremiumButton href={siteLinks.premium} variant="secondary" className={styles.button}>
          View Premium
        </PremiumButton>
        <PremiumButton href={siteLinks.gallery} variant="secondary" className={styles.button}>
          View Gallery
        </PremiumButton>
      </div>
    </GlassCard>
  );
}
