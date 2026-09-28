import { useState } from "react";
import { BarChart3, BookOpen, Brain, Bot, Blocks, Check, ChevronRight, Clock3, ListChecks, LockKeyhole, MessageCircle, RefreshCw, ShieldCheck, Sparkles, Target, Trophy, Volume2, X, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { LearnerState, SubscriptionState } from "@/lib/lumi-data";
import { getAnalytics, getLearningPlan, getObservedGaps, isPremiumEntitled, premiumChallenges, premiumContent, premiumFeatures } from "@/lib/premium-data";
import "./premium.css";

const premiumIconMap: Record<string, LucideIcon> = { BarChart3, BookOpen, Brain, Bot, Blocks, ListChecks, MessageCircle, RefreshCw, Sparkles, Target, Trophy, Volume2, Zap };

function PremiumIcon({ name, size = 20 }: { name: string; size?: number }) {
  const IconComponent = premiumIconMap[name] || Sparkles;
  return <IconComponent size={size} aria-hidden="true" />;
}

function PremiumMark() {
  return <span className="premium-mark"><Sparkles size={15} fill="currentColor" /> Premium</span>;
}

function subscriptionStatusLabel(subscription: SubscriptionState) {
  if (subscription.status === "pending") return "Payment pending";
  if (subscription.status === "expired") return "Premium expired";
  if (subscription.status === "cancelled") return "Premium cancelled";
  return "Free plan";
}

function PremiumFeatureCard({ feature, locked, onUnlock }: { feature: typeof premiumFeatures[number]; locked: boolean; onUnlock: () => void }) {
  return <article className={`premium-feature-card ${locked ? "locked" : "available"}`}>
    <div className="premium-feature-top"><span className="premium-feature-icon"><PremiumIcon name={feature.icon} size={21} /></span>{locked && <LockKeyhole size={16} className="premium-lock" />}</div>
    <h3>{feature.title}</h3><p>{feature.description}</p><span className="premium-preview">{feature.preview}</span>
    {locked ? <button className="premium-feature-action" onClick={onUnlock}>Unlock Premium <ChevronRight size={15} /></button> : <span className="premium-active-label"><Check size={15} /> Included in your plan</span>}
  </article>;
}

export function PremiumProfileSection({ subscription, onOpen, onRestore, restoreMessage }: { subscription: SubscriptionState; onOpen: () => void; onRestore: () => void; restoreMessage?: string }) {
  const active = isPremiumEntitled(subscription); const statusLabel = active ? "Premium Active" : subscriptionStatusLabel(subscription);
  return <section className="premium-profile-section"><div className="premium-profile-copy"><PremiumMark /><h2>LumiLearn Premium</h2><p>{active ? "Your advanced learning tools are active." : "Personalize, analyze and master with advanced learning tools."}</p><span className="premium-status-line">{active ? <><Check size={14} /> {statusLabel}</> : <><LockKeyhole size={14} /> {statusLabel} · Premium features available</>}</span></div><div className="premium-profile-actions"><button className="premium-cta" onClick={onOpen}>{active ? "Manage Premium" : "Upgrade to Premium"}<ChevronRight size={16} /></button><button className="restore-button" onClick={onRestore}><RefreshCw size={14} /> Restore purchases</button></div>{restoreMessage && <p className="premium-restore-message" role="status">{restoreMessage}</p>}</section>;
}

export function PremiumHomeCard({ onOpen, subscription }: { onOpen: () => void; subscription: SubscriptionState }) {
  const active = isPremiumEntitled(subscription);
  return <section className="premium-home-card"><div className="premium-home-art"><Sparkles size={26} fill="currentColor" /><span>✦</span></div><div><PremiumMark /><h2>{active ? "Your Premium path is ready" : "Go beyond the next lesson"}</h2><p>{active ? "Open your learning plan and keep your momentum." : "Unlock a plan, deeper insights and practice designed around you."}</p><button className="premium-inline-link" onClick={onOpen}>{active ? "Open Premium" : "See what Premium adds"}<ArrowChevron /></button></div></section>;
}

function ArrowChevron() { return <ChevronRight size={16} />; }

function PremiumStatusPanel({ subscription, onRestore, message }: { subscription: SubscriptionState; onRestore: () => void; message?: string }) {
  const active = isPremiumEntitled(subscription); const statusLabel = active ? "Premium Active" : subscriptionStatusLabel(subscription);
  return <div className="premium-status-panel"><div className="premium-status-icon"><ShieldCheck size={22} /></div><div><strong>{statusLabel}</strong><span>{active ? "Verified entitlement" : subscription.status === "free" ? "No subscription is active" : "Check your Google Play subscription"}</span></div><div className="premium-status-actions">{!active && <button onClick={onRestore}><RefreshCw size={14} /> Restore purchases</button>}<small>{active ? subscription.expiresAt ? `Renews ${subscription.expiresAt}` : "Managed through Google Play" : "No payment has been processed"}</small></div>{message && <p role="status">{message}</p>}</div>;
}

function PremiumPracticeAction({ skill }: { skill: string }) {
  const [open, setOpen] = useState(false);
  return <><div className="premium-practice-card"><div><strong>Generate a focused set</strong><p>Start with {skill}, then let Lumi adjust the difficulty from your answers.</p></div><button onClick={() => setOpen(true)}>Start revision <ChevronRight size={15} /></button></div>{open && <div className="overlay"><div className="premium-plan-modal" role="dialog" aria-modal="true" aria-labelledby="revision-title"><button className="modal-close" onClick={() => setOpen(false)} aria-label="Close revision"><X size={18} /></button><PremiumMark /><h2 id="revision-title">{skill} revision set</h2><p>Premium practice will use your observed answers to create a focused set, adjust difficulty and explain mistakes step by step.</p><div className="premium-billing-note"><ShieldCheck size={18} /><div><strong>Personalized practice is ready</strong><span>Connect the AI exercise service to generate live questions from verified learner data.</span></div></div><button className="premium-cta" onClick={() => setOpen(false)}>Got it</button></div></div>}</>;
}

function PremiumWorkspace({ learner }: { learner: LearnerState }) {
  const plan = getLearningPlan(learner); const analytics = getAnalytics(learner); const gaps = getObservedGaps(learner);
  return <div className="premium-workspace"><section className="premium-plan-card"><div><PremiumMark /><p className="eyebrow">TODAY'S PLAN · {plan.reduce((sum, item) => sum + item.minutes, 0)} MINUTES</p><h2>Designed around your next best step.</h2><p>You're building a strong foundation. This plan gives extra space to {analytics.growthFocus?.name.toLowerCase() || "your growing skills"}.</p></div><Target size={35} /></section><div className="premium-plan-list">{plan.map((item, index) => <div className="premium-plan-row" key={`${item.title}-${index}`}><span className="plan-number">{index + 1}</span><span className="plan-icon"><PremiumIcon name={item.icon} size={18} /></span><div><strong>{item.title}</strong><small>{item.detail}</small></div><span className="plan-minutes"><Clock3 size={13} /> {item.minutes}m</span></div>)}</div><section className="premium-analytics-grid"><div><BarChart3 size={18} /><strong>{analytics.accuracy}%</strong><span>Quiz accuracy</span></div><div><Zap size={18} /><strong>{analytics.xp}</strong><span>Total XP</span></div><div><Trophy size={18} /><strong>{analytics.mastered}</strong><span>Skills strong</span></div><div><FlameIcon /><strong>{analytics.streak}</strong><span>Day streak</span></div></section><section><div className="premium-section-heading"><div><p className="eyebrow">OBSERVED PATTERNS</p><h2>Your learning gaps</h2></div><Brain size={24} /></div><p className="premium-disclaimer">Based on practice performance only — this is not a diagnosis.</p><div className="premium-gap-list">{gaps.map(gap => <div key={gap.skill}><span><Brain size={15} /> {gap.skill}</span><strong>{gap.score}%</strong><small>{gap.observation}</small></div>)}</div></section><section><div className="premium-section-heading"><div><p className="eyebrow">EXPANDED PRACTICE</p><h2>Practice my weaknesses</h2></div><RefreshCw size={22} /></div><PremiumPracticeAction skill={gaps[0]?.skill || "your next skill"} /></section><section><div className="premium-section-heading"><div><p className="eyebrow">PREMIUM LIBRARY</p><h2>More to explore</h2></div><BookOpen size={22} /></div><div className="premium-content-grid">{premiumContent.map(item => <div key={item.title}><span className="premium-content-icon"><PremiumIcon name={item.icon} size={18} /></span><small>{item.subject} · {item.duration}</small><strong>{item.title}</strong><span>{item.level}</span></div>)}</div></section><section><div className="premium-section-heading"><div><p className="eyebrow">STAY IN MOTION</p><h2>Premium challenges</h2></div><Trophy size={22} /></div><div className="premium-challenge-list">{premiumChallenges.map(challenge => <div key={challenge.title}><span><PremiumIcon name={challenge.icon} size={19} /></span><div><strong>{challenge.title}</strong><small>{challenge.detail}</small></div><b>{challenge.reward}</b></div>)}</div></section></div>;
}

function FlameIcon() { return <span className="flame-symbol">🔥</span>; }

export function PremiumPage({ learner, onRestore, restoreMessage }: { learner: LearnerState; onRestore: () => void; restoreMessage?: string }) {
  const [planOpen, setPlanOpen] = useState(false); const active = isPremiumEntitled(learner.subscription);
  const openPlans = () => setPlanOpen(true);
  return <div className="page-content premium-page"><section className="premium-page-hero"><div><PremiumMark /><p className="eyebrow">LUMILEARN PREMIUM</p><h1>Learn smarter.<br /><em>Practice better.</em></h1><p>Grow faster with a learning ecosystem that understands your strengths, your goals and your next best step.</p></div><div className="premium-hero-orbit"><Sparkles size={56} /><span>✦</span></div></section><PremiumStatusPanel subscription={learner.subscription} onRestore={onRestore} message={restoreMessage} />{active ? <PremiumWorkspace learner={learner} /> : <><section className="premium-benefit-grid">{premiumFeatures.map(feature => <PremiumFeatureCard key={feature.id} feature={feature} locked onUnlock={openPlans} />)}</section><section className="premium-billing-note"><ShieldCheck size={19} /><div><strong>Google Play Billing ready</strong><span>Premium entitlement will unlock only after a verified purchase token is returned by the official billing flow.</span></div></section></>}<p className="premium-no-ads"><Check size={15} /> No ads. No tracking for advertising. Just more room to learn.</p>{planOpen && <div className="overlay"><div className="premium-plan-modal" role="dialog" aria-modal="true" aria-labelledby="premium-modal-title"><button className="modal-close" onClick={() => setPlanOpen(false)} aria-label="Close Premium options"><X size={18} /></button><PremiumMark /><h2 id="premium-modal-title">Unlock LumiLearn Premium 🚀</h2><p>Subscription pricing and purchase confirmation will be provided by Google Play Billing when the Android wrapper is connected.</p><div className="premium-modal-list"><span><Check size={16} /> Advanced AI Tutor</span><span><Check size={16} /> Personalized Learning Plans</span><span><Check size={16} /> Advanced Progress Analytics</span><span><Check size={16} /> Premium Challenges and content</span></div><div className="premium-modal-actions"><button className="premium-cta" onClick={onRestore}><RefreshCw size={15} /> Restore purchases</button><button className="restore-button" onClick={() => setPlanOpen(false)}>Not now</button></div><small className="premium-modal-footnote">This web demo does not process payments or unlock Premium locally.</small></div></div>}</div>;
}
