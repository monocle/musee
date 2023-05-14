FROM python:3.11.2-slim-bullseye AS compile-image

RUN apt-get update && \
    apt-get -y upgrade && \
    apt-get -y install --no-install-recommends make

RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /home/appuser/src/backend

COPY requirements.txt /home/appuser/src/backend/
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

FROM python:3.11.2-slim-bullseye AS build-image
COPY --from=compile-image /usr/bin/make /usr/bin/make
COPY --from=compile-image /opt/venv /opt/venv

ENV PATH="/opt/venv/bin:$PATH"
ENV FLASK_APP=/home/appuser/src/backend/src/app


RUN useradd --create-home appuser
WORKDIR /home/appuser/src/backend
USER appuser

CMD ["bash"]
