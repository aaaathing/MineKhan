# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MineKhan is a 3D Minecraft-like sandbox game built with vanilla JavaScript running entirely in the browser. It features multiplayer support via Node.js server, multiple dimensions (Overworld, Nether, End), and a complete block/entity/biome system.

## Build Commands

```bash
# Main production build - combines src files and minifies into index.html
node uploadMK.js
```

The build process takes `src/minekhan.html` + `src/minekhan-world.js`, combines and minifies them, then outputs to `index.html`.

## Architecture

### Source Files
- `src/minekhan.html` (~1.6MB) - Main HTML template with embedded JavaScript for UI, rendering, and game logic
- `src/minekhan-world.js` (~1.2MB) - Core game engine: world management, terrain generation, entities, networking
- `index.html` - Built/minified production file (do not edit directly)

### Key Classes and APIs
- `World` class - Main world manager handling terrain, blocks, entities
- `WorldDimension` class - Dimension management for Nether/Overworld/End

Common world APIs:
```javascript
world.getBlock(x, y, z)
world.setBlock(x, y, z, blockId)
world.addEntity(entity)
world.addMob(mobType, x, y, z)
```

### Game Systems
- **Tick system**: 20 ticks/second (tickSpeed = 20, tickTime = 50ms)
- **Web Workers**: Used for terrain generation and parallel processing
- **Block encoding**: Uses bit flags (CROSS, PORTAL, NORTH flags) for block state
- **Entity storage**: Array format `[x, y, z, ...]` for efficiency

### Data Structures
- `biomeData{}` - Biome properties: temperature, rainfall, mob spawning
- `blockData[]` - Block properties and textures
- `defaultWorldSettings` - World customization options

### Resource Packs
Located in `assets/resource_packs/`. Textures stored as encoded strings in JSON format. Four built-in packs: mk, classic, block_craft, example.

### Utility Functions
```javascript
rand(a, b)           // Random number generation
dist3(x, y, z)       // 3D distance calculation
lerp(a, b, t)        // Linear interpolation
line3D()             // Bresenham line drawing
```

## Important Notes

- Chunks remain in memory until restart (memory grows unbounded - can cause crashes on large worlds)
- Terrain generation algorithms based on https://github.com/misode/deepslate
- Extended commands available in `extra-commands.js` (fill, copy, paste, etc.)
- Localization files in `assets/lang/` (Chinese supported)
