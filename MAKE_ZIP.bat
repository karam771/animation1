@echo off
cd /d "%~dp0"
echo Erstelle ZIP-Datei...
powershell -Command "Compress-Archive -Path index.html, app.js, style.css, bewertungen.html, impressum.html, kontakt.html, speisekarte.html, speisekarte.pdf, images, frames -DestinationPath Antalya_Pizzeria_Vollstaendig.zip -Force"
echo Fertig!
pause
