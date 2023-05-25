from pydantic import BaseModel


class Color(BaseModel):
    h: int
    s: int
    l: int
    percentage: float


# Image only config.iiif_url + image_id + "/full/843,/0/default.jpg"
# https://www.artic.edu/iiif/2/52ac8996-3460-cf71-cb42-5c4d0aa29b74/full/843,/0/default.jpg
# AIC's page: config.website_url + id
class Config(BaseModel):
    iiif_url: str
    website_url: str


class Thumbnail(BaseModel):
    alt_text: str | None
    height: int | None
    lqip: str
    width: int | None


class Artwork(BaseModel):
    artist_display: str
    artist_title: str | None
    artwork_type_title: str  # validate "Painting"
    boost_rank: int | None
    category_titles: list[str]
    color: Color | None
    colorfulness: float
    date_display: str
    date_end: int
    date_start: int
    dimensions: str
    has_not_been_viewed_much: bool
    id: int
    image_id: str
    is_boosted: bool
    is_public_domain: bool  # validate true
    is_zoomable: bool  # validate true
    medium_display: str
    place_of_origin: str | None
    style_title: str | None
    thumbnail: Thumbnail
    title: str


class Pagination(BaseModel):
    current_page: int
    limit: int
    offset: int
    total: int
    total_pages: int
    next_url: str | None


class ArtworksResponse(BaseModel):
    data: list[Artwork]
    config: Config


class SearchItem(BaseModel):
    id: int
    api_link: str


class SearchResponse(BaseModel):
    data: list[SearchItem]
    config: Config
    pagination: Pagination
