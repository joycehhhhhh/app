# mymory

**Don’t just save conversations. Preserve relationships.**

mymory is a private shared memory space for families, couples, friends, newborn babies, and pets. It turns everyday moments into a living relationship timeline rather than letting them disappear in a message history.

## Current prototype

This Expo Router prototype is built with local mock data and focuses on a warm, private, relationship-first experience.

- Shared relationship Home with recent check-ins, future-event countdowns, latest memory, and flashbacks
- Daily check-in flow with mood selection and an optional note
- Relationship list, editable relationship settings, and reminder choices
- Future-event detail and mock event composer
- Memory composer with mock media controls
- “Our story” milestone timeline and individual memory pages
- Profile, notification, and privacy settings screens

AI summaries, media capture, calendars, persistence, authentication, and backend services are intentionally mocked for now.

## Tech stack

- React Native
- Expo SDK 54
- Expo Router
- TypeScript

## Run locally

```bash
npm install
npm run start
```

Scan the QR code with Expo Go to test on an iPhone or Android device.

## Project structure

```text
src/
  app/          Expo Router screens
  components/   Shared UI, including bottom navigation
  context/      Local relationship state
```

## Next steps

1. Replace mock data with secure relationship-scoped storage.
2. Add photo, voice, and calendar support.
3. Add authentication and sharing permissions.
4. Connect AI-assisted story curation with explicit privacy controls.
