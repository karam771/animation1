# Optimiertes Skript zur Hintergrundentfernung (Fix für Basilikum-Flecken)
$ffmpeg = "c:\Users\kelk\.gemini\antigravity\scratch\Webseiten\Anty.Animation\ffmpeg_ext\ffmpeg-master-latest-win64-gpl\bin\ffmpeg.exe"
$inputDir = "c:\Users\kelk\.gemini\antigravity\scratch\Webseiten\Anty.Animation\frames_mobile"
$outputDir = "c:\Users\kelk\.gemini\antigravity\scratch\Webseiten\Anty.Animation\frames_mobile_transparent"

if (!(Test-Path $outputDir)) { New-Item -ItemType Directory -Path $outputDir }

$files = Get-ChildItem -Path $inputDir -Filter "margheritamobilfinal_*.jpg"
$total = $files.Count
$count = 0

Write-Host "Starte optimierte Hintergrund-Entfernung (Basil-Fix) für $total Frames..."

foreach ($file in $files) {
    $count++
    $outputFile = Join-Path $outputDir ($file.BaseName + ".webp")
    
    # Similarity auf 0.03 reduziert, um dunkle Blätter zu schützen
    # Blend auf 0.05 für saubere Ränder
    & $ffmpeg -i $file.FullName -vf "colorkey=0x000000:0.03:0.05" -c:v libwebp -lossless 1 $outputFile -y -loglevel quiet
    
    if ($count % 10 -eq 0) { Write-Host "Fortschritt: $count / $total" }
}

Write-Host "Fertig! Die optimierten Frames liegen in: $outputDir"
