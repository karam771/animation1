# Skript für transparente Desktop-Frames
$ffmpeg = "c:\Users\kelk\.gemini\antigravity\scratch\Webseiten\Anty.Animation\ffmpeg_ext\ffmpeg-master-latest-win64-gpl\bin\ffmpeg.exe"
$inputDir = "c:\Users\kelk\.gemini\antigravity\scratch\Webseiten\Anty.Animation\frames"
$outputDir = "c:\Users\kelk\.gemini\antigravity\scratch\Webseiten\Anty.Animation\frames_transparent"

if (!(Test-Path $outputDir)) { New-Item -ItemType Directory -Path $outputDir }

$files = Get-ChildItem -Path $inputDir -Filter "ezgif-frame-*.jpg"
$total = $files.Count
$count = 0

Write-Host "Entferne schwarzen Hintergrund bei $total Desktop-Frames..."

foreach ($file in $files) {
    $count++
    $outputFile = Join-Path $outputDir ($file.BaseName + ".webp")
    
    # Wir nutzen dieselbe Similarity wie bei Mobile (0.03), um das Basilikum zu schützen
    & $ffmpeg -i $file.FullName -vf "colorkey=0x000000:0.03:0.05" -c:v libwebp -q:v 75 $outputFile -y -loglevel quiet
    
    if ($count % 20 -eq 0) { Write-Host "Fortschritt: $count / $total" }
}

Write-Host "Fertig! Die transparenten Desktop-Frames liegen in: $outputDir"
