# Band Website

A simple, modern single-page website for your band with a built-in media player and download functionality. Compatible with GitHub Pages.

## Features

- 🎵 **Media Player**: Play, pause, skip tracks with a beautiful interface
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI**: Clean, professional design with smooth animations
- ⬇️ **Download Songs**: Direct download links for each track
- ⌨️ **Keyboard Shortcuts**: Space to play/pause, arrow keys to navigate
- 🎯 **GitHub Pages Ready**: Simple static files that work with GitHub Pages

## Setup Instructions

### 1. Customize Your Band Information

Edit `index.html` and replace:
- "Your Band Name" with your actual band name
- Update the title tag
- Modify the footer copyright

### 2. Add Your Songs

1. Create a `songs` folder in the project directory
2. Add your MP3 files to the `songs` folder
3. Edit `script.js` and update the `songs` array with your song information:

```javascript
const songs = [
    {
        title: "Your Song Title",
        artist: "Your Band Name",
        duration: "3:45",
        file: "songs/your-song.mp3",
        downloadUrl: "songs/your-song.mp3"
    },
    // Add more songs...
];
```

### 3. Deploy to GitHub Pages

1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to Settings > Pages
4. Select "Deploy from a branch"
5. Choose "main" branch and "/(root)" folder
6. Click "Save"

Your website will be available at `https://yourusername.github.io/repository-name`

## File Structure

```
band-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── README.md           # This file
└── songs/              # Your MP3 files go here
    ├── song1.mp3
    ├── song2.mp3
    └── song3.mp3
```

## Customization Options

### Colors
Edit `styles.css` to change the color scheme:
- Main gradient: `.body` background
- Button colors: `.control-btn` background
- Accent colors: Various `#667eea` instances

### Fonts
The website uses Inter font from Google Fonts. You can change this in `index.html` and `styles.css`.

### Layout
- Modify padding and margins in `styles.css`
- Adjust the hero section height
- Change the music player layout

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## Keyboard Shortcuts

- **Space**: Play/Pause
- **Left Arrow**: Previous song
- **Right Arrow**: Next song

## Troubleshooting

### Songs not playing?
- Make sure your MP3 files are in the `songs` folder
- Check that the file paths in `script.js` match your actual file names
- Ensure your MP3 files are properly encoded

### Website not loading on GitHub Pages?
- Verify all files are uploaded to the repository
- Check that `index.html` is in the root directory
- Ensure the repository is public (or you have GitHub Pro for private repos)

### Download not working?
- Make sure the `downloadUrl` in `script.js` points to the correct file
- Verify the file exists in the specified path

## License

This project is open source. Feel free to modify and use for your own band website!

## Support

If you need help customizing the website, check the comments in the code files or create an issue in the repository. 