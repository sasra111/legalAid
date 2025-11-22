from redis import Redis
from sentence_transformers import SentenceTransformer

# Redis connection
redis_client = Redis(
    host="redis-12128.c263.us-east-1-2.ec2.cloud.redislabs.com",
    port=12128,
    decode_responses=False,
    username="default",
    password="9FipQ6XWXVT1xJIaivdWztCkM26W8yRb",
)

model = SentenceTransformer("nlpaueb/legal-bert-base-uncased")