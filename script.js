// Your band's song data
const songs = [
    {
        title: "Psyclop",
        artist: "Your Band Name",
        duration: "4:15",
        file: "songs/1 Psyclop.wav",
        downloadUrl: "songs/1 Psyclop.wav"
    },
    {
        title: "Snakes", 
        artist: "Your Band Name",
        duration: "5:20",
        file: "songs/2 Snakes.wav",
        downloadUrl: "songs/2 Snakes.wav"
    },
    {
        title: "Invertebrate",
        artist: "Your Band Name", 
        duration: "2:45",
        file: "songs/3 Invertebrate.wav",
        downloadUrl: "songs/3 Invertebrate.wav"
    },
    {
        title: "Demon's Grin",
        artist: "Your Band Name",
        duration: "4:12",
        file: "songs/4 Demon's Grin.wav",
        downloadUrl: "songs/4 Demon's Grin.wav"
    },
    {
        title: "Another Dimension",
        artist: "Your Band Name",
        duration: "3:30",
        file: "songs/5 Another Dimension.wav",
        downloadUrl: "songs/5 Another Dimension.wav"
    },
    {
        title: "Death Is",
        artist: "Your Band Name",
        duration: "6:15",
        file: "songs/6 Death Is.wav",
        downloadUrl: "songs/6 Death Is.wav"
    },
    {
        title: "Spit",
        artist: "Your Band Name",
        duration: "3:45",
        file: "songs/7 Spit.wav",
        downloadUrl: "songs/7 Spit.wav"
    },
    {
        title: "Society",
        artist: "Your Band Name",
        duration: "7:20",
        file: "songs/8 Society.wav",
        downloadUrl: "songs/8 Society.wav"
    }
];

class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('audioPlayer');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.progressBar = document.querySelector('.progress-bar');
        this.progressFill = document.querySelector('.progress-fill');
        this.currentTimeSpan = document.querySelector('.current-time');
        this.totalTimeSpan = document.querySelector('.total-time');
        this.trackTitle = document.querySelector('.track-title');
        this.trackArtist = document.querySelector('.track-artist');
        this.songList = document.getElementById('songList');
        
        this.currentSongIndex = 0;
        this.isPlaying = false;
        
        this.initializePlayer();
        this.setupEventListeners();
        this.renderSongList();
    }
    
    initializePlayer() {
        this.loadSong(this.currentSongIndex);
    }
    
    setupEventListeners() {
        // Play/Pause button
        this.playPauseBtn.addEventListener('click', () => {
            this.togglePlayPause();
        });
        
        // Previous/Next buttons
        this.prevBtn.addEventListener('click', () => {
            this.previousSong();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.nextSong();
        });
        
        // Progress bar
        this.progressBar.addEventListener('click', (e) => {
            this.seekTo(e);
        });
        
        // Audio events
        this.audio.addEventListener('loadedmetadata', () => {
            this.totalTimeSpan.textContent = this.formatTime(this.audio.duration);
        });
        
        this.audio.addEventListener('timeupdate', () => {
            this.updateProgress();
        });
        
        this.audio.addEventListener('ended', () => {
            this.nextSong();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    this.togglePlayPause();
                    break;
                case 'ArrowLeft':
                    this.previousSong();
                    break;
                case 'ArrowRight':
                    this.nextSong();
                    break;
            }
        });
    }
    
    loadSong(index) {
        if (index >= 0 && index < songs.length) {
            this.currentSongIndex = index;
            const song = songs[index];
            
            this.audio.src = song.file;
            this.trackTitle.textContent = song.title;
            this.trackArtist.textContent = '';
            
            // Update active song in playlist
            this.updateActiveSong();
            
            // Reset progress
            this.progressFill.style.width = '0%';
            this.currentTimeSpan.textContent = '0:00';
            this.totalTimeSpan.textContent = song.duration;
        }
    }
    
    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    play() {
        this.audio.play();
        this.isPlaying = true;
        this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    
    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
    
    previousSong() {
        let newIndex = this.currentSongIndex - 1;
        if (newIndex < 0) {
            newIndex = songs.length - 1;
        }
        this.loadSong(newIndex);
        if (this.isPlaying) {
            this.play();
        }
    }
    
    nextSong() {
        let newIndex = this.currentSongIndex + 1;
        if (newIndex >= songs.length) {
            newIndex = 0;
        }
        this.loadSong(newIndex);
        if (this.isPlaying) {
            this.play();
        }
    }
    
    seekTo(e) {
        const rect = this.progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        this.audio.currentTime = percent * this.audio.duration;
    }
    
    updateProgress() {
        const { currentTime, duration } = this.audio;
        const progressPercent = (currentTime / duration) * 100;
        this.progressFill.style.width = `${progressPercent}%`;
        this.currentTimeSpan.textContent = this.formatTime(currentTime);
    }
    
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    renderSongList() {
        this.songList.innerHTML = '';
        
        songs.forEach((song, index) => {
            const songItem = document.createElement('div');
            songItem.className = 'song-item';
            songItem.dataset.index = index;
            
            songItem.innerHTML = `
                <div class="song-info">
                    <div class="song-title">${song.title}</div>
                    <div class="song-duration">${song.duration}</div>
                </div>
                <div class="song-actions">
                    <button class="action-btn play-btn" title="Play">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="action-btn download-btn" title="Download">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
            `;
            
            // Add event listeners
            const playBtn = songItem.querySelector('.play-btn');
            const downloadBtn = songItem.querySelector('.download-btn');
            
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.loadSong(index);
                this.play();
            });
            
            downloadBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.downloadSong(song);
            });
            
            songItem.addEventListener('click', () => {
                this.loadSong(index);
                if (this.isPlaying) {
                    this.play();
                }
            });
            
            this.songList.appendChild(songItem);
        });
    }
    
    updateActiveSong() {
        // Remove active class from all songs
        document.querySelectorAll('.song-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to current song
        const currentSongItem = document.querySelector(`[data-index="${this.currentSongIndex}"]`);
        if (currentSongItem) {
            currentSongItem.classList.add('active');
        }
    }
    
    downloadSong(song) {
        const link = document.createElement('a');
        link.href = song.downloadUrl;
        link.download = `${song.title}.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Initialize the music player when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MusicPlayer();
    
    // Setup download demo button
    const downloadDemoBtn = document.getElementById('downloadDemoBtn');
    downloadDemoBtn.addEventListener('click', downloadAllSongs);
    
    // Setup play all button
    const playAllBtn = document.getElementById('playAllBtn');
    playAllBtn.addEventListener('click', playAllSongs);
});

// Function to download all songs as a zip file
async function downloadAllSongs() {
    try {
        // Create a zip file using JSZip
        const zip = new JSZip();
        
        // Add each song to the zip
        for (const song of songs) {
            const response = await fetch(song.file);
            const blob = await response.blob();
            zip.file(`${song.title}.wav`, blob);
        }
        
        // Generate the zip file
        const zipBlob = await zip.generateAsync({type: 'blob'});
        
        // Create download link
        const url = URL.createObjectURL(zipBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'PSYCLOP_Demo.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
    } catch (error) {
        console.error('Error creating zip file:', error);
        alert('Error creating zip file. Please try again.');
    }
}

// Global variable to track insane mode state and audio elements
let insaneModeActive = false;
let insaneModeAudios = [];

// Function to play all songs simultaneously
function playAllSongs() {
    const button = document.getElementById('playAllBtn');
    
    if (insaneModeActive) {
        // Stop insane mode
        stopInsaneMode();
        button.textContent = 'Insane Mode';
        insaneModeActive = false;
    } else {
        // Start insane mode
        startInsaneMode();
        button.textContent = 'Stop Insane';
        insaneModeActive = true;
    }
}

// Function to start insane mode
function startInsaneMode() {
    // Stop any currently playing audio
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    
    // Clear any existing insane mode audios
    insaneModeAudios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    insaneModeAudios = [];
    
    // Create audio elements for each song
    songs.forEach((song, index) => {
        const audio = new Audio(song.file);
        audio.volume = 0.3; // Lower volume since multiple tracks will play
        audio.play().catch(error => {
            console.error(`Error playing ${song.title}:`, error);
        });
        insaneModeAudios.push(audio);
    });
}

// Function to stop insane mode
function stopInsaneMode() {
    insaneModeAudios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    insaneModeAudios = [];
} 