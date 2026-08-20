Company logos for the Experience section.

Each experience in src/lib/data/experiences.ts references a logo here via its
`logo` field. Logos render inside a ~56px white rounded tile, object-contain.
If a file is missing, the card shows a company-initials monogram instead.

Expected filenames (all wired in experiences.ts):
  - empire-life.png   (Empire Life Insurance Company — used by both roles)
  - cineplex.png      (Cineplex Digital Media)
  - electrium.png     (Electrium Mobility)
  - mhapy.png         (Mhapy)

Tips:
  - Square-ish logos look best. Transparent PNG or SVG (rename to .png) works.
  - The tile background is white, so dark/colored logos read well. If a logo is
    white-on-transparent (would vanish on white), tell me and I'll give that
    tile a dark background instead.
