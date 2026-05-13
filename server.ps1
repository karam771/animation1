$port = 8082
$baseFolder = $PSScriptRoot

$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $port)
$listener.Start()

Write-Host "Server running at http://localhost:$port/"
Write-Host "Press Ctrl+C to stop"

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".png"  = "image/png"
    ".webp" = "image/webp"
    ".svg"  = "image/svg+xml"
    ".pdf"  = "application/pdf"
}

try {
    while ($true) {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $line = $reader.ReadLine()
        if ($line -match "GET (.*) HTTP") {
            $path = $matches[1]
            if ($path -eq "/") { $path = "/index.html" }
            $path = $path.Split('?')[0] # Remove query string
            
            $filePath = Join-Path $baseFolder $path.TrimStart('/').Replace('/', '\')
            
            if (Test-Path $filePath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($filePath)
                $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                
                $header = "HTTP/1.1 200 OK`r`nContent-Type: $contentType`r`nContent-Length: $($bytes.Length)`r`n`r`n"
                $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                $stream.Write($headerBytes, 0, $headerBytes.Length)
                $stream.Write($bytes, 0, $bytes.Length)
            } else {
                $msg = "HTTP/1.1 404 Not Found`r`n`r`n404 Not Found"
                $msgBytes = [System.Text.Encoding]::UTF8.GetBytes($msg)
                $stream.Write($msgBytes, 0, $msgBytes.Length)
            }
        }
        $stream.Close()
        $client.Close()
    }
} catch {
    Write-Error $_.Exception.Message
    Read-Host "Press Enter to exit..."
} finally {
    $listener.Stop()
}
