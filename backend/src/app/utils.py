import json
import ssl
import urllib.request
from pprint import pprint
from typing import Any
from urllib.parse import urlencode


def fetch_data(url: str, method="GET", params=None, headers=None, data=None):
    context = ssl._create_unverified_context()
    headers = headers if headers else {}

    if params:
        query_string = urlencode(params)
        url = f"{url}?{query_string}"

    if data:
        data = json.dumps(data).encode()

    request = urllib.request.Request(url, headers=headers, method=method, data=data)

    with urllib.request.urlopen(request, context=context) as response:
        status_code = response.status
        data = json.loads(response.read().decode())

    if status_code == 200:
        return data
    else:
        message = f"error: {status_code}\n {data}"
        raise ValueError(message)


def write_json(
    data: Any | None,
    filepath: str | None = None,
) -> None:
    if filepath and data:
        with open(filepath, "w", encoding="utf-8") as file:
            json.dump(data, file, ensure_ascii=False, indent=2)
    else:
        pprint(data)


def read_json(filepath: str):
    with open(filepath, "r") as file:
        return json.load(file)
