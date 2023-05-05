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
results_per_page = 10  # API default. max = 100
response_fields = [
    "title",
    "people",
    "dateend",
    "dated",
    "primaryimageurl",
    "url",
    "medium",
    "dimensions",
]
params = {
    "apikey": api_key,
    "classification": "Paintings",
    "hasimage": 1,
    "sort": "random",
    "size": 100,
    "fields": ",".join(response_fields),
}

status_code, data = fetch_data(url, params)

if status_code == 200:
    # Don't include data["info"] since it has the API key in it.
    write_json("paintings.json", {"records": data["records"]})
else:
    print(f"error: {status_code}\n {data}")
