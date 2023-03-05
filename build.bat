@echo off
setlocal

for /f "delims=" %%a in (version.txt) do (
	set "version=%%a"
)

echo VERSION
echo %version%

set "outpath=.\tags\%version%"
del /F /Q /S %outpath%\
mkdir %outpath%\

copy ..\avoid-chromium-lazy-loaded-text-broken\avoid-the-chromium-lazy-loading-broken-characters-bug.js %outpath%\
copy *.md %outpath%\
copy *.txt %outpath%\
copy *.css %outpath%\
copy *.html %outpath%\
copy *.js %outpath%\
copy *.png %outpath%\
copy *.json %outpath%\
del %outpath%\version.txt

xcopy /S /Y _locales\ %outpath%\_locales\

echo # Chromium ###############################################################

set "makepath=.\release\chromium"
del /F /Q /S %makepath%\Aclltbbe\
xcopy /S /Y %outpath%\ %makepath%\Aclltbbe\

set "zipfile=%makepath%\Aclltbbe-%version%.zip"
del %zipfile%

powershell compress-archive %makepath%\Aclltbbe\* %zipfile% -Force

set "basefile=%makepath%\Aclltbbe.zip"
del %basefile%

copy %zipfile% %basefile%

endlocal
rem pause
echo on
