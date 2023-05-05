import json
import ssl
import urllib.request
from urllib.parse import urlencode

from api_key import api_key


def write_json(filename, data):
    with open(filename, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=2)


def fetch_data(url, params=None):
    context = ssl._create_unverified_context()

    if params:
        query_string = urlencode(params)
        url = f"{url}?{query_string}"

    with urllib.request.urlopen(url, context=context) as response:
        status_code = response.status
        data = json.loads(response.read().decode())

    return status_code, data


url = "https://api.harvardartmuseums.org/object"
max_per_page = 100  # API default is 10
response_fields = [
    "colors",
    "dated",
    "dateend",
    "dimensions",
    "id",
    "imagepermissionlevel",
    "images",
    "medium",
    "people",
    "primaryimageurl",
    "title",
    "url",
]
params = {
    "apikey": api_key,
    "classification": "Paintings",
    "hasimage": 1,
    "sort": "random",
    "size": max_per_page,
    "fields": ",".join(response_fields),
    # "q": "_exists_:primaryimageurl AND _exists_:images", # not working
}

status_code, data = fetch_data(url, params)

if status_code == 200:
    # Don't include data["info"] since it has the API key in it.
    write_json(
        "paintings.json", {"records": data["records"], "count": len(data["records"])}
    )
else:
    print(f"error: {status_code}\n {data}")
