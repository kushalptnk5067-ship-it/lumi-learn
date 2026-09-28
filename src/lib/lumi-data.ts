export type SkillName = "Reading" | "Vocabulary" | "Spelling" | "Comprehension";
export type LevelName = "Starter" | "Explorer" | "Reader" | "Word Builder" | "Story Seeker" | "Language Master";

export interface SkillProfile {
  name: SkillName;
  score: number;
  status: "Strong" | "Developing" | "Needs Practice";
  color: string;
  icon: string;
}

export type SubscriptionStatus = "free" | "active" | "pending" | "expired" | "cancelled";
export type EntitlementVerification = "unverified" | "pending" | "verified";
export interface SubscriptionState {
  status: SubscriptionStatus;
  verification: EntitlementVerification;
  provider?: "google_play";
  productId?: string;
  expiresAt?: string;
  purchaseToken?: string;
  updatedAt?: string;
}

export interface LearnerState {
  name: string;
  grade: string;
  language: string;
  goals: string[];
  learningStyle: string;
  xp: number;
  streak: number;
  lessonsCompleted: number;
  wordsLearned: number;
  storiesCompleted: number;
  minutes: number;
  quizScore: number;
  diagnosticComplete: boolean;
  completedActivities: string[];
  savedWords: string[];
  skills: SkillProfile[];
  support: {
    dyslexia: boolean;
    largerText: boolean;
    highContrast: boolean;
    reducedMotion: boolean;
    sound: boolean;
    simpleLanguage: boolean;
  };
  subscription: SubscriptionState;
}

export const defaultSkills: SkillProfile[] = [
  { name: "Reading", score: 72, status: "Developing", color: "#4f86a8", icon: "BookOpen" },
  { name: "Vocabulary", score: 54, status: "Needs Practice", color: "#d9a441", icon: "Sparkles" },
  { name: "Spelling", score: 61, status: "Developing", color: "#e8794f", icon: "PencilLine" },
  { name: "Comprehension", score: 48, status: "Needs Practice", color: "#7b6bb1", icon: "MessageCircle" },
];

export const demoLearner: LearnerState = {
  name: "Maya",
  grade: "Grade 4",
  language: "English",
  goals: ["Reading", "Vocabulary", "Confidence"],
  learningStyle: "Seeing",
  xp: 860,
  streak: 6,
  lessonsCompleted: 14,
  wordsLearned: 86,
  storiesCompleted: 4,
  minutes: 128,
  quizScore: 78,
  diagnosticComplete: true,
  completedActivities: ["vocabulary-foundations", "daily-review", "word-builder"],
  savedWords: ["curious", "observe", "brilliant"],
  skills: defaultSkills,
  support: { dyslexia: false, largerText: false, highContrast: false, reducedMotion: false, sound: true, simpleLanguage: false },
  subscription: { status: "free", verification: "unverified" },
};

export const blankLearner: LearnerState = {
  name: "",
  grade: "",
  language: "English",
  goals: [],
  learningStyle: "Reading",
  xp: 0,
  streak: 0,
  lessonsCompleted: 0,
  wordsLearned: 0,
  storiesCompleted: 0,
  minutes: 0,
  quizScore: 0,
  diagnosticComplete: false,
  completedActivities: [],
  savedWords: [],
  skills: defaultSkills,
  support: { dyslexia: false, largerText: false, highContrast: false, reducedMotion: false, sound: true, simpleLanguage: false },
  subscription: { status: "free", verification: "unverified" },
};

export const hydrateLearner = (value: unknown): LearnerState => {
  if (!value || typeof value !== "object") return blankLearner;
  const parsed = value as Partial<LearnerState>;
  return {
    ...blankLearner,
    ...parsed,
    goals: Array.isArray(parsed.goals) ? parsed.goals : [],
    completedActivities: Array.isArray(parsed.completedActivities) ? parsed.completedActivities : [],
    savedWords: Array.isArray(parsed.savedWords) ? parsed.savedWords : [],
    skills: Array.isArray(parsed.skills) && parsed.skills.length ? parsed.skills : defaultSkills,
    support: { ...blankLearner.support, ...(parsed.support || {}) },
    subscription: { ...blankLearner.subscription, ...(parsed.subscription || {}) },
  };
};

export const levelNames: LevelName[] = ["Starter", "Explorer", "Reader", "Word Builder", "Story Seeker", "Language Master"];
export const getLevel = (xp: number): LevelName => levelNames[Math.min(Math.floor(xp / 500), levelNames.length - 1)];
export const getLevelProgress = (xp: number) => ((xp % 500) / 500) * 100;

export const vocabulary = [
  { word: "curious", definition: "Wanting to learn or know more", example: "The curious fox watched the stars.", pronunciation: "KYUR-ee-us", difficulty: "Starter", related: "interested, eager", emoji: "🔎" },
  { word: "observe", definition: "To watch carefully", example: "We observe birds from the quiet window.", pronunciation: "uhb-ZURV", difficulty: "Starter", related: "notice, study", emoji: "👀" },
  { word: "brilliant", definition: "Very bright or very clever", example: "A brilliant idea helped the team solve it.", pronunciation: "BRIL-yunt", difficulty: "Growing", related: "clever, shining", emoji: "💡" },
  { word: "journey", definition: "A trip from one place to another", example: "Our journey through the forest took two hours.", pronunciation: "JUR-nee", difficulty: "Starter", related: "trip, adventure", emoji: "🧭" },
  { word: "whisper", definition: "To speak very softly", example: "Please whisper in the library.", pronunciation: "WIS-per", difficulty: "Starter", related: "murmur, hush", emoji: "🤫" },
  { word: "discover", definition: "To find something for the first time", example: "We discover a tiny nest near the tree.", pronunciation: "dis-KUV-er", difficulty: "Growing", related: "find, uncover", emoji: "✨" },
  { word: "gentle", definition: "Kind, calm, or soft", example: "The gentle rain helped the flowers grow.", pronunciation: "JEN-tul", difficulty: "Starter", related: "soft, kind", emoji: "🌿" },
  { word: "resource", definition: "Something useful that helps you", example: "The library is a wonderful resource.", pronunciation: "REE-sors", difficulty: "Growing", related: "supply, help", emoji: "🧰" },
  { word: "predict", definition: "To make a smart guess about what happens next", example: "Can you predict the ending of the story?", pronunciation: "pri-DIKT", difficulty: "Growing", related: "guess, forecast", emoji: "🔮" },
  { word: "brave", definition: "Ready to try something difficult", example: "It was brave to ask for help.", pronunciation: "BRAYV", difficulty: "Starter", related: "bold, courageous", emoji: "🦁" },
  { word: "ancient", definition: "Very old; from a long time ago", example: "The museum has an ancient map.", pronunciation: "AYN-shunt", difficulty: "Growing", related: "old, historic", emoji: "🏛️" },
  { word: "energy", definition: "The power to do things", example: "A healthy breakfast gives us energy.", pronunciation: "EN-er-jee", difficulty: "Starter", related: "power, strength", emoji: "⚡" },
  { word: "protect", definition: "To keep someone or something safe", example: "Trees protect the soil from wind.", pronunciation: "pruh-TEKT", difficulty: "Starter", related: "guard, defend", emoji: "🛡️" },
  { word: "patient", definition: "Able to wait calmly", example: "The patient gardener waited for the seed to sprout.", pronunciation: "PAY-shunt", difficulty: "Growing", related: "calm, steady", emoji: "🌱" },
  { word: "wonder", definition: "A feeling of surprise and delight", example: "The child looked at the moon with wonder.", pronunciation: "WUN-der", difficulty: "Starter", related: "amazement, awe", emoji: "🌙" },
  { word: "habitat", definition: "The natural home of a plant or animal", example: "A pond is a frog's habitat.", pronunciation: "HAB-ih-tat", difficulty: "Growing", related: "home, environment", emoji: "🏞️" },
  { word: "cooperate", definition: "To work together", example: "We cooperate to build the tallest tower.", pronunciation: "koh-OP-er-ayt", difficulty: "Growing", related: "team up, help", emoji: "🤝" },
  { word: "imagine", definition: "To create a picture in your mind", example: "Imagine a city built in the clouds.", pronunciation: "ih-MAJ-in", difficulty: "Starter", related: "dream, picture", emoji: "☁️" },
  { word: "solution", definition: "An answer to a problem", example: "We found a clever solution.", pronunciation: "suh-LOO-shun", difficulty: "Growing", related: "answer, fix", emoji: "🧩" },
  { word: "celebrate", definition: "To do something special for a happy event", example: "We celebrate every small victory.", pronunciation: "SEL-uh-brayt", difficulty: "Starter", related: "enjoy, honor", emoji: "🎉" },
];

export const stories = [
  { id: "moon-garden", title: "The Moon Garden", category: "Adventure", difficulty: "Growing", minutes: 5, words: ["curious", "observe", "wonder"], excerpt: "Nila follows a silver trail to a garden that only blooms under moonlight.", body: "Nila was curious about the silver light outside her window. She put on her blue boots and followed it past the old gate. In the garden, tiny flowers opened like stars. Nila stopped to observe their gentle glow. She did not pick them. Instead, she made a quiet promise to protect this secret place.", question: "Why did Nila leave the flowers in the garden?", choices: ["She was afraid of flowers", "She wanted to protect them", "She forgot her basket"], answer: "She wanted to protect them" },
  { id: "seed-sleep", title: "The Seed That Slept", category: "Science", difficulty: "Starter", minutes: 4, words: ["patient", "energy", "protect"], excerpt: "A little seed learns that growing takes time, care and a little patience.", body: "A small seed slept under the soil. Each morning, Arun gave it water and sunlight. For many days, nothing changed. Arun stayed patient. Then one bright morning, a green shoot pushed through the soil. The seed had used its energy to begin a new life.", question: "What helped the seed begin to grow?", choices: ["Water, sunlight and time", "A loud song", "A new pot"], answer: "Water, sunlight and time" },
  { id: "library-lion", title: "The Library Lion", category: "Everyday Life", difficulty: "Starter", minutes: 3, words: ["whisper", "brave", "resource"], excerpt: "A brave new reader finds the perfect place to practice.", body: "Leo felt nervous reading aloud. At the library, he found a quiet corner and began to whisper each sentence. The librarian smiled and showed him a wonderful resource: books about animals. Leo read one page, then two. Soon, the library felt like a friendly place to grow.", question: "Where did Leo practice reading?", choices: ["At the playground", "In a quiet library corner", "On a bus"], answer: "In a quiet library corner" },
  { id: "cloud-city", title: "A City in the Clouds", category: "Folk Tales", difficulty: "Growing", minutes: 6, words: ["imagine", "cooperate", "discover"], excerpt: "Two friends imagine a floating city and learn that big ideas need teamwork.", body: "Mira and Dev liked to imagine impossible places. One afternoon, they drew a city in the clouds. Mira designed gardens while Dev drew bridges. When they cooperated, the pieces fit together. They discovered that a shared idea can become bigger than either person expected.", question: "What did Mira and Dev learn?", choices: ["Teamwork can grow an idea", "Clouds are made of paper", "Drawing is too difficult"], answer: "Teamwork can grow an idea" },
  { id: "pond-neighbors", title: "Pond Neighbors", category: "Animals", difficulty: "Growing", minutes: 5, words: ["habitat", "predict", "ancient"], excerpt: "A pond walk becomes a lesson in noticing the homes all around us.", body: "On a pond walk, Sia saw frogs, dragonflies and reeds. Her guide explained that the pond was a habitat. Sia began to predict where each animal might hide. Near an ancient stone, she discovered a tiny snail. The pond was full of busy neighbors.", question: "What is a habitat?", choices: ["A natural home", "A kind of snack", "A shiny stone"], answer: "A natural home" },
];

export const lessons = [
  { id: "vocabulary-foundations", title: "Vocabulary Foundations", skill: "Vocabulary", duration: "5 min", level: "Start here", description: "Meet three useful words and connect them to pictures and stories.", icon: "Sparkles", color: "gold", reward: 40 },
  { id: "short-reading", title: "Short Reading: The Moon Garden", skill: "Reading", duration: "6 min", level: "Growing", description: "Build confidence with a short story and one thoughtful question.", icon: "BookOpen", color: "blue", reward: 55 },
  { id: "spelling-challenge", title: "Spelling Challenge", skill: "Spelling", duration: "4 min", level: "Practice", description: "Listen, spot patterns and build words one sound at a time.", icon: "PencilLine", color: "coral", reward: 45 },
  { id: "comprehension-lab", title: "Comprehension Lab", skill: "Comprehension", duration: "7 min", level: "Recommended", description: "Use clues from a story to explain what happened and why.", icon: "MessageCircle", color: "purple", reward: 60 },
  { id: "daily-review", title: "Daily Review", skill: "Vocabulary", duration: "3 min", level: "Quick win", description: "Bring yesterday's words back to the front of your memory.", icon: "RefreshCw", color: "green", reward: 25 },
  { id: "word-builder", title: "Word Builder", skill: "Spelling", duration: "5 min", level: "Practice", description: "Turn word parts into new words you can use in a sentence.", icon: "Blocks", color: "coral", reward: 45 },
  { id: "sentence-maker", title: "Sentence Maker", skill: "Comprehension", duration: "5 min", level: "Practice", description: "Put ideas in order and make meaning clear.", icon: "ListChecks", color: "purple", reward: 40 },
  { id: "listen-and-find", title: "Listen & Find", skill: "Reading", duration: "4 min", level: "Listen mode", description: "Listen for a key detail and choose the matching picture.", icon: "Headphones", color: "blue", reward: 35 },
  { id: "story-finish", title: "Story Finish", skill: "Reading", duration: "6 min", level: "Challenge", description: "Predict an ending, then compare it with the author's idea.", icon: "Flag", color: "blue", reward: 55 },
  { id: "confidence-boost", title: "Confidence Boost", skill: "Vocabulary", duration: "3 min", level: "Quick win", description: "A gentle mix of words you almost know and words you own.", icon: "Heart", color: "gold", reward: 30 },
  { id: "word-detective", title: "Word Detective", skill: "Vocabulary", duration: "5 min", level: "Practice", description: "Use context clues to unlock a word hiding in a sentence.", icon: "Target", color: "gold", reward: 45 },
  { id: "vocabulary-in-context", title: "Vocabulary in Context", skill: "Vocabulary", duration: "6 min", level: "Growing", description: "Choose the word that makes each little story make sense.", icon: "BookOpen", color: "gold", reward: 50 },
  { id: "spelling-patterns", title: "Spelling Patterns", skill: "Spelling", duration: "5 min", level: "Practice", description: "Notice sounds that repeat and use them to spell with confidence.", icon: "PencilLine", color: "coral", reward: 45 },
  { id: "spelling-sprint", title: "Spelling Sprint", skill: "Spelling", duration: "4 min", level: "Quick win", description: "Build five familiar words before the timer takes a breath.", icon: "Zap", color: "coral", reward: 40 },
  { id: "read-aloud-replay", title: "Read-Aloud Replay", skill: "Reading", duration: "5 min", level: "Listen mode", description: "Listen once, then read the same lines with your own voice.", icon: "Volume2", color: "blue", reward: 45 },
  { id: "main-idea", title: "Main Idea Finder", skill: "Reading", duration: "6 min", level: "Growing", description: "Find the sentence that holds a paragraph together.", icon: "Highlighter", color: "blue", reward: 50 },
];

export const getBadges = (learner: Pick<LearnerState, "wordsLearned" | "streak" | "storiesCompleted" | "completedActivities" | "quizScore">) => [
  { name: "First Word", detail: "Learn your first word", icon: "🌱", unlocked: learner.wordsLearned > 0 },
  { name: "7 Day Streak", detail: "Practice for seven days", icon: "🔥", unlocked: learner.streak >= 7 },
  { name: "100 Words", detail: "Learn one hundred words", icon: "💬", unlocked: learner.wordsLearned >= 100 },
  { name: "Reading Explorer", detail: "Complete five stories", icon: "🧭", unlocked: learner.storiesCompleted >= 5 },
  { name: "Vocabulary Hero", detail: "Complete a vocabulary lesson", icon: "⭐", unlocked: learner.completedActivities.some(id => ["vocabulary-foundations", "daily-review", "confidence-boost", "word-detective", "vocabulary-in-context"].includes(id)) },
  { name: "Perfect Quiz", detail: "Score 100% on a quiz", icon: "🏆", unlocked: learner.quizScore >= 100 },
];
