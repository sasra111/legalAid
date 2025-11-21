# Legal Case Search Feature Documentation

## Overview

The Legal Case Search feature is a comprehensive AI-powered semantic search system integrated into the lawyer dashboard. It allows lawyers to search through legal case judgements using natural language queries and receive relevant results ranked by semantic similarity.

## Architecture

### Frontend Components

- **LegalSearch Component** (`/frontend/src/components/lawyer_dashboard/LegalSearch.tsx`)
  - Main search interface component
  - Handles user queries and displays results
  - Built with React, TypeScript, and Tailwind CSS
  - Uses shadcn/ui components for consistent design

### Backend API

- **FastAPI Service** (`/ai-backend/main.py`)
  - Endpoint: `GET /searchJudgements`
  - Uses sentence-transformers with `nlpaueb/legal-bert-base-uncased` model
  - Stores embeddings in Redis for fast retrieval
  - Returns semantically similar case chunks

## Features

### 1. **Semantic Search**

- Natural language query processing
- AI-powered relevance scoring using legal-BERT embeddings
- Searches through preprocessed legal case chunks

### 2. **User Interface**

- Clean, professional design using Tailwind CSS
- Responsive layout for all screen sizes
- Real-time search with loading states
- Keyboard support (Enter to search)

### 3. **Search Results Display**

- **Result Cards**: Each result displayed in an elegant card with:
  - Document and chunk IDs
  - Case title
  - Relevance score (color-coded)
  - Full text chunk
  - Copy-to-clipboard functionality
- **Result Metadata**:
  - Document ID
  - Chunk ID
  - Case title
  - Relevance percentage
- **Score Visualization**:
  - Green: High relevance (≥5%)
  - Yellow: Medium relevance (3-5%)
  - Orange: Lower relevance (<3%)

### 4. **Results Summary**

- Total chunks searched
- Number of results found
- Query echo for verification

### 5. **Error Handling**

- Backend connectivity errors
- Empty query validation
- User-friendly error messages

### 6. **UX Enhancements**

- Loading skeletons during search
- Empty state with helpful instructions
- Copy text functionality with visual feedback
- Hover effects and smooth transitions

## API Integration

### Request

```typescript
GET http://localhost:8000/searchJudgements
Query Parameters:
  - query: string (search query)
  - top_k: number (default: 5, number of results to return)
```

### Response

```typescript
{
  query: string;
  top_k: number;
  total_chunks: number;
  results: Array<{
    doc_id: string;
    chunk_id: string;
    title: string;
    chunk_text: string;
    score: number;
  }>;
}
```

## Usage

### For End Users (Lawyers)

1. Navigate to the "Legal Search" section from the sidebar
2. Enter a search query (e.g., "fundamental violation", "breach of contract")
3. Press Enter or click the Search button
4. Review results sorted by relevance
5. Click "Copy" to copy case text to clipboard

### For Developers

#### Running the Backend

```bash
cd ai-backend
uvicorn main:app --reload
```

#### Running the Frontend

```bash
cd frontend
npm run dev
```

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── lawyer_dashboard/
│   │   │   └── LegalSearch.tsx          # Main search component
│   │   └── ui/
│   │       ├── input.tsx                 # Input component
│   │       ├── card.tsx                  # Card components
│   │       ├── badge.tsx                 # Badge component
│   │       ├── skeleton.tsx              # Loading skeleton
│   │       └── button.tsx                # Button component
│   └── App.tsx                           # Route configuration

ai-backend/
└── main.py                               # FastAPI search endpoint
```

## UI Components Used

### shadcn/ui Components

1. **Input** - Search input field
2. **Button** - Search and copy buttons
3. **Card** - Result containers
4. **Badge** - Metadata labels
5. **Skeleton** - Loading placeholders

### Lucide Icons

- `Search` - Search functionality
- `Scale` - Legal theme
- `BookOpen` - Documentation
- `FileText` - Documents
- `Copy` - Copy functionality
- `Check` - Copy confirmation
- `AlertCircle` - Warnings/errors
- `Loader2` - Loading state

## Styling

### Color Scheme

- **Primary**: Blue shades (blue-50 to blue-800)
- **Success**: Green shades for high relevance
- **Warning**: Yellow shades for medium relevance
- **Alert**: Orange/Red shades for low relevance or errors

### Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Flexible grid layouts
- Adaptive typography

## Future Enhancements

### Potential Improvements

1. **Advanced Filters**
   - Date range filtering
   - Court level filtering
   - Jurisdiction filtering
2. **Result Export**
   - PDF export of search results
   - Email results functionality
3. **Search History**
   - Save previous searches
   - Quick access to frequent queries
4. **Highlighting**
   - Highlight matching terms in results
   - Snippet preview with context
5. **Pagination**
   - Load more results
   - Adjustable results per page
6. **Bookmarking**
   - Save important cases
   - Create case collections
7. **Analytics**
   - Track most searched terms
   - Usage statistics

## Dependencies

### Frontend

- React 19.1.0
- TypeScript 5.8.3
- Tailwind CSS 4.1.10
- Axios 1.10.0
- lucide-react 0.522.0
- Radix UI components

### Backend

- FastAPI
- sentence-transformers
- Redis
- numpy

## Troubleshooting

### Common Issues

1. **"Failed to fetch search results"**

   - Ensure AI backend is running on port 8000
   - Check Redis connection
   - Verify CORS settings

2. **No results returned**

   - Verify embeddings are loaded in Redis
   - Check search query format
   - Review backend logs

3. **Slow search performance**
   - Check Redis connection speed
   - Verify embedding model is loaded
   - Monitor backend resource usage

## Configuration

### Backend URL

Currently hardcoded to: `http://localhost:8000`

To change, update the axios call in `LegalSearch.tsx`:

```typescript
const response = await axios.get<SearchResponse>(
  "YOUR_BACKEND_URL/searchJudgements",
  { params: { query: query.trim(), top_k: 5 } }
);
```

### Results Count

Default: 5 results per search

To modify, change the `top_k` parameter in the API call.

## Testing

### Manual Testing Checklist

- [ ] Search with valid query returns results
- [ ] Search with empty query shows error
- [ ] Loading state displays during search
- [ ] Results display with correct formatting
- [ ] Copy functionality works
- [ ] Relevance scores display correctly
- [ ] Responsive design works on mobile
- [ ] Error handling for backend unavailable
- [ ] Keyboard shortcuts (Enter) work

## License

Part of the LegalAid application.

## Contributors

Developed as part of the LegalAid lawyer dashboard feature set.
