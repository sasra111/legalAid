import { useState } from "react";
import { Scale, Search, AlertCircle } from "lucide-react";

interface NewCase {
  cause_of_action: string;
  subject_matter: string;
  key_facts: string;
}

interface SimilarCase {
  case_id: string;
  case_name: string;
  cause_of_action: string;
  subject_matter: string;
  statute_ordinance_applied: string[];
  key_facts: string;
  court_finding: string;
  remedy_granted: string;
  court : string;
  date_of_decision: string;
  score: number;
}

interface SimilarCasesResponse {
  input_case: NewCase;
  top_k: number;
  similar_cases: SimilarCase[];
}

type CaseType = "contract" | "constitutional";

const SimilarCases = () => {
  const [caseType, setCaseType] = useState<CaseType>("contract");
  const [formData, setFormData] = useState<NewCase>({
    cause_of_action: "",
    subject_matter: "",
    key_facts: "",
  });
  const [results, setResults] = useState<SimilarCasesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [topK, setTopK] = useState(5);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    if (!formData.cause_of_action || !formData.key_facts) {
      setError("Please fill in at least Cause of Action and Key Facts");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const endpoint = caseType === "contract" 
        ? "findSimilarCases" 
        : "findSimilarConstitutionalCases";

      const response = await fetch(
        `http://localhost:8000/${endpoint}?top_k=${topK}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to find similar cases");
      }

      const data: SimilarCase[] = await response.json();
      setResults({
        input_case: formData,
        top_k: topK,
        similar_cases: data,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCaseTypeChange = (type: CaseType) => {
    setCaseType(type);
    // Reset form data
    setFormData({
      cause_of_action: "",
      subject_matter: "",
      key_facts: "",
    });
    // Clear results and errors
    setResults(null);
    setError("");
  };

  const handleFeedback = async (isHappy: boolean) => {
    if (!results) return;

    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:8000/api/feedback/case', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          caseType,
          searchQuery: formData,
          isHappy
        })
      });
      
      setFeedbackSubmitted(true);
      
      // Optional: Show success notification
      setTimeout(() => setFeedbackSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Failed to submit feedback');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 border border-blue-100">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Scale className="h-5 w-5 text-blue-600" /> Find Similar Cases
      </h3>

      {/* Case Type Toggle */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Case Type</label>
        <div className="inline-flex gap-2 rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => handleCaseTypeChange("contract")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              caseType === "contract"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Contract
          </button>
          <button
            onClick={() => handleCaseTypeChange("constitutional")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              caseType === "constitutional"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Constitutional
          </button>
        </div>
      </div>

      {/* Input Form */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Cause of Action *
          </label>
          <input
            type="text"
            name="cause_of_action"
            value={formData.cause_of_action}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            // placeholder={
            //   caseType === "contract"
            //     ? "e.g., Breach of Contract"
            //     : "e.g., Violation of Fundamental Rights"
            // }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Subject Matter
          </label>
          <input
            type="text"
            name="subject_matter"
            value={formData.subject_matter}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            // placeholder={
            //   caseType === "contract"
            //     ? "e.g., Sale of Goods"
            //     : "e.g., Freedom of Speech, Right to Privacy"
            // }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Key Facts *
          </label>
          <textarea
            name="key_facts"
            value={formData.key_facts}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe the key facts of the case..."
          />
        </div>

        <div className="flex gap-4 items-end">
          <div className="w-48">
            <label className="block text-sm font-medium mb-1">
              Number of Results
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={topK}
              onChange={(e) => setTopK(parseInt(e.target.value) || 3)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex-1 flex justify-center">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              {loading ? "Searching..." : "Find Similar Cases"}
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle className="h-5 w-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-4">
          <div className="border-t pt-4">
            <h4 className="font-semibold text-blue-700 mb-3">
              Similar Cases Found: {results.similar_cases.length}
            </h4>
            {results.similar_cases.length === 0 ? (
              <p className="text-gray-500 text-sm">No similar cases found.</p>
            ) : (
              <div className="space-y-3">
                {results.similar_cases.map((case_item, index) => (
                  <div
                    key={case_item.case_id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold text-gray-800">
                        {index + 1}. {case_item.case_name || case_item.case_id}
                      </h5>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {case_item.court}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Cause:</span>{" "}
                        {case_item.cause_of_action}
                      </p>
                      <p>
                        <span className="font-medium">Subject:</span>{" "}
                        {case_item.subject_matter}
                      </p>
                      {case_item.statute_ordinance_applied.length > 0 && (
                        <p>
                          <span className="font-medium">Statutes:</span>{" "}
                          {case_item.statute_ordinance_applied.join(", ")}
                        </p>
                      )}
                      <p className="text-gray-600">
                        <span className="font-medium">Key Facts:</span>{" "}
                        {case_item.key_facts}
                      </p>
                      {case_item.court_finding && (
                        <p className="text-gray-700 bg-gray-50 p-2 rounded">
                          <span className="font-medium">Court Finding:</span>{" "}
                          {case_item.court_finding}
                        </p>
                      )}
                      {case_item.remedy_granted && (
                        <p className="text-gray-700 bg-gray-50 p-2 rounded">
                          <span className="font-medium">Remedy Granted:</span>{" "}
                          {case_item.remedy_granted}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Feedback Section */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-800 mb-3">
              Was this information helpful?
            </h4>
            <div className="flex gap-4">
              <button
                onClick={() => handleFeedback(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex-1 transition-all"
              >
                Yes, very helpful!
              </button>
              <button
                onClick={() => handleFeedback(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex-1 transition-all"
              >
                No, not really.
              </button>
            </div>
            {feedbackSubmitted && (
              <p className="mt-3 text-sm text-green-600">
                Thank you for your feedback!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimilarCases;