# Use Node.js official image
FROM node:18-bullseye

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    vim \
    build-essential \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Install global npm packages that might be needed
RUN npm install -g \
    @expo/cli \
    nodemon \
    pm2

# Set working directory
WORKDIR /workspaces

# Create a non-root user
RUN useradd -m -s /bin/bash vscode && \
    usermod -aG sudo vscode && \
    echo "vscode ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Switch to non-root user
USER vscode

# Expose ports
EXPOSE 8081 1337

# Keep container running
CMD ["sleep", "infinity"]
