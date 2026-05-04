FROM nixos/nix:2.33.5

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN nix-channel --update

RUN curl -fsSL https://get.jetify.com/devbox | bash
