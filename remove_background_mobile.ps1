# Skript für extrem schnelle mobile Performance (nur jeden 2. Frame)
$ffmpeg = "c:\Users\kelk\.gemini\antigravity\scratch\Webseiten\Anty.Animation\ffmpeg_ext\ffmpeg-master-latest-win64-gpl\bin\ffmpeg.exe"
$inputDir = "c:\Users\kelk\.gemini\antigravity\scratch\Webseiten\Anty.Animation\frames_mobile"
$outputDir = "c:\Users\kelk\.gemini\antigravity\scratch\Webseiten\Anty.Animation\frames_mobile_transparent"

if (!(Test-Path $outputDir)) { New-Item -ItemType Directory -Path $outputDir }

# Erstmal alten Müll löschen, um sauber neu zu starten
Remove-Item -Path "$outputDir\*.webp" -Force

$files = Get-ChildItem -Path $inputDir -Filter "margheritamobilfinal_*.jpg" | Sort-Object Name
$count = 0
$savedCount = 0

Write-Host "Erstelle 64 hochoptimierte Frames für Mobile..."

for ($i = 0; $i -lt $files.Count; $i += 2) {
    $file = $files[$i]
    $savedCount++
    # Wir benennen sie neu durch (001, 002...), damit die JS-Logik einfach bleibt
    $newName = "mobile_frame_" + $savedCount.ToString("D3") + ".webp"
    $outputFile = Join-Path $outputDir $newName
    
    & $ffmpeg -i $file.FullName -vf "colorkey=0x000000:0.03:0.05" -c:v libwebp -q:v 60 $outputFile -y -loglevel quiet
    
    if ($savedCount % 10 -eq 0) { Write-Host "Fortschritt: $savedCount / 64" }
}

Write-Host "Fertig! 64 leichte Frames wurden erstellt."
