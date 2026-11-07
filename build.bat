@echo off
setlocal

pushd "%~dp0"
if errorlevel 1 exit /b 1

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo Node.js 24 and npm are required. Install them before building.
  popd
  exit /b 1
)

call npm.cmd ci
if errorlevel 1 goto failed

call npm.cmd run build
if errorlevel 1 goto failed

popd
exit /b 0

:failed
set "BUILD_EXIT_CODE=%ERRORLEVEL%"
popd
exit /b %BUILD_EXIT_CODE%
