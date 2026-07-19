import os
import uuid
from pathlib import Path
from fastapi import UploadFile

def add_image(image: UploadFile, uploads_url: str):
    ext = image.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    filepath = os.path.join(uploads_url, filename)
    full_path = f"src/{filepath}"

    with open(full_path, "wb") as buffer:
        buffer.write(image.file.read())
    
    return filepath

def remove_image(image_url: str, default_image_url: str):
    full_path = f"src/{image_url}"
    path_exists = Path(full_path).exists()
    if path_exists and image_url != default_image_url:
        image_to_delete_url = full_path
        os.remove(image_to_delete_url)


def replace_image(
    old_image_url: str,
    new_image: UploadFile,
    default_image_url: str,
    uploads_url: str
):
    remove_image(old_image_url, default_image_url)
    filepath = add_image(new_image, uploads_url)
    return filepath