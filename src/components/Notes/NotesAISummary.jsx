import { useRef, useState } from "react";

const NotesAISummary = ({ notes }) => {
  const modalRef = useRef();
  const resultsRef = useRef();
  const [stream, setStream] = useState(false);

  const handleAISummary = async () => {
    //get data from the user
    // grab that prop data and send it to Open-ai.using a hardcoded prompt,ask chatgpt to do something with the data you set.
    //the resp. should be displayed to the users.
    const data = await fetch(
      "https://gen-ai-wbs-consumer-api.onrender.com/api/v1/chat/completions",
      {
        method: "POST",
        body: {
          model: "gpt- 3.5 - turbo",
          messages: [
            {
              role: "user",
              content: `Hello, can you help me with my code?   data: ${enties}`,
              id: "1",
              author: "ss",
              title: "ssddd",
            },
          ],
        },
      }
    );
  };

  console.log(notes);
  return (
    <>
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => modalRef.current.showModal()}
          className="bg-purple-400 hover:bg-purple-300 text-white font-bold py-2 px-4 rounded-full shadow-lg w-10 h-10"
        >
          ✨
        </button>
      </div>
      <dialog id="modal-note" className="modal" ref={modalRef}>
        <div className="modal-box h-[600px] py-0">
          <div className="modal-action items-center justify-between mb-2">
            <h1 className="text-2xl text-center">Get AI Gen summary</h1>
            <label htmlFor="Stream?" className="flex items-center gap-1">
              Stream?
              <input
                id="Stream?"
                type="checkbox"
                className="toggle toggle-error"
                checked={stream}
                onChange={() => setStream((p) => !p)}
              />
            </label>

            <form method="dialog">
              <button className="btn">&times;</button>
            </form>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div
              className="textarea textarea-success w-full h-[400px] overflow-y-scroll"
              ref={resultsRef}
            >
              AI SUMMARY GOES HERE
            </div>
            <button
              className="mt-5 btn bg-purple-500 hover:bg-purple-400 text-white"
              onClick={handleAISummary}
            >
              Gen AI summary ✨
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default NotesAISummary;
