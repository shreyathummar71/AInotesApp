import { useRef, useState } from "react";
import axios from "axios";
import { Charts } from "@/components/Diary";

const MoodAIAnalysis = ({ entries }) => {
  const modalRef = useRef();
  const [aiSummary, setAiSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAISummary = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://gen-ai-wbs-consumer-api.onrender.com/api/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          body: [
            {
              role: "user",
              content: `Analyze the mood of these entries: ${JSON.stringify(
                entries
              )}`,
            },
          ],
        },
        {
          headers: {
            provider: "open-ai",
            mode: "production",
            Authorization: import.meta.env.VITE_OPENAI_API_KEY,
          },
        }
      );
      setAiSummary(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => modalRef.current.showModal()}
          className="bg-purple-400 hover:bg-purple-300 text-white font-bold py-2 px-4 rounded-full shadow-lg w-10 h-10"
          disabled={loading}
        >
          {loading ? "Loading..." : "✨"}
        </button>
      </div>
      <dialog id="modal-note" className="modal" ref={modalRef}>
        <div className="modal-box h-[600px] py-0 w-11/12 max-w-5xl">
          <div className="modal-action items-center justify-between mb-2">
            <h1 className="text-2xl text-center">
              Get your AI Gen Mood Analysis
            </h1>
            <form method="dialog">
              <button className="btn">&times;</button>
            </form>
          </div>
          <div className="flex items-center gap-3">
            <div className="textarea textarea-success w-1/2 h-[400px] overflow-y-scroll">
              {aiSummary
                ? JSON.stringify(aiSummary, null, 2)
                : "AI SUMMARY GOES HERE..."}
            </div>
            <div className="textarea textarea-success w-1/2 h-[400px] overflow-y-scroll">
              {aiSummary && <Charts aiSummary={aiSummary} />}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default MoodAIAnalysis;
