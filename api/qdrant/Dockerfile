FROM qdrant/qdrant:latest

# Install curl for healthchecks
USER root
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Copy entrypoint wrapper that chowns storage/working dir and drops to UID 1000
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Run as root initially so entrypoint can chown, then it drops to UID 1000
ENTRYPOINT ["/entrypoint.sh"]
