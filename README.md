# Prep Dashboard

Progress dashboard for exam roadmaps (first exam: GATE CS 2027). Next.js App Router, fully static, data saved in the browser.

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # parser, weighted progress, revision dates, backup round-trip
npm run lint
npm run build
```

## Exam content

Each folder in `content/exams/<exam-id>/` is one exam and shows up in the header's exam switcher:

- `exam.json` – subjects → topics (`questionCount`, `marks`, `oneMark`, `twoMark`, `yearsAsked`, `isTop20`, `isFoundation`)
- `roadmap.json` – weeks → days (`topics`, `tasks`, `pyqTarget`, `revision`)

Both are validated with the zod schemas in `lib/schema.ts` during `npm run build` (and in `npm test`); an invalid file fails the build.

GATE CS data is generated from `docs/GATE_CS_Analysis_and_Roadmap.md`:

```bash
npm run parse:gate   # stops and writes nothing if any check fails
```

### Adding an exam

1. Create `content/exams/<new-id>/` (lowercase letters, digits, dashes).
2. Add `exam.json` with `"id": "<new-id>"` and the subjects/topics, in the same shape as `content/exams/gate-cs-2027/exam.json`.
3. Add `roadmap.json` in the same shape as the GATE one.
4. Run `npm test && npm run build`; fix any schema errors it prints, then deploy.

## Your data

Progress is stored per exam in `localStorage` (`lib/storage.ts` is the only module that touches it). Use **Backup → Export JSON** regularly; clearing site data deletes it.
