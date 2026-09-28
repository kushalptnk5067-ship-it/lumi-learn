import type { LearnerState, SubscriptionState } from "@/lib/lumi-data";

export type PremiumFeatureId = "ai-tutor" | "learning-plan" | "analytics" | "gap-detection" | "expanded-practice" | "content" | "challenges";

export interface PremiumFeature {
  id: PremiumFeatureId;
  title: string;
  description: string;
  icon: string;
  preview: string;
}

export interface BillingRestoreResult {
  status: "restored" | "not-found" | "unavailable" | "error";
  entitlement?: SubscriptionState;
  message: string;
}

export interface PurchaseVerificationPayload {
  productId: string;
  purchaseToken: string;
  packageName: string;
}

export interface BillingAdapter {
  restorePurchases: () => Promise<BillingRestoreResult>;
  verifyPurchase: (payload: PurchaseVerificationPayload) => Promise<BillingRestoreResult>;
  statusDescription: string;
}

export const premiumFeatures: PremiumFeature[] = [
  { id: "ai-tutor", title: "Advanced AI Tutor", description: "Step-by-step explanations, personalized examples and revision follow-ups.", icon: "Bot", preview: "Lumi can build a gentle follow-up question from your last mistake." },
  { id: "learning-plan", title: "My Learning Plan", description: "A daily plan shaped around your goals, accuracy and next best step.", icon: "Target", preview: "Reading comprehension is your next growth opportunity." },
  { id: "analytics", title: "Advanced Progress Analytics", description: "See accuracy, XP growth, mastered topics and improvement over time.", icon: "BarChart3", preview: "Your practice pattern is becoming more consistent." },
  { id: "gap-detection", title: "Learning-Gap Detection", description: "Spot observed patterns in answers and turn them into targeted practice.", icon: "Brain", preview: "Comprehension questions need a little more practice right now." },
  { id: "expanded-practice", title: "Practice My Weaknesses", description: "Generate more questions, choose difficulty and revisit repeated mistakes.", icon: "RefreshCw", preview: "Build a 5-minute comprehension revision set." },
  { id: "content", title: "Premium Learning Content", description: "Unlock advanced reading, vocabulary, grammar, maths and general knowledge.", icon: "BookOpen", preview: "New challenge packs arrive in your Premium library." },
  { id: "challenges", title: "Premium Challenges", description: "Daily, 7-day, vocabulary, reading, maths and mastery challenges.", icon: "Trophy", preview: "A 7-day Reading Challenge is ready to start." },
];

export const premiumContent = [
  { title: "Grammar in Context", subject: "Grammar", duration: "8 min", level: "Growing", icon: "MessageCircle" },
  { title: "The Hidden Observatory", subject: "Reading", duration: "10 min", level: "Challenge", icon: "BookOpen" },
  { title: "Number Patterns", subject: "Maths", duration: "7 min", level: "Growing", icon: "Blocks" },
  { title: "Animal Adaptations", subject: "General knowledge", duration: "9 min", level: "Challenge", icon: "Sparkles" },
];

export const premiumChallenges = [
  { title: "Daily Challenge", detail: "One focused win · 5 min", reward: "+60 XP", icon: "Zap" },
  { title: "7-Day Reading Challenge", detail: "Build a steady reading rhythm", reward: "Badge", icon: "BookOpen" },
  { title: "Vocabulary Challenge", detail: "Use 10 new words in context", reward: "+100 XP", icon: "Sparkles" },
  { title: "Mastery Challenge", detail: "Mix your strongest and growing skills", reward: "Mastery star", icon: "Trophy" },
];

export const isPremiumEntitled = (subscription: SubscriptionState) => subscription.status === "active" && subscription.verification === "verified";

export const getObservedGaps = (learner: LearnerState) => [...learner.skills]
  .sort((a, b) => a.score - b.score)
  .slice(0, 2)
  .map(skill => ({ skill: skill.name, score: skill.score, observation: `${skill.name} practice is still developing based on recent skill scores.` }));

export const getLearningPlan = (learner: LearnerState) => {
  const gaps = getObservedGaps(learner);
  const primary = gaps[0]?.skill || "Reading";
  const second = gaps[1]?.skill || "Vocabulary";
  return [
    { title: primary, detail: "Targeted practice", minutes: 10, icon: primary === "Comprehension" ? "MessageCircle" : "BookOpen" },
    { title: second, detail: "Build confidence", minutes: 10, icon: "Sparkles" },
    { title: "Practice Quiz", detail: "Check your thinking", minutes: 5, icon: "ListChecks" },
    { title: "AI Revision", detail: "Reflect with Lumi", minutes: 5, icon: "Bot" },
  ];
};

export const getAnalytics = (learner: LearnerState) => ({
  accuracy: learner.quizScore,
  xp: learner.xp,
  streak: learner.streak,
  lessons: learner.lessonsCompleted,
  mastered: learner.skills.filter(skill => skill.score >= 70).length,
  growthFocus: learner.skills.reduce((lowest, skill) => skill.score < lowest.score ? skill : lowest, learner.skills[0]),
});

export const googlePlayBilling: BillingAdapter = {
  async restorePurchases(): Promise<BillingRestoreResult> {
    return {
      status: "unavailable",
      message: "Google Play Billing is not connected in this web demo. No purchase was made.",
    };
  },
  async verifyPurchase(payload: PurchaseVerificationPayload): Promise<BillingRestoreResult> {
    void payload;
    return {
      status: "unavailable",
      message: "Purchase verification requires the secure server endpoint and Google Play token validation.",
    };
  },
  statusDescription: "Ready for verified Google Play purchase tokens, expiry checks and server-side entitlement validation.",
};
