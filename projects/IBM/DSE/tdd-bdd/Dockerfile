FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY service/ ./service/
RUN useradd --uid 1000 appuser && mkdir -p /app/instance && chown -R appuser:appuser /app
USER appuser
ENV PORT=8080
EXPOSE 8080
CMD ["gunicorn", "--workers=1", "--bind=0.0.0.0:8080", "service:app"]
