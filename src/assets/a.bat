@echo off
setlocal enabledelayedexpansion

set "carpeta=images"
set "contador=1"

for %%F in ("%carpeta%\*.*") do (
    ren "%%F" !contador!.%%~xF
    set /a "contador+=1"
)

endlocal