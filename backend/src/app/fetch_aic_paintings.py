# https://api.artic.edu/docs/

from app.models.aic import Artwork, ArtworksResponse, SearchResponse
from app.models.api import ApiImageUrl, ApiRecord
from app.paths import dotenv_path, frontend_data_dir
from app.utils import fetch_data, read_json, write_json
from dotenv import dotenv_values

API_URL = "https://api.artic.edu/api/v1/artworks"


def post_aic(data: dict, is_search=False):
    env_vars = dotenv_values(dotenv_path)
    project_name = env_vars.get("PROJECT_NAME")
    project_email = env_vars.get("PROJECT_EMAIL")
    headers = {
        "AIC-User-Agent": f"{project_name} ({project_email})",
        "Content-Type": "application/json",
    }
    url = API_URL + "/search" if is_search else API_URL
    return fetch_data(url, method="POST", headers=headers, data=data)


def search_paintings(page: int):
    limit = 100
    offset = (page - 1) * limit
    data = {
        "query": {
            "function_score": {
                "query": {
                    "bool": {
                        "must": [
                            {"term": {"artwork_type_id": 1}},
                            {"term": {"is_public_domain": True}},
                        ]
                    }
                },
                "random_score": {"seed": 1},
            },
        },
        "from": offset,
        "size": limit,
    }
    res = post_aic(data, is_search=True)
    return SearchResponse.parse_obj(res)


def fetch_artworks(search_res: SearchResponse):
    ids = [item.id for item in search_res.data]
    fields = list(Artwork.__annotations__.keys())
    data = {
        "ids": ",".join([str(id) for id in ids]),
        "limit": len(ids),
        "fields": fields,
    }
    res = post_aic(data, is_search=False)
    return ArtworksResponse.parse_obj(res)


def validate_artworks(artworks_res: ArtworksResponse, search_res: SearchResponse):
    assert all(
        [
            r.artwork_type_title == "Painting" and r.is_public_domain and r.is_zoomable
            for r in artworks_res.data
        ]
    )
    assert set(o.id for o in search_res.data) == set(r.id for r in artworks_res.data)


def create_api_records(artworks_res: ArtworksResponse, file_num=1) -> list[ApiRecord]:
    artworks = artworks_res.data
    config = artworks_res.config

    return [
        ApiRecord(
            artist_name=a.artist_title or "Unknown",
            color=a.color,
            date=a.date_display,
            dimensions=a.dimensions.split(";"),
            id=f"{file_num}-{i}",
            image_alt=a.thumbnail.alt_text,
            image_url=ApiImageUrl(
                sm=f"{config.iiif_url}/{a.image_id}/full/200,/0/default.jpg",
                md=f"{config.iiif_url}/{a.image_id}/full/400,/0/default.jpg",
                lg=f"{config.iiif_url}/{a.image_id}/full/600,/0/default.jpg",
                xl=f"{config.iiif_url}/{a.image_id}/full/843,/0/default.jpg",
            ),
            medium=a.medium_display,
            origin=a.place_of_origin,
            sequence=i + 1,
            source_id=a.id,
            source_url=f"{config.website_url}/artworks/{a.id}",
            source="aic",
            style=a.style_title,
            title=a.title,
        )
        for i, a in enumerate(artworks)
    ]


def create_data_file(
    file_num=1,
    search_response_file: str | None = "search_response_1.json",
    artworks_response_file: str | None = "artworks_response_1.json",
):
    filename = f"aic_{file_num}.json"

    if artworks_response_file:
        artworks_res = ArtworksResponse.parse_file(artworks_response_file)
    else:
        search_res = (
            SearchResponse.parse_obj(read_json(search_response_file))
            if search_response_file
            else search_paintings(file_num)
        )
        artworks_res = fetch_artworks(search_res)

        validate_artworks(artworks_res, search_res)

        if not search_response_file:
            write_json(
                search_res.dict(),
                filepath=str(f"search_response_{file_num}.json"),
            )

        if not artworks_response_file:
            write_json(
                artworks_res.dict(),
                filepath=str(f"artworks_response_{file_num}.json"),
            )

    api_records = create_api_records(artworks_res)
    api_response = {
        "records": [r.dict() for r in api_records],
        "count": len(api_records),
    }

    write_json(api_response, filepath=str(frontend_data_dir / filename))


def create_summary(records_per_file=100, total_files=1, total_records=100):
    write_json(
        {
            "recordsPerFile": records_per_file,
            "totalFiles": total_files,
            "totalRecords": total_records,
        },
        filepath=str(frontend_data_dir / "aic_summary.json"),
    )


# create_summary()
create_data_file()
