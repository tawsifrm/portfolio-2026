Project cover screenshots / banners.

Each project in src/lib/data/projects.ts references an image here via its
`image` field. Covers render 16:9, center-cropped. If a referenced file is
missing, the card falls back to its on-brand gradient cover automatically.

Expected filenames (all wired in projects.ts):
  - sibyl.png          (Sibyl)          [present]
  - rosetta.png        (Rosetta)        [present]
  - betterkaraoke.png  (BetterKaraoke)  [add file -> auto-shows]
  - terracustos.png    (TerraCustos)    [add file -> auto-shows]
  - wec.png            (Dynamic World Generation)  [add file -> auto-shows]
  - bricks.png         (Bricks Be Gone) [add file -> auto-shows]

Tip: generate banners at 3:2 (e.g. 1200x800) to match sibyl/rosetta, and keep
icon + text within the central ~85% so the 16:9 card crop doesn't clip them.
