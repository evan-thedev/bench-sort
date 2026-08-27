# Bench Sort

A fast-paced workbench organization game. Drag messy parts onto labeled spots, tidy the bench in ~8 seconds per level, and progress through 8 increasingly complex levels.

## 🎮 Play Now

**[Play Bench Sort](https://evan-thedev.github.io/bench-sort/)**

## 🎯 Game Mechanics

- **Objective**: Drag each tool or part onto its matching labeled spot on the workbench
- **8 Levels**: Each level adds more items to organize
- **Fail Fast**: Wrong placements give instant funny feedback
- **Time Tracking**: Beat each level as fast as you can
- **Mistake Counter**: Track your accuracy across all levels

## 🛠️ Features

- Pure vanilla JavaScript - no frameworks or dependencies
- Responsive drag-and-drop mechanics
- 8 progressively challenging levels (3 to 7 items per level)
- Instant feedback on mistakes with randomized messages
- Level completion tracking and statistics
- Clean, modern UI with smooth animations

## 🚀 Running Locally

1. Clone the repository:
```bash
git clone https://github.com/evan-thedev/bench-sort.git
cd bench-sort
```

2. Open `index.html` in your browser:
```bash
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

Or use a local server:
```bash
python -m http.server 8000
# Then visit http://localhost:8000
```

## 🧪 Running Tests

Open `test.html` in your browser to run the automated test suite.

```bash
open test.html
```

The test suite validates:
- Level data structure and consistency
- Game class initialization
- Core game mechanics
- Shuffle algorithm
- Level progression logic

## 📁 Project Structure

```
bench-sort/
├── index.html      # Main game page
├── style.css       # Game styling and animations
├── game.js         # Game logic and mechanics
├── test.html       # Test suite
└── README.md       # This file
```

## 🎮 How to Play

1. Look at the labeled spots on the workbench (top section)
2. Drag tools from the messy pile (bottom section) onto their matching spots
3. Complete all placements to finish the level
4. Try to minimize mistakes and complete each level quickly
5. Progress through all 8 levels to master the workshop

## 🏗️ Technical Details

- **Built with**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Drag & Drop API**: Native HTML5 drag and drop
- **No dependencies**: Runs entirely in the browser
- **GitHub Pages**: Deployed automatically from the main branch

## 🎨 Design Philosophy

- **One Mechanic**: Focus on drag-and-drop organization
- **Fail Fast**: Immediate feedback on mistakes with humor
- **Quick Levels**: Each level designed for ~8 second completion
- **Progressive Difficulty**: Start with 3 items, end with 7 items
- **No Fluff**: No extra mechanics like potions, fishing, or multiplayer

## 📝 License

MIT License - feel free to use and modify as you wish.

## 🤝 Contributing

This is a simple demonstration game, but feel free to fork and make it your own!

---

Made with ⚒️ for tidy workbenches everywhere
