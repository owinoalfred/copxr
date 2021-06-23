# Weblate Customisation and config files

These are files which need to be installed in the Weblate Docker container.

## Config file

- `settings-override.py` should be placed in `/var/lib/docker/volumes/weblate-docker_weblate-data/_data/` on the Docker host.
- Note that if the file already exists the files should be merged and the result checked back in here.
- More info here: https://docs.weblate.org/en/weblate-3.11.2/admin/install/docker.html#docker-custom-config

## Addons

- `generatemd.py` should be placed in `/var/lib/docker/volumes/weblate-docker_weblate-data/_data/python/` on the Docker host. 
- More info here: https://docs.weblate.org/en/weblate-3.11.2/admin/customize.html#custom-addons
