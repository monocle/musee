from pathlib import Path

project_root = Path(__file__).parents[3].resolve()

dotenv_path = project_root / "backend" / ".env"

frontend_data_dir = project_root / "frontend" / "public" / "data"
