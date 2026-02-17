# Specification

## Summary
**Goal:** Build an MVP Kids Learning App with kid-friendly navigation, flashcards, quizzes, and saved per-user progress using Internet Identity.

**Planned changes:**
- Create the core app structure with primary navigation to Home, Learn (Flashcards), Quiz, and Progress, with responsive layouts and large kid-friendly controls.
- Implement bundled MVP learning content (Alphabet A–Z, Numbers 0–20, Colors, Shapes) as interactive flashcards with Next/Previous, Shuffle, and a prominent Reveal interaction.
- Add a quiz mode per topic with 10+ age-appropriate multiple-choice questions (or all items for small topics), clear correct/incorrect feedback, and an end-of-quiz results summary with restart.
- Implement Internet Identity sign-in and backend APIs (single Motoko actor) to get and upsert per-principal progress (flashcards viewed count per topic, quiz attempts, best score, most recent score), and render it on the Progress page.
- Apply a cohesive kid-friendly visual theme (non blue/purple palette), playful typography, rounded components, and large touch targets across all screens.
- Add and use the required generated static images under `frontend/public/assets/generated` for the Home hero and topic icons (and a mascot).

**User-visible outcome:** Users can learn via flashcards, take topic quizzes, and view progress per topic; signed-in users have progress saved across sessions, while signed-out users can still use the app with a clear notice that progress won’t be saved until sign-in.
