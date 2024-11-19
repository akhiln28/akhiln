# video editing cli

cutting
trimming
merging/concatenating
extracting audio
extracting frames
adding svg
motion graphics and animation
adding text
adding audio

## ffmpeg

```bash
# Cutting/Trimming:
ffmpeg -i input.mp4 -ss 00:00:30 -t 00:00:10 -c copy output.mp4  # Start at 30s, take 10s
# Merging/Concatenating:
ffmpeg -f concat -i filelist.txt -c copy output.mp4  # filelist.txt contains: file 'video1.mp4' \n file 'video2.mp4'
# Audio Extraction:
ffmpeg -i video.mp4 -vn -acodec mp3 audio.mp3
# Frame Extraction:
ffmpeg -i video.mp4 -vf fps=1 frame_%d.jpg  # Extract 1 frame per second
# Adding Text:
ffmpeg -i input.mp4 -vf drawtext="text='Hello':fontsize=24:x=10:y=10" output.mp4
# Adding Audio:
ffmpeg -i video.mp4 -i audio.mp3 -c:v copy -c:a aac output.mp4
# Overlay/Compositing:
ffmpeg -i main.mp4 -i overlay.png -filter_complex "overlay=10:10" output.mp4
```

## melt

```bash
# Cutting
melt video.mp4 in=100 out=200 -consumer avformat:output.mp4 # Use frame numbers or timecode (HH:MM:SS.frames)
# Trimming
melt input.mp4 start=0 end=500 -consumer avformat:trimmed.mp4 # Similar to cutting but preserves original file
# Merging/Concatenating
melt video1.mp4 video2.mp4 -consumer avformat:merged.mp4 # Use + operator for transitions: video1.mp4 + video2.mp4
# Audio Extraction
melt video.mp4 -consumer avformat:audio.mp3 acodec=libmp3lame vcodec=none # Can specify audio quality with ab=128k
# Frame Extraction
melt video.mp4 -consumer avformat:frame%d.jpg vcodec=mjpeg # Control frame rate with fps=1
# Adding SVG
melt video.mp4 -track svg.svg out=100 -transition composite # Supports animations within SVG files
# Motion Graphics/Animation
melt video.mp4 -filter affine transition.geometry="0=0,0:100%x100%;100=100%,0:100%x100%" # Use keyframes: Support for rotation, scaling, position
# Adding Text
melt video.mp4 -track text:"Your Text" out=100 -transition composite # Customize font, size, color with text.properties
# Adding Audio
melt video.mp4 audio.mp3 -mix 50 -consumer avformat:output.mp4 # Control volume levels with volume filter: Supports multiple audio tracks
```
