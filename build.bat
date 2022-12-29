@echo off
setlocal

for /f "delims=" %%a in (version.txt) do (
	set "version=%%a"
)

echo VERSION
echo %version%

set "outpath=.\tags\%version%"
mkdir %outpath%\

set "aclltb_js=..\avoid-chromium-lazy-loaded-text-broken\avoid-the-chromium-lazy-loading-broken-characters-bug.js"

if exist "jquery-3.6.3.min.js" (
    echo "jquery-3.6.3.min.js found"
) else (
    bitsadmin /transfer download https://code.jquery.com/jquery-3.6.3.min.js %CD%\jquery-3.6.3.min.js
)

rem copy *.md %outpath%\
copy *.txt %outpath%\
copy *.css %outpath%\
copy *.html %outpath%\
copy *.js %outpath%\
copy *.png %outpath%\
copy *.json %outpath%\
copy %aclltb_js% %outpath%\
del %outpath%\version.txt

del /F /Q /S .\release\Aclltbbe\
xcopy %outpath%\ .\release\Aclltbbe\

cd %outpath%

set "zipfile=..\..\release\Aclltbbe-%version%.zip"
del %zipfile%

tar -a -c -f %zipfile% *

set "basefile=..\..\release\Aclltbbe.zip"
del %basefile%

copy %zipfile% %basefile%

endlocal
pause
echo on
