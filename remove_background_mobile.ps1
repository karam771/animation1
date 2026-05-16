# Skript für extrem optimierte mobile Frames (Performance-Fix)
$ffmpeg = "c:\Users\kelk\.gemini\antigravity\scratch\Webseiten\Anty.Animation\ffmpeg_ext\ffmpeg-master-latest-win64-gpl\bin\ffmpeg.exe"
$inputDir = "c:\Users\kelk\.gemini\antigravity\scratch\Webseiten\Anty.Animation\frames_mobile"
$outputDir = "c:\Users\kelk\.gemini\antigravity\scratch\Webseiten\Anty.Animation\frames_mobile_transparent"

if (!(Test-Path $outputDir)) { New-Item -ItemType Directory -Path $outputDir }

$files = Get-ChildItem -Path $inputDir -Filter "margheritamobilfinal_*.jpg"
$total = $files.Count
$count = 0

Write-Host "Optimiere mobile Frames für maximale Performance..."

foreach ($file in $files) {
    $count++
    $outputFile = Join-Path $outputDir ($file.BaseName + ".webp")
    
    # -q:v 65 -> Gute Balance zwischen Qualität und Dateigröße
    # colorkey bleibt wie besprochen für den Basilikum-Fix
    & $ffmpeg -i $file.FullName -vf "colorkey=0x000000:0.03:0.05" -c:v libwebp -q:v 65 $outputFile -y -loglevel quiet
    
    if ($count % 20 -eq 0) { Write-Host "Fortschritt: $count / $total" }
}

Write-Host "Fertig! Die optimierten (leichten) Frames liegen in: $outputDir"
