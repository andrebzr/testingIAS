param([string]$ProjectRoot = $PSScriptRoot)
$ErrorActionPreference = 'Stop'
if (-not $ProjectRoot) { $ProjectRoot = (Get-Location).Path }
Set-Location -LiteralPath $ProjectRoot
if (-not (Test-Path 'package.json')) { throw 'Extraia o ZIP completo antes de instalar.' }

function Refresh-Path {
    $env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User') + ';' + $env:Path
}
function Run-Checked([string]$Command, [string[]]$CommandArgs) {
    & $Command @CommandArgs
    if ($LASTEXITCODE -ne 0) { throw "Falha em $Command (codigo $LASTEXITCODE)." }
}
function Install-Package([string]$Id) {
    if (-not (Get-Command winget.exe -ErrorAction SilentlyContinue)) {
        throw 'O winget nao esta disponivel. Instale/atualize o App Installer pela Microsoft Store e execute novamente.'
    }
    Run-Checked 'winget.exe' @('install','--id',$Id,'--exact','--source','winget','--accept-source-agreements','--accept-package-agreements','--disable-interactivity')
    Refresh-Path
}

Write-Host 'Preparando o projeto VR Audio no Windows...' -ForegroundColor Cyan
Refresh-Path
if (-not (Get-Command node.exe -ErrorAction SilentlyContinue)) { Install-Package 'OpenJS.NodeJS.LTS' }
$major = & node.exe -p 'process.versions.node.match(/^\d+/)[0]'
if ($LASTEXITCODE -ne 0 -or [int]$major -lt 22) {
    Install-Package 'OpenJS.NodeJS.LTS'
    $major = & node.exe -p 'process.versions.node.match(/^\d+/)[0]'
    if ($LASTEXITCODE -ne 0 -or [int]$major -lt 22) { throw 'E necessario Node.js 22 ou superior. Atualize o Node e execute novamente.' }
}

$pythonAvailable = $false
foreach ($command in @('py.exe','python.exe','python3.exe')) {
    if (Get-Command $command -ErrorAction SilentlyContinue) {
        $pythonArgs = @('--version')
        if ($command -eq 'py.exe') { $pythonArgs = @('-3','--version') }
        $version = & $command @pythonArgs 2>$null
        if ($LASTEXITCODE -eq 0 -and "$version" -match '^Python 3\.') { $pythonAvailable = $true; break }
    }
}
if (-not $pythonAvailable) { Install-Package 'Python.Python.3.12' }
if (-not (Get-Command ffmpeg.exe -ErrorAction SilentlyContinue) -or -not (Get-Command ffprobe.exe -ErrorAction SilentlyContinue)) {
    Install-Package 'Gyan.FFmpeg'
}
foreach ($tool in @('node.exe','npm.cmd','ffmpeg.exe','ffprobe.exe')) {
    if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) { throw "$tool indisponivel. Reinicie o terminal apos instalar e execute novamente." }
}

Run-Checked 'npm.cmd' @('ci','--ignore-scripts')
Run-Checked 'npm.cmd' @('run','assets')
Run-Checked 'npm.cmd' @('run','audio')
Run-Checked 'npm.cmd' @('run','typecheck')

$video = Join-Path $ProjectRoot 'delivery\vr-audio-reel.mp4'
if (Test-Path -LiteralPath $video) {
    $manifest = Get-Content -Raw -LiteralPath (Join-Path $ProjectRoot 'delivery\manifest.json') | ConvertFrom-Json
    if ((Get-FileHash -LiteralPath $video -Algorithm SHA256).Hash.ToLowerInvariant() -ne $manifest.sha256) { throw 'O checksum do video nao confere. Baixe o ZIP novamente.' }
    New-Item -ItemType Directory -Force -Path 'output' | Out-Null
    $target = Join-Path $ProjectRoot 'output\vr-audio-reel.mp4'
    if ((Test-Path -LiteralPath $target) -and (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash.ToLowerInvariant() -ne $manifest.sha256) {
        Write-Host 'Um video diferente ja existe em output; sera preservado.'
    } else { Copy-Item -LiteralPath $video -Destination $target -Force }
    Write-Host "Video final disponivel: $video" -ForegroundColor Green
    Invoke-Item -LiteralPath $video
}

$busyPorts = @([System.Net.NetworkInformation.IPGlobalProperties]::GetIPGlobalProperties().GetActiveTcpListeners() | ForEach-Object { $_.Port })
$port = 3000
while ($busyPorts -contains $port) { $port++ }
Start-Process -FilePath 'cmd.exe' -ArgumentList "/k npm run start -- --port=$port" -WorkingDirectory $ProjectRoot
$url = "http://localhost:$port/VRAudioReel"
$ready = $false
for ($attempt = 0; $attempt -lt 45; $attempt++) {
    try {
        $response = Invoke-WebRequest -UseBasicParsing -Uri "http://localhost:$port" -TimeoutSec 2
        if ($response.Content -match 'remotion') { $ready = $true; break }
    } catch { }
    Start-Sleep -Seconds 1
}
if (-not $ready) { throw 'O Studio nao respondeu. Confira a janela do servidor para diagnosticar o erro.' }
Start-Process $url
Write-Host 'Instalacao concluida. O video e o Studio foram abertos.' -ForegroundColor Green
Write-Host 'Para renderizar novamente: npm run render. Para encerrar o Studio: Ctrl+C na janela do servidor.'
