import { useState } from "react";
import axios from "axios";
import {
  Search,
  BookOpen,
  Scale,
  AlertCircle,
  Loader2,
  FileText,
  Copy,
  Check,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchResult {
  doc_id: string;
  chunk_id: string;
  title: string;
  chunk_text: string;
  score: number;
}

interface SearchResponse {
  query: string;
  top_k: number;
  total_chunks: number;
  results: SearchResult[];
}

const LegalSearch = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a search query");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<SearchResponse>(
        "http://localhost:8000/searchJudgements",
        {
          params: {
            query: query.trim(),
            top_k: 5,
          },
        }
      );
      setSearchResults(response.data);
    } catch (err) {
      setError(
        "Failed to fetch search results. Please ensure the AI backend is running."
      );
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getScoreColor = (score: number): string => {
    if (score >= 0.05) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 0.03) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-orange-600 bg-orange-50 border-orange-200";
  };

  const formatScore = (score: number): string => {
    return `${(score * 100).toFixed(2)}%`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Scale className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-blue-800">
              Legal Case Search
            </h1>
            <p className="text-gray-600">
              Search through legal judgements and case law using AI-powered
              semantic search
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="shadow-lg border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-600" />
            Search Query
          </CardTitle>
          <CardDescription>
            Enter keywords or phrases to search relevant legal cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="e.g., fundamental violation, breach of contract, negligence..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 h-12 text-base"
              disabled={isLoading}
            />
            <Button
              onClick={handleSearch}
              disabled={isLoading || !query.trim()}
              className="h-12 px-8 bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  Search
                </>
              )}
            </Button>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Results Section */}
      {!isLoading && searchResults && (
        <div className="space-y-6">
          {/* Results Summary */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Search Results</p>
                    <p className="text-2xl font-bold text-blue-800">
                      {searchResults.results.length} matches found
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Chunks Searched</p>
                  <p className="text-xl font-semibold text-gray-700">
                    {searchResults.total_chunks}
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="text-sm text-gray-600">
                  Query:{" "}
                  <span className="font-semibold text-gray-800">
                    "{searchResults.query}"
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Results List */}
          <div className="space-y-4">
            {searchResults.results.length > 0 ? (
              searchResults.results.map((result, index) => (
                <Card
                  key={`${result.doc_id}-${result.chunk_id}`}
                  className="hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-blue-500"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-300"
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            {result.title}
                          </Badge>
                          <Badge variant="outline" className="bg-gray-50">
                            Doc ID: {result.doc_id}
                          </Badge>
                          <Badge variant="outline" className="bg-gray-50">
                            Chunk: {result.chunk_id}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl">
                          Result #{index + 1}
                        </CardTitle>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge
                          className={`px-3 py-1 ${getScoreColor(result.score)}`}
                          variant="outline"
                        >
                          Relevance: {formatScore(result.score)}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(result.chunk_text, index)
                          }
                          className="h-8"
                        >
                          {copiedIndex === index ? (
                            <>
                              <Check className="h-4 w-4" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                          {result.chunk_text}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="p-12 text-center">
                <div className="flex flex-col items-center gap-4 text-gray-500">
                  <AlertCircle className="h-12 w-12" />
                  <div>
                    <p className="text-lg font-semibold">No results found</p>
                    <p className="text-sm">
                      Try different keywords or broaden your search
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !searchResults && (
        <Card className="p-12 text-center border-dashed border-2 border-gray-300">
          <div className="flex flex-col items-center gap-4 text-gray-500">
            <div className="p-4 bg-blue-50 rounded-full">
              <Search className="h-12 w-12 text-blue-400" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">
                Start Your Search
              </p>
              <p className="text-sm">
                Enter a query above to search through legal case judgements
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default LegalSearch;
