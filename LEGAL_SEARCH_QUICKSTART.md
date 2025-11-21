# Legal Search Feature - Quick Start Guide

## Prerequisites

1. Node.js and npm installed
2. Python 3.8+ installed
3. Redis instance running (cloud or local)

## Setup Instructions

### 1. Start the AI Backend (FastAPI)

```bash
# Navigate to ai-backend directory
cd ai-backend

# Install dependencies (first time only)
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload
```

The backend will be available at: `http://localhost:8000`

You can verify it's running by visiting: `http://localhost:8000/docs`

### 2. Start the Frontend (React + Vite)

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

The frontend will be available at: `http://localhost:5173` (or similar)

### 3. Access the Legal Search Feature

1. Open your browser and navigate to the frontend URL
2. Log in as a lawyer user
3. From the sidebar, click on **"Legal Search"**
4. Enter your search query and click "Search"

## Example Queries

Try these example queries to test the feature:

- "fundamental violation"
- "breach of contract"
- "negligence"
- "torture and detention"
- "human rights violation"
- "police misconduct"
- "evidence tampering"

## Feature Overview

### Search Interface

- **Search Bar**: Enter natural language queries
- **Search Button**: Click to execute search or press Enter
- **Results Display**: Shows top 5 most relevant case chunks

### Result Cards Include:

- Document ID and Chunk ID
- Case title
- Relevance score (percentage)
- Full text excerpt from the case
- Copy to clipboard button

### Visual Indicators

- **Green Badge**: High relevance (≥5%)
- **Yellow Badge**: Medium relevance (3-5%)
- **Orange Badge**: Lower relevance (<3%)

## Troubleshooting

### Backend Not Responding

- Ensure the AI backend is running on port 8000
- Check that Redis is accessible
- Verify embeddings are loaded (check console logs on startup)

### No Results Found

- Try broader search terms
- Check that case data is loaded in Redis
- Review backend logs for errors

### Frontend Not Loading

- Clear browser cache
- Check browser console for errors
- Ensure all npm dependencies are installed

## Data Management

### Adding New Cases

To add new legal cases to the search index:

1. Prepare your case documents in text format
2. Process them into chunks (paragraphs or sections)
3. Generate embeddings using the legal-BERT model
4. Store in Redis with the following structure:
   ```
   Key: case_vectors:{doc_id}:{chunk_id}
   Fields:
     - embedding: numpy array (float32)
     - metadata: JSON {doc_id, chunk_id, title, chunk_text}
   ```

### Redis Data Structure

```
case_vectors:1:1
  ├── embedding: [0.123, -0.456, ...] (768-dimensional vector)
  └── metadata: {
        "doc_id": "1",
        "chunk_id": "1",
        "title": "Case Title",
        "chunk_text": "Full text of this chunk..."
      }
```

## API Endpoint Details

### Search Endpoint

```
GET /searchJudgements
```

**Query Parameters:**

- `query` (required): The search query string
- `top_k` (optional): Number of results to return (default: 5)

**Response Format:**

```json
{
  "query": "fundamental violation",
  "top_k": 5,
  "total_chunks": 22,
  "results": [
    {
      "doc_id": "1",
      "chunk_id": "2",
      "title": "Test",
      "chunk_text": "...",
      "score": 0.052
    }
  ]
}
```

## Performance Tips

1. **Redis Connection**: Use a nearby Redis instance for faster lookups
2. **Chunk Size**: Keep chunks between 200-500 words for optimal results
3. **Embedding Cache**: Embeddings are loaded once at startup and cached in memory
4. **Concurrent Searches**: FastAPI handles multiple concurrent search requests

## Security Considerations

1. **Authentication**: The feature is protected by the lawyer role
2. **API Access**: Consider adding API key authentication for production
3. **Rate Limiting**: Implement rate limiting for the search endpoint
4. **Data Privacy**: Ensure case data complies with confidentiality requirements

## Next Steps

After getting the basic feature working, consider:

1. Adding pagination for more than 5 results
2. Implementing search filters (date, court, jurisdiction)
3. Adding bookmarking functionality
4. Creating export features (PDF, Word)
5. Implementing search history
6. Adding advanced query syntax support

## Support

For issues or questions:

1. Check the main documentation: `LEGAL_SEARCH_FEATURE.md`
2. Review the code comments in `LegalSearch.tsx`
3. Check FastAPI documentation at `/docs` endpoint
4. Review application logs for error messages

## Development URLs

- Frontend Dev Server: `http://localhost:5173`
- Backend API: `http://localhost:8000`
- Backend API Docs: `http://localhost:8000/docs`
- Backend API Redoc: `http://localhost:8000/redoc`

---

Happy searching! 🔍⚖️
