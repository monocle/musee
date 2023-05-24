from typing import Literal

from app.models.aic import Color
from pydantic import BaseModel


class ApiImageUrl(BaseModel):
    sm: str
    md: str
    lg: str
    xl: str


class ApiRecord(BaseModel):
    artist_name: str
    color: Color
    date: str
    dimensions: list[str]
    id: str
    image_alt: str | None
    image_url: ApiImageUrl
    medium: str
    origin: str | None
    sequence: int
    source_id: int
    source_url: str
    source: Literal["aic"]
    style: str | None
    title: str
