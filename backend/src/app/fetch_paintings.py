import json
import ssl
import urllib.request
from datetime import datetime
from itertools import islice
from typing import Iterable, Iterator, Optional, Tuple, TypeVar, cast
from urllib.parse import urlencode

from app.interface.ham_types import (
    APIObject,
    DataFile,
    HAMBaseObject,
    HAMObject,
    HAMPerson,
)
from app.paths import dotenv_path, frontend_data_dir
from dotenv import dotenv_values

T = TypeVar("T")


def chunked(seq: Iterable[T], chunk_size: int) -> Iterator[Tuple[int, list[T]]]:
    iterator = iter(seq)
    i = 0

    while chunk := list(islice(iterator, chunk_size)):
        yield i, chunk
        i += 1


def write_json(filepath: str, data: dict | DataFile):
    with open(filepath, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=2)


def get_artist(people: list[HAMPerson]) -> Optional[HAMPerson]:
    return next((person for person in people if person["role"] == "Artist"), None)


def filter_records(records: Iterable[HAMObject]) -> Iterator[HAMObject]:
    return (
        record
        for record in records
        if record.get("primaryimageurl")
        and record.get("imagepermissionlevel", 1) == 0
        and record.get("people")
        and get_artist(record.get("people", []))
    )


def transform_records(records: Iterator[HAMObject]) -> Iterator[APIObject]:
    for idx, record in enumerate(records):
        artist = get_artist(record["people"])
        base_object = {key: record.get(key) for key in HAMBaseObject.__required_keys__}
        base_object["artist"] = artist
        base_object["date"] = record["dated"] or record["dateend"] or "Unknown"
        base_object["dimensions"] = (
            record["dimensions"].split("\r\n") if record["dimensions"] else []
        )
        base_object["sequence"] = idx + 1
        base_object["source"] = "ham"
        base_object["fetch_date"] = datetime.now().strftime("%Y-%m-%d")
        yield cast(APIObject, base_object)


def fetch_data(url: str, params=None):
    context = ssl._create_unverified_context()

    if params:
        query_string = urlencode(params)
        url = f"{url}?{query_string}"

    with urllib.request.urlopen(url, context=context) as response:
        status_code = response.status
        data = json.loads(response.read().decode())

    return status_code, data


def fetch_ham_paintings(page=1, num_records=None) -> list[HAMObject]:
    ham_api_key = dotenv_values(dotenv_path).get("HAM_API_KEY")

    if not ham_api_key:
        print("HAM API key not found")
        return []

    url = "https://api.harvardartmuseums.org/object"
    max_per_page = 100  # API default is 10
    seed = 4
    response_fields = [
        "colors",
        "dated",
        "dateend",
        "dimensions",
        "id",
        "imagepermissionlevel",
        "medium",
        "people",
        "primaryimageurl",
        "title",
        "url",
    ]
    params = {
        "classification": "Paintings",
        "hasimage": 1,
        "sort": f"random:{seed}",
        "size": num_records or max_per_page,
        "fields": ",".join(response_fields),
        "page": page,
    }

    status_code, data = fetch_data(url, {**params, "apikey": ham_api_key})

    if status_code == 200:
        return data["records"]
    else:
        print(f"error: {status_code}\n {data}")
        return []


def create_ham_data_files(num_pages=4, num_records=100, page_size=100) -> None:
    records = []
    for page in range(1, num_pages + 1):
        records += fetch_ham_paintings(page=page, num_records=num_records)

    # Frontend requires that records are sorted by "sequence"
    api_records = transform_records(filter_records(records))
    total_records = 0
    total_files = 0

    for i, chunk in chunked(api_records, page_size):
        data_filepath = frontend_data_dir / f"ham_{i+1}.json"
        len_chunk = len(chunk)
        data: DataFile = {"records": chunk, "count": len_chunk}
        write_json(str(data_filepath), data)
        total_records += len_chunk
        total_files = i + 1

    summary_filepath = frontend_data_dir / f"ham_summary.json"
    summary = {
        "recordsPerFile": page_size,
        "totalFiles": total_files,
        "totalRecords": total_records,
    }
    write_json(str(summary_filepath), summary)


create_ham_data_files()
