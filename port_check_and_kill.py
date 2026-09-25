import subprocess
import sys
import re

def kill_port(port: int):
    try:
        # Find PID using netstat on Windows
        result = subprocess.run(
            ["netstat", "-ano"],
            capture_output=True,
            text=True,
            check=False
        )
        pids = set()
        for line in result.stdout.splitlines():
            if f":{port}" in line and "LISTENING" in line:
                parts = line.strip().split()
                if len(parts) >= 5:
                    pids.add(parts[-1])

        for pid in pids:
            if pid and pid != "0":
                subprocess.run(["taskkill", "/F", "/PID", pid], capture_output=True, check=False)
                print(f"[INFO] Terminated process on port {port} (PID: {pid})")
    except Exception as e:
        print(f"[WARN] Error killing port {port}: {e}")

if __name__ == "__main__":
    kill_port(3001)
    kill_port(5173)
    kill_port(8000)
