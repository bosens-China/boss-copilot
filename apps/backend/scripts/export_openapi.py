from app.main import app
import json
from pathlib import Path


# 写入路径
current_dir = Path.cwd().parents[1]
file_path = current_dir / "packages" / "codegen" / "openapi.json"


def export():
    openapi_data = app.openapi()
    with open(file_path, "w") as f:
        json.dump(openapi_data, f)


if __name__ == "__main__":
    export()
