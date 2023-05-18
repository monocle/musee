from typing import Literal, TypedDict, Union


class HAMColor(TypedDict):
    color: str
    css3: str
    hue: str
    percent: float
    spectrum: str


class HAMPerson(TypedDict):
    alphasort: str | None
    birthplace: str | None
    culture: str | None
    deathplace: str | None
    displaydate: str | None
    displayname: str | None
    displayorder: int
    gender: str | None
    name: str | None
    personid: int | None
    prefix: str | None
    role: Union[Literal["Artist"], str]


class HAMInfo(TypedDict):
    totalrecordsperquery: int
    totalrecords: int
    pages: int
    page: int
    next: str  # "https://api.harvardartmuseums.org/object?size=10&page=2&apikey=mykey"
    responsetime: str


# imagepermissionlevel
# 0 – ok to display images at any size
# 1 – images have restrictions; display at a maximum pixel dimension of 256px
# 2 – do not display any images
class HAMBaseObject(TypedDict):
    colors: list[HAMColor]
    medium: str
    primaryimageurl: str | None
    title: str
    url: str


class HAMObject(HAMBaseObject):
    dated: str | None
    dateend: str | int
    id: int
    imagepermissionlevel: Literal[0, 1, 2]
    people: list[HAMPerson]
    dimensions: str | None


class APIObject(HAMBaseObject):
    artist: HAMPerson
    date: str | int
    dimensions: list[str]
    fetch_date: str
    id: str
    sequence: int
    source: Literal["ham"]
    source_id: int | str


class HAMResponse(TypedDict):
    info: HAMInfo
    records: list[HAMObject]


class DataFile(TypedDict):
    count: int
    records: list[APIObject]
