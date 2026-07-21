# mymory

> **Don't just save conversations. Preserve relationships.**

**mymory** is a private, relationship-first memory app for families, couples, friends, new parents, and people remembering loved ones. Rather than leaving meaningful moments buried in a message history, it gives every relationship its own living space: a shared timeline of photos, check-ins, milestones, and plans for the future.

The project is an Expo / React Native prototype designed for iOS, Android, and web. It deliberately centers warmth, privacy, and emotional context over the fast-moving, feed-style experience common in social and messaging apps.

## What it does

### Relationship spaces

Users can move between separate relationship spaces—for example, a partner, a growing family, or grandparents being remembered—and each space keeps its own people, start date, memories, check-ins, future events, and reminder preferences. New relationship spaces can be created from the relationship list, with selected members and optional memorial members.

### A meaningful home screen

The active relationship's home screen brings its story into focus with:

- A day count calculated from the relationship start date
- The latest check-ins from people in the space
- A supportive, rule-based “Today's highlight” summary of the newest check-in
- A countdown to the next future event
- The latest photo memory
- “From this day” flashbacks for selected anniversary years

### Capture and revisit memories

The memory flow requests photo-library permission, lets the user choose and crop an image, and saves it with an optional caption. Saved moments appear in the relationship's chronological timeline and can be opened as individual memory events. This makes the timeline a usable record rather than a static mockup.

### Daily emotional check-ins

The daily check-in flow offers a lightweight way to share how the day feels, with a mood and optional note. Check-ins return to the home screen, where they help make the relationship space feel current and attentive. The intent is connection—not clinical tracking.

### Future events and relationship details

Users can add future events with a title, date, and note; the app calculates the time remaining and surfaces the next one on the home screen. Relationship settings support naming a space, selecting a date through a native date picker, setting members, and representing people who have passed away with a gentle memorial treatment.

### Local, device-based persistence

Relationship data is stored locally with AsyncStorage, so added memories, check-ins, events, active-space selection, and settings persist across app launches on the same device. This prototype does **not** yet include authentication, cloud sync, shared multi-user access, encryption, a production backend, or live generative AI.

## Product decisions

The product direction was intentionally shaped around a few choices:

- **Relationships are the organizing unit.** A memory belongs to a relationship space, not an undifferentiated global feed.
- **Emotional context is lightweight and voluntary.** Check-ins make it easier to understand a loved one's day without turning the product into a mental-health tracker.
- **Remembrance is first-class.** Memorial members and respectful visual states allow a timeline to hold both ongoing life and people remembered with love.
- **Privacy comes before social reach.** The prototype is local-first and avoids public sharing mechanics. Any future AI or collaboration features should be relationship-scoped and permission-led.
- **The interface should feel calm and personal.** Warm neutrals, soft cards, concise prompts, and timeline language were chosen to make daily use feel intimate rather than transactional.

## Built with Codex and GPT-5.6

mymory was built through an iterative collaboration between the product creator and Codex. The creator established the core concept—preserving relationships rather than merely saving conversations—and made the key calls on the app's audience, privacy posture, emotional tone, memorial support, and the flows that mattered most in the MVP.

Codex accelerated the implementation cycle by turning those decisions into a working Expo application: it mapped the screens and navigation, implemented relationship-scoped state, connected the memory, check-in, relationship-switching, date-picker, timeline, and future-event flows, and kept the interface consistent across screens. GPT-5.6 contributed the reasoning and code generation behind that rapid iteration, helping translate product feedback into concrete React Native components, state updates, persistence behavior, and edge-case handling.

This was a collaborative build rather than a one-shot generation: product intent and design judgment stayed with the creator, while Codex served as a hands-on engineering partner—speeding up exploration, implementation, refinement, and verification of the final prototype.

## Tech stack

- React Native 0.81
- Expo SDK 54 and Expo Router
- TypeScript
- AsyncStorage for local persistence
- Expo Image Picker for photo memories
- `@react-native-community/datetimepicker` for native date selection

## Run locally

### Prerequisites

- Node.js (an LTS release is recommended)
- Expo Go on an iOS or Android device, or an Android/iOS simulator

### Start the app

```bash
npm install
npm run start
```

Then scan the QR code with Expo Go, or launch a platform directly:

```bash
npm run android
npm run ios
npm run web
```

## Project structure

```text
src/
  app/          Expo Router screens and user flows
  components/   Shared navigation, date input, and UI components
  context/      Relationship-scoped state and AsyncStorage persistence
  hooks/        Theme and color-scheme helpers
assets/         App icons, splash assets, and images
```

## Current scope and next steps

The prototype has functional client-side flows and local persistence. Natural next steps are secure account-based storage, invitation and sharing permissions, cloud-synced media, richer memory metadata (such as location and voice notes), calendar integration, notifications, and carefully permissioned AI-assisted story curation.

## Codex feedback session

The majority of mymory's core functionality was built in this Codex session:

```text
/feedback 019f7d8b-a7ed-7f73-b522-7042549e7e59
```
