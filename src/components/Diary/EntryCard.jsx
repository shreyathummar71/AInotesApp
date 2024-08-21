import axios from "axios";

const EntryCard = ({ entry }) => {
  const handleAudioSummary = async (text) => {
    // try {
    //   // Make a POST request to generate the audio summary
    //   const response = await axios.post(
    //     "https://gen-ai-wbs-consumer-api.onrender.com/api/v1/audio/speech",
    //     {
    //       text: text, // The text content to be converted to speech
    //       voice: "en_us_male", // Optional: specify the voice or language (if applicable)
    //     },
    //     {
    //       headers: {
    //         Authorization: import.meta.env.VITE_API_KEY, // Use the provided API key
    //       },
    //     }
    //   );
    //   // Check if the response contains the audio URL or base64 data
    //   const audioUrl =
    //     response.data.audioUrl ||
    //     `data:audio/wav;base64,${response.data.audio}`;
    //   // Create a new audio element and play the audio
    //   const audio = new Audio(audioUrl);
    //   audio.play();
    // } catch (error) {
    //   console.error("Error generating or playing audio summary:", error);
    // }
  };
  const handleImageGeneration = async () => {
    try {
      const { data } = await axios.post(
        "https://gen-ai-wbs-consumer-api.onrender.com/api/v1/images/generations",
        { prompt: entry.content },
        {
          headers: {
            provider: "open-ai",
            mode: "production",
            Authorization: import.meta.env.VITE_OPENAI_API_KEY,
          },
        }
      );
      // Assuming `data.image` contains the base64 image
      await axios.put(
        `${import.meta.env.VITE_NOTES_API}/entries/${entry._id}`,
        { image: data.image }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="bg-white h-48">
        <img
          src={entry.image}
          alt={entry.title}
          className="object-cover h-full w-full"
        />
      </figure>
      <div className="card-body h-56">
        <h2 className="card-title">{entry.title}</h2>
        <h3 className="font-bold">{new Date(entry.date).toDateString()}</h3>
        <p className="truncate text-wrap">{entry.content}</p>
        <div className="card-actions">
          <button onClick={handleAudioSummary} className="btn btn-primary">
            Audio Summary
          </button>
          <button onClick={handleImageGeneration} className="btn btn-secondary">
            Generate Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryCard;
