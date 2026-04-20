# Stil-Vorlage – immer mit in den Gemini-Prompt!

Damit alle generierten Bilder zusammenpassen, **muss der passende Block immer ans Ende des Prompts** — nie weglassen.

---

## 🖼️ Für Hintergrundbilder (Szenen-Bilder)

```
STYLE: Stylized painterly cartoon illustration, slightly brushy textures, high contrast,
clear silhouettes, dark but vibrant palette — dominated by mossy greens, moody greys,
warm amber accents. Inspired by LucasArts adventure game backgrounds, Tim Burton,
Goosebumps book covers, Hotel Transylvania. Spooky but kid-friendly (age 10–14).

ATMOSPHERE: Overcast sky with a sickly yellow-green tint visible through the skylights
and windows. Low ground fog drifting between the tables. Long diagonal shadows.
Dried leaves and torn paper pages swirling in cold wind through the hall.
Subtle volumetric light rays cutting through the skylights.

TECHNICAL: 16:9 aspect ratio, 1280x720 resolution, sharp focus on foreground,
slight atmospheric depth-of-field on background.
No text, no speech bubbles, no UI overlays, no watermarks. No gore.
```

---

## 🧩 Für Sprites (einzelne Figuren / Objekte, transparenter Hintergrund)

```
STYLE: Stylized painterly cartoon illustration, slightly brushy textures, high contrast,
clear silhouettes, dark but vibrant palette — dominated by mossy greens, moody greys,
warm amber accents. Inspired by LucasArts adventure game backgrounds, Tim Burton,
Goosebumps book covers, Hotel Transylvania. Spooky but kid-friendly (age 10–14).

TECHNICAL: Transparent background, PNG with alpha channel, object centered on canvas,
no drop shadow, no cast ground shadow, no floor, no background elements.
No text, no watermarks. No gore.
```

---

## Beispiel: vollständiger Prompt

**Hintergrundbild:**
> Classroom of a German school seen from a top-down angle, overrun by zombies.
> Desks and chairs scattered, backpacks on the floor, a door at the far end.
>
> STYLE: Stylized painterly cartoon illustration, slightly brushy textures, high contrast, clear silhouettes, dark but vibrant palette — dominated by mossy greens, moody greys, warm amber accents. Inspired by LucasArts adventure game backgrounds, Tim Burton, Goosebumps book covers, Hotel Transylvania. Spooky but kid-friendly (age 10–14).
>
> ATMOSPHERE: Overcast sky with a sickly yellow-green tint visible through the skylights and windows. Low ground fog drifting between the tables. Long diagonal shadows. Dried leaves and torn paper pages swirling in cold wind through the hall. Subtle volumetric light rays cutting through the skylights.
>
> TECHNICAL: 16:9 aspect ratio, 1280x720 resolution, sharp focus on foreground, slight atmospheric depth-of-field on background. No text, no speech bubbles, no UI overlays, no watermarks. No gore.

---

> **Tipp:** Wenn Gemini den Stil ignoriert, schreibe ganz an den Anfang:
> `"In the exact style of a LucasArts adventure game background:"`
