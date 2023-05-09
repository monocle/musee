import json
import os
import ssl
import urllib.request
from typing import cast
from urllib.parse import urlencode

from app.interface.ham_types import APIObject, DataChunk, HAMBaseObject, HAMObject
from dotenv import dotenv_values


def write_json(filename: str, data: DataChunk):
    with open(filename, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=2)


def filter_records(records: list[HAMObject]):
    return [
        record
        for record in records
        if record.get("primaryimageurl")
        and record.get("imagepermissionlevel", 1) == 0
        and record.get("people")
    ]


def transform_records(records: list[HAMObject]) -> list[APIObject]:
    """
    Assumes there is always an "Artist" in record["people"]
    """
    api_records: list[APIObject] = []

    for record in records:
        artist = next(
            person for person in record["people"] if person["role"] == "Artist"
        )
        base_object = {key: record.get(key) for key in HAMBaseObject.__required_keys__}
        base_object["artist"] = artist
        base_object["dimensions"] = (
            record["dimensions"].split("\r\n") if record["dimensions"] else []
        )
        base_object["date"] = record["dated"] or record["dateend"] or "Unknown"
        api_records.append(cast(APIObject, base_object))

    return api_records


def fetch_data(url: str, params=None):
    context = ssl._create_unverified_context()

    if params:
        query_string = urlencode(params)
        url = f"{url}?{query_string}"

    with urllib.request.urlopen(url, context=context) as response:
        status_code = response.status
        data = json.loads(response.read().decode())

    return status_code, data


def fetch_ham_paintings(num_records=None, should_write=False) -> None:
    dotenv_path = os.path.join(os.path.dirname(__file__), "..", "..", ".env")
    ham_api_key = dotenv_values(dotenv_path).get("HAM_API_KEY")

    if not ham_api_key:
        print("HAM API key not found")
        return

    url = "https://api.harvardartmuseums.org/object"
    max_per_page = 100  # API default is 10
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
        "sort": "random:1",  # 1 is a seed number
        "size": num_records or max_per_page,
        "fields": ",".join(response_fields),
        "page": 2,
    }

    status_code, data = fetch_data(url, {**params, "apikey": ham_api_key})
    records = transform_records(filter_records(data["records"]))
    data_chunk: DataChunk = {"records": records, "count": len(records)}

    if status_code == 200:
        if should_write:
            write_json("paintings.json", data_chunk)
        else:
            print(data_chunk["records"][0:5])
    else:
        print(f"error: {status_code}\n {data}")


fetch_ham_paintings(should_write=True)
