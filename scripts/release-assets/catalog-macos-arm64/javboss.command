#!/bin/bash
set -u

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR" || exit 1

if command -v xattr >/dev/null 2>&1; then
  xattr -dr com.apple.quarantine "$SCRIPT_DIR" >/dev/null 2>&1 || true
fi

"$SCRIPT_DIR/javboss" "$@"
status=$?

if [ "$status" -ne 0 ]; then
  echo
  echo "JavBoss 未能正常启动（状态码：$status）。"
  read -r -p "按回车键关闭此窗口…" _
fi

exit "$status"
