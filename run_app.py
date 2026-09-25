import os
import sys
import webbrowser
import subprocess
import time

if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(root_dir, "backend")
    server_py = os.path.join(backend_dir, "server.py")
    port = int(os.getenv("PORT", 3001))

    print("\n" + "=" * 60)
    print("  🏥 JEEVA RAKSHA AI HEALTHCARE - PURE PYTHON LAUNCHER")
    print("=" * 60)
    print(f"  ✓ Tech Stack: Python 3 + FastAPI + Uvicorn + Scikit-Learn")
    print(f"  ✓ Server URL: http://localhost:{port}")
    print(f"  ✓ API Docs:   http://localhost:{port}/docs")
    print("=" * 60 + "\n")

    # Launch browser after a brief delay
    def open_browser():
        time.sleep(1.5)
        webbrowser.open(f"http://localhost:{port}")

    import threading
    threading.Thread(target=open_browser, daemon=True).start()

    # Run Python server
    cmd = [sys.executable, server_py, "--port", str(port)]
    try:
        subprocess.run(cmd, cwd=backend_dir)
    except KeyboardInterrupt:
        print("\n[INFO] Jeeva Raksha Python server stopped.")

if __name__ == "__main__":
    main()
